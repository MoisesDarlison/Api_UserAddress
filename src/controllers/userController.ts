
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import { EthnicityUser, UserMoldel } from '../models/User';
import { AddressMoldel } from '../models/Address'


const schemaUser = yup.object().shape({
    name: yup.string().required("Name is required!"),
    telephone: yup.string().required("Telephone is required!"),
    email: yup.string().email("Insert a valid email! Ex:exemple@exemple.com").required("Email is required!"),
    password: yup.string().min(6).required("Password is required!"),
    age: yup.number().positive().integer("Insert a valid age!").required("Age is required!"),
    weight: yup.number().positive().required("Weight is required!"),
    ethnicity: yup.string().required("please select one of the: " + Object.values(EthnicityUser))
});

class UserController {
    async create(req: Request, res: Response) {
        try {
            const { name, telephone, email, password, age, weight, ethnicity } = req.body;

            await schemaUser.validate({ name, telephone, email, password, age, weight, ethnicity });

            const userRepository = getRepository(UserMoldel);
            const userAlreadExist = await userRepository.findOne({ email })

            if (userAlreadExist) {
                return res.status(401).json({ message: "Email alread Exists" })
            }

            const user = userRepository.create({ name, telephone, email, password, age, weight, ethnicity });
            await userRepository.save(user);

            return res.status(201).json({ message: `${user.name} successfully registered`, id: user.id });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return res.status(400).json({ message: error.message })
            }

            return res.status(500).json({ message: error.message })
        }
    }
    async index(req: Request, res: Response) {
        try {
            const userRepository = getRepository(UserMoldel);
            const users = await userRepository.find({ select: ['id', 'name', 'telephone', 'email', 'age', 'weight', 'ethnicity'] });
            if (!users) {
                return res.status(400).json({ message: "User does not exists!" })
            }
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    async destroy(req: Request, res: Response) {

        try {
            const userRepository = getRepository(UserMoldel);
            await userRepository.delete({ id: req.userId });

            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    async filter(req: Request, res: Response) {
        try {
            const userRepository = getRepository(UserMoldel);
            const addressRepository = getRepository(AddressMoldel);

            const user = await userRepository.findOne({ id: req.userId },
                { select: ['id', 'name', 'telephone', 'email', 'age', 'weight', 'ethnicity'] })

            if (!user) {
                return res.status(400).json({ message: "User not found" })
            }

            const address = await addressRepository.find({ user_id: req.userId })

            return res.status(200).json({ user, address })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    async update(req: Request, res: Response) {
        const { name, telephone, email, password, age, weight, ethnicity } = req.body;

        try {
            await schemaUser.validate({ name, telephone, email, password, age, weight, ethnicity });

            const userRepository = getRepository(UserMoldel);
            const emailAlreadExist = await userRepository.findOne({ email });

            if (emailAlreadExist && emailAlreadExist.id != req.userId) {
                return res.status(401).json({ massage: "Email alread exists!" });
            }

            const user = await userRepository.findOne({ id: req.userId });
            if (!user) {
                return res.status(401).json({ massage: "Email alread exists!" });
            }
            /**
             * "Done this way because using the 'userRepository.update ({info})' 
             * the password was not saved in a crypted form, even in the User Model, 
             * the @BeforeUpdate () function is enabled" 
             * await userRepository.update({ id: req.userId }, { name, telephone, email, password, age, weight, ethnicity })
             */
            user.name = name;
            user.telephone = telephone;
            user.email = email;
            user.password = password;
            user.age = age;
            user.weight = weight;
            user.ethnicity = ethnicity;

            userRepository.save(user);

            const userUpdate = await userRepository.findOne({ id: user.id }, { select: ['id', 'name', 'telephone', 'email', 'age', 'weight', 'ethnicity'] });

            return res.status(200).json(userUpdate);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            return res.status(500).json({ message: error.message });
        }
    }
}
export { UserController };

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserMoldel } from '../models/User'
import * as jwt from 'jsonwebtoken'
const { SECRET_KEY } = process.env
import * as yup from 'yup'
import * as bcrypt from 'bcrypt'

const schemaUser = yup.object().shape({
    email: yup.string().email("Invalid email! Ex:exemple@exemple.com").required("Email is required!"),
    password: yup.string().min(6).required("Password is required!"),
});


class AuthController {
    async auth(req: Request, res: Response) {

        try {
            await schemaUser.validate(req.body)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }

        const { email, password } = req.body;
        try {
            const userRepository = getRepository(UserMoldel);
            const user = await userRepository.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: "Access denied" })
            }
            const validateUser = bcrypt.compareSync(password, user.password)

            if (!validateUser) {
                return res.status(401).json({ erro: 'Access denied' });
            }

            const token = jwt.sign({ id: user.id }, `${SECRET_KEY}`)

            return res.status(200).json({ token });
        } catch (error) {

            return res.status(500).json({ message: error.message });
        }
    }
}

export { AuthController }
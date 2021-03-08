import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AddressMoldel } from '../models/Address';
import { UserMoldel } from '../models/User'
import * as yup from 'yup';
import validateUuid from 'uuid-validate';

const schemaAddress = yup.object().shape({
    addressName: yup.string().required("Address is required!"),
    addressNumber: yup.string().required("Number is required!"),
    complement: yup.string(),
    zipcode: yup.number().max(99999999).integer().positive().required("Zipcode is required!"),
    city: yup.string().required("City is required!"),
    state: yup.string().required("State is required!")
});

class AddressController {
    async create(req: Request, res: Response) {

        const { addressName, addressNumber, complement, zipcode, city, state } = req.body;

        try {
            await schemaAddress.validate({ addressName, addressNumber, complement, zipcode, city, state });

            const userModel = getRepository(UserMoldel);
            const userAlreadExist = await userModel.findOne({ id: req.userId });
            if (!userAlreadExist) {
                return res.status(401).json({ message: "User does not exists or invalid Token" });
            }

            const addressRepository = getRepository(AddressMoldel);
            const address = addressRepository.create({ user_id: req.userId, addressName, addressNumber, complement, zipcode, city, state });
            await addressRepository.save(address);

            return res.status(201).json(address)
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            return res.status(500).json({ message: error.message })
        }
    }
    async index(req: Request, res: Response) {

        try {
            const userModel = getRepository(UserMoldel);
            const userAlreadExist = await userModel.findOne({ id: req.userId });
            if (!userAlreadExist) {
                return res.status(401).json({ message: "User does not exists or invalid Token" });
            }

            const addressRepository = getRepository(AddressMoldel);
            const address = await addressRepository.find({ user_id: req.userId });

            return res.status(200).json(address)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    async destroy(req: Request, res: Response) {
        const { addressId } = req.params;

        try {
            const validadeParamsID = await validateUuid(addressId, 4)
            if (!validadeParamsID) {
                return res.status(401).json({ message: "Address does not exists!" });
            }

            const userModel = getRepository(UserMoldel);
            const userAlreadExist = await userModel.findOne({ id: req.userId });

            if (!userAlreadExist) {
                return res.status(401).json({ message: "User does not exists or invalid Token" });
            }
            const addressRepository = getRepository(AddressMoldel);

            const address = await addressRepository.delete({ id: addressId, user_id: req.userId });

            if (!address.affected || address.affected <= 0) {
                return res.status(404).json({ massage: "Address does not exists!" });
            }

            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    async filter(req: Request, res: Response) {
        const { addressId } = req.params;
        try {
            const validadeParamsID = await validateUuid(addressId, 4)
            if (!validadeParamsID) {
                return res.status(401).json({ message: "Address does not exists!" });
            }

            const userModel = getRepository(UserMoldel);
            const userAlreadExist = await userModel.findOne({ id: req.userId });

            if (!userAlreadExist) {
                return res.status(401).json({ message: "User does not exists or invalid Token" });
            }
            const addressRepository = getRepository(AddressMoldel);

            const address = await addressRepository.findOne({ id: addressId, user_id: req.userId })

            if (!address) {
                return res.status(401).json({ message: "Address does not exists!" });
            }

            return res.status(200).json(address)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    async update(req: Request, res: Response) {
        const { addressId } = req.params;
        const { addressName, addressNumber, complement, zipcode, city, state } = req.body;

        try {
            await schemaAddress.validate({ addressName, addressNumber, complement, zipcode, city, state });
            
            const validadeParamsID = await validateUuid(addressId, 4)
            if (!validadeParamsID) {
                return res.status(401).json({ message: "Address does not exists!" });
            }

            const addressRepository = getRepository(AddressMoldel);
            const address = await addressRepository.findOne({ id: addressId, user_id: req.userId })

            if (!address) {
                return res.status(401).json({ message: "Address does not exists!" });
            };

            await addressRepository.update({ id: addressId }, { addressName, addressNumber, complement, zipcode, city, state })

            const addressUpdate = await addressRepository.findOne({ id: addressId });

            return res.status(201).json(addressUpdate)
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return res.status(401).json({ message: error.message })
            }
            return res.status(500).json({ message: error.message })
        }
    }
}
export { AddressController };

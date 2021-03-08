import { Router } from 'express';
import { AddressController } from '../controllers/addressController';
import { AuthMid } from '../middlewares/AuthMid'

const { create, index, destroy, update, filter } = new AddressController();
const addressRouter = Router();
const { verifyJWT } = new AuthMid();

addressRouter.post('/', verifyJWT, create);
addressRouter.get('/list', verifyJWT, index);
addressRouter.get('/:addressId', verifyJWT, filter);
addressRouter.put('/:addressId', verifyJWT, update);
addressRouter.delete('/:addressId', verifyJWT, destroy);

export { addressRouter };

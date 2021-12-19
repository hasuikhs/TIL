import { Router, Request, Response, NextFunction } from 'express';
import DataManager from '../../service/implements/dataManager';

const userRouter = Router();
const userDataManager = new DataManager('user');

userRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

userRouter.get('/', async (req: Request, res: Response) => {
  return res.status(200).json( await userDataManager.select() );
});

userRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await userDataManager.select(parseInt(req.params.idx)) );
});

userRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await userDataManager.insert(req.body) );
});

userRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await userDataManager.update(parseInt(req.params.idx), req.body) );
});

userRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await userDataManager.delete(parseInt(req.params.idx)) );
});

export default userRouter;
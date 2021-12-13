import { Router, Request, Response, NextFunction } from 'express';
import { user, userExt } from '../../domain/user.interface'; 

const userRouter = Router();

userRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

userRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'get user all' });
});

userRouter.get('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `get user idx ${req.params.idx}`});
});

userRouter.post('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'post user' });
});

userRouter.put('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `put accout idx ${req.params.idx}`});
});

userRouter.delete('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `delete user idx ${req.params.idx}`});
});

export default userRouter;
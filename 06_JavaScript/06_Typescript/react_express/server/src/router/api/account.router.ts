import { Router, Request, Response, NextFunction } from 'express';
import { account, accountExt } from '../../domain/account.interface';

const accountRouter = Router();

accountRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

accountRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'get account all' });
});

accountRouter.get('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `get account idx ${req.params.idx}`});
});

accountRouter.post('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'post account' });
});

accountRouter.put('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `put accout idx ${req.params.idx}`});
});

accountRouter.delete('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `delete account idx ${req.params.idx}`});
});

export default accountRouter;
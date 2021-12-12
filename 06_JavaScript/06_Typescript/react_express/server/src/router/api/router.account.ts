import { Router, Request, Response, NextFunction } from 'express';

const accountRouter = Router();

accountRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

accountRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'get account' });
});

accountRouter.post('/:idx', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'post account' });
});

export default accountRouter;
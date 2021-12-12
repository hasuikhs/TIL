import { Router, Request, Response, NextFunction } from 'express';

const docRouter = Router();

docRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

docRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'get doc' });
});

docRouter.post('/:idx', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'post doc' });
});

export default docRouter;
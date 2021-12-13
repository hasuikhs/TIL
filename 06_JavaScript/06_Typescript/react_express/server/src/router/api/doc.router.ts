import { Router, Request, Response, NextFunction } from 'express';
import { doc, docExt } from '../../domain/doc.interface';

const docRouter = Router();

docRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

docRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'get doc all' });
});

docRouter.get('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `get doc idx ${req.params.idx}`});
});

docRouter.post('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'post doc' });
});

docRouter.put('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `put accout idx ${req.params.idx}`});
});

docRouter.delete('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `delete doc idx ${req.params.idx}`});
});

export default docRouter;
import { Router, Request, Response, NextFunction } from 'express';
import { server, serverExt } from '../../domain/server.interface';

const serverRouter = Router();

serverRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

serverRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'get server all' });
});

serverRouter.get('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `get server idx ${req.params.idx}` });
});

serverRouter.post('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'post server' });
});

serverRouter.put('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `put accout idx ${req.params.idx}` });
});

serverRouter.delete('/:idx([0-9]+)', (req: Request, res: Response) => {
  return res.status(200).json({ message: `delete server idx ${req.params.idx}` });
});

export default serverRouter;
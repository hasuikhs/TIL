import { Router, Request, Response, NextFunction } from 'express';
import DataManager from '../../service/implements/dataManager';

const serverRouter = Router();
const serverDataManager = new DataManager('server');

serverRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

serverRouter.get('/', async (req: Request, res: Response) => {
  return res.status(200).json( await serverDataManager.select() );
});

serverRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await serverDataManager.select(parseInt(req.params.idx)) );
});

serverRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await serverDataManager.insert(req.body) );
});

serverRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await serverDataManager.update(parseInt(req.params.idx), req.body) );
});

serverRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await serverDataManager.delete(parseInt(req.params.idx)) );
});

export default serverRouter;
import { Router, Request, Response, NextFunction } from 'express';
import DataManager from '../../service/implements/dataManager';

const docRouter = Router();
const docDataManager = new DataManager('doc');

docRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

docRouter.get('/',  async (req: Request, res: Response) => {
  return res.status(200).json( await docDataManager.select() );
});

docRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await docDataManager.select(parseInt(req.params.idx)) );
});

docRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await docDataManager.insert(req.body) );
});

docRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await docDataManager.update(parseInt(req.params.idx), req.body) );
});

docRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await docDataManager.delete(parseInt(req.params.idx)) );
});

export default docRouter;
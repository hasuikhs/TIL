import { Router, Request, Response, NextFunction } from 'express';
import { account, accountExt } from '../../domain/account.interface';
import DataManager from '../../service/implements/dataManager';

const accountRouter = Router();
const accountDataManager = new DataManager('account');

accountRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

accountRouter.get('/', async (req: Request, res: Response) => {
  return res.status(200).json( await accountDataManager.select() );
});

accountRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await accountDataManager.select(parseInt(req.params.idx)));
});

accountRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await accountDataManager.insert(req.body) );
});

accountRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await accountDataManager.update(parseInt(req.params.idx), req.body) );
});

accountRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await accountDataManager.delete(parseInt(req.params.idx)) );
});

export default accountRouter;
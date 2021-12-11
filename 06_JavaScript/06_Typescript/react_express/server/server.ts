import express, { Request, Response, Router } from 'express';
import cluster from 'cluster';
import DataManager from './src/service/implements/dataManager';

const PORT: number = 4000;
const WORKER_SIZE: number = 2;

if (cluster.isMaster) {
  for (let i = 0; i < WORKER_SIZE; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log('Worker', worker.id, ' has exited.')
  });
} else {
  runServer();
}

function runServer(): void {

  // https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
  // GET /user -> hello user
  // GET /user/5 -> hello user 5
  // GET /user/5/items -> hello items from user 5
  // GET /user/5/items/6 -> hello item 6 from user 5

  const app = express();
  const apiRouter = Router();
  const idxRouter = Router({ mergeParams: true });

  const types = ['account', 'doc', 'server', 'user'];

  const dataManager = new DataManager();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', apiRouter);

  apiRouter.route('/:type')
    .get(async (req: Request, res: Response): Promise<any> => {
      if (!types.includes(req.params.type)) {
        return res.status(400).json({ message: `${req.params.type} is not in [${types}]` });
      }

      return res.status(200).json(await dataManager.select(req.params.type));
    })
    .post(async (req: Request, res: Response) => {
      if (!types.includes(req.params.type)) {
        return res.status(400).json({ message: `${req.params.type} is not in [${types}]` });
      }

      return res.status(200).json(await dataManager.select(req.params.type));
    });


  idxRouter.route('/:idx')
    .get((req: Request, res: Response) => {
      if (!types.includes(req.params.type)) {
        return res.status(400).json({ message: `${req.params.type} is not in [${types}]` });
      }
      if (isNaN(parseInt(req.params.idx))) {
        return res.status(400).json({ message: `Invalid param: ${req.params.idx} is not number` });
      }

      return res.status(200).json({ message: `type is ${req.params.type} and idx is ${req.params.idx}` });
    })
    .put((req: Request, res: Response) => {
      if (!types.includes(req.params.type)) {
        return res.status(400).json({ message: `${req.params.type} is not in [${types}]` });
      }
      if (isNaN(parseInt(req.params.idx))) {
        return res.status(400).json({ message: `Invalid param: ${req.params.idx} is not number` });
      }

      return res.status(200).json({ message: `type is ${req.params.type} and idx is ${req.params.idx}` });
    })
    .delete((req: Request, res: Response) => {
      if (!types.includes(req.params.type)) {
        return res.status(400).json({ message: `${req.params.type} is not in [${types}]` });
      }
      if (isNaN(parseInt(req.params.idx))) {
        return res.status(400).json({ message: `Invalid param: ${req.params.idx} is not number` });
      }

      return res.status(200).json({ message: `type is ${req.params.type} and idx is ${req.params.idx}` });
    });

  apiRouter.use('/:type', idxRouter);

  app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'error' });
  });

  app.listen(PORT, (): void => {
    console.log(`Express server listening on port ${PORT} and worker ${process.pid}`);
  });
}

function getValidMessage(type: string, idx?: string) {

  const types = ['account', 'doc', 'server', 'user'];
  if (types.includes(type)) {
    return `${type} is not in [${types}]`;
  }

  if (idx) {
    if (isNaN(parseInt(idx))) {
      return `Invalid param: ${idx} is not number`;
    }

  }

}
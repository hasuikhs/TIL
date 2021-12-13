import express, { Request, Response, Router } from 'express';
import cluster from 'cluster';
import DataManager from './src/service/implements/dataManager';
import accountRouter from './src/router/api/account.router';
import docRouter from './src/router/api/doc.router';
import serverRouter from './src/router/api/server.router';
import userRouter from './src/router/api/user.router';

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

function runServer() {

  const app = express();
  const apiRouter = Router();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', apiRouter);

  apiRouter.use('/account', accountRouter);
  apiRouter.use('/doc', docRouter);
  apiRouter.use('/server', serverRouter);
  apiRouter.use('/user', userRouter);

  app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'error' });
  });

  app.listen(PORT, (): void => {
    console.log(`Express server listening on port ${PORT} and worker ${process.pid}`);
  });
}
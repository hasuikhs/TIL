import express, { Request, Response, Express } from 'express';
import cluster from 'cluster';

import apiRouter from './src/router/apiRouter';

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

function runServer(): Express.Application {

  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', apiRouter);

  app.put('/test', (req, res) => {
    console.log(req.body)
    return res.json(req.body)
  })

  app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'error' });
  });

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT} and worker ${process.pid}`);
  });

  return app;

}
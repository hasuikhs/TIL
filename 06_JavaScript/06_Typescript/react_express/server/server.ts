import express, { Request, Response } from 'express';
import cluster from 'cluster';

const PORT: number = 4000;
const WORKER_SIZE: number = 2;

if (cluster.isMaster) {
    for (let i = 0; i < WORKER_SIZE; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker): void => {
        console.log('Worker', worker.id, ' has exited.');
    });
} else {
    const app = express();

    app.use(express.urlencoded({ extended: true }));

    app.get('/hello', (req: Request, res: Response): void => {
        res.json({ message: 'Hello' });
    });

    app.listen(PORT, (): void => {
        console.log(`Express server listening on port ${PORT} and worker ${process.pid}.`);
    });
}
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const commit = process.env.GIT_HASH || 'Im alive';

  res.send({ latest_commit_sha: commit });
});
export default router;

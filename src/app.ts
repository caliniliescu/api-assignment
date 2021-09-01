import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { createSchema } from './utils/createSchema';
import { initDb } from './utils/initDb';

const app = express();
const port = 4422;

async function startServer() {
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: await createSchema(),
      graphiql: true
    })
  );
  await initDb();
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

startServer();
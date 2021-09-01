import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { sequelize } from './services/db.service';
import { createSchema } from './utils/createSchema';

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
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

startServer();
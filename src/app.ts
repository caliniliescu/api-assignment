import express from 'express';
import { ApolloServer} from 'apollo-server';

import { createSchema } from './utils/createSchema';
import { initDb } from './utils/initDb';
import { RandomCannabisApi } from './services/randomCannabisApi';
import { RandomColorApi } from './services/randomColorApi';

const app = express();
const port = 4422;

async function startServer() {
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        randomCannabisApi: new RandomCannabisApi(),
        randomColorApi: new RandomColorApi()
      };
    }
  });
  await server.listen(port);
  await initDb();
}

startServer();
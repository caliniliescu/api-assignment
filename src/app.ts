import express from 'express';
import { ApolloServer} from 'apollo-server';

import { createSchema } from './utils/createSchema';
import { RandomCannabisApi } from './services/randomCannabisApi';
import { RandomColorApi } from './services/randomColorApi';
import { ContentDb } from './services/contentDb';

const app = express();
const port = 4422;

async function startServer() {
  const schema = await createSchema();
  const contentDb = new ContentDb();
  await contentDb.initDb();
  const server = new ApolloServer({
    schema,
    // dataSources: () => {
    //   return {
    //     contentDb,
    //     randomCannabisApi: new RandomCannabisApi(),
    //     randomColorApi: new RandomColorApi()
    //   };
    // }
  });
  await server.listen(port);
}

startServer();
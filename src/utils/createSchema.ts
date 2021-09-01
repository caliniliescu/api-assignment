import 'reflect-metadata';
import { buildSchema } from "type-graphql";
import Container from "typedi";

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + '/../modules/**/*.ts'],
    container: Container,
    dateScalarMode: 'timestamp'
  });
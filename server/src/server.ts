import express from 'express';
import 'colors';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema';
import { connectDB } from './config/db';

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server running on port ' + port));

import { projects, clients } from '../data';
import { GraphQLList, GraphQLObjectType } from 'graphql/type/definition';
import { GraphQLID, GraphQLString } from 'graphql/type/scalars';
import { GraphQLSchema } from 'graphql/type/schema';

import Project from '../models/Project';
import Client from '../models/Client';

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent: typeof projects[0], args) =>
        Client.findById(parent.clientId),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: () => Client.find(),
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Client.findById(args.id),
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => Project.find(),
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Project.findById(args.id),
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});

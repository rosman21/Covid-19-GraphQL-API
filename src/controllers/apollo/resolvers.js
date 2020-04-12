import { allCases } from "./queries";
export const resolvers = {
  Query: {
    cases: (_, args) => allCases(_, args),
  },
};

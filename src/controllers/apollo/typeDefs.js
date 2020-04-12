import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Detail {
    provinceState: String
    countryRegion: String
    lastUpdate: String
    countString: String
    count: Int
    lat: Float
    long: Float
    active: Int
    combinedKey: String
    incidentRate: Float
  }
  type Results {
    total: Int
    totalString: String
    lastUpdatedDate: String
    detail: [Detail]
  }

  type Totals {
    confirmed: [Results]
    deaths: [Results]
    recovered: [Results]
  }
  type Query {
    cases(country: String): Totals
  }
`;

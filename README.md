# Covid-19 GraphQL API

First I want to credit [https://github.com/mathdroid/covid-19-api](https://github.com/mathdroid/covid-19-api) for his API. Without his hard work, this wouldn't be possible. Go give him a star.

This GraphQL API only returns cases confirmed, deaths, and recovered by country.

Here is how the graphQL schema looks (Using [Apollo Server Express](https://www.npmjs.com/package/apollo-server-express)):

```
  type Detail {
    provinceState: String
    countryRegion: String
    lastUpdate: Int
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
```

Inside of `Totals` you will be able to retrieve confirmed, deaths, and recovered totals. If you want you can pass country to `cases` query as a string to only get data for that country like this:

`cases(country: "Your Country")`

Also returning some of the counts in form of string that is formated so you can use it to display in your client side applications.

**Planning to add a date query or just add a date argument to the cases query.**

Give it a try and let me know what you think!

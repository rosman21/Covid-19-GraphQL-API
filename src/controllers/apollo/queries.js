import moment from "moment";
import {
  getConfirmed,
  getDeaths,
  getRecovered,
  getConfirmedDetailed,
  getDeathsDetailed,
  getRecoveredDetailed,
  getCountry,
  getCountryConfirmed,
  getCountryDeaths,
  getCountryRecovered,
  getLastUpdate,
} from "../../api";
const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
export const allCases = async (_, args) => {
  const confirmed = [];
  const deaths = [];
  const recovered = [];
  if (args.country) {
    const country = args.country;
    const totalCountry = await getCountry(country);
    const updatedDate = totalCountry.lastUpdate;
    const lastUpdatedDate = moment(updatedDate).format("MMM DD YYYY HH:MM A Z");
    const totalCountryConfirmed = await getCountryConfirmed(country);
    const totalCountryDeaths = await getCountryDeaths(country);
    const totalCountryRecovered = await getCountryRecovered(country);
    const revisedTotalCountryConfirmedDetailed = totalCountryConfirmed.map(
      (item) => ({
        ...item,
        count: item.confirmed,
        countString: formatNumber(item.confirmed),
        lastUpdate: moment(item.lastUpdate).format("MMM DD YYYY HH:MM A Z"),
      })
    );
    const revisedTotalCountryDeathsDetailed = totalCountryDeaths.map(
      (item) => ({
        ...item,
        count: item.deaths,
        countString: formatNumber(item.deaths),
        lastUpdate: moment(item.lastUpdate).format("MMM DD YYYY HH:MM A Z"),
      })
    );
    const revisedTotalCountryRecoveredDetailed = totalCountryRecovered.map(
      (item) => ({
        ...item,
        count: item.recovered,
        countString: formatNumber(item.recovered),
        lastUpdate: moment(item.lastUpdate).format("MMM DD YYYY HH:MM A Z"),
      })
    );
    confirmed.push({
      total: formatNumber(totalCountry.confirmed.value),
      lastUpdatedDate,
      detail: revisedTotalCountryConfirmedDetailed,
    });
    deaths.push({
      total: formatNumber(totalCountry.deaths.value),
      lastUpdatedDate,
      detail: revisedTotalCountryDeathsDetailed,
    });
    recovered.push({
      total: formatNumber(totalCountry.recovered.value),
      lastUpdatedDate,
      detail: revisedTotalCountryRecoveredDetailed,
    });
  } else {
    const updatedDate = await getLastUpdate();
    const lastUpdatedDate = moment(updatedDate).format("MMM DD YYYY HH:MM A Z");
    const totalConfirmed = await getConfirmed();
    const totalConfirmedDetailed = await getConfirmedDetailed();
    const totalDeaths = await getDeaths();
    const totalDeathsConfirmed = await getDeathsDetailed();
    const totalRecovered = await getRecovered();
    const totalRecoveredDetailed = await getRecoveredDetailed();
    const revisedTotalConfirmedDetailed = totalConfirmedDetailed.map(
      (item) => ({
        ...item,
        countString: formatNumber(item.confirmed),
      })
    );
    const revisedTotalDeathsDetailed = totalDeathsConfirmed.map((item) => ({
      ...item,
      countString: formatNumber(item.deaths),
    }));
    const revisedTotalRecoveredDetailed = totalRecoveredDetailed.map(
      (item) => ({
        ...item,
        countString: formatNumber(item.recovered),
      })
    );
    confirmed.push({
      total: totalConfirmed,
      totalString: formatNumber(totalConfirmed),
      lastUpdatedDate,
      detail: revisedTotalConfirmedDetailed,
    });
    deaths.push({
      total: totalDeaths,
      totalString: formatNumber(totalDeaths),
      lastUpdatedDate,
      detail: revisedTotalDeathsDetailed,
    });
    recovered.push({
      total: totalRecovered,
      totalString: formatNumber(totalRecovered),
      lastUpdatedDate,
      detail: revisedTotalRecoveredDetailed,
    });
  }
  return {
    confirmed,
    deaths,
    recovered,
  };
};

export const allCasesByDate = async (_, args) => {
  const confirmed = [];
  const deaths = [];
  const recovered = [];
  if (args.date) {
  }
  return {
    confirmed,
    deaths,
    recovered,
  };
};

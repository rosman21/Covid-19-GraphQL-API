import axios from "axios";

export const getLastUpdate = async () => {
  const response = await axios.get("https://covid19.mathdro.id/api");
  return response.data.lastUpdate;
};

export const getConfirmed = async () => {
  const response = await axios.get("https://covid19.mathdro.id/api");
  return response.data.confirmed.value;
};

export const getRecovered = async () => {
  const response = await axios.get("https://covid19.mathdro.id/api");
  return response.data.recovered.value;
};

export const getDeaths = async () => {
  const response = await axios.get("https://covid19.mathdro.id/api");
  return response.data.deaths.value;
};

export const getConfirmedDetailed = async () => {
  const response = await axios.get("https://covid19.mathdro.id/api/confirmed");
  return response.data;
};

export const getRecoveredDetailed = async () => {
  const response = await axios.get("https://covid19.mathdro.id/api/recovered");
  return response.data;
};

export const getDeathsDetailed = async () => {
  const response = await axios.get("https://covid19.mathdro.id/api/deaths");
  return response.data;
};

export const getCountry = async (country) => {
  const response = await axios.get(
    `https://covid19.mathdro.id/api/countries/${country}`
  );
  return response.data;
};

export const getCountryConfirmed = async (country) => {
  const response = await axios.get(
    `https://covid19.mathdro.id/api/countries/${country}/confirmed`
  );
  return response.data;
};

export const getCountryDeaths = async (country) => {
  const response = await axios.get(
    `https://covid19.mathdro.id/api/countries/${country}/deaths`
  );
  return response.data;
};

export const getCountryRecovered = async (country) => {
  const response = await axios.get(
    `https://covid19.mathdro.id/api/countries/${country}/recovered`
  );
  return response.data;
};

export const getTotalByDate = async (date) => {
  const response = await axios.get(
    `https://covid19.mathdro.id/api/daily/${date}`
  );
  console.log(response);
  if (response.data.length < 1) {
    return { message: `No Data for ${date}` };
  } else {
    return response.data;
  }
};

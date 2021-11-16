import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: { Accept: "application/json" },
});

export const getForecastFiveDays = async (city) => {
  const appId = "61f2abd388a399395f5992ffed009f93";
  const units = "metric";
  try {
    const forecastData = await instance.get(
      `/forecast?q=${city}&appid=${appId}&units=${units}`
    );
    return forecastData.data;
  } catch (error) {
    return error;
  }
};
export const getWeather = async (city) => {
  const appId = "61f2abd388a399395f5992ffed009f93";
  const units = "metric";
  try {
    const weatherData = await instance.get(
      `/weather?q=${city}&appid=${appId}&units=${units}`
    );
    return weatherData.data;
  } catch (error) {
    return error;
  }
};

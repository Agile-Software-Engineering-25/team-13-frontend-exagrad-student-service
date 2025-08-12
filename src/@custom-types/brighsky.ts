export interface getCurrentWeatherReturn {
  // The request has more properties, but we only need the temperature for now
  weather: {
    temperature: number;
  };
}

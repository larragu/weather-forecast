interface SearchBoxOption {
  id: string;
  label: string;
}

interface CityResultDTO {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

interface BasicWeatherDTO {
  location: {
    name: string;
    region: string;
  };
  current: {
    temp_c: number; //Temperature
    temp_f: number; //Temperature
    condition: {
      text: string; //Climate Description
      icon: string; //Climate Icon
    };
    wind_mph: number; //Wind Velocity
    wind_kph: number; //Wind Velocity
    humidity: number; //Humidity
  };
}

interface BasicWeather {
  id: string;
  name: string;
  temperature: string;
  weatherDescription: string;
  humidity: string;
  windVelocity: string;
  climateIcon: string;
}

interface DetailedWeather extends BasicWeather {
  pressure: string; //pressure in millibars pressure_mb
  precipitation: string; // precipitation in millimeters precip_mm
  feelsLike: string; //feels like in millimeters feelslike_c
  forecast?: BasicWeather[];
}

const exampeCityResult = {
  country: "United States of America",
  id: 2566581,
  latitude: 41.85,
  longitude: -87.65,
  name: "Chicago",
  region: "Illinois",
  url: "chicago-illinois-united-states-of-america",
};

export type {
  CityResultDTO,
  BasicWeather,
  DetailedWeather,
  BasicWeatherDTO,
  SearchBoxOption,
};

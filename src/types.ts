interface SearchBoxOption {
  value: string;
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

interface CityResult extends Pick<CityResultDTO, "id" | "name"> {}

interface BasicWeatherDTO {
  location: {
    name: string;
    region: string;
  };
  current: {
    temp_c: number; //Temperature in celcius
    condition: {
      text: string; //Climate Description
      icon: string; //Climate Icon
    };
    wind_kph: number; //Wind Velocity in kilometers
    humidity: number; //Humidity
  };
}

interface DetailedWeatherDTO {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    feelslike_c: number;
  };
  forecast: {
    forecastday: [
      {
        date: string;
        day: {
          avgtemp_c: number;
          maxwind_kph: number;
          avghumidity: number;
          condition: {
            icon: string;
          };
        };
      }
    ];
  };
}

interface BasicWeather {
  id: string;
  name: string;
  temperature: string;
  weatherDescription?: string;
  humidity: string;
  windVelocity: string;
  climateIcon: string;
}

interface ForecastWeather extends BasicWeather {
  date: string;
}

interface DetailedWeather extends BasicWeather {
  pressure: string;
  precipitation: string;
  feelsLike: string;
  forecast?: ForecastWeather[];
}

export type {
  CityResultDTO,
  CityResult,
  BasicWeather,
  DetailedWeather,
  BasicWeatherDTO,
  SearchBoxOption,
  DetailedWeatherDTO,
  ForecastWeather,
};

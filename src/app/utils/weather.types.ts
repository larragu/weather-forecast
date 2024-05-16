interface CityResult {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

interface SelectedCityDTO {
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

interface SelectedCity {
  id: string;
  name: string;
  temperature: string;
  weatherDescription: string;
  humidity: string;
  windVelocity: string;
  climateIcon: string;
}

interface BasicWeather extends Omit<SelectedCity, "id"> {}

interface DescriptiveWeather extends SelectedCity {
  forecast?: SelectedCity[];
}

const exampeCityResult = {
  country: "United States of America",
  id: 2566581,
  latitude: 41.85, // use latitude and longitude as id
  longitude: -87.65,
  name: "Chicago",
  region: "Illinois",
  url: "chicago-illinois-united-states-of-america",
};

export type {
  SelectedCity,
  CityResult,
  BasicWeather,
  DescriptiveWeather,
  SelectedCityDTO,
};

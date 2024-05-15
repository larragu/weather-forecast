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

interface DescriptiveWeather extends SelectedCity {}

const exampeCityResult = {
  country: "United States of America",
  id: 2566581,
  latitude: 41.85, // use latitude and longitude as id
  longitude: -87.65,
  name: "Chicago",
  region: "Illinois",
  url: "chicago-illinois-united-states-of-america",
};

export type { SelectedCity, CityResult, BasicWeather, DescriptiveWeather };

//   [
//     {
//       "id": 9009759,
//       "name": "Chicago Fss",
//       "region": "Chicago",
//       "country": "United States of America",
//       "lat": 41.88,
//       "lon": -87.77,
//       "url": "chicago-fss-chicago-united-states-of-america"
//     }
//   ]

//   [
//     {
//       "id": 2566581,
//       "name": "Chicago",
//       "region": "Illinois",
//       "country": "United States of America",
//       "lat": 41.85,
//       "lon": -87.65,
//       "url": "chicago-illinois-united-states-of-america"
//     },
//     {
//       "id": 1884726,
//       "name": "Chichawatni",
//       "region": "Punjab",
//       "country": "Pakistan",
//       "lat": 30.53,
//       "lon": 72.7,
//       "url": "chichawatni-punjab-pakistan"
//     },
//     {
//       "id": 906484,
//       "name": "Chichicastenango",
//       "region": "Quiche",
//       "country": "Guatemala",
//       "lat": 14.93,
//       "lon": -91.12,
//       "url": "chichicastenango-quiche-guatemala"
//     },
//     {
//       "id": 2785690,
//       "name": "Chichester",
//       "region": "West Sussex",
//       "country": "United Kingdom",
//       "lat": 50.83,
//       "lon": -0.77,
//       "url": "chichester-west-sussex-united-kingdom"
//     },
//     {
//       "id": 906466,
//       "name": "Chicacao",
//       "region": "Suchitepequez",
//       "country": "Guatemala",
//       "lat": 14.53,
//       "lon": -91.32,
//       "url": "chicacao-suchitepequez-guatemala"
//     }
//   ]

//   [
//     {
//       "id": 2566581,
//       "name": "Chicago",
//       "region": "Illinois",
//       "country": "United States of America",
//       "lat": 41.85,
//       "lon": -87.65,
//       "url": "chicago-illinois-united-states-of-america"
//     },
//     {
//       "id": 2566582,
//       "name": "Chicago Heights",
//       "region": "Illinois",
//       "country": "United States of America",
//       "lat": 41.51,
//       "lon": -87.64,
//       "url": "chicago-heights-illinois-united-states-of-america"
//     },
//     {
//       "id": 906466,
//       "name": "Chicacao",
//       "region": "Suchitepequez",
//       "country": "Guatemala",
//       "lat": 14.53,
//       "lon": -91.32,
//       "url": "chicacao-suchitepequez-guatemala"
//     },
//     {
//       "id": 1791725,
//       "name": "Chicama",
//       "region": "La Libertad",
//       "country": "Peru",
//       "lat": -7.7,
//       "lon": -79.44,
//       "url": "chicama-la-libertad-peru"
//     },
//     {
//       "id": 3225651,
//       "name": "Chicahuaxtla",
//       "region": "Puebla",
//       "country": "Mexico",
//       "lat": 20.14,
//       "lon": -97.95,
//       "url": "chicahuaxtla-puebla-mexico"
//     }
//   ]

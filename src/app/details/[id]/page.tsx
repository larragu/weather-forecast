import { getDescriptiveWeather } from "@/service/weatherClient";
import { DescriptiveWeatherCard } from "@/app/components/WeatherCard/";

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("DETAILS: ", id);

  const result = await getDescriptiveWeather(id);
  console.log("result: ", result);
  return (
    <div>
      <p>DETAILS: {params.id}</p>
      <div>{result.name}</div>
      <DescriptiveWeatherCard {...result} />
    </div>
  );
};

export default Details;

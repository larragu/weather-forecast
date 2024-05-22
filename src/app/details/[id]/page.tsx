import WeatherDetails from "@/app/components/WeatherDetails";

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const decodedId = decodeURIComponent(id);

  return <WeatherDetails cityId={decodedId} />;
};

export default Details;

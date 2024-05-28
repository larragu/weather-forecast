import { WeatherDetails } from "@/app/components";

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const decodedId = decodeURIComponent(id);

  return <WeatherDetails cityId={decodedId} />;
};

export default Details;

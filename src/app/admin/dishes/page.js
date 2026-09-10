import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";

const getFoodCategory = async () => {
  const response = await server.get("/food-category/get");
  return response.data.foodCategory;
};

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFoodCategory().then((data) => {
      setData(data).catch((err) => {
        console.log(err);
      });
    });
  }, []);
  console.log(test);
  return <div>This is Admin</div>;
}

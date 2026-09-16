import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import SideBar from "../_components/sidebar";
import { useRouter } from "next/router";

const getFoodCategory = async () => {
  const response = await server.get("/food-category/get");
  return response.data.foodCategory;
};

export default function Admin() {
  const [data, setData] = useState([]);
  const router = useRouter()

  useEffect(() => {
    getFoodCategory().then((data) => {
      setData(data).catch((err) => {
        console.log(err);
      });
    });
  }, []);
  console.log(test);
  return (
    <div>
      <SideBar />
      This is Admin
    </div>
  );
}

import Image from "next/image";
import { Login } from "@/app/auth/login/page";

export default function Home() {
  return (
    <div className="w-full flex ">
      <Login />
    </div>
  );
}

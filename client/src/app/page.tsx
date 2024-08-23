import ListVideos from "@/components/ListVideos ";
import Register from "@/components/Register ";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-col justify-center mt-8 p-6">
       <h1 className="text-2xl font-normal text-center">Register Here to access the Videos.</h1>
      <Register />
    </div>
  );
}

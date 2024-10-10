import React from "react";
import UploadImage from "../components/UploadImage";

export default function Home() {
  return (
    <div className="content-center min-h-screen bg-[rgb(206,236,250)]">
      <div className="content-center p-5">
        <h1 className="text-2xl font-black font-sans hover:font-serif hover:cursor-pointer">
          Drag & Drop Images
        </h1>
      </div>
      <UploadImage />
    </div>
  );
}

import React from "react";
import girlposter from "../assets/postergirl.png";
import greenbar from "../assets/greenbar.png";
import lightbar from "../assets/lightbar.png";
import Horizontal from "./horizontalfeed";

const DashboardSearch = () => {
  return (
    <div className="my-7 ml-80 mx-8">
      <input
        type="text"
        className="bg-white w-[800px] h-[40px] rounded-xl placeholder-gray-700 text-sm px-4 outline-none"
        placeholder="Search for music,artist,album..."
      />
      <div className="text-white font-bold text-2xl mt-16">
        <p>Hello,Good Morning👋</p>
        <div className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-2xl mt-6 via-blue-400 h-60 flex justify-end items-end">
          <div className="flex gap-x-20 items-center">
            <div>
              <h1 className="font-bold text-5xl">POP!</h1>
              <p className="font-semibold text-sm">
                By <span className="text-[#B6FF52] font-bold">Im Nayeon</span>
              </p>
            </div>
            <img src={girlposter} alt="" className="h-auto w-auto mr-9" />
          </div>
          <div className="flex flex-coll mb-2 mr-1 gap-x-1">
            <i className="bx bx-left-arrow-alt bg-transparent rounded-lg border-2 py-1 px-2"></i>
            <i className="bx bx-right-arrow-alt bg-transparent rounded-lg border-2 py-1 px-2"></i>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6 gap-x-3">
        <img src={greenbar} alt="" />
        <img src={lightbar} alt="" />
        <img src={lightbar} alt="" />
      </div>
      <div>
        <Horizontal/>
        <Horizontal/>
        <Horizontal/>
      </div>
    </div>
  );
};

export default DashboardSearch;

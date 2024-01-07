import React from "react";
import { CgLivePhoto } from "react-icons/cg";

const LiveVideo = () => {
  return (
    <div className="absolute flex justify-center items-center bottom-2 right-2 bg-[red] pl-1 pr-2 py-1 text-white text-xs rounded-md ">
      <CgLivePhoto className="mr-1" /> Live
    </div>
  );
};

export default LiveVideo;

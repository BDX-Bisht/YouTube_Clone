import React, { useContext, useEffect } from "react";
import LeftNav from "./LeftNav";
import { Context } from "../context/contextApi";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResult, selectCategory } = useContext(Context);

  const titleFunction = () => {
    if (selectCategory === "New") {
      return "YouTube";
    } else {
      return selectCategory + " | YouTube";
    }
  };

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    document.title = titleFunction();
    // eslint-disable-next-line
  }, [selectCategory]);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="bg-black grow w-[clac(100%-240px)] h-full overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading &&
            searchResult &&
            searchResult?.map((item) => {
              if (item?.type !== "video") return false;
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;

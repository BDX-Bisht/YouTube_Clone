import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import VideoLength from "../shared/VideoLength";
import LiveVideo from "../shared/LiveVideo";

const SuggestionVideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex mb-3">
        <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={video?.thumbnails[0]?.url}
            alt={video?.videoId}
          />
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
          {video?.isLiveNow && <LiveVideo />}
        </div>
        <div className="flex flex-col ml-3 w-52 overflow-hidden text-white">
          <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2">
            {video?.title}
          </span>
          <span className="text-[12px] font-semibold mt-2 text-white/[0.6] flex items-center">
            {video?.author?.title}
            {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
              <BsFillCheckCircleFill className="ml-2" />
            )}
          </span>
          <div className="flex text-[12px] font-semibold text-white/[.6] truncate">
            <span>
              {video?.isLiveNow
                ? abbreviateNumber(video?.stats?.viewers, 2) + " watching"
                : abbreviateNumber(video?.stats?.views, 2) + " views"}
            </span>
            <span className="mx-1">{!video?.isLiveNow && "●"}</span>
            <span className="truncate">{video?.publishedTimeText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SuggestionVideoCard;

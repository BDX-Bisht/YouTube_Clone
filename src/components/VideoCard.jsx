import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import VideoLength from "../shared/VideoLength";
import LiveVideo from "../shared/LiveVideo";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-40 rounded-xl overflow-hidden group">
          <img
            className="h-full w-full object-cover group-hover:hidden"
            src={video?.thumbnails[0]?.url}
            alt={video?.videoId}
          />
          {video?.movingThumbnails ? (
            <img
              className="h-full w-full object-cover group-hover:block"
              src={video?.movingThumbnails[0].url}
              alt="Moving_Thumbnail"
            />
          ) : (
            <img
              className="h-full w-full object-cover group-hover:block"
              src={video?.thumbnails[0]?.url}
              alt={video?.videoId}
            />
          )}
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
          {video?.isLiveNow && <LiveVideo />}
        </div>
        <div className="flex text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video?.author?.avatar[0]?.url}
                alt="Author_Photo"
              />
            </div>
          </div>
          <div className="flex flex-col ml-3 xl:w-52 lg:w-52 md:w-full overflow-hidden">
            <span className="text-sm font-semibold line-clamp-2">
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
      </div>
    </Link>
  );
};

export default VideoCard;

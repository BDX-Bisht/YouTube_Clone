import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { AiOutlineLike } from "react-icons/ai";
import { BsEyeFill, BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import { Context } from "../context/contextApi";
import { fetchDataFromApi } from "../utils/api";
import SuggestionVideoCard from "./SuggestionVIdeoCard";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const [relatedVideo, setRelatedVideo] = useState();
  const [date, setDate] = useState("");
  const [description, setDescription] = useState(true);
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
    // eslint-disable-next-line
  }, []);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      const date = new Date(res?.publishedDate);
      dateFunction(date);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents?id=${id}`).then((res) => {
      setRelatedVideo(res);
      setLoading(false);
    });
  };

  const dateFunction = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", {
      month: "long",
    });
    const year = date.getFullYear();
    setDate(day + " " + month + " " + year);
  };

  return (
    <div className="flex flex-row justify-center bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[400px]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex w-10 h-10 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                    alt={video?.author?.channelId}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-base font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="ml-2" />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                <span>{`${abbreviateNumber(
                  video?.stats?.likes,
                  2
                )} Likes`}</span>
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[.15] ml-4">
                <BsEyeFill className="text-xl text-white mr-2" />
                <span>
                  {video?.isLiveNow
                    ? abbreviateNumber(video?.stats?.viewers, 2) + " watching"
                    : abbreviateNumber(video?.stats?.views, 2) + " views"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white/[.15] text-white mt-5 px-6 py-3 rounded-xl">
            <div className="flex flex-row mb-2 font-bold">{date}</div>
            <div className="mb-2">
              {`${
                video?.superTitle?.items?.length > 0
                  ? video?.superTitle?.items[0]
                  : ""
              }`}
            </div>
            <div className={`${description ? "font-semibold" : "hidden"}`}>
              <p>
                {`${video?.description?.slice(0, 250)}.......`}
                <span
                  className="font-bold hover:text-white/30 cursor-pointer"
                  onClick={() => {
                    setDescription(false);
                  }}
                >
                  more
                </span>
              </p>
            </div>
            <div className={`${description ? "hidden" : "font-semibold"}`}>
              <p>{video?.description}</p>
              <p
                className={`${
                  description
                    ? "hidden"
                    : "w-20 mt-3 font-bold hover:text-white/35 cursor-pointer"
                }`}
                onClick={() => {
                  setDescription(true);
                }}
              >
                Show less
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideo?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;

import React, { useContext } from "react";
import { categories } from "../utils/constants";
import LeftNavMenuItems from "./LeftNavMenuItems";
import { Context } from "../context/contextApi";

const LeftNav = () => {
  const { mobileMenu } = useContext(Context);

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative transition-all scrollbar z-[100] md:translate-x-0 ${
        mobileMenu ? "translate-x-[0px]" : "translate-x-[-240px]"
      }`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((items, index) => {
          return (
            <>
              <LeftNavMenuItems key={index} items={items} />
              {items.divider && <hr className="my-5 border-white/[0.2]" />}
            </>
          );
        })}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">
          Made By : Dipanshu Bisht
        </div>
      </div>
    </div>
  );
};

export default LeftNav;

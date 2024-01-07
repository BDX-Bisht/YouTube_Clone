import React, { useContext } from "react";
import { Context } from "../context/contextApi";
import { useNavigate } from "react-router-dom";

const LeftNavMenuItems = ({ items }) => {
  const { selectCategory, setSelectCategory } = useContext(Context);

  const navigate = useNavigate();
  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectCategory(name);
      case "home":
        return setSelectCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={`${
          selectCategory === items.name ? "bg-white/[0.15]" : ""
        } text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15]`}
        onClick={() => {
          clickHandler(items.name, items.type);
          navigate("/");
        }}
        title={items.name === "New" ? "Home" : items.name}
      >
        <span className="text-xl mr-5">{items.icon}</span>
        {items.name === "New" ? "Home" : items.name}
      </div>
    </>
  );
};

export default LeftNavMenuItems;

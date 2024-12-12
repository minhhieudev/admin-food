import React, { useMemo, useState } from "react";
import "./style.css";

function Tab({ list, contentList }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderContent = useMemo(() => {
    return contentList[currentIndex];
  }, [currentIndex, contentList]);

  return (
    <div>
      <div className="tab-container">
        {list.map((item, index) => {
          return (
            <OneItem
              key={index}
              item={item}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              index={index}
            />
          );
        })}
      </div>
      {renderContent}
    </div>
  );
}

export default Tab;

const OneItem = ({ item, currentIndex, setCurrentIndex, index }) => {
  return (
    <div
      onClick={() => {
        if (currentIndex !== index) item.onClick();
      }}
    >
      <div
        className={"tab-one-item"}
        onClick={() => {
          if (currentIndex !== index) setCurrentIndex(index);
        }}
      >
        <div
          className={
            currentIndex === index
              ? "tab-one-item-label-active"
              : "tab-one-item-label-unactive"
          }
        >
          {item.name}
        </div>
        <div
          className={
            currentIndex === index
              ? "tab-one-item-line-active"
              : "tab-one-item-line-unactive"
          }
        />
      </div>
    </div>
  );
};

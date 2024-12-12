import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import ExpandUpIcon from "./icons/ExpandUpIcon";
import ExpandDownIcon from "./icons/ExpandDownIcon";

function OneMenu({ item, currentSubTab, currentSubSubTab }) {
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(true);

  const onClick = (path) => {
    navigate(path);
  };

  const onToggle = () => setIsExpand(!isExpand);

  const isActive = (path) => {
    try {
      const currentPath = path.split("/");

      if (currentPath[2] === "settings") {
        return currentPath[3] === currentSubSubTab;
      } else {
        return currentPath[2] === currentSubTab;
      }
    } catch (error) {
      return false;
    }
  };
  return (
    <div className="one-menu-container">
      <div
        className={
          (item.children || []).map((x) => isActive(x.path)).filter((x) => x)
            .length > 0
            ? "one-menu-content-active"
            : "one-menu-content"
        }
        onClick={onToggle}
      >
        <div className="one-menu-icon">{item.icon}</div>
        <div className="one-menu-label">{item.name}</div>
        <div className="one-menu-icon-expand">
          {isExpand ? (
            <ExpandUpIcon
              color={
                (item.children || [])
                  .map((x) => isActive(x.path))
                  .filter((x) => x).length > 0
                  ? "#FFAA47"
                  : "#72777A"
              }
            />
          ) : (
            <ExpandDownIcon
              color={
                (item.children || [])
                  .map((x) => isActive(x.path))
                  .filter((x) => x).length > 0
                  ? "#FFAA47"
                  : "#72777A"
              }
            />
          )}
        </div>
      </div>
      {isExpand ? (
        <div>
          {(item.children || []).map((subItem, index) => {
            return (
              <div
                key={index}
                className={
                  isActive(subItem.path)
                    ? `one-menu-content-sub-active`
                    : `one-menu-content-sub`
                }
                onClick={() => onClick(subItem.path)}
              >
                <div className={`one-menu-label`}>{subItem.name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default OneMenu;

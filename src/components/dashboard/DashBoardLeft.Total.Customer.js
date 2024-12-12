import React from "react";

export default function DashBoardLeftTotalCustomer({
  item = "",
  icon = "",
  title = "",
  classList = "",
  classListTitle = "",
  classListItem = "",
}) {
  return (
    <div
      className={classList === "" ? "left-total-customer-content" : classList}
    >
      <div className="left-total-top-right">
        <p
          className={
            classListTitle === "" ? "title-left-total" : classListTitle
          }
        >
          {title}
        </p>
        <div>{icon}</div>
      </div>
      <p
        className={
          classListItem === "" ? "left-total-top-right-b" : classListItem
        }
      >
        {item}
      </p>
    </div>
  );
}

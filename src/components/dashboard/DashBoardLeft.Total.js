import React, { useState } from "react";
import "./style.css";
import SVGMore from "./icon/more";
import { formatCurrency } from "../../app/function";
import DashBoardLeftModal from "../../pages/dashboard/DashBoard.Left.Modal";
export default function DashBoardLeftTotal({
  item = [],
  icon = "",
  title = "",
  showDetail = false,
  handleCheckTime = () => {},
  isLoading = false,
}) {
  const [current, setCurrent] = useState(0);
  const time = [{ name: "24H" }, { name: "7 ngày" }, { name: "12 tháng" }];
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => {
    setIsShow(!isShow);
  };
  return (
    <div className="dashboard-left-total">
      <DashBoardLeftModal
        item={item?.order}
        isShow={isShow}
        setIsShow={setIsShow}
      />
      <div className="left-total-top">
        <p className="title-left-total">{title}</p>
        {icon}
      </div>
      <div
        style={{
          height: 70,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {isLoading === true ? (
          <div
            style={{
              height: 70,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <div className="loader2"></div>
          </div>
        ) : (
          <p className="left-total-middle">
            {item?.order
              ? item.order.value
              : item?.money
              ? formatCurrency(item.money.value)
              : item?.revenue
              ? formatCurrency(item.revenue.value)
              : ""}
          </p>
        )}
      </div>

      <div
        className={
          showDetail === true ? "left-total-bottom-detail" : "left-total-bottom"
        }
      >
        {showDetail === true && (
          <div>
            <div className="left-total-bottom-details">
              <SVGMore />
              <p
                className="title-more"
                onClick={(e) => {
                  handleShow();
                }}
              >
                Xem chi tiết
              </p>
            </div>
          </div>
        )}
        <div className="left-total-time">
          {time?.map((itemTime, index) => {
            console.log({ item });
            return (
              <div
                key={index}
                onClick={() => {
                  if (isLoading === false) {
                    setCurrent(index);
                    handleCheckTime(item.dataType, index);
                  }
                }}
              >
                <p
                  className={
                    current === index
                      ? "left-total-time-current"
                      : "left-total-time"
                  }
                >
                  {itemTime.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

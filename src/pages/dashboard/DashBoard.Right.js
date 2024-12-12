import React, { useState } from "react";
import Tab from "../../components/tab/Tab";
import DashBoardRightList from "./DashBoard.Right.List.component";

export default function DashBoardRight() {
  const [flagTab, setFlagTab] = useState("Dịch vụ");
  const tabList = [
    {
      name: "Dịch vụ",
      onClick: () => {
        setFlagTab("Dịch vụ");
      },
    },
    {
      name: "KH đặt đơn nhiều nhất",
      onClick: () => {
        setFlagTab("KH đặt đơn nhiều nhất");
      },
    },
    {
      name: "KH nạp nhiều nhất",
      onClick: () => {
        setFlagTab("KH nạp nhiều nhất");
      },
    },
  ];
  const contentList = [
    <DashBoardRightList flagTab={flagTab} />,
    <DashBoardRightList flagTab={flagTab} />,
    <DashBoardRightList flagTab={flagTab} />,
  ];
  return (
    <div className="dashboard-right">
      <Tab list={tabList} contentList={contentList} />
    </div>
  );
}

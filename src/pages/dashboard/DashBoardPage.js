import React, { useEffect } from "react";
import MST from "../../components";
import "./style.css";
import DashBoardLeft from "./DashBoard.Left";
import DashBoardRight from "./DashBoard.Right";
function DashBoardPage() {
  return (
    <MST.Container title="Bảng thống kê">
      <div className="dashboard-content">
        <DashBoardLeft />
        <DashBoardRight />
      </div>
    </MST.Container>
  );
}
export default DashBoardPage;

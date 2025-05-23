import React, { useEffect } from "react";
import MST from "../../components";
import "./style.css";
import DashBoardLeft from "./DashBoard.Left";
import DashBoardRight from "./DashBoard.Right";
function DashBoardPage() {
  return (
    <MST.Container title="Bảng thống kê">
      <div className="dashboard-content" style={{ 
        display: "flex", 
        width: "100%",
        gap: "20px"
      }}>
        <div style={{ width: "40%" }}>
          <DashBoardLeft />
        </div>
        <div style={{ width: "60%" }}>
          <DashBoardRight />
        </div>
      </div>
    </MST.Container>
  );
}
export default DashBoardPage;

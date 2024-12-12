import React, { useState } from "react";
import Select from "../../components/base/select/Select";
function DashBoardRightSelect(prop) {
  const { currentDashboardSelect, setCurrentDashboardSelect } = prop;
  const dashboardList = [
    {
      name: "24H",
      key: 0,
    },
    {
      name: "7 Ngày",
      key: 1,
    },
    {
      name: "12 Tháng",
      key: 2,
    },
  ];
  return (
    <Select.Simple
      canSearch={false}
      placeholder="Chọn giờ"
      selected={currentDashboardSelect || []}
      setSelected={setCurrentDashboardSelect}
      width={prop?.width}
      data={dashboardList?.map((x) => {
        return {
          name: `${x.name}`,
          value: x.key,
        };
      })}
    />
  );
}

export default DashBoardRightSelect;

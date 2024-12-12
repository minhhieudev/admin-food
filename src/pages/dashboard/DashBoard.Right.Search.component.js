import React from "react";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";

function DashBoardRightSearch({ setSearch }) {
  return (
    <div className="search-dashboard-container">
      <MST.Input
        // value={keySearch}
        onChange={(e) => {
          const timeOutIdPlatform = setTimeout(
            () => setSearch(e.target.value),
            700
          );
          return () => clearTimeout(timeOutIdPlatform);
        }}
        placeholder={"Nhập tên dịch vụ"}
        right={
          <div className="service-search-btn">
            <SearchIcon />
          </div>
        }
      />
    </div>
  );
}

export default DashBoardRightSearch;

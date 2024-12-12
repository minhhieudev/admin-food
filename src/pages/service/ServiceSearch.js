import React from "react";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  ServiceActions,
  ServiceSelectors,
} from "../../app/services/service/service.slice";

function ServiceSearch() {
  const dispatch = useDispatch();

  const keySearch = useSelector(ServiceSelectors.keySearch);

  return (
    <div className="search-service-container">
      <MST.Input
        value={keySearch}
        onChange={(e) => {
          dispatch(ServiceActions.setKeySearch(e.target.value));
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

export default ServiceSearch;

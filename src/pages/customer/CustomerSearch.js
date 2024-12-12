import React from "react";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerActions,
  CustomerSelectors,
} from "../../app/services/customer/customer.slice";

function CustomerSearch() {
  const searchUsername = useSelector(CustomerSelectors.searchUsername);
  const dispatch = useDispatch();

  return (
    <div className="search-service-container">
      <MST.Input
        value={searchUsername}
        onChange={(e) =>
          dispatch(CustomerActions.setSearchUsername(e.target.value))
        }
        placeholder={"Nhập từ khoá tìm kiếm"}
        right={
          <div className="service-search-btn">
            <SearchIcon />
          </div>
        }
      />
    </div>
  );
}

export default CustomerSearch;

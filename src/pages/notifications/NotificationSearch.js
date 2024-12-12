import React from "react";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationActions,
  NotificationSelectors,
} from "../../app/services/notification/notification.slice";

function NotificationSearch() {
  const dispatch = useDispatch();

  const keySearch = useSelector(NotificationSelectors.keySearch);

  return (
    <div className="search-notification-container">
      <MST.Input
        value={keySearch}
        onChange={(e) => {
          // dispatch(NotificationActions.setKeySearch(e.target.value));
        }}
        placeholder={"Nhập tên thông báo"}
        right={
          <div className="notification-search-btn">
            <SearchIcon />
          </div>
        }
      />
    </div>
  );
}

export default NotificationSearch;

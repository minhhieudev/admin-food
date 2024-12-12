import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TopicActions,
  TopicSelectors,
} from "../../app/services/topic/topic.slice";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import "./style.css";

function TopicSearch() {
  const search = useSelector(TopicSelectors.search);
  const dispatch = useDispatch();

  return (
    <div className="search-topic-container">
      <div className="search-topic-input">
        <MST.Input
          value={search}
          onChange={(e) => dispatch(TopicActions.setSearch(e.target.value))}
          placeholder={"Nhập từ khoá tìm kiếm"}
          right={
            <div className="service-search-btn">
              <SearchIcon />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default TopicSearch;

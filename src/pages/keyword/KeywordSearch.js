import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KeywordActions,
  KeywordSelectors,
} from "../../app/services/keyword/keyword.slice";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import "./style.css";

function KeywordSearch() {
  const search = useSelector(KeywordSelectors.search);
  const dispatch = useDispatch();

  return (
    <div className="search-keyword-container">
      <div className="search-keyword-input">
        <MST.Input
          value={search}
          onChange={(e) => dispatch(KeywordActions.setSearch(e.target.value))}
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

export default KeywordSearch;

import React from "react";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import "./style.css"
import {
  SubdescriptionMealActions,
  subdescriptionMealSelectors,
} from "../../app/services/subdescription-meal/subdescriptionMeal.slice";

function SubdescriptionMealSearch() {
  const dispatch = useDispatch();

  const keySearch = useSelector(subdescriptionMealSelectors.keySearch);

  return (
    <div className="search-meal-container">
      <MST.Input
        value={keySearch}
        onChange={(e) => {
          dispatch(SubdescriptionMealActions.setKeySearch(e.target.value));
        }}
        placeholder={"Nhập tên gói bữa ăn "}
        right={
          <div className="meal-search-btn">
            <SearchIcon />
          </div>
        }
      />
    </div>
  );
}

export default SubdescriptionMealSearch;

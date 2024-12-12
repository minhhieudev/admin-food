import React from "react";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  MealActions,
  MealSelectors,
} from "../../app/services/meal/meal.slice"

function MealSearch() {
  const dispatch = useDispatch();

  // const keySearch = useSelector(MealSelectors.keySearch);
  const keySearch = '';

  return (
    <div className="search-service-container">
      <MST.Input
        value={keySearch}
        onChange={(e) => {
          dispatch(MealActions.setKeySearch(e.target.value));
        }}
        placeholder={"Nhập tên bữa ăn"}
        right={
          <div className="service-search-btn">
            <SearchIcon />
          </div>
        }
      />
    </div>
  );
}

export default MealSearch;

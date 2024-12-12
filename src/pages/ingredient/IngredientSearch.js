import React from "react";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import "./style.css"
import {
  IngredientActions,
  IngredientSelectors,
} from "../../app/services/ingredient/ingredient.slice";

function IngredientSearch() {
  const dispatch = useDispatch();

  const keySearch = useSelector(IngredientSelectors.keySearch);

  return (
    <div className="search-ingredient-container">
      <MST.Input
        value={keySearch}
        onChange={(e) => {
          dispatch(IngredientActions.setKeySearch(e.target.value));
        }}
        placeholder={"Nhập tên thành phần "}
        right={
          <div className="ingredient-search-btn">
            <SearchIcon />
          </div>
        }
      />
    </div>
  );
}

export default IngredientSearch;

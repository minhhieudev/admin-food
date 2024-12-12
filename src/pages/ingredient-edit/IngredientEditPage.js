import React, { useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import IngredientCreatePage from "../ingredient-create/IngredientCreatePage";
import { useDispatch } from "react-redux";
import { IngredientActions } from "../../app/services/ingredient/ingredient.slice";

function IngredientEditPage() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getDetail();
    }
    return () => {
      dispatch(IngredientActions.setIngredientDetail(undefined));
    };
  }, [params]);

  const getDetail = () => {
    dispatch(
      IngredientActions.getIngredientById({
        id: params.id,
      })
    );
  };

  return <IngredientCreatePage />;
}

export default IngredientEditPage;

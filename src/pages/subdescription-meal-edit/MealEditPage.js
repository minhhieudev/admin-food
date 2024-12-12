import React, { useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import MealCreatePage from "../subdescription-meal-create/MealCreatePage";
import { useDispatch } from "react-redux";
import { SubdescriptionMealActions } from "../../app/services/subdescription-meal/subdescriptionMeal.slice";

function MealEditPage() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getDetail();
    }
    return () => {
      dispatch(SubdescriptionMealActions.setSubdescriptionMealDetail(undefined));
    };
  }, [params]);

  const getDetail = () => {
    dispatch(
      SubdescriptionMealActions.getSubdescriptionMealById({
        id: params.id,
      })
    );
  };

  return <MealCreatePage />;
}

export default MealEditPage;

import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubdescriptionMealActions, subdescriptionMealSelectors } from "../../app/services/subdescription-meal/subdescriptionMeal.slice";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import SubdescriptionMealSearch from "./MealSearch";
import EyeIcon from "./icons/EyeIcon";
import ServiceDeleteModal from "./Meal.Options";


function SubdescriptionMealList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mealList = useSelector(subdescriptionMealSelectors.mealList);
  const pagination = useSelector(subdescriptionMealSelectors.pagination) ;

  useEffect(() => {
    if (pagination.page !== undefined && pagination.pageSize !== undefined) {
      dispatch(SubdescriptionMealActions.getSubdescriptionMeals({ page: pagination.page, pageSize: pagination.pageSize }));
    }
  }, [pagination.page, pagination.pageSize, dispatch]);

  useEffect(() => {
    getSubdescriptionMealList();

    return () => {
      dispatch(SubdescriptionMealActions.resetState());
    };
  }, [dispatch]);

  const getSubdescriptionMealList = () => {
    if (pagination.page !== undefined && pagination.pageSize !== undefined) {
      dispatch(SubdescriptionMealActions.getSubdescriptionMeals({ page: pagination.page, pageSize: pagination.pageSize }));
    }
  };

  const thead = [
    {
      name: "STT",
      style: { width: 20 },
      className: "",
    },
    {
      name: "Tên gói bữa ăn",
      style: { width: 120 },
      className: "",
    },
    {
      name: "Tổng thời gian",
      style: {
        textAlign: "center",
      },
    },
    {
      name: "Số bữa ăn",
      style: {
       
      },
    },
    {
      name: "Tổng số lượt",
      style: { },
    },
    {
      name: "Thao tác",
      style: {
        width: 100,
      },
    },
  ];

  const genRenderList = useCallback(() => {
    return (mealList || []).map((meal, index) => {
      return [
        { value: index + 1 },
        { value: meal.name },
        { value: meal.totalDate  },
        { value: meal.mealsPerDay   },
        { value: meal.totalSub   },
        {
          value: <ServiceDeleteModal id={meal._id} />,
        },
      ];
    });
  }, [mealList, navigate]);


  const onChangePage = (page) => {
    if (pagination.page !== undefined) {
      dispatch(
        SubdescriptionMealActions.setPagination({
          ...pagination,
          page,
        })
      );
    }
  };

  return (
    <div >
      <SubdescriptionMealSearch />
      <MST.Table head={thead} body={genRenderList()} />
      {pagination.page !== undefined && (
        <div className="meal-pagination">
          <Pagination
            onChange={onChangePage}
            page={pagination.page}
            pageSize={pagination.pageSize}
            totalPage={pagination.totalPage}
            total={pagination.total}
          />
        </div>
      )}
    </div>
  );
}

export default SubdescriptionMealList;

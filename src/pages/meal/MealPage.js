import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import MST from "../../components";
import Tab from "../../components/tab/Tab";
import PlugIcon from "../../images/icons/PlugIcon";
import MealList from "./MealList";
import "./style.css";
import { useDispatch } from "react-redux";
import {
  MealActions,
  MealSelectors,
} from "../../app/services/meal/meal.slice"

function MealPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(MealActions.setStatus(""));
    };
  }, []);

  const tabList = [
    {
      name: "Tất cả",
      onClick: () => {
        dispatch(MealActions.setStatus(""));
      },
    },
    {
      name: "Chờ xử lý",
      onClick: () => {
        dispatch(MealActions.setStatus("pending"));
      },
    },
    {
      name: "Hoàn thành",
      onClick: () => {
        dispatch(MealActions.setStatus("done"));
      },
    },
    {
      name: "Đã huỷ",
      onClick: () => {
        dispatch(MealActions.setStatus("cancelled"));
      },
    },
    {
      name: "Đang xử lý",
      onClick: () => {
        dispatch(MealActions.setStatus("inprogress"));
      },
    },
  ];
  const contentList = [
    <MealList />,
    <MealList />,
    <MealList />,
    <MealList />,
    <MealList />,
  ];
  const onCreate = () => navigate("/services/services/create");

  return (
    <MST.Container
      title="Danh sách bữa ăn"
    >
      <div className="service-content">
        <Tab list={tabList} contentList={contentList} />
      </div>
    </MST.Container>
  );
}

export default MealPage;

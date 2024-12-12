import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import CONST from "../../app/services/const";
import { setConfigAxios } from "../../app/fetch";
import { AppActions, AppSelectors } from "../../app/services/app/app.slice";
import InfoComponent from "../../components/InfoComponent";
import HomeContainer from "./HomeContainer";
import { LoginActions } from "../../app/services/login/login.slice";
function HomePage() {
  const isInit = useSelector(AppSelectors.isInit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInit) {
      if (!isInit && window.location.pathname !== "/login") {
        setTimeout(() => {
          dispatch(AppActions.setInit(true));
        }, 1000);
      }
    } else {
      const accessToken = localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);
      if (!accessToken) {
        navigate("/login");
      } else {
        setConfigAxios(accessToken);
        const userInfo = localStorage.getItem(CONST.STORAGE.USER_INFO) || "{}";
        if (userInfo !== "undefined")
          dispatch(LoginActions.setUserInfo(JSON.parse(userInfo || {})));
        if (window.location.pathname === "/") {
          navigate("/services/meals");
        }
      }
    }
  }, [isInit, dispatch, navigate]);

  return <div>{isInit ? <HomeContainer /> : <InfoComponent />}</div>;
}

export default HomePage;

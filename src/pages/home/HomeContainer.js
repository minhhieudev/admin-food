import React from "react";
import { Outlet } from "react-router-dom";
import MainMenu from "../../components/menu/MainMenu";
import "./style.css";
import Header from "../../components/header/Header";
function HomeContainer() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="home-left-container">
          <MainMenu />
        </div>
        <div className="home-right-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;

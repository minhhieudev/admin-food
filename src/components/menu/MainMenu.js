import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import OneMenu from "./OneMenu";
import CustomersIcon from "./icons/CustomersIcon";
import SVGDashBoard from "./icons/DashBoardIcon";
import KeywordIcon from "./icons/KeywordIcon";
import NotificationIcon from "./icons/NotificationIcon";
import OrdersIcon from "./icons/OrdersIcon";
import ServicesIcon from "./icons/ServicesIcon";
import SettingsIcon from "./icons/SettingsIcon";
import "./style.css";

const menuList = {
  services: [
    {
      name: "Thống kê",
      icon: <SVGDashBoard />,
      children: [
        {
          name: "Bảng thống kê",
          path: "/services/dashboard",
        },
      ],
    },
    {
      name: "Quản lý bếp",
      icon: <SettingsIcon />,
      children: [
        {
          name: "Quản lý thành phần",
          path: "/services/ingredients",
        },
        {
          name: "Quản lý gói bữa ăn",
          path: "/services/sub-meals",
        },
      ],
    },
    {
      name: "Dịch vụ",
      icon: <ServicesIcon />,
      children: [
        {
          name: "Danh sách dịch vụ",
          path: "/services/services",
        },
      ],
    },
    {
      name: "Đơn hàng",
      icon: <OrdersIcon />,
      children: [
        {
          name: "Danh sách đơn hàng",
          path: "/services/orders",
        },
        {
          name: "Đơn hàng chờ giao",
          path: "/services/meals",
        },
      ],
    },
    {
      name: "Khách hàng",
      icon: <CustomersIcon />,
      children: [
        {
          name: "Danh sách khách hàng",
          path: "/services/customers",
        },
      ],
    },
    {
      name: "Thông báo",
      icon: <NotificationIcon />,
      children: [
        {
          name: "Danh sách thông báo",
          path: "/services/notifications",
        },
      ],
    },
    {
      name: "Cài đặt",
      icon: <SettingsIcon />,
      children: [
        {
          name: "Thanh toán",
          path: "/services/settings/payment",
        },
        {
          name: "Cài đặt chung",
          path: "/services/settings/general",
        },
        // {
        //   name: "Đối tác",
        //   path: "/services/settings/partner",
        // },
      ],
    },
  ],
  // keyword: [
  //   {
  //     name: "Thống kê",
  //     icon: <SVGDashBoard />,
  //     children: [
  //       {
  //         name: "Bảng thống kê",
  //         path: "/keyword/dashboard",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Từ khóa",
  //     icon: <KeywordIcon />,
  //     children: [
  //       {
  //         name: "Quản lý từ khóa",
  //         path: "/keyword/keywords",
  //       },
  //       {
  //         name: "Quản lý chủ đề",
  //         path: "/keyword/topics",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Cài đặt",
  //     icon: <SettingsIcon />,
  //     children: [
  //       {
  //         name: "Thanh toán",
  //         path: "/keyword/settings/payment",
  //       },
  //       {
  //         name: "Cài đặt chung",
  //         path: "/keyword/settings/general",
  //       },
  //       {
  //         name: "Đối tác",
  //         path: "/keyword/settings/partner",
  //       },
  //     ],
  //   },
  // ],
};

function MainMenu() {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  const [currentTab, setCurrentTab] = useState("services");
  const [currentSubTab, setCurrentSubTab] = useState("services");
  const [currentSubSubTab, setCurrentSubSubTab] = useState("services");

  useEffect(() => {
    const tempParams = pathname.split("/").filter((x) => !_.isEmpty(x));
    if (tempParams[0]) {
      setCurrentTab(tempParams[0]);
    }

    if (tempParams[1]) {
      setCurrentSubTab(tempParams[1]);
    }
    if (tempParams[2]) {
      setCurrentSubSubTab(tempParams[2]);
    } else {
      setCurrentSubSubTab("");
    }
  }, [pathname]);

  return (
    <div className="menu-container">
      <div className="menu-content">
        <div className="menu-list-container">
          {/* <div className="menu-btn-conatiner">
            <div
              role="button"
              className={`menu-btn${
                currentTab === "services" ? "-active" : ""
              }`}
              onClick={() => {
                navigate("/services/dashboard");
              }}
            >
              <div className="menu-btn-label">Dịch vụ</div>
            </div>
            <div
              role="button"
              className={`menu-btn${currentTab === "keyword" ? "-active" : ""}`}
              onClick={() => {
                navigate("/keyword/dashboard");
              }}
            >
              <div className="menu-btn-label">Keyword Tool</div>
            </div>
          </div> */}
          {(menuList[`${currentTab}`] || []).length > 0 ? (
            <div className="menu-list-item-container">
              {(menuList[`${currentTab}`] || []).map((oneItem) => {
                return (
                  <OneMenu
                    currentSubTab={currentSubTab}
                    currentSubSubTab={currentSubSubTab}
                    key={oneItem.name}
                    item={oneItem}
                  />
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainMenu;

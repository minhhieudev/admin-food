import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import MST from "../../components";
import Tab from "../../components/tab/Tab";
import PlugIcon from "../../images/icons/PlugIcon";
import ServiceList from "./ServiceList";
import "./style.css";
import { useDispatch } from "react-redux";
import { ServiceActions } from "../../app/services/service/service.slice";

function ServicePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(ServiceActions.setScriptGroupCode(""));
    };
  }, []);

  const tabList = [
    // {
    //   name: "Tất cả",
    //   onClick: () => {
    //     dispatch(ServiceActions.setScriptGroupCode(""));
    //   },
    // },
    // {
    //   name: "Facebook",
    //   onClick: () => {
    //     dispatch(ServiceActions.setScriptGroupCode("facebook"));
    //   },
    // },
    // {
    //   name: "Youtube",
    //   onClick: () => {
    //     dispatch(ServiceActions.setScriptGroupCode("youtube"));
    //   },
    // },
    // {
    //   name: "Google",
    //   onClick: () => {
    //     dispatch(ServiceActions.setScriptGroupCode("google"));
    //   },
    // },
    // {
    //   name: "Tiktok",
    //   onClick: () => {
    //     dispatch(ServiceActions.setScriptGroupCode("tiktok"));
    //   },
    // },
  ];
  const contentList = [
    <ServiceList />,
    <ServiceList />,
    <ServiceList />,
    <ServiceList />,
    <ServiceList />,
  ];
  const onCreate = () => navigate("/services/services/create");

  return (
    <MST.Container
      title="Danh sách dịch vụ"
      right={
        <div>
          <MST.Button
            onClick={onCreate}
            icon={
              <div className="service-icon-create">
                <PlugIcon />
              </div>
            }
          >
            Tạo mới dịch vụ
          </MST.Button>
        </div>
      }
    >
      <div className="service-content">
        <Tab list={tabList} contentList={contentList} />
      </div>
    </MST.Container>
  );
}

export default ServicePage;

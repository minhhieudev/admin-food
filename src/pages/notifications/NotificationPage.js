import React from "react";
import { useNavigate } from "react-router";
import MST from "../../components";
import PlugIcon from "../../images/icons/PlugIcon";
import NotificationList from "./NotificationList";
import "./style.css";

function NotificationPage() {
  const navigate = useNavigate();

  const onCreate = () => navigate("/services/notifications/create");

  return (
    <MST.Container
      title="Danh sách thông báo"
      right={
        <div>
          <MST.Button
            onClick={onCreate}
            icon={
              <div className="notification-icon-create">
                <PlugIcon />
              </div>
            }
          >
            Tạo mới thông báo
          </MST.Button>
        </div>
      }
    >
      <div className="notification-content">
        <NotificationList />
      </div>
    </MST.Container>
  );
}

export default NotificationPage;

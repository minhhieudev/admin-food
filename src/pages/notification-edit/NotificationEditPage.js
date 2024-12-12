import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotificationActions } from "../../app/services/notification/notification.slice";
import NotificationCreatePage from "../notification-create/NotificationCreatePage";
function NotificationEditPage() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getDetail();
    }
    return () => {
      dispatch(NotificationActions.setNotificationDetail(undefined));
    };
  }, [params]);

  const getDetail = () => {
    dispatch(
      NotificationActions.getNotificationById({
        id: params.id,
      })
    );
  };

  return <NotificationCreatePage />;
}

export default NotificationEditPage;

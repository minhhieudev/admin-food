import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationActions,
  NotificationSelectors,
} from "../../app/services/notification/notification.slice";
import Pagination from "../../components/base/pagination/Pagination";
import Table from "../../components/base/table/Table";
import NotificationDeleteModal from "./Notification.Options";
import NotificationSearch from "./NotificationSearch";
import "./style.css";

function NotificationList() {
  const dispatch = useDispatch();
  const notificationList = useSelector(NotificationSelectors.notificationList);
  const pagination = useSelector(NotificationSelectors.pagination);

  useEffect(() => {
    dispatch(NotificationActions.getNotifications());
  }, [pagination.page]);

  const thead = [
    {
      name: "STT",
      style: { width: 20 },
      className: "",
    },
    {
      style: {
        textAlign: "left",
      },
      name: "Nội dung",
    },
    {
      name: "Ngày tạo",
      style: { width: 150 },
    },
    {
      name: "thao tác",
      style: { width: 100 },
    },
  ];

  const genDataTable = () => {
    try {
      return notificationList.map((x, index) => {
        return [
          { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
          {
            style: {
              textAlign: "left",
            },
            value: <div dangerouslySetInnerHTML={{ __html: x.content }} />,
          },
          {
            value: `${moment(x.createdAt).format("HH:mm DD/MM/YYYY")}`,
          },
          {
            value: <NotificationDeleteModal id={x._id} />,
          },
        ];
      });
    } catch (error) {
      return [];
    }
  };

  return (
    <div>
      <NotificationSearch />
      <Table head={thead} body={genDataTable()} />
      <div className="notification-pagination">
        <Pagination
          {...pagination}
          onChange={(page) => {
            dispatch(
              NotificationActions.setPagination({
                ...pagination,
                page,
              })
            );
          }}
        />
      </div>
    </div>
  );
}

export default NotificationList;

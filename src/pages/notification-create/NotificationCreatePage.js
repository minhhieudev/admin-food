import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  NotificationActions,
  NotificationSelectors,
} from "../../app/services/notification/notification.slice";
import MST from "../../components";
import Editor from "../../components/base/editor/Editor";
import "./style.css";

function NotificationCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notificationDetail = useSelector(
    NotificationSelectors.notificationDetail
  );

  useEffect(() => {
    if (notificationDetail?.content) {
      setContent(notificationDetail?.content);
    }
  }, [notificationDetail]);

  const [content, setContent] = useState("");

  const validate = (callback) => {
    callback();
  };

  const onCreate = () => {
    dispatch(
      NotificationActions.createNotification({
        onSuccess: (id) => {
          toast.success("Tạo mới thông báo thành công");
          navigate(`/services/notifications/edit/${id}`);
        },
        body: {
          content,
        },
      })
    );
  };

  const onEdit = () => {
    dispatch(
      NotificationActions.edit({
        onSuccess: () => {
          toast.success("Cập nhật thông báo thành công");
        },
        id: notificationDetail._id,
        body: {
          content,
        },
      })
    );
  };

  return (
    <MST.Container
      title={notificationDetail ? "Cập nhật thông báo" : "Thêm thông báo"}
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/services/notifications")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button
            onClick={
              notificationDetail
                ? () => validate(onEdit)
                : () => validate(onCreate)
            }
          >
            Lưu lại
          </MST.Button>
        </div>
      }
    >
      <div className="notification-create-content">
        <div className="notification-create-one-field">
          <div className="notification-create-one-field-name">
            Nội dung thông báo
          </div>
          <div>
            <Editor
              placeholder="Nhập nội dung thông báo"
              onBlur={(eventInfo, editor) => {
                const data = editor?.getData();
                const valueTrim = data?.trim();
                if (isEmpty(data)) {
                  editor.setData("");
                  return;
                }
                setContent(valueTrim);
              }}
              data={content || ""}
            />
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default NotificationCreatePage;

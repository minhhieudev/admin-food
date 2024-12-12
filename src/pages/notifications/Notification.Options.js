import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MST from "../../components";
import Modal from "../../components/base/modal/Modal";
import { NotificationActions } from "../../app/services/notification/notification.slice";
import DeleteIcon from "../../components/table-create-service/icons/DeleteIcon";
import EditIcon from "../../components/table-create-service/icons/EditIcon";

function NotificationDeleteModal({ id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);

  const onHide = () => {
    setIsShow(false);
  };

  const onShow = () => {
    setIsShow(true);
  };

  const onDelete = () => {
    dispatch(
      NotificationActions.delete({
        id,
        onSuccess: () => {
          dispatch(NotificationActions.getNotifications());
          onHide();
        },
      })
    );
  };

  const contentModal = useMemo(() => {
    return (
      <div>
        <div className="modal-header">Xoá thông báo</div>
        <div className="modal-body">Bạn có muốn xoá thông báo này?</div>
        <div className="modal-footer">
          <div className="d-flex jc-between">
            <div />
            <div className="d-flex">
              <MST.Button type="outlined" className="mr-8" onClick={onHide}>
                Huỷ
              </MST.Button>
              <MST.Button onClick={onDelete}>Xác nhận</MST.Button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [id]);

  return (
    <div className="d-flex jc-center">
      <button
        className="btn-edit mr-8"
        onClick={() => navigate(`/services/notifications/edit/${id}`)}
      >
        <EditIcon />
      </button>
      <button className="btn-delete" onClick={onShow}>
        <DeleteIcon />
      </button>
      <Modal content={contentModal} isShow={isShow} onHide={onHide} />
    </div>
  );
}

export default NotificationDeleteModal;

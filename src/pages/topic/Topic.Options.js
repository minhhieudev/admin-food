import React, { useMemo, useState } from "react";
import Modal from "../../components/base/modal/Modal";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { TopicActions } from "../../app/services/topic/topic.slice";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../images/icons/EditIcon";
import DeleteIcon from "../../components/table-create-service/icons/DeleteIcon";

function TopicOptionsModal({ id }) {
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
      TopicActions.delete({
        id,
        onSuccess: () => {
          dispatch(TopicActions.getTopics());
          onHide();
        },
      })
    );
  };

  const contentModal = useMemo(() => {
    return (
      <div>
        <div className="modal-header">Xoá chủ đề</div>
        <div className="modal-body">Bạn có muốn xoá chủ đề này?</div>
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
        onClick={() => navigate(`/keyword/topics/edit/${id}`)}
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

export default TopicOptionsModal;

import React, { useMemo, useState } from "react";
import Modal from "../../components/base/modal/Modal";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { KeywordActions } from "../../app/services/keyword/keyword.slice";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../images/icons/EditIcon";
import DeleteIcon from "../../components/table-create-service/icons/DeleteIcon";

function KeywordOptionsModal({ id }) {
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
      KeywordActions.delete({
        id,
        onSuccess: () => {
          dispatch(KeywordActions.getKeywords());
          onHide();
        },
      })
    );
  };

  const contentModal = useMemo(() => {
    return (
      <div>
        <div className="modal-header">Xoá từ khoá</div>
        <div className="modal-body">Bạn có muốn xoá từ khoá này?</div>
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
        onClick={() => navigate(`/keyword/keywords/edit/${id}`)}
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

export default KeywordOptionsModal;

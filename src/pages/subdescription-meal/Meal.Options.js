import React, { useMemo, useState } from "react";
import Modal from "../../components/base/modal/Modal";
import EditIcon from "../../components/table-create-service/icons/EditIcon";
import DeleteIcon from "../../components/table-create-service/icons/DeleteIcon";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { SubdescriptionMealActions } from "../../app/services/subdescription-meal/subdescriptionMeal.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SubdescriptionMealDeleteModal({ id }) {
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
      SubdescriptionMealActions.deleteSubdescriptionMeal({
        id,
        onSuccess: () => {
          toast.success("Xoá gói bữa ăn thành công");
          dispatch(SubdescriptionMealActions.getSubdescriptionMeals());
          onHide();
        },
      })
    );
  };

  const contentModal = useMemo(() => {
    return (
      <div>
        <div className="modal-header">Xoá gói bữa ăn</div>
        <div className="modal-body">Bạn có muốn xoá gói bữa ăn này?</div>
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
        onClick={() => navigate(`edit/${id}`)}
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

export default SubdescriptionMealDeleteModal;

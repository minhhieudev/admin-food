import React, { useState } from "react";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { CustomerActions } from "../../app/services/customer/customer.slice";

function CustomerDetailRestoreModal({ id, onHide }) {
  const dispatch = useDispatch();

  const onRequestRestore = () => {
    dispatch(
      CustomerActions.restore({
        id,
        onSuccess: onHide,
      })
    );
  };

  return (
    <div>
      <div className="modal-header">Bạn muốn khôi phục tài khoản này ?</div>
      <div className="modal-body"></div>
      <div className="modal-footer">
        <div className="d-flex jc-between">
          <div />
          <MST.Button onClick={onRequestRestore}>
            Khôi phục tài khoản
          </MST.Button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailRestoreModal;

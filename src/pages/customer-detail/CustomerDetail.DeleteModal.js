import React, { useState } from "react";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { CustomerActions } from "../../app/services/customer/customer.slice";

function CustomerDetailDeleteModal({ id, onHide }) {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");

  const onRequestBlock = () => {
    dispatch(
      CustomerActions.block({
        id,
        reason,
        onSuccess: onHide,
      })
    );
  };

  return (
    <div>
      <div className="modal-header">Bạn có muốn khóa tài khoản này?</div>
      <div className="modal-body">
        <MST.Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do khoá"
        />
      </div>
      <div className="modal-footer">
        <div className="d-flex jc-between">
          <div />
          <MST.Button onClick={onRequestBlock}>Khoá tài khoản</MST.Button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailDeleteModal;

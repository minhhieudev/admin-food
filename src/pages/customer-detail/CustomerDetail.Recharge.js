import React, { useEffect, useState } from "react";
import MST from "../../components";
import "./style.css";
import { isEmpty } from "lodash";
import DolarIcon from "./icons/DolarIcon";
import { useDispatch } from "react-redux";
import { CustomerActions } from "../../app/services/customer/customer.slice";

function CustomerDetailRecharge({ id }) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");

  const [errorMessage, setErrorMessage] = useState({
    amount: "",
  });

  useEffect(() => {
    if (!isShow) {
      setAmount(0);
      setNote("");
      setErrorMessage({
        amount: "",
      });
    }
  }, [isShow]);

  const onHide = () => setIsShow(false);
  const onShow = () => setIsShow(true);

  const validation = (callback) => {
    const tempError = {
      amount: "",
      note: "",
    };

    if (amount.length === 0) {
      tempError.amount = "Số tiền không được bỏ trống";
    }

    if (isEmpty(note)) {
      tempError.note = "Nội dung không được bỏ trống";
    }

    if (isEmpty(tempError.amount) && isEmpty(tempError.note)) {
      callback();
    } else {
      setErrorMessage(tempError);
    }
  };

  const onRecharge = () => {
    dispatch(
      CustomerActions.recharge({
        onSuccess: onHide,
        body: {
          customerID: id,
          note,
          amount: Number(amount),
        },
      })
    );
  };

  const renderContent = (
    <div>
      <div className="modal-header">Nạp tiền</div>
      <div className="modal-body">
        <div className="customer-detail-modal-one-field">
          <div className="mb-8">Số tiền cần nạp</div>
          <MST.Input
            errorMessage={errorMessage?.amount}
            value={amount}
            onChange={(e) => {
              setErrorMessage({
                ...errorMessage,
                amount: "",
              });
              setAmount(e.target.value);
            }}
            placeholder="Nhập số tiền cần nạp"
            type="number"
            right={<div className="mr-8">VND</div>}
          />
        </div>
        <div className="customer-detail-modal-one-field">
          <div className="mb-8">Nội dung</div>
          <MST.Input
            errorMessage={errorMessage?.note}
            value={note}
            onChange={(e) => {
              setErrorMessage({ ...errorMessage, note: "" });
              setNote(e.target.value);
            }}
            placeholder="Nhập nội dung nạp"
          />
        </div>
      </div>
      <div className="modal-footer">
        <div className="d-flex jc-between">
          <div />
          <div>
            <MST.Button onClick={() => validation(onRecharge)}>
              Xác nhận
            </MST.Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mr-8">
      <MST.Button
        onClick={onShow}
        icon={
          <div className="d-flex mr-8">
            <DolarIcon />
          </div>
        }
      >
        Nạp tiền
      </MST.Button>
      <MST.Modal isShow={isShow} onHide={onHide} content={renderContent} />
    </div>
  );
}

export default CustomerDetailRecharge;

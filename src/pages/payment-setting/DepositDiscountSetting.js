import React, { useState } from "react";
import MST from "../../components";
import DepDisTable from "./DepDisTable/DepDisTable.js";
function DepositDiscountSetting({ depositDiscount, setDepositDiscount }) {
  const onChangeData = (data) => {
    setDepositDiscount({
      key: "depositDiscount",
      value: data,
    });
  };

  const onAddOne = () => {
    setDepositDiscount({
      key: "depositDiscount",
      value: [
        ...depositDiscount.value,
        {
          amount: "0",
          discountPercent: "0",
          id: depositDiscount.value.length,
        },
      ],
    });
  };

  return (
    <div className="depdis-container">
      <div className="depdis-header">
        <div className="payment-setting-paypal-title">Chiết khấu nạp tiền</div>
        <div>
          <MST.Button onClick={onAddOne}>Thêm điều kiện</MST.Button>
        </div>
      </div>
      <DepDisTable data={depositDiscount.value} onChange={onChangeData} />
    </div>
  );
}

export default DepositDiscountSetting;

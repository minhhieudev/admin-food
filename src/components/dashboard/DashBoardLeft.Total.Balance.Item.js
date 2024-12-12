import React from "react";
import { formatCurrency } from "../../app/function";
export default function ItemDashBoardLeftTotalBalance({
  name = "",
  icon = "",
  balance = "",
}) {
  return (
    <div className="total-balance-wrapper">
      <div className="top-balance">
        <p className="txt-name-balance">{name}</p>
        <img src={icon} alt="picture" />
      </div>
      <div className="content-txt-balance">
        <p className="txt-balance">{formatCurrency(balance)}</p>
      </div>
    </div>
  );
}

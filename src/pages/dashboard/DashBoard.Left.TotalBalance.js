import React from "react";
import ItemDashBoardLeftTotalBalance from "../../components/dashboard/DashBoardLeft.Total.Balance.Item";
import Images from "../../images";
export default function DashBoardLeftTotalBalance({ item = "" }) {
  return (
    <div className="dashboard-left-balance">
      <div className="title-balance">Tổng số dư</div>
      <div className="left-total-service">
        <ItemDashBoardLeftTotalBalance
          name={"1DG.ME"}
          icon={Images.logo1GDME}
          balance={item?.balance1DG}
        />
        <ItemDashBoardLeftTotalBalance
          name={"Ongtrum"}
          icon={Images.ongtrum}
          balance={item?.balanceOngtrum}
        />
        <ItemDashBoardLeftTotalBalance
          name={"Ví của khách hàng"}
          icon={Images.walletCuatomer}
          balance={item?.customerWallet}
        />
      </div>
    </div>
  );
}

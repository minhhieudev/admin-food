import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CustomerActions,
  CustomerSelectors,
} from "../../app/services/customer/customer.slice";
import { formatPriceVND } from "../../app/utils/format";
import MST from "../../components";
import CustomerDetailPaymentActivityList from "./CustomerDetail.PaymentActivityList";
import BlockIcon from "./icons/BlockIcon";
import IdIcon from "./icons/IdIcon";
import MoneyIcon from "./icons/MoneyIcon";
import PhoneIcon from "./icons/PhoneIcon";
import RestoreIcon from "./icons/RestoreIcon";
import StatusIcon from "./icons/StatusIcon";
import "./style.css";
import CustomerDetailRecharge from "./CustomerDetail.Recharge";
import ReasonIcon from "./icons/ReasonIcon";

function CustomerDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customerDetail = useSelector(CustomerSelectors.customerDetail);
  const [isShowConform, setIsShowConform] = useState(false);

  useEffect(() => {
    getDetail();
    return () => {
      dispatch(
        CustomerActions.setPaginationPaymentActivities({
          page: 1,
          pageSize: 10,
          total: 0,
          totalPage: 0,
        })
      );
    };
  }, []);

  const getDetail = () => {
    dispatch(CustomerActions.getCustomerById(id));
  };

  return (
    <MST.Container title={"Chi tiết khách hàng"}>
      <div className="customer-detail-info-container">
        <div className="d-flex ai-center">
          <span className="customer-detail-title">{customerDetail?.email}</span>
        </div>
        <div className="d-flex ai-center pt-10">
          <IdIcon />
          <span className="customer-detail-label">{customerDetail?._id}</span>
        </div>
        <div className="d-flex ai-center pt-10">
          <PhoneIcon />
          <span className="customer-detail-label">
            {customerDetail?.phoneNumber}
          </span>
        </div>
        <div className="d-flex ai-center pt-10">
          <StatusIcon />
          <span className="customer-detail-label">
            {cdGenLabel(customerDetail?.status)}
          </span>
        </div>
        <div className="d-flex ai-center pt-10">
          <MoneyIcon />
          <span className="customer-detail-label">Số dư hiện tại:</span>
          <span className="customer-detail-balance">
            {formatPriceVND(customerDetail?.balance)}đ
          </span>
        </div>
        {customerDetail?.status !== "blocked" ? (
          <></>
        ) : (
          <div className="d-flex ai-center pt-10">
            <ReasonIcon />
            <span className="customer-detail-block">
              Tài khoản bị khóa vì lý do: {customerDetail?.reasonBlock}
            </span>
          </div>
        )}
        <div className="customer-detail-btn-container">
          <div className="customer-detail-btn-area">
            <CustomerDetailRecharge id={customerDetail?._id} />
            {customerDetail?.status !== "blocked" ? (
              <MST.Button
                onClick={() => setIsShowConform(true)}
                icon={
                  <div className="d-flex" style={{ marginRight: 8 }}>
                    <BlockIcon />
                  </div>
                }
                style={{
                  backgroundColor: "#FF5247",
                }}
              >
                Khóa tài khoản
              </MST.Button>
            ) : (
              <MST.Button
                type="outline"
                onClick={() => setIsShowConform(true)}
                icon={
                  <div className="d-flex" style={{ marginRight: 8 }}>
                    <RestoreIcon />
                  </div>
                }
              >
                Khôi phục tài khoản
              </MST.Button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20 customer-detail-info-container">
        <div className="d-flex ai-center">
          <span className="customer-detail-title">Biến động số dư</span>
        </div>
        <CustomerDetailPaymentActivityList
          setIsShowConform={setIsShowConform}
          isShowConform={isShowConform}
          id={id}
          customerDetail={customerDetail}
        />
      </div>
    </MST.Container>
  );
}

export default CustomerDetailPage;

export function cdGenColor(label) {
  switch (label) {
    case "success":
      return "#23C16B";
    default:
      return "#ffffff";
  }
}
export function cdGenLabel(label) {
  switch (label) {
    case "recharge":
      return "Nạp tiền";
    case "order":
      return "Đặt hàng";
    case "success":
      return "Thành công";
    case "active":
      return "Đang hoạt động";
    case "blocked":
      return "Đã khoá";
    default:
      return label;
  }
}

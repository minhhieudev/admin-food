import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  OrderActions,
  OrderSelectors,
} from "../../app/services/order/order.slice";
import MST from "../../components";
import AccountIcon from "./icons/AccountIcon";
import CaseIcon from "./icons/CaseIcon";
import ClockIcon from "./icons/ClockIcon";
import CodeIcon from "./icons/CodeIcon";
import TotalIcon from "./icons/TotalIcon";
import "./style.css";
import { formatPriceVND } from "../../app/utils/format";
import { odGenColor, odGenStatus } from "../order/OrderList";
import {
  ServiceActions,
  ServiceSelectors,
} from "../../app/services/service/service.slice";
import CONST from "../../app/services/const";

function OrderDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetail = useSelector(OrderSelectors.orderDetail);
  const scriptGroupCodeList = useSelector(ServiceSelectors.scriptGroupCodeList);
  useEffect(() => {
    dispatch(ServiceActions.getScriptGroupCodeList());
    getDetail();
    return () => {
      dispatch(OrderActions.setOrderDetail(undefined));
    };
  }, []);

  const getDetail = () => {
    dispatch(OrderActions.getOrderById(id));
  };

  const generalList = useCallback(() => {
    return [
      {
        icon: <TotalIcon />,
        label: "Tổng đơn hàng",
        value: (
          <span
            style={{
              color: "#ff8900",
            }}
          >
            {formatPriceVND(orderDetail?.totalPrice)} VND
          </span>
        ),
      },
      {
        icon: <CodeIcon />,
        label: "Mã đơn hàng",
        value: (
          <span
            style={{
              color: "#72777A",
            }}
          >
            {orderDetail?.code}
          </span>
        ),
      },
      {
        icon: <ClockIcon />,
        label: "Ngày đặt hàng",
        value: (
          <span
            style={{
              color: "#72777A",
            }}
          >
            {moment(orderDetail?.createdAt).format("HH:mm DD/MM/YYYY")}
          </span>
        ),
      },
      {
        icon: <AccountIcon />,
        label: "Tên khách hàng",
        value: (
          <span
            style={{
              color: "#72777A",
            }}
          >
            {orderDetail?.customerName}
          </span>
        ),
      },
    ];
  }, [orderDetail]);

  return (
    <div>
      <MST.Container title={"Chi tiết đơn hàng"}>
        <div className="order-detail-general">
          <div className="order-detail-content">
            {(generalList() || []).map((item, index) => {
              return (
                <div key={index} className="order-detail-one-general">
                  <div className="d-flex ">
                    <div className="mr-8">{item.icon}</div>
                    <div>
                      <div className="order-detail-one-general-label">
                        {item.label}
                      </div>
                      <div>{item.value}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="order-detail-detail">
          <div className="d-flex">
            <div className="mr-8">
              <CaseIcon />
            </div>
            <div>
              <span>Dịch vụ</span>
            </div>
          </div>
          <div className="mt-24 mb-24">
            <MST.Table
              head={[
                { name: "Dịch vụ" },
                { name: "Đơn giá" },
                { name: "Chi phí" },
                { name: "Trạng thái" },
                { name: "Số lượng" },
                { name: "Thành tiền" },
              ]}
              body={[
                [
                  {
                    value: (
                      <div className="d-flex ai-center">
                        {orderDetail?.servicePackage?.scriptGroupCode && (
                          <img
                            className="service-list-icon"
                            src={`${CONST.URL.API}/images/services/${orderDetail.servicePackage.scriptGroupCode}.png`}
                            alt="img"
                          />
                        )}
                        <div className="ml-8">
                          {orderDetail?.servicePackage?.name}
                        </div>
                      </div>
                    ),
                  },
                  { value: orderDetail?.servicePackage?.price },
                  { value: orderDetail?.servicePackage?.cost },
                  {
                    value: odGenStatus(orderDetail?.status),
                    style: {
                      color: odGenColor(orderDetail?.status),
                    },
                  },
                  { value: orderDetail?.servicePackage?.qty },
                  { value: formatPriceVND(orderDetail?.totalPrice) },
                ],
              ]}
            />
          </div>
          <div className="d-flex">
            <div className="mr-8">
              <CaseIcon />
            </div>
            <div>
              <span>Dữ liệu khách hàng</span>
            </div>
          </div>
          <div className="mt-24">
            {(orderDetail?.servicePackage?.customerEnteredValues || []).map(
              (item) => {
                return (
                  <div
                    className="mb-8"
                    style={{
                      color: "#72777A",
                    }}
                  >
                    <span>{item?.label || item?.attributeCode}</span>:
                    <span style={{ wordWrap: "break-word" }}>
                      {` ${item?.enteredValue}`}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </MST.Container>
    </div>
  );
}

export default OrderDetailPage;

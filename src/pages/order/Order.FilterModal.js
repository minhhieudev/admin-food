import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderActions,
  OrderSelectors,
} from "../../app/services/order/order.slice";
import MST from "../../components";
import Modal from "../../components/base/modal/Modal";

function OrderFilterModal({ onHide, isShow }) {
  const dispatch = useDispatch();

  const customerList = useSelector(OrderSelectors.customerList);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isShow) {
      dispatch(OrderActions.searchCustomerByUsername(email));
    }
  }, [email, isShow]);

  const renderContent = useMemo(() => {
    return (
      <div>
        <div className="modal-header">
          <span>Lọc theo khách hàng</span>
        </div>
        <div className="modal-body">
          <MST.Input
            placeholder="Tìm kiếm khách hàng"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="order-customer-list-container">
            {customerList.map((x, index) => {
              return <OneItem key={index} item={x} onHide={onHide} />;
            })}
          </div>
        </div>
        <div className="modal-footer">
          <div className="d-flex jc-between">
            <div />
            <MST.Button onClick={onHide} type="outlined">
              Hủy
            </MST.Button>
          </div>
        </div>
      </div>
    );
  }, [isShow, email, customerList]);

  return <Modal content={renderContent} isShow={isShow} onHide={onHide} />;
}

export default OrderFilterModal;

const OneItem = ({ item, onHide }) => {
  const dispatch = useDispatch();
  const currentCustomer = useSelector(OrderSelectors.currentCustomer);
  const pagination = useSelector(OrderSelectors.pagination);

  return (
    <div
      className={`order-one-customer-container order-one-customer-container-${
        item._id !== currentCustomer?._id ? "unactive" : "active"
      }`}
      onClick={() => {
        if (item._id !== currentCustomer) {
          dispatch(
            OrderActions.setPagination({
              ...pagination,
              page: 1,
            })
          );
          dispatch(OrderActions.setCurrentCustomer(item));
          dispatch(OrderActions.getOrders());
          onHide();
        }
      }}
    >
      <div className="order-one-customer-avatar"></div>
      <div>{item.email}</div>
    </div>
  );
};

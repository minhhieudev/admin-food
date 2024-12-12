import React, { useEffect } from "react";
import MST from "../../components";
import OrderList from "./OrderList";
import { useDispatch } from "react-redux";
import { OrderActions } from "../../app/services/order/order.slice";

function OrderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(OrderActions.setCurrentCustomer(undefined));
    };
  }, []);

  return (
    <MST.Container title={"Đơn hàng"}>
      <div className="order-content">
        <OrderList />
      </div>
    </MST.Container>
  );
}

export default OrderPage;

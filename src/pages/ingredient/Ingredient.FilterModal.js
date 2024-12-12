import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IngredientActions,
  IngredientSelectors,
} from "../../app/services/ingredient/ingredient.slice";
import MST from "../../components";
import Modal from "../../components/base/modal/Modal";

function IngredientFilterModal({ onHide, isShow }) {
  const dispatch = useDispatch();

  const customerList = useSelector(IngredientSelectors.customerList);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isShow) {
      dispatch(IngredientActions.searchCustomerByUsername(email));
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
          <div className="ingredient-customer-list-container">
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

export default IngredientFilterModal;

const OneItem = ({ item, onHide }) => {
  const dispatch = useDispatch();
  const currentCustomer = useSelector(IngredientSelectors.currentCustomer);
  const pagination = useSelector(IngredientSelectors.pagination);

  return (
    <div
      className={`ingredient-one-customer-container ingredient-one-customer-container-${
        item._id !== currentCustomer?._id ? "unactive" : "active"
      }`}
      onClick={() => {
        if (item._id !== currentCustomer) {
          dispatch(
            IngredientActions.setPagination({
              ...pagination,
              page: 1,
            })
          );
          dispatch(IngredientActions.setCurrentCustomer(item));
          dispatch(IngredientActions.getIngredients());
          onHide();
        }
      }}
    >
      <div className="ingredient-one-customer-avatar"></div>
      <div>{item.email}</div>
    </div>
  );
};

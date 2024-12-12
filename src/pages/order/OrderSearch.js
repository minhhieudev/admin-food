import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderActions,
  OrderSelectors,
} from "../../app/services/order/order.slice";
import MST from "../../components";
import SearchIcon from "../../images/icons/SearchIcon";
import OrderFilterModal from "./Order.FilterModal";
import FilterIcon from "./icons/FilterIcon";
import "./style.css";
import CloseIcon from "../../images/icons/CloseIcon";

function OrderSearch() {
  const search = useSelector(OrderSelectors.search);
  const currentCustomer = useSelector(OrderSelectors.currentCustomer);
  const dispatch = useDispatch();
  const [isShowFilter, setIsShowFilter] = useState(false);

  const onHideFilter = () => setIsShowFilter(false);

  return (
    <div className="search-order-container">
      <OrderFilterModal isShow={isShowFilter} onHide={onHideFilter} />
      <div className="search-order-input">
        <MST.Input
          value={search}
          onChange={(e) => dispatch(OrderActions.setSearch(e.target.value))}
          placeholder={"Nhập từ khoá tìm kiếm"}
          right={
            <div className="service-search-btn">
              <SearchIcon />
            </div>
          }
        />
      </div>
      <div>
        {currentCustomer ? (
          <MST.Button
            onClick={() => {
              dispatch(OrderActions.setCurrentCustomer(undefined));
              dispatch(OrderActions.getOrders());
            }}
            type="outlined"
            icon={
              <div className="d-flex ai-center mr-8">
                <CloseIcon />
              </div>
            }
          >
            <span className="text-primary">{currentCustomer.email}</span>
          </MST.Button>
        ) : (
          <MST.Button
            style={{
              height: 50,
            }}
            onClick={() => {
              setIsShowFilter(true);
            }}
            type="outlined"
            icon={
              <div className="d-flex ai-center mr-8">
                <FilterIcon />
              </div>
            }
          >
            Bộ lọc
          </MST.Button>
        )}
      </div>
    </div>
  );
}

export default OrderSearch;

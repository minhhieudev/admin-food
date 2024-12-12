import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
  search: "",
  orderDetail: undefined,
  customerList: [],
  currentCustomer: undefined,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    searchCustomerByUsername: (state, { payload }) => {},
    setCustomerList: (state, { payload }) => {
      state.customerList = payload;
    },
    getOrders: () => {},
    setOrders: (state, { payload }) => {
      state.orderList = payload;
    },
    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },
    setSearch: (state, { payload }) => {
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
      state.search = payload;
    },
    getOrderById: (state, { payload }) => {},
    setOrderDetail: (state, { payload }) => {
      console.log('payloadpayloadpayloadpayloadpayloadpayloadpayloadpayloadpayloadpayload', payload);
      state.orderDetail = payload;
    },
    setCurrentCustomer: (state, { payload }) => {
      state.currentCustomer = payload;
    },
    resetSession: (state) => {
      state.search = "";
      state.orderList = [];
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },
    block: (state, { payload }) => {},
    restore: (state, { payload }) => {},
  },
});

const OrderReducer = OrderSlice.reducer;
export default OrderReducer;

export const OrderActions = OrderSlice.actions;
export const OrderSelectors = {
  orderList: (state) => state.order.orderList,
  pagination: (state) => state.order.pagination,
  search: (state) => state.order.search,
  orderDetail: (state) => state.order.orderDetail,
  customerList: (state) => state.order.customerList,
  currentCustomer: (state) => state.order.currentCustomer,
};

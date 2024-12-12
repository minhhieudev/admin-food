import { delay, put, select, takeLatest } from "redux-saga/effects";
import { OrderActions, OrderSelectors } from "./order.slice";
import { toast } from "react-toastify";
import OrderRequest from "./order.request";

function* OrderSaga() {
  yield takeLatest(OrderActions.getOrders, getOrders);
  yield takeLatest(OrderActions.getOrderById, getOrderById);
  yield takeLatest(
    OrderActions.searchCustomerByUsername,
    searchCustomerByUsername
  );
  yield takeLatest(OrderActions.setSearch, setSearch);
}

export default OrderSaga;

function* searchCustomerByUsername({ payload }) {
  try {
    yield delay(200);
    const rs = yield OrderRequest.searchCustomerByUsername(payload);

    if (rs.success) {
      yield put(OrderActions.setCustomerList(rs.data.customers));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getOrders() {
  try {
    yield delay(100);
    const pagination = yield select(OrderSelectors.pagination);
    const currentCustomer = yield select(OrderSelectors.currentCustomer);
    const rs = yield OrderRequest.getOrders({
      customerID: currentCustomer,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });

    if (rs.success) {
      yield put(OrderActions.setOrders(rs.data.orders));
      yield put(OrderActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getOrderById({ payload }) {
  try {
    yield delay(100);
    const rs = yield OrderRequest.getOrderById(payload);

    if (rs.success) {
      yield put(OrderActions.setOrderDetail(rs.data.order));
    }
  } catch (error) {
    toast.error(error);
  }
}
function* setSearch({ payload }) {
  try {
    yield delay(300);
    const pagination = yield select(OrderSelectors.pagination);
    const currentCustomer = yield select(OrderSelectors.currentCustomer);
    const rs = yield OrderRequest.getOrders({
      customerID: currentCustomer,
      code: payload,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
    if (rs.success) {
      yield put(OrderActions.setOrders(rs.data.orders));
      yield put(OrderActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    yield put(OrderActions.setOrders([]));
    toast.error(error);
  }
}

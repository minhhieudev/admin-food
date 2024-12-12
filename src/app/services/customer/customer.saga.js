import { delay, put, select, takeLatest } from "redux-saga/effects";
import { CustomerActions, CustomerSelectors } from "./customer.slice";
import { toast } from "react-toastify";
import CustomerRequest from "./customer.request";

function* CustomerSaga() {
  yield takeLatest(CustomerActions.getCustomers, getCustomers);
  yield takeLatest(CustomerActions.setSearchUsername, setSearchUsername);
  yield takeLatest(CustomerActions.getCustomerById, getCustomerById);
  yield takeLatest(CustomerActions.getPaymentActivities, getPaymentActivities);
  yield takeLatest(CustomerActions.block, block);
  yield takeLatest(CustomerActions.restore, restore);
  yield takeLatest(CustomerActions.recharge, recharge);
}

export default CustomerSaga;

function* recharge({ payload }) {
  try {
    yield delay(100);
    const { body, onSuccess } = payload;
    const rs = yield CustomerRequest.recharge(body);
    if (rs.success) {
      yield put(CustomerActions.getCustomerById(body?.customerID));
      yield put(CustomerActions.getPaymentActivities(body?.customerID));
      toast.success("Nạp tiền thành công");
      onSuccess();
    } else {
      throw rs?.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* restore({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield CustomerRequest.restore(id);
    if (rs.success) {
      yield put(CustomerActions.getCustomerById(id));
      yield put(CustomerActions.getPaymentActivities(id));
      onSuccess();
    }
  } catch (error) {
    toast.error(error);
  }
}

function* block({ payload }) {
  try {
    yield delay(100);
    const { id, reason, onSuccess } = payload;
    const rs = yield CustomerRequest.block(id, {
      reasonBlock: reason,
    });
    if (rs.success) {
      yield put(CustomerActions.getCustomerById(id));
      yield put(CustomerActions.getPaymentActivities(id));
      onSuccess();
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getPaymentActivities({ payload }) {
  try {
    yield delay(100);
    const pagination = yield select(
      CustomerSelectors.paginationPaymentActivities
    );

    const rs = yield CustomerRequest.getPaymentActivities(payload, {
      page: pagination.page,
      pageSize: pagination.pageSize,
    });

    if (rs.success) {
      yield put(
        CustomerActions.setPaymentActivities(rs.data.paymentActivities)
      );
      yield put(
        CustomerActions.setPaginationPaymentActivities(rs.data.pagination)
      );
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getCustomers() {
  try {
    yield delay(100);
    const pagination = yield select(CustomerSelectors.pagination);
    const searchUsername = yield select(CustomerSelectors.searchUsername);
    const rs = yield CustomerRequest.getCustomers({
      page: pagination.page,
      pageSize: pagination.pageSize,
      email: searchUsername,
    });

    if (rs.success) {
      yield put(CustomerActions.setCustomers(rs.data.customers));
      yield put(CustomerActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* setSearchUsername({ payload }) {
  try {
    yield delay(300);
    const pagination = yield select(CustomerSelectors.pagination);
    const rs = yield CustomerRequest.getCustomers({
      email: payload,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
    if (rs.success) {
      yield put(CustomerActions.setCustomers(rs.data.customers));
      yield put(CustomerActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getCustomerById({ payload }) {
  try {
    yield delay(100);
    const rs = yield CustomerRequest.getCustomerById(payload);

    if (rs.success) {
      yield put(CustomerActions.setCustomerDetail(rs.data));
    }
  } catch (error) {
    toast.error(error);
  }
}

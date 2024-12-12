import { delay, put, takeLatest } from "redux-saga/effects";
import { DashBoardActions } from "./dashboard.slice";
import { toast } from "react-toastify";
import DashBoardRequest from "./dashboard.request";

function* DashBoardSaga() {
  yield takeLatest(DashBoardActions.getSystemList, getSystemList);
  yield takeLatest(DashBoardActions.getOrder, getOrder);
  yield takeLatest(DashBoardActions.getMoney, getMoney);
  yield takeLatest(DashBoardActions.getRevenue, getRevenue);
  yield takeLatest(DashBoardActions.getCustomerOrder, getCustomerOrder);
  yield takeLatest(DashBoardActions.getServiceList, getServiceList);
  yield takeLatest(DashBoardActions.getCustomerDeposit, getCustomerDeposit);
  yield takeLatest(DashBoardActions.getDataPie, getDataPie);
  yield takeLatest(DashBoardActions.getDataLine, getDataLine);
}
export default DashBoardSaga;

function* getSystemList({ payload }) {
  try {
    yield delay(100);
    const rs = yield DashBoardRequest.system();
    if (rs.success) {
      yield put(DashBoardActions.setSystemList(rs.data));
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getOrder({ payload }) {
  const { type, onSuccess = () => {}, onFail = () => {} } = payload;
  try {
    const rs = yield DashBoardRequest.order(type);
    if (rs.success) {
      yield put(DashBoardActions.setOrder(rs.data));
      onSuccess && onSuccess(rs.data);
    } else {
      onFail && onFail(rs);
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getMoney({ payload }) {
  const { type, onSuccess = () => {}, onFail = () => {} } = payload;

  try {
    yield delay(100);
    const rs = yield DashBoardRequest.money(type);
    if (rs.success) {
      yield put(DashBoardActions.setMoney(rs.data));
      onSuccess && onSuccess(rs.data);
    } else {
      onFail && onFail(rs);
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getRevenue({ payload }) {
  const { type, onSuccess = () => {}, onFail = () => {} } = payload;

  try {
    yield delay(100);
    const rs = yield DashBoardRequest.revenue(type);
    if (rs.success) {
      yield put(DashBoardActions.setRevenue(rs.data));
      onSuccess && onSuccess(rs.data);
    } else {
      onFail && onFail(rs);
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getDataPie({ payload }) {
  const { type, onSuccess = () => {}, onFail = () => {} } = payload;
  try {
    yield delay(100);
    const rs = yield DashBoardRequest.getDataPie(type);
    if (rs.success) {
      yield put(DashBoardActions.setPieList(rs.data));
      onSuccess && onSuccess(rs.data);
    } else {
      onFail && onFail(rs);
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getDataLine({ payload }) {
  const { type, onSuccess = () => {}, onFail = () => {}, dataType } = payload;
  try {
    yield delay(100);
    const rs = yield DashBoardRequest.getDatalLine(type, dataType);
    if (rs.success) {
      yield put(DashBoardActions.setLineList(rs.data));
      onSuccess && onSuccess(rs.data);
    } else {
      onFail && onFail(rs);
    }
  } catch (error) {
    toast.error(error);
  }
}
/*
  người viết: Đinh văn Thành
  Ngày viết: 06-06-2024
  Chức năng: call api lấy thông tin tổng số khách hàng có đơn hàng nhiều nhất
*/
function* getCustomerOrder({ payload }) {
  const { onSuccess, type } = payload;
  try {
    yield delay(100);
    const rs = yield DashBoardRequest.customerOrder(type.value);
    if (rs.success) {
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) {
    toast.error(error);
  }
}
/*================ END =============================*/
/*
  người viết: Đinh văn Thành
  Ngày viết: 06-06-2024
  Chức năng: call api lấy thông tin tổng số danh sách dịch vụ
*/
function* getServiceList({ payload }) {
  const { onSuccess, type, page, search } = payload;
  try {
    yield delay(100);
    const rs = yield DashBoardRequest.serviceList(type.value, page, search);
    if (rs.success) {
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) {
    toast.error(error);
  }
}
/*================ END =============================*/
/*
  người viết: Đinh văn Thành
  Ngày viết: 06-06-2024
  Chức năng: call api lấy thông tin tổng số khách hàng nạp nhiều nhất
*/
function* getCustomerDeposit({ payload }) {
  const { onSuccess, type } = payload;
  try {
    yield delay(100);
    const rs = yield DashBoardRequest.customerDeposit(type.value);
    if (rs.success) {
      onSuccess && onSuccess(rs.data);
    }
  } catch (error) {
    toast.error(error);
  }
}
/*================ END =============================*/

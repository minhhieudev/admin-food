import { toast } from "react-toastify";
import { delay, put, takeLatest } from "redux-saga/effects";
import SettingRequest from "./setting.request";
import { SettingActions } from "./setting.slice";

function* SettingSaga() {
  yield takeLatest(SettingActions.getSettings, getSettings);
  yield takeLatest(SettingActions.setSettings, setSettings);
  yield takeLatest(SettingActions.getBankList, getBankList);
  yield takeLatest(SettingActions.getOngTrumService, getOngTrumService);
  yield takeLatest(SettingActions.bulkCreate, bulkCreate);
  yield takeLatest(SettingActions.removeOngTrumService, removeOngTrumService);
  yield takeLatest(SettingActions.getPaymentActivity, getPaymentActivity);
}
export default SettingSaga;

function* getPaymentActivity({ payload }) {
  const { onSuccess, onFail, body, partner, setIsLoading } = payload;
  try {
    setIsLoading(true);
    yield delay(500);
    const rs = yield SettingRequest.getPaymentActivity(partner, body);
    if (rs?.success) {
      onSuccess && onSuccess(rs?.data);
    }
  } catch (error) {
    onFail && onFail();
    toast.error(error);
  }
}

function* removeOngTrumService({ payload }) {
  try {
    const { onSuccess } = payload;
    const rs = yield SettingRequest.removeOngTrumService();
    if (rs?.success) {
      onSuccess({});
    }
  } catch (error) {
    toast.error(error);
  }
}
function* bulkCreate({ payload }) {
  try {
    const { onSuccess, onFail, data } = payload;
    console.log({ data });
    const rs = yield SettingRequest.bulkCreate({ data });
    if (rs?.success) {
      onSuccess(rs?.data || []);
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getOngTrumService({ payload }) {
  try {
    const { onSuccess, onFail } = payload;
    const rs = yield SettingRequest.getImportServiceList();
    if (rs?.success) {
      onSuccess(rs?.data || []);
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getBankList({ payload }) {
  try {
    const { onSuccess } = payload;
    const rs = yield SettingRequest.getBankList();

    if (rs.code === "00") {
      onSuccess(rs.data);
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getSettings({ payload }) {
  try {
    yield delay(100);
    const rs = yield SettingRequest.getSettings({ keys: payload.body });
    if (rs.success) {
      payload.onSuccess && payload.onSuccess(rs?.data?.settings);
    }
  } catch (error) {
    toast.error(error);
  }
}

function* setSettings({ payload }) {
  try {
    yield delay(100);
    const rs = yield SettingRequest.setSettings(payload.body);
    if (rs.success) {
      payload.onSuccess && payload.onSuccess();
      toast.success(rs?.message || "Cập nhật cài đặt thành công");
    }
  } catch (error) {
    toast.error(error);
  }
}

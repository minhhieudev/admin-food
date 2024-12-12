import { toast } from "react-toastify";
import { delay, takeEvery } from "redux-saga/effects";
import PartnerRequest from "./partner.request";
import { PartnerActions } from "./partner.slice";

function* PartnerSaga() {
  yield takeEvery(PartnerActions.getBalance, getBalance);
}
export default PartnerSaga;

function* getBalance({ payload }) {
  try {
    yield delay(100);
    const rs = yield PartnerRequest.getBalance(payload.partnerCode);
    if (rs.success) {
      payload.onSuccess && payload.onSuccess(rs?.data?.balance);
    }
  } catch (error) {
    toast.error(error);
  }
}

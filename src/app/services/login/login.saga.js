import { delay, takeLatest, takeLeading } from "redux-saga/effects";
import LoginRequest from "./login.request";
import { LoginActions } from "./login.slice";
import { toast } from "react-toastify";

function* LoginSaga() {
  yield takeLeading(LoginActions.checkLogin, checkLogin);
  yield takeLatest(LoginActions.changePassword, changePassword);
}

export default LoginSaga;

function* checkLogin({ payload }) {
  yield delay(500);
  const { body, onFail, onSuccess } = payload;

  try {
    const { success, message, data } = yield LoginRequest.checkLogin({ body });

    if (success) {
      onSuccess(data);
    } else {
      onFail && onFail(`${message}`);
    }
  } catch (error) {
    onFail && onFail(error);
  }
}

function* changePassword({ payload }) {
  yield delay(300);
  const { body, onSuccess } = payload;

  try {
    const { success, message, data } = yield LoginRequest.changePassword({
      body,
    });

    if (success) {
      onSuccess();
      toast.success("Thay đổi mật khẩu thành công");
    } else {
      toast.error(message);
    }
  } catch (error) {}
}

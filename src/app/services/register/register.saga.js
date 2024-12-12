import { delay, takeLatest, takeLeading } from "redux-saga/effects";
import RegisterRequest from "./register.request";
import { RegisterActions } from "./register.slice";
import { toast } from "react-toastify";

function* RegisterSaga() {
  yield takeLeading(RegisterActions.register, register);
  //yield takeLatest(RegisterActions.checkBioLink, checkBioLink);
}

export default RegisterSaga;

function* register({ payload }) {
  try {
    const result = yield RegisterRequest.register(payload.body);

    if (result.success) {
      payload.onSuccess && payload.onSuccess(result.message);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.log(error);
  }
}
// function* checkBioLink({ payload }) {
//   try {
//     const result = yield RegisterRequest.checkBioLink({
//       bioLink: payload.username,
//     });

//     if (result.success) {
//       yield put(AuthActions.setRegisterUsername(payload.username));
//       payload.onSuccess && payload.onSuccess();
//     } else {
//       alert(result.message);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

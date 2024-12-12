import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import SubdescriptionMealRequest from "./subdescriptionMeal.request";
import { SubdescriptionMealActions, subdescriptionMealSelectors } from "./subdescriptionMeal.slice";

function* SubdescriptionMealSaga() {
  yield takeLatest(SubdescriptionMealActions.getSubdescriptionMeals, getSubdescriptionMeals);
  yield takeLatest(SubdescriptionMealActions.createSubdescriptionMeal, createSubdescriptionMeal);
  yield takeLatest(SubdescriptionMealActions.deleteSubdescriptionMeal, deleteSubdescriptionMeal);
  yield takeLatest(SubdescriptionMealActions.getSubdescriptionMealById, getSubdescriptionMealById);
  yield takeLatest(SubdescriptionMealActions.edit, edit);
  yield takeLatest(SubdescriptionMealActions.setKeySearch, setKeySearch);
  yield takeLatest(SubdescriptionMealActions.getForSelect, getForSelect);

}

export default SubdescriptionMealSaga;

function* getSubdescriptionMeals({ payload }) {
  try {
    yield delay(100);
    const pagination = yield select(subdescriptionMealSelectors.pagination);
    const keySearch = yield select(subdescriptionMealSelectors.keySearch);

    const params = { ...payload, page: pagination.page, pageSize: pagination.pageSize ,search: keySearch|| ""};

    const rs = yield SubdescriptionMealRequest.getSubdescriptionMeals(params);

    if (rs.success) {
      yield put(SubdescriptionMealActions.setSubdescriptionMeals({ meals: rs.data.meals, pagination: rs.data.pagination }));
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}
function* createSubdescriptionMeal({ payload }) {
  try {
    yield delay(100);
    const { body, onSuccess } = payload;

    const rs = yield SubdescriptionMealRequest.createSubdescriptionMeal(body);

    if (rs.success) {
      onSuccess(rs.data);
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}

function* edit({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body, id } = payload;
    const rs = yield SubdescriptionMealRequest.edit(id, body);
    if (rs.success) {
      onSuccess(rs.data);
    } else {
      throw rs.message;
    }
  } catch (error) {
    console.log({ error });
    toast.error(error.toString());
  }
}

function* deleteSubdescriptionMeal({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield SubdescriptionMealRequest.deleteSubdescriptionMeal(id);

    if (rs.success) {
      onSuccess();
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}

function* getSubdescriptionMealById({ payload }) {
  try {
    yield delay(100);
    const rs = yield SubdescriptionMealRequest.getSubdescriptionMealById(payload.id);

    if (rs.success) {
      yield put(SubdescriptionMealActions.setSubdescriptionMealDetail(rs.data.meal));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getForSelect({ payload }) {
  try {
    yield delay(100);
    const rs = yield SubdescriptionMealRequest.getForSelect();
    if (rs.success) {
      yield put(SubdescriptionMealActions.setSubMealForSelect(rs.data.subMeals));
    }
  } catch (error) {
    toast.error(error);
  }
}


function* setKeySearch({ payload }) {
  try {
    yield delay(200);
    yield put(SubdescriptionMealActions.getSubdescriptionMeals());
  } catch (error) {
    toast.error(error);
  }
}

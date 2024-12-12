import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import IngredientRequest from "./ingredient.request";
import { IngredientActions, IngredientSelectors } from "./ingredient.slice";

function* IngredientSaga() {
  yield takeLatest(IngredientActions.getCreateInfo, getCreateInfo);
  yield takeLatest(IngredientActions.getIngredients, getIngredients);
  yield takeLatest(IngredientActions.createIngredient, createIngredient);
  yield takeLatest(IngredientActions.createIngredientTag, createIngredientTag);
  yield takeLatest(IngredientActions.createIngredientGroup, createIngredientGroup);
  yield takeLatest(IngredientActions.deleteIngredient, deleteIngredient);
  yield takeLatest(IngredientActions.deleteIngredientGroup, deleteIngredientGroup);
  yield takeLatest(IngredientActions.deleteIngredientTag, deleteIngredientTag);
  yield takeLatest(IngredientActions.getIngredientById, getIngredientById);
  yield takeLatest(IngredientActions.edit, edit);
  yield takeLatest(IngredientActions.setKeySearch, setKeySearch);
  yield takeLatest(IngredientActions.getForSelect, getForSelect);
  yield takeLatest(IngredientActions.setKeySearch, setKeySearch);
  yield takeLatest(IngredientActions.getListGroup, getListGroup);
  yield takeLatest(IngredientActions.getListTag, getListTag);

}

export default IngredientSaga;

function* getIngredients({ payload }) {
  try {
    yield delay(100);
    const pagination = yield select(IngredientSelectors.pagination);
    const keySearch = yield select(IngredientSelectors.keySearch);

    const params = { ...payload, page: pagination.page, pageSize: pagination.pageSize, search: keySearch || "" };

    const rs = yield IngredientRequest.getIngredients(params);

    if (rs.success) {
      yield put(IngredientActions.setIngredients({ ingredients: rs.data.ingredients, pagination: rs.data.pagination }));
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}

function* getForSelect({ payload }) {
  try {
    yield delay(100);
    const rs = yield IngredientRequest.getForSelect();

    if (rs.success) {
      yield put(IngredientActions.setForSelect(rs.data));
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}
function* getListGroup({ payload }) {
  try {
    yield delay(100);
    const rs = yield IngredientRequest.getListGroup();
    console.log('22222', rs)
    if (rs.success) {
      yield put(IngredientActions.setListGroup(rs.data));
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}
function* getListTag({ payload }) {
  try {
    yield delay(100);
    const rs = yield IngredientRequest.getListTag();

    if (rs.success) {
      yield put(IngredientActions.setListTag(rs.data));
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}

function* createIngredient({ payload }) {
  try {
    yield delay(100);
    const { body, onSuccess } = payload;
    const rs = yield IngredientRequest.createIngredient(body);

    if (rs.success) {
      onSuccess(rs.data);
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}
function* createIngredientGroup({ payload }) {
  try {
    yield delay(100);
    const { body, onSuccess } = payload;

    const rs = yield IngredientRequest.createIngredientGroup(body);

    if (rs.success) {
      onSuccess(rs.data);
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}
function* createIngredientTag({ payload }) {
  try {
    yield delay(100);
    const { body, onSuccess } = payload;

    const rs = yield IngredientRequest.createIngredientTag(body);

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
    const rs = yield IngredientRequest.edit(id, body);
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

function* deleteIngredientGroup({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield IngredientRequest.deleteIngredientGroup(id);
    if (rs.success) {
      yield getCreateInfo();
      toast.success(rs?.message);
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* deleteIngredientTag({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield IngredientRequest.deleteIngredientTag(id);
    if (rs.success) {
      yield getCreateInfo();
      toast.success(rs?.message);
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}
function* deleteIngredient({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield IngredientRequest.deleteIngredient(id);

    if (rs.success) {
      onSuccess();
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error.toString());
  }
}

function* getIngredientById({ payload }) {
  try {
    yield delay(100);
    const rs = yield IngredientRequest.getIngredientById(payload.id);

    if (rs.success) {
      yield put(IngredientActions.setIngredientDetail(rs.data.ingredient));
    }
  } catch (error) {
    toast.error(error);
  }
}


function* setKeySearch({ payload }) {
  try {
    yield delay(200);
    yield put(IngredientActions.getIngredients());
  } catch (error) {
    toast.error(error);
  }
}

function* getCreateInfo() {
  try {
    yield delay(100);
    const rs = yield IngredientRequest.getListGroup();
    if (rs.success) {
      yield put(
        IngredientActions.setListGroup(
          rs.data.ingredientListGroup.map((x) => {
            return {
              name: x.name,
              value: x._id,
            };
          })
        )
      );
    }
  } catch (error) { }

  try {
    const rs = yield IngredientRequest.getListTag();
    if (rs.success) {
      yield put(
        IngredientActions.setListTag(
          rs.data.ingredientListTag.map((x) => {
            return {
              iTagName: x.iTagName,
              value: x._id,
            };
          })
        )
      );
    }
  } catch (error) { }
}

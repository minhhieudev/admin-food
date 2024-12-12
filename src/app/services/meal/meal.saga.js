import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import MealRequest from "./meal.request";
import { MealActions, MealSelectors } from "./meal.slice";

function* MealSaga() {
  yield takeLatest(MealActions.upload, upload);
  yield takeLatest(MealActions.getMeals, getMeals);
  yield takeLatest(MealActions.setKeySearch, setKeySearch);
  yield takeLatest(MealActions.setStatus, setStatus);
  yield takeLatest(MealActions.getMealById, getMealById);
  yield takeLatest(MealActions.block, block);
  yield takeLatest(MealActions.delete, deleteMeal);
  yield takeLatest(MealActions.restore, restore);
  yield takeLatest(MealActions.createMeal, createMeal);
  yield takeLatest(MealActions.edit, edit);
  yield takeLatest(MealActions.getCreateInfo, getCreateInfo);
  yield takeLatest(MealActions.createMealGroup, createMealGroup);
  yield takeLatest(MealActions.createMealTag, createMealTag);
  yield takeLatest(MealActions.deleteMealGroup, deleteMealGroup);
  yield takeLatest(
    MealActions.getScriptGroupCodeList,
    getScriptGroupCodeList
  );
  ////////////////
  yield takeLatest(MealActions.updateMealStatus, updateMealStatus);
}

export default MealSaga;

function* getScriptGroupCodeList({ payload }) {
  try {
    yield delay(100);
    const { partnerCode, onSuccess } = payload;
    const rs = yield MealRequest.getScriptGroupCodeList(partnerCode);

    onSuccess && onSuccess();
    if (rs.success) {
      yield put(
        MealActions.setScriptGroupCodeList(rs?.data?.scriptGroupCode)
      );
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* deleteMealGroup({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield MealRequest.deleteMealGroup(id);
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

function* createMealTag({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, name } = payload;
    const rs = yield MealRequest.createMealTag(name);
    if (rs.success) {
      toast.success("Thêm thẻ dịch vụ mới thành công");
      onSuccess();
    } else {
      throw rs.message;
    }
  } catch (error) {
    console.log({ error });
    toast.error(error.toString());
  }
}

function* createMealGroup({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, name } = payload;
    const rs = yield MealRequest.createMealGroup(name);
    if (rs.success) {
      toast.success("Thêm nhóm dịch vụ mới thành công");
      onSuccess(rs.data);
    } else {
      throw rs.message;
    }
  } catch (error) {
    console.log({ error });
    toast.error(error.toString());
  }
}

function* getCreateInfo() {
  try {
    yield delay(100);
    const rsMealGroup = yield MealRequest.getMealGroup();
    if (rsMealGroup.success) {
      yield put(
        MealActions.setMealGroup(
          rsMealGroup.data.mealGroups.map((x) => {
            return {
              name: x.name,
              value: x._id,
            };
          })
        )
      );
    }
  } catch (error) {}

  try {
    const rsMealTags = yield MealRequest.getMealTags();
    if (rsMealTags.success) {
      yield put(
        MealActions.setMealTags(
          rsMealTags.data.mealTags.map((x) => {
            return {
              name: x.name,
              value: x.name,
            };
          })
        )
      );
    }
  } catch (error) {}
}

function* edit({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body, id } = payload;
    const rs = yield MealRequest.edit(id, body);
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

function* deleteMeal({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield MealRequest.delete(id);
    if (rs.success) {
      onSuccess();
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* createMeal({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body } = payload;
    const rs = yield MealRequest.create(body);
    if (rs.success) {
      onSuccess(rs.data._id);
    } else {
      throw rs.message;
    }
  } catch (error) {
    console.log({ error });
    toast.error(error.toString());
  }
}

function* restore({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield MealRequest.restore(id);
    if (rs.success) {
      yield put(MealActions.getPaymentActivities(id));
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
    const rs = yield MealRequest.block(id, {
      reason,
    });
    if (rs.success) {
      yield put(MealActions.getPaymentActivities(id));
      onSuccess();
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getMeals({ payload = {} }) {
  try {
    const { page = 1 } = payload;
    
    const rs = yield MealRequest.getMeals({
      page,
      pageSize: 10
    });
    
    if (rs.success) {
      yield put(MealActions.setMeals(rs.data.meals));
      yield put(MealActions.setPagination(rs.data.pagination));
      
      if (payload.onSuccess) {
        payload.onSuccess(rs.data);
      }
    }
  } catch (error) {
    console.error('Error in getMeals saga:', error);
    toast.error(error.toString());
    
    if (payload.onError) {
      payload.onError(error);
    }
  }
}

function* setKeySearch({ payload }) {
  try {
    yield delay(200);
    yield put(MealActions.getMeals());
  } catch (error) {
    toast.error(error);
  }
}

function* setStatus({ payload }) {
  try {
    yield delay(300);
    const rs = yield MealRequest.getMeals({
      //search: "",
      status: payload,
      page: 1,
      pageSize: 10,
    });
    if (rs.success) {
      yield put(MealActions.setMeals(rs.data.meals));
      yield put(MealActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getMealById({ payload }) {
  try {
    yield delay(100);
    const rs = yield MealRequest.getMealById(payload.id);

    if (rs.success) {
      yield put(MealActions.setMealDetail(rs.data.meal));
      if (payload.onSuccess) {
        payload.onSuccess(rs.data);
      }
    }
  } catch (error) {
    toast.error(error);
  }
}

function* upload( {payload} ) {
  console.log(payload.get('file').name)
  const data =payload.get('file').name
  try {
    yield delay(100);
    const rs = yield MealRequest.upload(payload);
    if (rs.success) {
      toast.success("Upload thành công");
      console.log(rs)
    } else {
      throw rs.message;
    }
  } catch (error) {
    console.log({ error });
    toast.error(error.toString());
  }
}

function* updateMealStatus({ payload }) {
  try {
    const { id, status } = payload;

    const rs = yield MealRequest.updateStatus(id, status);

    if (rs.success) {
      if (!payload.hasShownSuccessToast) {
        payload.hasShownSuccessToast = true;
      }

      const currentPage = yield select(state => state.meal.pagination.page);
      
      yield put(MealActions.getMeals({ page: currentPage }));
      
      if (payload.onSuccess) {
        payload.onSuccess();
      }
    } else {
      throw rs.message;
      
      if (payload.onError) {
        payload.onError(rs.message);
      }
    }
  } catch (error) {
    toast.error(error.toString());
    
    if (payload.onError) {
      payload.onError(error);
    }
  }
}



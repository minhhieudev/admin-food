import { delay, put, select, takeLatest } from "redux-saga/effects";
import { KeywordActions, KeywordSelectors } from "./keyword.slice";
import { toast } from "react-toastify";
import KeywordRequest from "./keyword.request";

function* KeywordSaga() {
  yield takeLatest(KeywordActions.createKeyword, createKeyword);
  yield takeLatest(KeywordActions.getKeywords, getKeywords);
  yield takeLatest(KeywordActions.setSearch, setSearch);
  yield takeLatest(KeywordActions.delete, onDelete);
  yield takeLatest(KeywordActions.getKeywordById, getKeywordById);
  yield takeLatest(KeywordActions.edit, edit);
}

export default KeywordSaga;

function* edit({ payload }) {
  const { onSuccess, body, id, onFail } = payload;
  try {
    const rs = yield KeywordRequest.edit(id, body);
    if (rs.success) {
      onSuccess(rs.data);
    } else {
      throw rs.message;
    }
  } catch (error) {
    console.log({ error });
    onFail();
    toast.error(error.toString());
  }
}

function* getKeywordById({ payload }) {
  try {
    yield delay(100);
    const rs = yield KeywordRequest.getKeywordById(payload.id);

    if (rs.success) {
      yield put(KeywordActions.setKeywordDetail(rs.data.keyword));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* onDelete({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield KeywordRequest.delete(id);
    if (rs.success) {
      onSuccess();
      toast.success(rs.message || "Xoá từ khoá thành công");
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* createKeyword({ payload }) {
  try {
    yield delay(200);
    const rs = yield KeywordRequest.createKeyword(payload.body);

    if (rs.success) {
      toast.success(rs.message || "Thêm từ khoá thành công");
      payload.onSuccess && payload.onSuccess();
      yield getKeywords();
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getKeywords() {
  try {
    const pagination = yield select(KeywordSelectors.pagination);
    const search = yield select(KeywordSelectors.search);
    yield delay(200);
    const rs = yield KeywordRequest.getKeywords({
      search,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });

    if (rs.success) {
      yield put(KeywordActions.setKeywords(rs.data.keywords));
      yield put(KeywordActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}
function* setSearch({ payload }) {
  try {
    yield delay(300);
    const rs = yield KeywordRequest.getKeywords({
      search: payload,
      page: 1,
      pageSize: 10,
    });
    if (rs.success) {
      yield put(KeywordActions.setKeywords(rs.data.keywords));
      yield put(KeywordActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

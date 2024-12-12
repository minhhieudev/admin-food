import { delay, put, select, takeLatest } from "redux-saga/effects";
import { TopicActions, TopicSelectors } from "./topic.slice";
import { toast } from "react-toastify";
import TopicRequest from "./topic.request";

function* TopicSaga() {
  yield takeLatest(TopicActions.createTopic, createTopic);
  yield takeLatest(TopicActions.getTopics, getTopics);
  yield takeLatest(TopicActions.getAllTopics, getAllTopics);
  yield takeLatest(TopicActions.setSearch, setSearch);
  yield takeLatest(TopicActions.delete, onDelete);
  yield takeLatest(TopicActions.getTopicById, getTopicById);
  yield takeLatest(TopicActions.edit, edit);
}

export default TopicSaga;

function* edit({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body, id } = payload;
    const rs = yield TopicRequest.edit(id, body);
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

function* getTopicById({ payload }) {
  try {
    yield delay(100);
    const rs = yield TopicRequest.getTopicById(payload.id);

    if (rs.success) {
      yield put(TopicActions.setTopicDetail(rs.data.keywordTopic));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* onDelete({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield TopicRequest.delete(id);
    if (rs.success) {
      onSuccess();
      toast.success(rs.message || "Xoá chủ đề thành công");
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* createTopic({ payload }) {
  try {
    yield delay(200);
    const rs = yield TopicRequest.createTopic(payload.body);

    if (rs.success) {
      toast.success(rs.message || "Thêm chủ đề thành công");
      payload.onSuccess && payload.onSuccess();
      yield getTopics();
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}
function* getTopics() {
  try {
    const pagination = yield select(TopicSelectors.pagination);
    const search = yield select(TopicSelectors.search);
    yield delay(200);
    const rs = yield TopicRequest.getTopics({
      search,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });

    if (rs.success) {
      yield put(TopicActions.setTopics(rs.data.keywordTopics));
      yield put(TopicActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getAllTopics() {
  try {
    yield delay(200);
    const rs = yield TopicRequest.getTopics();

    if (rs.success) {
      yield put(TopicActions.setTopics(rs.data.keywordTopics));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* setSearch({ payload }) {
  try {
    yield delay(300);
    const rs = yield TopicRequest.getTopics({
      search: payload,
      page: 1,
      pageSize: 10,
    });
    if (rs.success) {
      yield put(TopicActions.setTopics(rs.data.keywordTopics));
      yield put(TopicActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

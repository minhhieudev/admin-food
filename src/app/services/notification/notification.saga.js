import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import NotificationRequest from "./notification.request";
import {
  NotificationActions,
  NotificationSelectors,
} from "./notification.slice";

function* NotificationSaga() {
  yield takeLatest(NotificationActions.getNotifications, getNotifications);
  yield takeLatest(NotificationActions.setKeySearch, setKeySearch);
  yield takeLatest(
    NotificationActions.getNotificationById,
    getNotificationById
  );
  yield takeLatest(NotificationActions.delete, deleteNotification);
  yield takeLatest(NotificationActions.restore, restore);
  yield takeLatest(NotificationActions.createNotification, createNotification);
  yield takeLatest(NotificationActions.edit, edit);
}

export default NotificationSaga;

function* edit({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body, id } = payload;
    const rs = yield NotificationRequest.edit(id, body);
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

function* deleteNotification({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield NotificationRequest.delete(id);
    if (rs.success) {
      onSuccess();
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* createNotification({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body } = payload;
    const rs = yield NotificationRequest.create(body);
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
    const rs = yield NotificationRequest.restore(id);
    if (rs.success) {
      yield put(NotificationActions.getPaymentActivities(id));
      onSuccess();
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getNotifications() {
  try {
    yield delay(100);
    const pagination = yield select(NotificationSelectors.pagination);
    const rs = yield NotificationRequest.getNotification({
      page: pagination.page,
      pageSize: pagination.pageSize,
    });

    if (rs.success) {
      yield put(NotificationActions.setNotifications(rs.data.notifications));
      yield put(NotificationActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* setKeySearch({ payload }) {
  try {
    yield delay(300);
    const rs = yield NotificationRequest.getNotification({
      search: payload,
      page: 1,
      pageSize: 10,
    });
    if (rs.success) {
      yield put(
        NotificationActions.setNotifications(rs.data.notificationPackages)
      );
      yield put(NotificationActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getNotificationById({ payload }) {
  try {
    yield delay(100);
    const rs = yield NotificationRequest.getNotificationById(payload.id);

    if (rs.success) {
      yield put(
        NotificationActions.setNotificationDetail(rs.data.notification)
      );
    }
  } catch (error) {
    toast.error(error);
  }
}

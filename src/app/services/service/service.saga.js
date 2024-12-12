import { toast } from "react-toastify";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import ServiceRequest from "./service.request";
import { ServiceActions, ServiceSelectors } from "./service.slice";

function* ServiceSaga() {
  yield takeLatest(ServiceActions.upload, upload);
  yield takeLatest(ServiceActions.getServices, getServices);
  yield takeLatest(ServiceActions.setKeySearch, setKeySearch);
  yield takeLatest(ServiceActions.setScriptGroupCode, setScriptGroupCode);
  yield takeLatest(ServiceActions.getServiceById, getServiceById);
  yield takeLatest(ServiceActions.block, block);
  yield takeLatest(ServiceActions.delete, deleteService);
  yield takeLatest(ServiceActions.restore, restore);
  yield takeLatest(ServiceActions.createService, createService);
  yield takeLatest(ServiceActions.edit, edit);
  yield takeLatest(ServiceActions.getCreateInfo, getCreateInfo);
  yield takeLatest(ServiceActions.createServiceGroup, createServiceGroup);
  yield takeLatest(ServiceActions.createServiceTag, createServiceTag);
  yield takeLatest(ServiceActions.deleteServiceGroup, deleteServiceGroup);
  yield takeLatest(
    ServiceActions.getScriptGroupCodeList,
    getScriptGroupCodeList
  );
  ////////////////
}

export default ServiceSaga;

function* getScriptGroupCodeList({ payload }) {
  try {
    yield delay(100);
    const { partnerCode, onSuccess } = payload;
    const rs = yield ServiceRequest.getScriptGroupCodeList(partnerCode);

    onSuccess && onSuccess();
    if (rs.success) {
      yield put(
        ServiceActions.setScriptGroupCodeList(rs?.data?.scriptGroupCode)
      );
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* deleteServiceGroup({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield ServiceRequest.deleteServiceGroup(id);
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

function* createServiceTag({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, name } = payload;
    const rs = yield ServiceRequest.createServiceTag(name);
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

function* createServiceGroup({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, name } = payload;
    const rs = yield ServiceRequest.createServiceGroup(name);
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
    const rsServiceGroup = yield ServiceRequest.getServiceGroup();
    if (rsServiceGroup.success) {
      yield put(
        ServiceActions.setServiceGroup(
          rsServiceGroup.data.serviceGroups.map((x) => {
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
    const rsServiceTags = yield ServiceRequest.getServiceTags();
    if (rsServiceTags.success) {
      yield put(
        ServiceActions.setServiceTags(
          rsServiceTags.data.serviceTags.map((x) => {
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
    const rs = yield ServiceRequest.edit(id, body);
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

function* deleteService({ payload }) {
  try {
    yield delay(100);
    const { id, onSuccess } = payload;
    const rs = yield ServiceRequest.delete(id);
    if (rs.success) {
      onSuccess();
    } else {
      throw rs.message;
    }
  } catch (error) {
    toast.error(error);
  }
}

function* createService({ payload }) {
  try {
    yield delay(100);
    const { onSuccess, body } = payload;
    const rs = yield ServiceRequest.create(body);
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
    const rs = yield ServiceRequest.restore(id);
    if (rs.success) {
      yield put(ServiceActions.getPaymentActivities(id));
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
    const rs = yield ServiceRequest.block(id, {
      reason,
    });
    if (rs.success) {
      yield put(ServiceActions.getPaymentActivities(id));
      onSuccess();
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getServices() {
  try {
    yield delay(100);
    const pagination = yield select(ServiceSelectors.pagination);
    const scriptGroupCode = yield select(ServiceSelectors.scriptGroupCode);

    const keySearch = yield select(ServiceSelectors.keySearch);

    const rs = yield ServiceRequest.getServices({
      scriptGroupCode,
      page: pagination.page,
      pageSize: pagination.pageSize,
      search: keySearch || "",
    });

    if (rs.success) {
      yield put(ServiceActions.setServices(rs.data.servicePackages));
      yield put(ServiceActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* setKeySearch({ payload }) {
  try {
    yield delay(200);
    yield put(ServiceActions.getServices());
  } catch (error) {
    toast.error(error);
  }
}

function* setScriptGroupCode({ payload }) {
  try {
    yield delay(300);
    const rs = yield ServiceRequest.getServices({
      search: "",
      scriptGroupCode: payload,
      page: 1,
      pageSize: 10,
    });
    if (rs.success) {
      yield put(ServiceActions.setServices(rs.data.servicePackages));
      yield put(ServiceActions.setPagination(rs.data.pagination));
    }
  } catch (error) {
    toast.error(error);
  }
}

function* getServiceById({ payload }) {
  try {
    yield delay(100);
    const rs = yield ServiceRequest.getServiceById(payload.id);

    if (rs.success) {
      yield put(ServiceActions.setServiceDetail(rs.data.servicePackage));
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
    const rs = yield ServiceRequest.upload(payload);
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


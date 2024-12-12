import SysFetch from "../../fetch";
import qs from "qs";

const NotificationRequest = {
  delete: (id) => {
    return SysFetch.delete(`notifications/${id}`);
  },
  edit: (id, body) => {
    return SysFetch.put(`notifications/${id}`, body);
  },
  create: (body) => {
    return SysFetch.post(`notifications`, body);
  },
  restore: (id) => {
    return SysFetch.post(`notifications/${id}/restore`);
  },
  block: (id, body) => {
    return SysFetch.post(`notifications/${id}/block`, body);
  },
  getNotification: (body) => {
    return SysFetch.get(
      `notifications?${qs.stringify(body, { encode: false })}`
    );
  },
  getNotificationById: (id) => SysFetch.get(`notifications/${id}`),
};

export default NotificationRequest;

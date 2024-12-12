import qs from "qs";
import { SysFetchKWT } from "../../fetch";

const TopicRequest = {
  createTopic: (body) => SysFetchKWT.post(`topic`, body),
  delete: (id) => SysFetchKWT.delete(`topic/${id}`),
  edit: (id, body) => SysFetchKWT.put(`topic/${id}`, body),
  getTopicById: (id) => SysFetchKWT.get(`topic/${id}`),
  getTopics: (body) =>
    SysFetchKWT.get(`topic?${qs.stringify(body, { encode: false })}`),
};

export default TopicRequest;

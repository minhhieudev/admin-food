import { SysFetchKWT } from "../../fetch";

const KeywordRequest = {
  createKeyword: (body) => SysFetchKWT.post(`/`, body),
  delete: (id) => SysFetchKWT.delete(`/${id}`),
  edit: (id, body) => SysFetchKWT.put(`/${id}`, body),
  getKeywordById: (id) => SysFetchKWT.get(`/${id}`),
  getKeywords: (body) => SysFetchKWT.get(`/`, { params: body }),
};

export default KeywordRequest;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
  keySearch: "",
  scriptGroupCode: "",
  serviceDetail: undefined,
  serviceGroup: [],
  serviceTags: [],
  scriptGroupCodeList: [],
};

const ServiceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    upload: (state, { payload }) => {},
    getScriptGroupCodeList: (state, { payload }) => {},
    setScriptGroupCodeList: (state, { payload }) => {
      state.scriptGroupCodeList = payload;
    },
    setServiceGroup: (state, { payload }) => {
      state.serviceGroup = payload;
    },
    setServiceTags: (state, { payload }) => {
      state.serviceTags = payload;
    },
    getCreateInfo: () => {},
    createService: (state, { payload }) => {},
    edit: (state, { payload }) => {},
    getServices: () => {},
    setServices: (state, { payload }) => {
      state.serviceList = payload;
    },
    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },
    setKeySearch: (state, { payload }) => {
      state.keySearch = payload;
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },
    setScriptGroupCode: (state, { payload }) => {
      state.scriptGroupCode = payload;
      state.keySearch = "";
      state.serviceList = [];
    },
    getServiceById: (state, { payload }) => {},
    setServiceDetail: (state, { payload }) => {
      state.serviceDetail = payload;
    },
    resetSession: (state) => {
      state.keySearch = "";
      state.serviceList = [];
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },
    delete: (state, { payload }) => {},
    block: (state, { payload }) => {},
    restore: (state, { payload }) => {},
    createServiceGroup: (state, { payload }) => {},
    createServiceTag: (state, { payload }) => {},
    deleteServiceGroup: (state, { payload }) => {},
  },
});

const ServiceReducer = ServiceSlice.reducer;
export default ServiceReducer;

export const ServiceActions = ServiceSlice.actions;
export const ServiceSelectors = {
  serviceList: (state) => state.service.serviceList,
  pagination: (state) => state.service.pagination,
  keySearch: (state) => state.service.keySearch,
  scriptGroupCode: (state) => state.service.scriptGroupCode,
  serviceDetail: (state) => state.service.serviceDetail,
  serviceGroup: (state) => state.service.serviceGroup,
  serviceTags: (state) => state.service.serviceTags,
  scriptGroupCodeList: (state) => state.service.scriptGroupCodeList,
};

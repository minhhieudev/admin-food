import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
  keySearch: "",
  scriptGroupCode: "",
  notificationDetail: undefined,
  notificationGroup: [],
  notificationTags: [],
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification: (state, { payload }) => {},
    edit: (state, { payload }) => {},
    getNotifications: () => {},
    setNotifications: (state, { payload }) => {
      state.notificationList = payload;
    },
    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },
    setKeySearch: (state, { payload }) => {
      state.keySearch = payload;
    },
    getNotificationById: (state, { payload }) => {},
    setNotificationDetail: (state, { payload }) => {
      state.notificationDetail = payload;
    },
    resetSession: (state) => {
      state.keySearch = "";
      state.notificationList = [];
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },
    delete: (state, { payload }) => {},
    restore: (state, { payload }) => {},
  },
});

const NotificationReducer = NotificationSlice.reducer;
export default NotificationReducer;

export const NotificationActions = NotificationSlice.actions;
export const NotificationSelectors = {
  notificationList: (state) => state.notification.notificationList,
  pagination: (state) => state.notification.pagination,
  keySearch: (state) => state.notification.keySearch,
  notificationDetail: (state) => state.notification.notificationDetail,
};

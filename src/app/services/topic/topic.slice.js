import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topicList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
  search: "",
  topicDetail: undefined,
};

const TopicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    getTopics: () => {},
    getAllTopics: () => {},
    setTopics: (state, { payload }) => {
      state.topicList = payload;
    },
    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },
    setSearch: (state, { payload }) => {
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
      state.search = payload;
    },
    getTopicById: (state, { payload }) => {},
    setTopicDetail: (state, { payload }) => {
      state.topicDetail = payload;
    },
    createTopic: (state, { payload }) => {},
    delete: (state, { payload }) => {},
    edit: (state, { payload }) => {},
  },
});

const TopicReducer = TopicSlice.reducer;
export default TopicReducer;

export const TopicActions = TopicSlice.actions;
export const TopicSelectors = {
  topicList: (state) => state.topic.topicList,
  pagination: (state) => state.topic.pagination,
  search: (state) => state.topic.search,
  topicDetail: (state) => state.topic.topicDetail,
};

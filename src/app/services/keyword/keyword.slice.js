import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keywordList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
  search: "",
  keywordDetail: undefined,
};

const KeywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    getKeywords: () => {},
    setKeywords: (state, { payload }) => {
      state.keywordList = payload;
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
    getKeywordById: (state, { payload }) => {},
    setKeywordDetail: (state, { payload }) => {
      state.keywordDetail = payload;
    },
    createKeyword: (state, { payload }) => {},
    delete: (state, { payload }) => {},
    edit: (state, { payload }) => {},
  },
});

const KeywordReducer = KeywordSlice.reducer;
export default KeywordReducer;

export const KeywordActions = KeywordSlice.actions;
export const KeywordSelectors = {
  keywordList: (state) => state.keyword.keywordList,
  pagination: (state) => state.keyword.pagination,
  search: (state) => state.keyword.search,
  keywordDetail: (state) => state.keyword.keywordDetail,
};

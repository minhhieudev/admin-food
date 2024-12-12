import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mealList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
  keySearch: "",
  status: "",
  mealDetail: null,
  mealGroup: [],
  mealTags: [],
  scriptGroupCodeList: [],
};

const MealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    upload: (state, { payload }) => {},
    getScriptGroupCodeList: (state, { payload }) => {},
    setScriptGroupCodeList: (state, { payload }) => {
      state.scriptGroupCodeList = payload;
    },
    setMealGroup: (state, { payload }) => {
      state.mealGroup = payload;
    },
    setMealTags: (state, { payload }) => {
      state.mealTags = payload;
    },
    getCreateInfo: () => {},
    createMeal: (state, { payload }) => {},
    edit: (state, { payload }) => {},
    getMeals: () => {},
    setMeals: (state, { payload }) => {
      console.log('setMeals reducer called with:', payload);
      state.mealList = payload;
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
    setStatus: (state, { payload }) => {
      state.status = payload;
      //state.keySearch = "";
      state.mealList = [];
    },
    updateMealStatus: (state, action) => {
      if (state.mealDetail) {
        state.mealDetail.status = action.payload.status;
      }
    },
    getMealById: (state, { payload }) => {},
    setMealDetail: (state, action) => {
      state.mealDetail = action.payload;
    },
    resetSession: (state) => {
      state.keySearch = "";
      state.mealList = [];
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
    createMealGroup: (state, { payload }) => {},
    createMealTag: (state, { payload }) => {},
    deleteMealGroup: (state, { payload }) => {},
  },
});

const MealReducer = MealSlice.reducer;
export default MealReducer;

export const MealActions = MealSlice.actions;
export const MealSelectors = {
  mealList: (state) => state.meal.mealList,
  pagination: (state) => state.meal.pagination,
  keySearch: (state) => state.meal.keySearch,
  scriptGroupCode: (state) => state.meal.scriptGroupCode,
  mealDetail: (state) => state.meal.mealDetail,
  mealGroup: (state) => state.meal.mealGroup,
  mealTags: (state) => state.meal.mealTags,
  scriptGroupCodeList: (state) => state.meal.scriptGroupCodeList,
};

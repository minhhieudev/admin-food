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
  mealDetail: undefined,
  subMealForSelect: [],
};

const SubdescriptionMealSlice = createSlice({
  name: "subdescriptionMeal",
  initialState,
  reducers: {
    getSubdescriptionMeals: (state, action) => {},
    setSubdescriptionMeals: (state, action) => {
      state.mealList = action.payload.meals;
      state.pagination = action.payload.pagination;
    },

    getForSelect: (state, action) => {},
    setSubMealForSelect: (state, action) => {
      state.subMealForSelect = action.payload;
    },

    createSubdescriptionMeal: (state, action) => {},
    edit: (state, action) => {},
    deleteSubdescriptionMeal: (state, action) => {},
    setKeySearch: (state, action) => {
      state.keySearch = action.payload;
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },
    resetState: (state) => {
      state.keySearch = "";
      state.mealList = [];
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },

    getSubdescriptionMealById: (state, action) => {},
    setSubdescriptionMealDetail: (state, action) => {
      state.mealDetail = action.payload;
    },

    resetSession: (state) => {
      state.search = "";
      state.orderList = [];
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },
    block: (state, action) => {},
    restore: (state, action) => {},
  },
});

const SubdescriptionMealReducer = SubdescriptionMealSlice.reducer;
export default SubdescriptionMealReducer;

export const SubdescriptionMealActions = SubdescriptionMealSlice.actions;
export const subdescriptionMealSelectors = {
  mealList: (state) => state.subdescriptionMeal.mealList,
  pagination: (state) => state.subdescriptionMeal.pagination,
  keySearch: (state) => state.subdescriptionMeal.keySearch,
  mealDetail: (state) => state.subdescriptionMeal.mealDetail,
  subMealForSelect: (state) => state.subdescriptionMeal.subMealForSelect,
};

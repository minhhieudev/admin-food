import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0
  },
  keySearch: "",
  ingredientDetail: undefined,
  currentCustomer: null,
  customerList: [],
  ingredients:[],
  listGroup:[],
  listTag:[]
};

const IngredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    getIngredients: (state, { payload }) => {},
    getForSelect: (state, { payload }) => {},
    getListGroup: (state, { payload }) => {},
    getListTag: (state, { payload }) => {},
    getCreateInfo: () => {},
    setIngredients: (state, { payload }) => {
      state.ingredientList = payload.ingredients;
      state.pagination = payload.pagination;
    },
    setForSelect: (state, { payload }) => {
      state.ingredients = payload.ingredients;
    },
    setListGroup: (state, { payload }) => {
      state.listGroup = payload;
    },
    setListTag: (state, { payload }) => {
      state.listTag = payload;
    },
    setIngredients: (state, { payload }) => {
      state.ingredientList = payload.ingredients;
      state.pagination = payload.pagination;
    },
    createIngredient: (state, { payload }) => {},
    createIngredientGroup: (state, { payload }) => {},
    createIngredientTag: (state, { payload }) => {},
    edit: (state, { payload }) => {},
    deleteIngredient: (state, { payload }) => {},
    deleteIngredientGroup: (state, { payload }) => {},
    deleteIngredientTag: (state, { payload }) => {},
    setKeySearch: (state, { payload }) => {
      state.keySearch = payload;
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0
      };
    },
    resetState: (state) => {
      state.keySearch = "";
      state.ingredientList = [];
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0
      };
    },
    setCurrentCustomer: (state, { payload }) => {
      state.currentCustomer = payload;
    },
    setCustomerList: (state, { payload }) => {
      state.customerList = payload;
    },
    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },

    getIngredientById: (state, { payload }) => {},
    setIngredientDetail: (state, { payload }) => {
      state.ingredientDetail = payload;
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
    block: (state, { payload }) => {},
    restore: (state, { payload }) => {},
  }
});

const IngredientReducer = IngredientSlice.reducer;
export default IngredientReducer;

export const IngredientActions = IngredientSlice.actions;
export const IngredientSelectors = {
  ingredientList: (state) => state.ingredient.ingredientList,
  pagination: (state) => state.ingredient.pagination,
  keySearch: (state) => state.ingredient.keySearch,
  ingredientDetail: (state) => state.ingredient.ingredientDetail,
  currentCustomer: (state) => state.ingredient.currentCustomer,
  customerList: (state) => state.ingredient.customerList,
  ingredients: (state) => state.ingredient.ingredients,
  listGroup: (state) => state.ingredient.listGroup,
  listTag: (state) => state.ingredient.listTag,
};

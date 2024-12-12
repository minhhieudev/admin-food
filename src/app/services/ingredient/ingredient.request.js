import SysFetch from "../../fetch";
import qs from "qs";

const IngredientRequest = {
  getIngredients: (params) => {
    return SysFetch.get(`ingredients?${qs.stringify(params, { encode: false })}`);
  },
  getForSelect: (params) => {
    return SysFetch.get('ingredients/getIngredients/select');
  },
  getListGroup: (params) => {
    return SysFetch.get('ingredient-group');
  },
  getListTag: (params) => {
    return SysFetch.get('ingredient-tag');
  },

  createIngredient: (data) => {
    return SysFetch.post("ingredients", data);
  },
  createIngredientGroup: (data) => {
    return SysFetch.post('ingredient-group', data);
  },
  createIngredientTag: (data) => {
    return SysFetch.post("ingredient-tag", data);
  },

  edit: (id, body) => {
    return SysFetch.put(`ingredients/${id}`, body);
  },

  deleteIngredient: (id) => {
    return SysFetch.delete(`ingredients/${id}`);
  },
  deleteIngredientGroup: (id) => {
    return SysFetch.delete(`ingredient-group/${id}`);
  },
  deleteIngredientTag: (id) => {
    return SysFetch.delete(`ingredient-tag/${id}`);
  },
  getIngredientById: (id) => SysFetch.get(`ingredients/${id}`),

};

export default IngredientRequest;

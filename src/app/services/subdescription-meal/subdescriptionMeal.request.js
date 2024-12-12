import SysFetch from "../../fetch";
import qs from "qs";

const SubdescriptionMealRequest = {
  getSubdescriptionMeals: (params) => {
    return SysFetch.get(`subdescription-meals?${qs.stringify(params, { encode: false })}`);
  },
  getForSelect: (params) => {
    return SysFetch.get("subdescription-meals/getForSelect");
  },

  createSubdescriptionMeal: (data) => {
    console.log('hi')
    return SysFetch.post("subdescription-meals", data);
  },
  edit: (id, body) => {
    return SysFetch.put(`subdescription-meals/${id}`, body);
  },
  deleteSubdescriptionMeal: (id) => {
    return SysFetch.delete(`subdescription-meals/${id}`);
  },
  getSubdescriptionMealById: (id) => SysFetch.get(`subdescription-meals/${id}`),

};

export default SubdescriptionMealRequest;

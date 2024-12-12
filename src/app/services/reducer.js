import AppReducer from "./app/app.slice.js";
import CustomerReducer from "./customer/customer.slice.js";
import KeywordReducer from "./keyword/keyword.slice.js";
import LoginReducer from "./login/login.slice.js";
import NotificationReducer from "./notification/notification.slice.js";
import OrderReducer from "./order/order.slice.js";
import PartnerReducer from "./partner/partner.slice.js";
import ServiceReducer from "./service/service.slice.js";
import SettingReducer from "./setting/setting.slice.js";
import TopicReducer from "./topic/topic.slice.js";
import DashBoardReducer from "./dashboard/dashboard.slice.js";

import IngredientReducer from "./ingredient/ingredient.slice.js";
import SubdescriptionMealReducer from "./subdescription-meal/subdescriptionMeal.slice.js";
import registerReducer from "./register/register.slice.js";
import MealReducer from "./meal/meal.slice.js";


const reducer = {
  app: AppReducer,
  login: LoginReducer,
  customer: CustomerReducer,
  order: OrderReducer,
  service: ServiceReducer,
  setting: SettingReducer,
  notification: NotificationReducer,
  topic: TopicReducer,
  keyword: KeywordReducer,
  partner: PartnerReducer,
  dashboard: DashBoardReducer,

  ingredient: IngredientReducer,
  subdescriptionMeal: SubdescriptionMealReducer,
  register: registerReducer,
  meal: MealReducer
};

export default reducer;

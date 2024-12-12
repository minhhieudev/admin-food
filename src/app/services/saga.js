import { all, call } from "redux-saga/effects";
import CustomerSaga from "./customer/customer.saga";
import LoginSaga from "./login/login.saga";
import OrderSaga from "./order/order.saga";
import ServiceSaga from "./service/service.saga";
import SettingSaga from "./setting/setting.saga";
import NotificationSaga from "./notification/notification.saga";
import TopicSaga from "./topic/topic.saga";
import KeywordSaga from "./keyword/keyword.saga";
import PartnerSaga from "./partner/partner.saga";
import DashBoardSaga from "./dashboard/dashboard.saga";

import IngredientSaga from "./ingredient/ingredient.saga";
import SubdescriptionMealSaga from "./subdescription-meal/subdescriptionMeal.saga";
import RegisterSaga from "./register/register.saga";
import MealSaga from "./meal/meal.saga";

function* rootSaga() {
  yield all([
    call(LoginSaga),
    call(CustomerSaga),
    call(OrderSaga),
    call(ServiceSaga),
    call(SettingSaga),
    call(NotificationSaga),
    call(TopicSaga),
    call(KeywordSaga),
    call(PartnerSaga),
    call(DashBoardSaga),

    call(IngredientSaga),
    call(SubdescriptionMealSaga),
    call(RegisterSaga),
    call(MealSaga)

  ]);
}

export default rootSaga;

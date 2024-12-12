import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "../app/services/store";

import { setConfigAxios } from "../app/fetch";
import CONST from "../app/services/const";
import InitComponent from "../components/InitComponent";
import ChangePasswordPage from "./change-password/ChangePasswordPage";
import CustomerDetailPage from "./customer-detail/CustomerDetailPage";
import CustomerPage from "./customer/CustomerPage";
import GeneralSettingPage from "./general-setting/GeneralSettingPage";
import HomePage from "./home/HomePage";
import KeywordEditPage from "./keyword-edit/KeywordEditPage";
import KeywordPage from "./keyword/KeywordPage";
import LoginPage from "./login/LoginPage";
import NotificationCreatePage from "./notification-create/NotificationCreatePage";
import NotificationEditPage from "./notification-edit/NotificationEditPage";
import NotificationPage from "./notifications/NotificationPage";
import OrderDetailPage from "./order-detail/OrderDetailPage";
import OrderPage from "./order/OrderPage";
import PageNotFound from "./page-not-found/PageNotFoundPage";
import PartnerSettingPage from "./partner-setting/PartnerSettingPage";
import PaymentSettingPage from "./payment-setting/PaymentSettingPage";
import ServiceCreatePage from "./service-create/ServiceCreatePage";
import ServiceEditPage from "./service-edit/ServiceEditPage";
import ServicePage from "./service/ServicePage";
import TopicEditPage from "./topic-edit/TopicEditPage";
import TopicPage from "./topic/TopicPage";
import DashBoardPage from "./dashboard/DashBoardPage";

import IngredientPage from "./ingredient/IngredientPage";
import IngredientCreatePage from "./ingredient-create/IngredientCreatePage";
import IngredientEditPage from "./ingredient-edit/IngredientEditPage";

import SubMealPage from "./subdescription-meal/MealPage";
import MealCreatePage from "./subdescription-meal-create/MealCreatePage";
import MealEditPage from "./subdescription-meal-edit/MealEditPage";
import MealDetail from "./meal-detail/MealDetail";

import RegisterPage from "./register/RegisterPage";
import ConfirmTokenComponent from "./register/ConfirmTokenComponent";
import VerifyPasswordPage from "./verify-password/VerifyPasswordPage";
import MealPage from "./meal/MealPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "services",
        errorElement: <PageNotFound />,
        children: [
          {
            path: "dashboard",
            element: <DashBoardPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "services",
            element: <ServicePage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "services/create",
            element: <ServiceCreatePage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "services/edit/:id",
            element: <ServiceEditPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "meals",
            element: <MealPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "customers/:id",
            element: <CustomerDetailPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "customers",
            element: <CustomerPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "orders",
            element: <OrderPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "orders/:id",
            element: <OrderDetailPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "notifications",
            element: <NotificationPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "notifications/create",
            element: <NotificationCreatePage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "notifications/edit/:id",
            element: <NotificationEditPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/general",
            element: <GeneralSettingPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/payment",
            element: <PaymentSettingPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/partner",
            element: <PartnerSettingPage />,
            errorElement: <PageNotFound />,
          },
          ////////////////
          {
            path: "ingredients",
            element: <IngredientPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "ingredients/create",
            element: <IngredientCreatePage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "ingredients/edit/:id",
            element: <IngredientEditPage />,
            errorElement: <PageNotFound />,
          },

          {
            path: "sub-meals",
            element: <SubMealPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "sub-meals/edit/:id",
            element: <MealEditPage />,
            errorElement: <PageNotFound />,
          },

          {
            path: "meals/create",
            element: <MealCreatePage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "meals/edit/:id",
            element: <MealDetail />,
            errorElement: <PageNotFound />,
          },

          {
            path: "subdescription-meals",
            element: <SubMealPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "sub-meals/create",
            element: <MealCreatePage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "subdescription-meals/edit/:id",
            element: <MealEditPage />,
            errorElement: <PageNotFound />,
          },
        ],
      },
      {
        path: "keyword",
        errorElement: <PageNotFound />,
        children: [
          {
            path: "dashboard",
            element: <DashBoardPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/general",
            element: <GeneralSettingPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/payment",
            element: <PaymentSettingPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/partner",
            element: <PartnerSettingPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "topics",
            element: <TopicPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "keywords",
            element: <KeywordPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "topics/edit/:id",
            element: <TopicEditPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "keywords/edit/:id",
            element: <KeywordEditPage />,
            errorElement: <PageNotFound />,
          },
        ],
      },
      {
        path: "system",
        errorElement: <PageNotFound />,
        children: [
          {
            path: "change-password",
            element: <ChangePasswordPage />,
            errorElement: <PageNotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/register/:token",
    element: <ConfirmTokenComponent />,
    errorElement: <PageNotFound />,
    
  },
  {
    path: "/verify-password",
    element: <VerifyPasswordPage />,
    errorElement: <PageNotFound />,
  },
]);

const accessToken = localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);
setConfigAxios(accessToken);

function App() {
  return (
    <Provider store={store}>
      <InitComponent />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

import SysFetch from "../../fetch";

const LoginRequest = {
  checkLogin: ({ body }) => SysFetch.post("admin-auth/login", body),
  changePassword: ({ body }) =>
    SysFetch.post("admin-auth/change-password", body),
};

export default LoginRequest;

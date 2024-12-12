import SysFetch from "../../fetch";

const RegisterRequest = {
  register: (body) => SysFetch.post("admin-auth/register", body),
  checkLogin: (body) => SysFetch.post("admin-api/customer-auth/login", body),
  checkBioLink: (body) => SysFetch.post("frontend-api/customer-auth/check-bio-link", body),
};

export default RegisterRequest;





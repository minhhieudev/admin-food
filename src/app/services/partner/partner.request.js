import SysFetch from "../../fetch";

const PartnerRequest = {
  getBalance: (partnerCode) => {
    return SysFetch.get(`partner/balance/${partnerCode}`);
  },
};
export default PartnerRequest;

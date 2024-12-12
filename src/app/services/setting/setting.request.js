import SysFetch from "../../fetch";
import qs from "qs";

const SettingRequest = {
  getPaymentActivity: (partner, body) => {
    return SysFetch.get(
      `settings/getPaymentActivity/${partner}?${qs.stringify(body, {
        encode: true,
      })}`
    );
  },
  bulkCreate: (body) => {
    return SysFetch.post(`service-packages/bulk-create`, body);
  },
  removeOngTrumService: () => {
    return SysFetch.delete(`service-packages/remove-partner/ongtrum`);
  },
  getImportServiceList: () => {
    return SysFetch.get(`settings/ongtrum/getImportServiceList`);
  },
  getBankList: () => {
    return SysFetch.get(`https://api.vietqr.io/v2/banks`);
  },
  getSettings: (body) => {
    return SysFetch.get(`settings?${qs.stringify(body, { encode: false })}`);
  },
  setSettings: (body) => {
    return SysFetch.put(`settings`, {
      updateData: body,
    });
  },
};
export default SettingRequest;

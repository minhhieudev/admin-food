import SysFetch from "../../fetch";
import qs from "qs";

const ServiceRequest = {
  getScriptGroupCodeList: (partnerCode) => {
    return SysFetch.get(
      `service-groups/scriptGroupCode?partnerCode=${partnerCode}`
    );
  },
  deleteServiceGroup: (id) => {
    return SysFetch.delete(`service-groups/${id}`);
  },
  createServiceTag: (name) => {
    return SysFetch.post("service-tags", {
      name,
    });
  },
  createServiceGroup: (name) => {
    return SysFetch.post("service-groups", {
      name,
    });
  },
  getServiceTags: () => {
    return SysFetch.get("service-tags");
  },
  getServiceGroup: () => {
    return SysFetch.get("service-groups");
  },
  delete: (id) => {
    return SysFetch.delete(`service-packages/${id}`);
  },
  edit: (id, body) => {
    return SysFetch.put(`service-packages/${id}`, body);
  },
  create: (body) => {
    return SysFetch.post(`service-packages`, body);
  },
  restore: (id) => {
    return SysFetch.post(`service-packages/${id}/restore`);
  },
  block: (id, body) => {
    return SysFetch.post(`service-packages/${id}/block`, body);
  },
  getServices: (body) => {
    return SysFetch.get(
      `service-packages?${qs.stringify(body, { encode: false })}`
    );
  },
  upload: (file) => {
    return SysFetch.post("service-packages/upload",file);
  },

  getServiceById: (id) => SysFetch.get(`service-packages/${id}`),
  getPaymentActivities: (id, body) =>
    SysFetch.get(
      `payment-activity/${id}?${qs.stringify(body, {
        encode: false,
      })}`
    ),
};

export default ServiceRequest;

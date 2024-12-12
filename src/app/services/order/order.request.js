import SysFetch from "../../fetch";
import qs from "qs";

const OrderRequest = {
  searchCustomerByUsername: (email) => {
    return SysFetch.get(
      `customer?pageSize=20&${qs.stringify(
        { email },
        { encode: false }
      )}`
    );
  },
  getOrders: (body) => {
    return SysFetch.get(
      `orders/admin?${qs.stringify(body, { encode: false })}`
    );
  },
  getOrderById: (id) => SysFetch.get(`orders/admin/${id}`),
  getPaymentActivities: (id, body) =>
    SysFetch.get(
      `payment-activity/${id}?${qs.stringify(body, {
        encode: false,
      })}`
    ),
};

export default OrderRequest;

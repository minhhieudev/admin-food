import SysFetch from "../../fetch";

const DashBoardRequest = {
  system: () => SysFetch.get(`dashboard/statistical/system`),
  order: (type) =>
    SysFetch.get(`dashboard/statistical/order?type=${type}&dataType=order`),
  money: (type) =>
    SysFetch.get(`dashboard/statistical/order?type=${type}&dataType=money`),
  revenue: (type) =>
    SysFetch.get(`dashboard/statistical/order?type=${type}&dataType=revenue`),
  getDataPie: (type) =>
    SysFetch.get(`dashboard/statistical/platform?dataType=${type}`),
  getDatalLine: (type, dataType) =>
    SysFetch.get(
      `dashboard/statistical/partner?type=${type}&dataType=${dataType}`
    ),
  /*================================================================================*/
  /*
  người viết: Đinh văn Thành
  Ngày viết: 06-06-2024
  Chức năng: - call api lấy thông tin tổng số khách hàng có đơn hàng nhiều nhất
             - call api lấy thông tin tổng số khách hàng nạp nhiều nhất
             - call api lấy thông tin danh sách dịch vụ
  Method: GET
  Param: type là khung giờ người đùng muốn tìm kiếm
    VD: khách hàng chọn vào khung giờ 24h thì type sẽ là 0 
    => nếu mà type bằng undefined (không tông tại) thì mặc định gửi cho server là 0
    Quy ước như sau :  
    {
      name: "24H",
      key: 0,  => đây là type sẽ gửi sang server
    },
    {
      name: "7 Ngày",
      key: 1, => đây là type sẽ gửi sang server
    },
    {
      name: "12 Tháng",
      key: 2, => đây là type sẽ gửi sang server
    },
    ====================================================================
    Ghi chú: riêng api (được viết tại Function serviceList) lấy thông tin danh sách dịch vụ có thêm param 
    Param : search là thông tin người dùng muốn tìm kiếm
*/
  customerDeposit: (type) =>
    SysFetch.get(`dashboard/list/customer-recharge?type=${type ? type : 0}`),
  customerOrder: (type) =>
    SysFetch.get(`dashboard/list/customer-order?type=${type ? type : 0}`),
  serviceList: (type, page, search) =>
    SysFetch.get(
      `dashboard/list/services?type=${
        type ? type : 0
      }&search=${search}&page=${page}&pageSize=8`
    ),
  /*============================ END =====================================*/
};

export default DashBoardRequest;

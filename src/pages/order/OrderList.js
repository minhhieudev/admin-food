import moment from "moment/moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  OrderActions,
  OrderSelectors,
} from "../../app/services/order/order.slice";
import { formatPriceVND } from "../../app/utils/format";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import OrderSearch from "./OrderSearch";
import EyeIcon from "./icons/EyeIcon";

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderList = useSelector(OrderSelectors.orderList);
  const pagination = useSelector(OrderSelectors.pagination);

  useEffect(() => {
    dispatch(OrderActions.getOrders());
  }, [pagination.page, navigate, dispatch]);

  useEffect(() => {
    getOrderList();

    return () => {
      dispatch(OrderActions.resetSession());
    };
  }, [navigate, dispatch]);

  const getOrderList = () => {
    dispatch(OrderActions.getOrders());
  };

  const thead = [
    {
      name: "Mã đơn hàng",
      style: { width: 120 },
      className: "",
    },
    {
      name: "Gói dịch vụ",
      style: {
        textAlign: "left",
      },
    },

    {
      name: "Khách hàng",
      style: { width: 200 },
    },
    // {
    //   name: "Trạng thái",
    //   style: {
    //     width: 140,
    //   },
    // },
    // {
    //   name: "Đơn vị xử lý",
    //   style: { width: 120 },
    // },
    {
      name: "Giá trị đơn hàng",
      style: {
        width: 140,
      },
    },
    {
      name: "Ngày tạo",
      style: {
        width: 150,
      },
    },
    {
      name: "Địa chỉ",
      style: {
        width: 150,
      },
    },
    {
      name: "thao tác",
      style: {
        width: 100,
      },
    },
  ];

  const genRenderList = useCallback(() => {
    return (orderList || []).map((x, index) => {
      return [
        { value: x?.code },
        {
          value: x?.servicePackage?.name,
          style: {
            textAlign: "left",
          },
        },
        { value: [x?.customer?.info?.firstName, x?.customer?.info?.lastName].filter(Boolean).join(' ') },
        // {
        //   value: odGenStatus(x.status),
        //   style: {
        //     color: odGenColor(x.status),
        //   },
        // },
        // 
        ,
        { value: `${formatPriceVND(x?.totalPrice)}đ` },
        { value: moment(x.createdAt).format("HH:mm DD/MM/YYYY") },
        { value: x.addressDelivery },
        {
          value: (
            <div className="order-btn-area">
              <button
                className="order-icon-edit"
                onClick={() => navigate(`/services/orders/${x._id}`)}
              >
                <EyeIcon />
              </button>
            </div>
          ),
        },
      ];
    });
  }, [orderList]);

  const onChangePage = (page) => {
    dispatch(
      OrderActions.setPagination({
        ...pagination,
        page,
      })
    );
  };

  return (
    <div>
      <OrderSearch />
      <MST.Table head={thead} body={genRenderList()} />
      <div className="order-pagination">
        <Pagination
          onChange={onChangePage}
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalPage={pagination.totalPage}
          total={pagination.total}
        />
      </div>
    </div>
  );
}

export default OrderList;

export const odGenColor = (content) => {
  switch (content) {
    case "running":
      return "#FF8900";
    case "completed":
      return "#23C16B";
  }
};
export const odGenStatus = (status) => {
  switch (status) {
    case "running":
      return "Đang chạy";
    case "completed":
      return "Hoàn tất";
    case "cancelled":
      return "Đã huỷ";
    default:
      return "...";
  }
};

import moment from "moment/moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CustomerActions,
  CustomerSelectors,
} from "../../app/services/customer/customer.slice";
import { formatPriceVND } from "../../app/utils/format";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import EditIcon from "../../images/icons/EditIcon";
import CustomerSearch from "./CustomerSearch";

function CustomerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerList = useSelector(CustomerSelectors.customerList);
  const pagination = useSelector(CustomerSelectors.pagination);

  useEffect(() => {
    dispatch(CustomerActions.getCustomers());
  }, [pagination.page, dispatch]);

  useEffect(() => {
    getCustomerList();
    return () => {
      dispatch(CustomerActions.resetSession());
    };
  }, [dispatch]);
  const getCustomerList = () => {
    dispatch(CustomerActions.getCustomers());
  };
  const thead = [
    {
      name: "STT",
      style: { width: 20 },
      className: "",
    },
    {
      name: "email",
      style: {
        textAlign: "left",
      },
    },
    {
      name: "số dư ví",
      style: {
        width: 140,
      },
    },
    {
      name: "Truy cập",
      style: {
        width: 140,
      },
    },
    {
      name: "trạng thái",
      style: {
        width: 100,
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
    return customerList.map((x, index) => {
      return [
        { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
        {
          value: x.email,
          style: {
            textAlign: "left",
          },
        },
        { value: `${formatPriceVND(x.balance)}đ` },
        { value: moment(x.lastAccessed).format("HH:mm DD/MM/YYYY") },
        {
          value: cusGenStatus(x?.status),
          style: {
            color: cusGenColor(x?.status),
          },
        },
        {
          value: (
            <div className="customer-btn-area">
              <button
                className="customer-icon-edit"
                onClick={() => navigate(`/services/customers/${x._id}`)}
              >
                <EditIcon />
              </button>
            </div>
          ),
        },
      ];
    });
  }, [customerList]);

  const onChangePage = (page) => {
    dispatch(
      CustomerActions.setPagination({
        ...pagination,
        page,
      })
    );
  };

  return (
    <div>
      <CustomerSearch />
      <MST.Table head={thead} body={genRenderList()} />
      <div className="customer-pagination">
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

export default CustomerList;
export const cusGenStatus = (status) => {
  switch (status) {
    case "active":
      return "Hoạt động";
    case "blocked":
      return "Đã khoá";
    default:
      return "...";
  }
};

export const cusGenColor = (status) => {
  switch (status) {
    case "active":
      return "#23C16B";
    case "blocked":
      return "#D3180C";
    default:
      return "...";
  }
};

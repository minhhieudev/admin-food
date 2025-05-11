import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CONST from "../../app/services/const";
import {
  ServiceActions,
  ServiceSelectors,
} from "../../app/services/service/service.slice";
import { formatPriceVND } from "../../app/utils/format";
import Pagination from "../../components/base/pagination/Pagination";
import Table from "../../components/base/table/Table";
import ServiceDeleteModal from "./Service.Options";
import ServiceSearch from "./ServiceSearch";
import "./style.css";

function ServiceList() {
  const dispatch = useDispatch();
  const serviceList = useSelector(ServiceSelectors.serviceList);
  const pagination = useSelector(ServiceSelectors.pagination);
  useEffect(() => {
    dispatch(ServiceActions.getServices());
    dispatch(ServiceActions.getScriptGroupCodeList());
  }, [pagination.page]);

  useEffect(() => {
    console.log('serviceList:',serviceList)
  }, [serviceList]);

  const thead = [
    {
      name: "STT",
      style: { width: 20 },
      className: "",
    },
    {
      name: "ẢNH",
      style: { width: 30 },
    },
    {
      style: {
        textAlign: "left",
      },
      name: "Tên gói ăn",
    },
    {
      name: "Giá dịch vụ",
      style: { width: 120 },
    },
    // {
    //   name: "nhóm",
    //   style: { width: 120 },
    // },
    {
      name: "trạng thái",
      style: { width: 120 },
    },
    {
      name: "thao tác",
      style: { width: 100 },
    },
  ];

  const genDataTable = () => {
    try {
      return serviceList.map((x, index) => {
        return [
          { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
          {
            value: (() => {
              try {
                return (
                  <img
                    className="service-list-icon"
                    src={`${process.env.REACT_APP_CDN_URL}${x.mainImage}`}
                  />
                );
              } catch (error) {
                return [];
              }
            })(),
          },
          {
            style: {
              textAlign: "left",
            },
            value: x.name,
          },
          {
            value: `${formatPriceVND(x.price)}đ`,
          },
          // {
          //   value: x.serviceGroup.name,
          // },   bản k model bỏ do k có group
          // {
          //   value: x?.partnerCode === "local" ? "Nội bộ" : x?.partnerCode,
          // },
          {
            value: x.status ? "Sẵn sàng bán" : "Ngừng bán",
            style: {
              color: sGenColor(x.status ? "active" : "unactive"),
            },
          },
          {
            value: <ServiceDeleteModal id={x._id} />,
          },
        ];
      });
    } catch (error) {
      return [];
    }
  };

  return (
    <div>
      <ServiceSearch />
      <Table head={thead} body={genDataTable()} />
      <div className="service-pagination">
        <Pagination
          {...pagination}
          onChange={(page) => {
            dispatch(
              ServiceActions.setPagination({
                ...pagination,
                page,
              })
            );
          }}
        />
      </div>
    </div>
  );
}

export default ServiceList;

export const sGenColor = (content) => {
  switch (content) {
    case "active":
      return "#23C16B";
    case "unactive":
      return "#72777A";
  }
};

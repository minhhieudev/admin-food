import { isEmpty } from "lodash";
import React from "react";

import MST from "../../../components";
import DeleteIcon from "./icons/DeleteIcon";
import "./style.css";

function DepDisTable({ data, onChange }) {
  const onRemove = (id) => {
    onChange(data.filter((x) => x?.id !== id));
  };

  const onChangeData = (item) => {
    onChange(
      data.map((x) => {
        if (x?.id === item?.id) {
          return item;
        } else {
          return x;
        }
      })
    );
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <table className="tcs-table-container">
        <thead className="tcs-td-head">
          <tr>
            <td className={`tcs-td-base`}>Mức giá điều kiện</td>
            <td className={`tcs-td-base`}>Tăng thêm(%)</td>
            <td
              style={{
                width: 80,
              }}
              className={`tcs-td-base`}
            >
              Thao tác
            </td>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <OneItem
                item={item}
                key={index}
                onRemove={onRemove}
                onChangeData={onChangeData}
              />
            );
          })}
        </tbody>
      </table>
      {isEmpty(data) ? (
        <div className="tcs-table-no-data">Không có dữ liệu</div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DepDisTable;

const OneItem = ({ item, onRemove, onChangeData }) => {
  return (
    <>
      <tr className="tcs-tr">
        <td className={`tcs-td-border`}>
          <MST.Input
            type="number"
            errorMessage={item?.errorMessage?.amount}
            value={item?.amount}
            onChange={(e) => {
              onChangeData({
                ...item,
                amount: e.target.value,
                errorMessage: {
                  ...item.errorMessage,
                  amount: "",
                },
              });
            }}
            placeholder="Nhập mức giá điều kiện"
            style={{
              borderWidth: 0,
            }}
          />
        </td>
        <td className={`tcs-td-border`}>
          <MST.Input
            type="number"
            errorMessage={item?.errorMessage?.discountPercent}
            value={item?.discountPercent}
            placeholder="Nhập giá trị tăng thêm"
            style={{
              borderWidth: 0,
            }}
            onChange={(e) => {
              onChangeData({
                ...item,
                discountPercent: e.target.value,
                errorMessage: {
                  ...item.errorMessage,
                  discountPercent: "",
                },
              });
            }}
          />
        </td>
        <td className={`tcs-td-border`}>
          <div className="d-flex jc-center">
            <button
              className="tcs-delete-btn"
              onClick={() => onRemove(item?.id)}
            >
              <DeleteIcon />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

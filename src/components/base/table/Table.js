import React from "react";
import "./style.css";
import { isEmpty } from "lodash";
function Table({ head = [], body = [] }) {
  return (
    <div>
      <table className="table-container">
        <thead className="table-td-head">
          <tr>
            {head.map((item, index) => {
              return (
                <th
                  className={`table-td-base ${item.className}`}
                  style={{
                    ...item.style,
                  }}
                  key={`${index}`}
                >
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {body.map((item, index) => {
            return (
              <tr key={index} className="table-tr">
                {item.map((oneTd, index2) => {
                  return (
                    <td
                      className={`table-td-base ${oneTd.className}`}
                      style={{
                        ...oneTd.style,
                      }}
                      key={`${oneTd.value}${index2}`}
                    >
                      {oneTd.value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isEmpty(body) ? (
        <div className="table-no-data">Không có dữ liệu</div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Table;

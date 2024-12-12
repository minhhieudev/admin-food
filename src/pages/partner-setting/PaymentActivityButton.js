import React, { useCallback, useEffect, useMemo, useState } from "react";
import MST from "../../components";
import MoneyIcon from "./icons/MoneyIcon";
import Modal from "../../components/base/modal/Modal";
import Table from "../../components/base/table/Table";
import Pagination from "../../components/base/pagination/Pagination";
import { useDispatch } from "react-redux";
import { SettingActions } from "../../app/services/setting/setting.slice";
import moment from "moment";
import { formatPriceVND } from "../../app/utils/format";

function PaymentActivityButton({ partner }) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [body, setBody] = useState({
    page: 1,
    pageSize: 10,
    search: "",
  });

  useEffect(() => {
    if (isShow) {
      getData();
    }
  }, [body]);

  const getData = useCallback(() => {
    dispatch(
      SettingActions.getPaymentActivity({
        setIsLoading,
        partner,
        body,
        onSuccess: (rs) => {
          setIsLoading(false);
          setIsShow(true);
          setData(rs?.paymentActivityList);
          setPagination(rs?.pagination);
        },
        onFail: (rs) => {
          setIsLoading(false);
        },
      })
    );
  }, [body]);

  const renderModal = useMemo(() => {
    return (
      <Modal
        content={
          <div>
            <div className="modal-header">
              Biến động số dư <span className="pa-modal-title">{partner}</span>
            </div>
            <div className="modal-body">
              <div className="pa-modal-search-container">
                <MST.Input
                  value={body?.search}
                  onChange={(e) => {
                    setBody({
                      ...body,
                      search: e.target.value,
                    });
                  }}
                  placeholder="Tìm kiếm theo mã đơn hàng"
                />
              </div>
              <div>
                <Table
                  head={[
                    {
                      name: "Mã đơn hàng",
                      style: { width: 120 },
                      className: "",
                    },
                    {
                      name: "tổng đơn",
                      style: { width: 100 },
                    },
                    {
                      style: {
                        textAlign: "left",
                        style: { width: 120 },
                      },
                      name: "Số dư thay đổi",
                    },
                    {
                      name: "số dư sau khi thay đổi",
                      style: { width: 200 },
                    },
                    {
                      name: "Thời gian",
                      style: { width: 160 },
                    },
                  ]}
                  body={(data || []).map((x) => {
                    return [
                      { value: x?.orderCode },
                      { value: formatPriceVND(x?.totalPrice) },
                      { value: formatPriceVND(x?.totalBalanceChanges) },
                      { value: formatPriceVND(x?.currentPartnerBalance) },
                      {
                        value: moment(x?.createdAt).format("HH:mm DD/MM/YYYY"),
                      },
                    ];
                  })}
                />
              </div>
              <div>
                <Pagination
                  totalPage={pagination?.totalPage}
                  page={pagination?.page}
                  pageSize={pagination?.pageSize}
                  onChange={(e) => {
                    setBody({
                      ...body,
                      page: e,
                    });
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-flex jc-between">
                <div />
                <MST.Button
                  type="outlined"
                  onClick={() => {
                    setIsShow(false);
                  }}
                >
                  Đóng
                </MST.Button>
              </div>
            </div>
          </div>
        }
        isShow={isShow}
        onHide={() => {
          setIsShow(false);
        }}
      />
    );
  }, [isShow, data, body]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      {renderModal}
      <MST.Button isLoading={isLoading} onClick={getData}>
        <MoneyIcon />
        Xem biến động số dư
      </MST.Button>
    </div>
  );
}

export default PaymentActivityButton;

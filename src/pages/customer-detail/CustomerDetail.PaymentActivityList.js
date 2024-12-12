import moment from "moment";
import { default as React, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerActions,
  CustomerSelectors,
} from "../../app/services/customer/customer.slice";
import { formatPriceVND } from "../../app/utils/format";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import CustomerDetailDeleteModal from "./CustomerDetail.DeleteModal";
import CustomerDetailRestoreModal from "./CustomerDetail.RestoreModal";
import { cdGenColor, cdGenLabel } from "./CustomerDetailPage";
import "./style.css";
function CustomerDetailPaymentActivityList({
  id,
  customerDetail,
  setIsShowConform,
  isShowConform,
}) {
  const dispatch = useDispatch();

  const paymentActivities = useSelector(CustomerSelectors.paymentActivities);
  const paginationPaymentActivities = useSelector(
    CustomerSelectors.paginationPaymentActivities
  );

  useEffect(() => {
    getPaymentActivities();
  }, [paginationPaymentActivities.page]);
  const getPaymentActivities = () => {
    dispatch(CustomerActions.getPaymentActivities(id));
  };
  const renderModalDelete = useMemo(() => {
    return customerDetail?.status !== "blocked" ? (
      <CustomerDetailDeleteModal
        id={id}
        onHide={() => setIsShowConform(false)}
      />
    ) : (
      <CustomerDetailRestoreModal
        id={id}
        onHide={() => setIsShowConform(false)}
      />
    );
  }, [customerDetail]);
  const genPaymentActivities = useCallback(() => {
    return (paymentActivities || []).map((x, index) => {
      return [
        {
          value:
            paginationPaymentActivities.pageSize *
              (paginationPaymentActivities.page - 1) +
            index +
            1,
        },
        { value: cdGenLabel(x.type) },
        {
          value: `${x.type === "order" ? "-" : ""}${formatPriceVND(x.amount)}đ`,
        },
        { value: x.transaction },
        {
          value: (
            <span
              style={{
                color: cdGenColor(x.status),
              }}
            >
              {cdGenLabel(x.status)}
            </span>
          ),
        },
        {
          style: {
            textAlign: "left",
          },
          value: x.description,
        },
        {
          value: (
            <span
              style={{
                color: "#72777A",
              }}
            >
              {moment(x?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
            </span>
          ),
        },
      ];
    });
  }, [customerDetail, paymentActivities]);

  return (
    <div>
      <MST.Modal
        isShow={isShowConform}
        content={renderModalDelete}
        onHide={() => setIsShowConform(false)}
      />
      <MST.Table
        head={[
          {
            name: "STT",
            style: {
              width: 20,
            },
          },
          {
            name: "Loại",
            style: {
              width: 100,
            },
          },
          {
            name: "Số tiền",
            style: {
              width: 100,
            },
          },
          {
            name: "Mã thanh toán",
            style: {
              width: 220,
            },
          },
          {
            name: "Trạng thái",
            style: {
              width: 100,
            },
          },
          {
            style: {
              textAlign: "left",
            },
            name: "Mô tả",
          },
          {
            name: "Thời gian",
            style: {
              width: 160,
            },
          },
        ]}
        body={genPaymentActivities()}
      />
      <div className="mt-20">
        <Pagination
          onChange={(page) => {
            dispatch(
              CustomerActions.setPaginationPaymentActivities({
                ...paginationPaymentActivities,
                page,
              })
            );
          }}
          page={paginationPaymentActivities.page}
          pageSize={paginationPaymentActivities.pageSize}
          totalPage={paginationPaymentActivities.totalPage}
          total={paginationPaymentActivities.total}
        />
      </div>
    </div>
  );
}

export default CustomerDetailPaymentActivityList;

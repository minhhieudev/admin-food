import React, { useEffect, useMemo, useState } from "react";
import DashBoardRightSearch from "./DashBoard.Right.Search.component";
import DashBoardRightSelect from "./DashBoard.Right.Select.component";
import Pagination from "../../components/base/pagination/Pagination";
import { useDispatch } from "react-redux";
import { DashBoardActions } from "../../app/services/dashboard/dashboard.slice";
import { formatPriceVND, shortenContent } from "../../app/utils/format";
import CONST from "../../app/services/const";
import { useContainerDimensions } from "../../app/hooks";
export default function DashBoardRightList(prop) {
  const dispatch = useDispatch();
  const { height } = useContainerDimensions(window);
  const { flagTab } = prop;
  const [currentDashboardSelect, setCurrentDashboardSelect] =
    useState(undefined);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [flag,setFlag] = useState(true);
  useEffect(() => {
    setFlag(true);
    setData([]);
    const timeOutIdPlatform = setTimeout(() => {
      if (flagTab === "KH đặt đơn nhiều nhất") {
        dispatch(
          DashBoardActions.getCustomerOrder({
            type: currentDashboardSelect,
            // page: page,
            onSuccess: (rs) => {
              setData(rs);
            },
          })
        );
      } else if (flagTab === "KH nạp nhiều nhất") {
        dispatch(
          DashBoardActions.getCustomerDeposit({
            type: currentDashboardSelect,
            // page: page,
            onSuccess: (rs) => {
              setData(rs);
            },
          })
        );
      } else if (flagTab === "Dịch vụ") {
        dispatch(
          DashBoardActions.getServiceList({
            type: currentDashboardSelect,
            page: page,
            search: search,
            onSuccess: (rs) => {
              setData(rs.servicePackages);
              setPagination(rs.pagination);
            },
          })
        );
      }
    }, 300);
    return () => clearTimeout(timeOutIdPlatform);
  }, [flagTab, currentDashboardSelect, page, search]);
  useEffect(() => {
    setData([]);
    setPagination({
      total: 1,
      page: 1,
      pageSize: 1,
      totalPage: 1,
    });
    setPage(1);
    setCurrentDashboardSelect({
      name: "24H",
      key: 0,
    });
  }, [flagTab]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const loadingContent = useMemo(() => {
    if (data && data.length <= 0 && flag) {
      return (
        <div>
          <div className="loader-dashboard"></div>
        </div>
      );
    } else if (data && data.length <= 0 && !flag) {
      return <div style={{ fontSize: "20px" }}>Không có dữ liệu</div>;
    }
  }, [data, flag]); 
  useEffect(() => {
    const timeOutIdPlatform = setTimeout(() => {
      setFlag(false);
    }, 10000);
    return () => clearTimeout(timeOutIdPlatform);
  }, [data, flag]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
        }}
      >
        {flagTab === "Dịch vụ" ? (
          <DashBoardRightSearch setSearch={setSearch} />
        ) : (
          ""
        )}
        <div
          style={{
            width: flagTab === "Dịch vụ" ? 120 : "100%",
            marginLeft: flagTab === "Dịch vụ" ? 20 : 0,
          }}
        >
          <DashBoardRightSelect
            width={flagTab === "Dịch vụ" ? 120 : "100%"}
            setCurrentDashboardSelect={setCurrentDashboardSelect}
            currentDashboardSelect={currentDashboardSelect}
          />
        </div>
      </div>
      <div style={{ paddingTop: "40px" }}></div>
      <div
        style={
          flagTab === "Dịch vụ"
            ? { height: height - 450 }
            : { height: height - 380 }
        }
        className="dashboard-right-list-dad"
      >
        {data && data.length > 0 ? (
          data?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  flex: 1,
                }}
              >
                <div className="dashboard-right-list">
                  <div className="dashboard-right-list-left">
                    {flagTab === "Dịch vụ" ? (
                      <img
                        className="dashboard-right-list-left-icon"
                        src={'https://t3.ftcdn.net/jpg/09/55/49/56/240_F_955495664_v5hvmLxEqyJD7HoJG7lseDP9THawXuXG.jpg'}
                        alt={`img.png`}
                      />
                    ) : flagTab === "KH đặt đơn nhiều nhất" ? (
                      <img
                        className="dashboard-right-list-left-icon"
                        src={`${
                          item?.avatar
                            ? item?.avatar
                            : `${CONST.URL.API}/images/services/other.png`
                        }`}
                        alt={`img.png`}
                      />
                    ) : flagTab === "KH nạp nhiều nhất" ? (
                      <img
                        className="dashboard-right-list-left-icon"
                        src={`${
                          item?.avatar
                            ? item?.avatar
                            : `${CONST.URL.API}/images/services/other.png`
                        }`}
                        alt={`img.png`}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      paddingRight: 20,
                    }}
                    className="dashboard-right-list-right"
                  >
                    <div className="dashboard-right-list-right-title">
                      {`${index + 1}.${shortenContent(item?.name, 30)}`}
                    </div>
                    <div
                      style={{
                        border: "1px solid #F2F4F5",
                        width: "auto",
                        margin: "10px 0 5px 0",
                      }}
                    ></div>
                    <div className="dashboard-right-list-right-under">
                      <div>
                        <p>
                          {flagTab === "Dịch vụ"
                            ? "Tổng doanh thu"
                            : flagTab === "KH đặt đơn nhiều nhất"
                            ? "đơn hoàn thành"
                            : flagTab === "KH nạp nhiều nhất"
                            ? "tổng nạp"
                            : ""}
                        </p>
                        <p>
                          {flagTab === "Dịch vụ"
                            ? `${formatPriceVND(item?.revenue)} đ`
                            : flagTab === "KH đặt đơn nhiều nhất"
                            ? `${item?.completed}`
                            : flagTab === "KH nạp nhiều nhất"
                            ? `${formatPriceVND(item?.total)} đ`
                            : ""}
                        </p>
                      </div>
                      <div>
                        <p>
                          {flagTab === "Dịch vụ"
                            ? "Lượt mua"
                            : flagTab === "KH đặt đơn nhiều nhất"
                            ? "tổng đơn"
                            : flagTab === "KH nạp nhiều nhất"
                            ? "số dư hện tại"
                            : ""}
                        </p>
                        <p>
                          {flagTab === "Dịch vụ"
                            ? item?.buy
                            : flagTab === "KH đặt đơn nhiều nhất"
                            ? `${item?.total}`
                            : flagTab === "KH nạp nhiều nhất"
                            ? `${formatPriceVND(item?.balance)} đ`
                            : ""}
                        </p>
                      </div>
                      <div>
                        <p>
                          {flagTab === "Dịch vụ"
                            ? "lượt hủy"
                            : flagTab === "KH đặt đơn nhiều nhất"
                            ? "đơn hủy"
                            : ""}
                        </p>
                        <p>
                          {flagTab === "Dịch vụ"
                            ? item?.cancel
                            : flagTab === "KH đặt đơn nhiều nhất"
                            ? `${item?.cancelled}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ paddingTop: "24px" }}></div>
              </div>
            );
          })
        ) : (
          <div className="container-login">
            {loadingContent}
          </div>
        )}
      </div>
      <div className="dashboard-right-pagination">
        {flagTab === "Dịch vụ" ? (
          <Pagination
            totalPage={pagination?.totalPages}
            page={pagination?.page}
            pageSize={pagination?.pageSize}
            total={pagination?.total}
            onChange={(page) => {
              setPage(page);
            }}
            flag={false}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

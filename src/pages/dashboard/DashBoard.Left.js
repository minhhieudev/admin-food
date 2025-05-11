import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DashBoardActions,
  DashBoardSelectors,
} from "../../app/services/dashboard/dashboard.slice";
import DashBoardLeftTotal from "../../components/dashboard/DashBoardLeft.Total";
import DashBoardLeftTotalCustomer from "../../components/dashboard/DashBoardLeft.Total.Customer";
import SVGCustomer from "../../components/dashboard/icon/customer";
import SVGInbox from "../../components/dashboard/icon/Inbox";
import SVGMoney from "../../components/dashboard/icon/money";
import SVGMoneyGreen from "../../components/dashboard/icon/moneyGreen";
import SVGSetting from "../../components/dashboard/icon/setting";
import "./style.css";

export default function DashBoardLeft() {
  const dispatch = useDispatch();
  const system = useSelector(DashBoardSelectors.system);
  const order = useSelector(DashBoardSelectors.order);
  const money = useSelector(DashBoardSelectors.money);
  const revenue = useSelector(DashBoardSelectors.revenue);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMoney, setIsLoadingMoney] = useState(false);
  const [isLoadingRevenue, setIsLoadingRevenue] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      dispatch(DashBoardActions.getSystemList());
    }, [300]);
    if (!isLoading) {
      setIsLoading(true);
      dispatch(
        DashBoardActions.getOrder({
          type: 0,
          onSuccess: (rs) => {
            setIsLoading(false);
          },
          onFail: (error) => {
            setIsLoading(false);
          },
        })
      );
    }
    if (!isLoadingMoney) {
      setIsLoadingMoney(true);
      dispatch(
        DashBoardActions.getMoney({
          type: 0,
          onSuccess: (rs) => {
            setIsLoadingMoney(false);
          },
          onFail: (error) => {
            setIsLoadingMoney(false);
          },
        })
      );
    }
    if (!isLoadingRevenue) {
      setIsLoadingRevenue(true);
      dispatch(
        DashBoardActions.getRevenue({
          type: 0,
          onSuccess: (rs) => {
            setIsLoadingRevenue(false);
          },
          onFail: (error) => {
            setIsLoadingRevenue(false);
          },
        })
      );
    }
  }, []);

  const handleCheckTimeOrder = (dataType, index) => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(
        DashBoardActions.getOrder({
          type: index,
          onSuccess: (rs) => {
            setIsLoading(false);
          },
          onFail: (error) => {
            setIsLoading(false);
          },
        })
      );
    }
  };

  const handleCheckTimeMoney = (dataType, index) => {
    if (!isLoadingMoney) {
      setIsLoadingMoney(true);
      dispatch(
        DashBoardActions.getMoney({
          type: index,
          onSuccess: (rs) => {
            setIsLoadingMoney(false);
          },
          onFail: (error) => {
            setIsLoadingMoney(false);
          },
        })
      );
    }
  };

  const handleCheckTimeRevenue = (dataType, index) => {
    if (!isLoadingRevenue) {
      setIsLoadingRevenue(true);
      dispatch(
        DashBoardActions.getRevenue({
          type: index,
          onSuccess: (rs) => {
            setIsLoadingRevenue(false);
          },
          onFail: (error) => {
            setIsLoadingRevenue(false);
          },
        })
      );
    }
  };

  return (
    <div className="dashboard-left-inner">
      <div className="dashboard-left-content" style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
        <div className="dashboard-box">
          <DashBoardLeftTotalCustomer
            item={system?.totalCustomer || ""}
            title={"Tổng khách hàng"}
            icon={<SVGCustomer />}
          />
        </div>
        <div className="dashboard-box">
          <DashBoardLeftTotalCustomer
            item={system?.totalSerivce || "5"}
            title={"Tổng dịch vụ"}
            icon={<SVGSetting />}
          />
        </div>
        <div className="dashboard-box">
          <DashBoardLeftTotal
            item={order || ""}
            icon={<SVGInbox />}
            title={"Tổng đơn hàng"}
            showDetail={true}
            isLoading={isLoading}
            handleCheckTime={handleCheckTimeOrder}
          />
        </div>
        <div className="dashboard-box">
          <DashBoardLeftTotal
            item={money || ""}
            icon={<SVGMoney />}
            title={"Tổng tiền đơn hàng"}
            handleCheckTime={handleCheckTimeMoney}
            isLoading={isLoadingMoney}
          />
        </div>
        {/* <div className="dashboard-box">
          <DashBoardLeftTotal
            item={revenue || ""}
            icon={<SVGMoneyGreen />}
            title={"Tổng doanh thu ước tính"}
            handleCheckTime={handleCheckTimeRevenue}
            isLoading={isLoadingRevenue}
          />
        </div> */}

      </div>
    </div>
  );
}

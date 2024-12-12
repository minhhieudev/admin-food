import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLegend, Background } from "victory";
import {
  DashBoardActions,
  DashBoardSelectors,
} from "../../app/services/dashboard/dashboard.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryTooltip,
  VictoryAxis,
} from "victory";
export default function DashBoarLeftChartLine() {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [currentType, setCurrentType] = useState(0);
  const [type, setType] = useState(0);
  const [dataType, setDataType] = useState("order");
  const [isLoading, setIsLoading] = useState(false);

  const dataLine = useSelector(DashBoardSelectors.line);
  const TIME = [
    { name: "24H", type: 0 },
    { name: "7 ngày", type: 1 },
    { name: "12 tháng", type: 2 },
  ];
  const TOTAL = [
    { name: "Tổng đơn hàng", dataType: "order" },
    { name: "Tổng tiền", dataType: "money" },
    { name: "Doanh thu", dataType: "revenue" },
  ];

  const _renderTime = TIME.map((item, index) => {
    return (
      <button
        className="btn-default"
        style={
          currentTime === index
            ? { background: "#FF8900", color: "#fff" }
            : { background: "#F7F9FA", color: "#72777A" }
        }
        onClick={() => {
          setCurrentTime(index);
          setType(item.type);
        }}
      >
        {item.name}
      </button>
    );
  });
  const _renderType = TOTAL.map((item, index) => {
    return (
      <button
        className="btn-default"
        style={
          currentType === index
            ? { background: "#FF8900", color: "#fff" }
            : { background: "#F7F9FA", color: "#72777A" }
        }
        onClick={() => {
          setCurrentType(index);
          setDataType(item.dataType);
        }}
      >
        {item.name}
      </button>
    );
  });

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(
        DashBoardActions.getDataLine({
          type: type,
          dataType: dataType,
          onSuccess: (rs) => {
            setIsLoading(false);
          },
          onFail: (error) => {
            setIsLoading(false);
          },
        })
      );
    }
  }, [type, dataType]);

  return (
    <div className="dashboard-left-pie-content">
      <div className="title-pie">
        <div className="title-balance">Thống kê đối tác</div>
      </div>
      <div className="btn-time">
        <div className="btn-time-detail">{_renderTime}</div>
        <div className="btn-time-detail">{_renderType}</div>
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "500",
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="loaderSmall"></div>
        </div>
      ) : (
        <div style={{ width: "100%", height: "auto" }}>
          <VictoryChart
            theme={VictoryTheme.material}
            width={900}
            height={300}
            domainPadding={40}
            scale={{ y: "linear" }}
          >
            <VictoryAxis
              style={{
                grid: { stroke: "#ccc", strokeDasharray: "none" },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                grid: { stroke: "#ccc", strokeDasharray: "none" },
              }}
            />

            <VictoryScatter
              data={dataLine?.dg || []}
              size={2}
              style={{
                data: { fill: dataLine?.colors[0] },
              }}
              labels={({ datum }) => datum.y}
              labelComponent={<VictoryTooltip />}
            />
            <VictoryLine
              data={dataLine?.dg || []}
              style={{
                data: { stroke: dataLine?.colors[0], strokeWidth: 0.8 },
                tickLabels: { display: "none" },
              }}
              interpolation="natural"
            />

            <VictoryLine
              data={dataLine?.ongTrum || []}
              style={{
                data: { stroke: dataLine?.colors[1], strokeWidth: 0.8 },
              }}
              interpolation="natural"
            />
            <VictoryScatter
              data={dataLine?.ongTrum || []}
              size={2}
              style={{
                data: { fill: dataLine?.colors[1] },
              }}
              labels={({ datum }) => datum.y}
              labelComponent={<VictoryTooltip />}
            />
            <VictoryLegend
              x={300}
              y={10}
              orientation="horizontal"
              gutter={20}
              data={[
                {
                  name: "1dg.me",
                  symbol: { fill: dataLine?.colors?.[0] || "#ccc" }, // Mặc định là #ccc nếu không có màu
                },
                {
                  name: "Ongtrum",
                  symbol: { fill: dataLine?.colors?.[1] || "#ccc" },
                },
              ]}
            />

          </VictoryChart>
        </div>
      )}
    </div>
  );
}

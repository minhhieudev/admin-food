import React from "react";
import MST from "../../components";

function Paypal({ dataSet }) {
  const {
    isUsePaypal,
    setIsUsePaypal,
    errorMessage,
    paypalClientID,
    setErrorMessage,
    setPaypalClientID,
    paypalClientSecret,
    setPaypalClientSecret,
  } = dataSet;

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <div className="d-flex ai-center">
        <img
          className="payment-setting-paypal-icon"
          src={require("./icons/Paypal.png")}
        />
        <div className="payment-setting-paypal-title">
          Thanh toán bằng Paypal
        </div>
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name">Cho phép sử dụng</div>
        <MST.Switch
          enable={isUsePaypal?.value === "true"}
          onClick={() =>
            setIsUsePaypal({
              key: "isUsePaypal",
              value: isUsePaypal?.value === "true" ? "false" : "true",
            })
          }
        />
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name ">Paypal (Client ID)</div>
        <MST.Input
          errorMessage={errorMessage.paypalClientID}
          value={paypalClientID?.value}
          onChange={(e) => {
            setErrorMessage({
              ...errorMessage,
              paypalClientID: "",
            });
            setPaypalClientID({
              key: "paypalClientID",
              value: e.target.value,
            });
          }}
          placeholder="Nhập Client ID"
        />
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name ">
          Paypal (Client Secret)
        </div>
        <MST.Input
          errorMessage={errorMessage.paypalClientSecret}
          value={paypalClientSecret?.value}
          onChange={(e) => {
            setErrorMessage({
              ...errorMessage,
              paypalClientSecret: "",
            });
            setPaypalClientSecret({
              key: "paypalClientSecret",
              value: e.target.value,
            });
          }}
          placeholder="Nhập Client Secret"
        />
      </div>
    </div>
  );
}

export default Paypal;

import React from "react";
import MST from "../../components";

function PerfectMoney({ dataSet }) {
  const {
    isUsePerfectMoney,
    setIsUsePerfectMoney,
    errorMessage,
    perfectMoneyAccount,
    setErrorMessage,
    setPerfectMoneyAccount,
    perfectMoneyName,
    setPerfectMoneyName,
    perfectMoneyAlternatePassphrase,
    setPerfectMoneyAlternatePassphrase,
  } = dataSet;
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <div className="d-flex ai-center">
        <img className="mr-12" src={require("./icons/PerfectMoney.png")} />
        <div className="payment-setting-paypal-title">
          Thanh toán bằng PerfectMoney
        </div>
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name">Cho phép sử dụng</div>
        <MST.Switch
          enable={isUsePerfectMoney?.value === "true"}
          onClick={() =>
            setIsUsePerfectMoney({
              key: "isUsePerfectMoney",
              value: isUsePerfectMoney?.value === "true" ? "false" : "true",
            })
          }
        />
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name ">Tài khoản</div>
        <MST.Input
          errorMessage={errorMessage.perfectMoneyAccount}
          value={perfectMoneyAccount?.value}
          onChange={(e) => {
            setErrorMessage({
              ...errorMessage,
              perfectMoneyAccount: "",
            });
            setPerfectMoneyAccount({
              key: "perfectMoneyAccount",
              value: e.target.value,
            });
          }}
          placeholder="Nhập tài khoản"
        />
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name ">Tên tài khoản</div>
        <MST.Input
          errorMessage={errorMessage.perfectMoneyName}
          value={perfectMoneyName?.value}
          onChange={(e) => {
            setErrorMessage({
              ...errorMessage,
              perfectMoneyName: "",
            });
            setPerfectMoneyName({
              key: "perfectMoneyName",
              value: e.target.value,
            });
          }}
          placeholder="Nhập tên tài khoản"
        />
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name ">Mật khẩu thay thế</div>
        <MST.Input
          errorMessage={errorMessage.perfectMoneyAlternatePassphrase}
          value={perfectMoneyAlternatePassphrase?.value}
          onChange={(e) => {
            setErrorMessage({
              ...errorMessage,
              perfectMoneyAlternatePassphrase: "",
            });
            setPerfectMoneyAlternatePassphrase({
              key: "perfectMoneyAlternatePassphrase",
              value: e.target.value,
            });
          }}
          placeholder="Nhập mật khẩu thay thế"
        />
      </div>
    </div>
  );
}

export default PerfectMoney;

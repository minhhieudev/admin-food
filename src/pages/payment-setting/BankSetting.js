import React, { useState } from "react";
import MST from "../../components";
import BankInformation from "./BankInformation";

function BankSetting({ dataSet }) {
  const {
    setIsUseBank,
    isUseBank,
    bankPrefix,
    setBankSuffix,
    setBankPrefix,
    bankSuffix,
    bankAccountName,
    bankAccountNumber,
    bankQRTemplate,
    bankId,
    setBankId,
    setBankAccountName,
    setBankAccountNumber,
    setBankQRTemplate,
    apiBankKey,
    setApiBankKey,
  } = dataSet;
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <div className="d-flex ai-center">
        <img src={require("./icons/Bank.png")} />
        <div className="payment-setting-bank-title">
          Thanh toán qua ngân hàng
        </div>
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name">Cho phép sử dụng</div>
        <MST.Switch
          enable={isUseBank?.value === "true"}
          onClick={() =>
            setIsUseBank({
              key: "isUseBank",
              value: isUseBank?.value === "true" ? "false" : "true",
            })
          }
        />
      </div>
      <div className="mt-20 d-flex">
        <div className="flex-1 mr-12 pr-40">
          <div className="payment-setting-field-name ">Tiền tố thanh toán</div>
          <MST.Input
            value={bankPrefix?.value}
            onChange={(e) => {
              setBankPrefix({
                key: "bankPrefix",
                value: e.target.value,
              });
            }}
            placeholder="Nhập tiền tố thanh toán"
          />
        </div>
        <div className="flex-1 ml-12">
          <div className="payment-setting-field-name">Hậu tố thanh toán</div>
          <MST.Input
            value={bankSuffix?.value}
            onChange={(e) => {
              setBankSuffix({
                key: "bankSuffix",
                value: e.target.value,
              });
            }}
            placeholder="Nhập hậu tố thanh toán"
          />
        </div>
      </div>

      <BankInformation
        dataSet={{
          bankAccountName,
          bankAccountNumber,
          bankQRTemplate,
          bankId,
          setBankId,
          setBankAccountName,
          setBankAccountNumber,
          setBankQRTemplate,
          apiBankKey,
          setApiBankKey,
        }}
      />
    </div>
  );
}

export default BankSetting;

import React, { useEffect, useState } from "react";
import MST from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { SettingActions } from "../../app/services/setting/setting.slice";
import Select from "../../components/base/select/Select";
import _ from "lodash";

function BankInformation({ dataSet }) {
  const {
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
  const dispatch = useDispatch();

  const [bankList, setBankList] = useState([]);
  const [currentBank, setCurrentBank] = useState(undefined);
  const [loadBankId, setLoadBankId] = useState(false);
  useEffect(() => {
    if (!_.isEmpty(bankList) && !loadBankId) {
      const tempCurrentBank = bankList.filter((x) => x.bin === bankId?.value);
      if (!_.isEmpty(tempCurrentBank)) {
        const temp = tempCurrentBank[0];
        setLoadBankId(true);
        setCurrentBank({
          ...temp,
          value: temp?.bin,
          name: `(${temp?.code}) ${temp?.name}`,
        });
      }
    }
  }, [bankList, bankId]);
  useEffect(() => {
    setBankId({
      key: "bankId",
      value: currentBank?.value,
    });
  }, [currentBank, loadBankId]);

  useEffect(() => {
    getBankList();
  }, []);

  const getBankList = () => {
    dispatch(
      SettingActions.getBankList({
        onSuccess: (rs) => setBankList(rs),
      })
    );
  };

  return (
    <div className="payment-bank-information-container">
      <div className="d-flex">
        <div className="flex-1 mr-12 pr-40">
          <div className="mt-20">
            <div className="payment-setting-field-name ">Ngân hàng</div>
            <Select.Simple
              placeholder="Chọn loại dịch vụ"
              selected={currentBank}
              setSelected={setCurrentBank}
              width={"100%"}
              data={bankList.map((x) => {
                return {
                  name: `(${x.code}) ${x.name}`,
                  value: x.bin,
                  icon: (
                    <img
                      style={{
                        width: 50,
                      }}
                      src={x.logo}
                    />
                  ),
                };
              })}
            />
          </div>
          <div className="mt-20">
            <div className="payment-setting-field-name ">Mẫu QR</div>
            <MST.Input
              value={bankQRTemplate?.value}
              onChange={(e) => {
                setBankQRTemplate({
                  key: "bankQRTemplate",
                  value: e.target.value,
                });
              }}
              placeholder="Nhập mẫu QR"
            />
          </div>
        </div>
        <div className="flex-1 ml-12">
          <div className="mt-20">
            <div className="payment-setting-field-name ">Chủ tài khoản</div>
            <MST.Input
              value={bankAccountName?.value}
              onChange={(e) => {
                setBankAccountName({
                  key: "bankAccountName",
                  value: e.target.value,
                });
              }}
              placeholder="Nhập chủ tài khoản"
            />
          </div>
          <div className="mt-20">
            <div className="payment-setting-field-name ">Số tài khoản</div>
            <MST.Input
              value={bankAccountNumber?.value}
              onChange={(e) => {
                setBankAccountNumber({
                  key: "bankAccountNumber",
                  value: e.target.value,
                });
              }}
              placeholder="Nhập số tài khoản"
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="payment-setting-field-name ">Token ApiThanhToan</div>
        <MST.Input
          value={apiBankKey?.value}
          onChange={(e) => {
            setApiBankKey({
              key: "apiBankKey",
              value: e.target.value,
            });
          }}
          placeholder="Nhập token ApiThanhToan"
        />
      </div>
    </div>
  );
}

export default BankInformation;

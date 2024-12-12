import _, { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SettingActions } from "../../app/services/setting/setting.slice";
import MST from "../../components";
import "./style.css";
import BankSetting from "./BankSetting";
import DepositDiscountSetting from "./DepositDiscountSetting";
import Paypal from "./Paypal";
import Tab from "../../components/tab/Tab";
import PerfectMoney from "./PerfectMoney";
function PaymentSettingPage() {
  const dispatch = useDispatch();

  const [paypalClientID, setPaypalClientID] = useState({
    value: "",
    key: "paypalClientID",
  });
  const [paypalClientSecret, setPaypalClientSecret] = useState({
    value: "",
    key: "paypalClientSecret",
  });
  const [isUsePaypal, setIsUsePaypal] = useState({
    value: "false",
    key: "isUsePaypal",
  });
  const [perfectMoneyAccount, setPerfectMoneyAccount] = useState({
    value: "",
    key: "perfectMoneyAccount",
  });
  const [perfectMoneyName, setPerfectMoneyName] = useState({
    value: "",
    key: "perfectMoneyName",
  });

  const [perfectMoneyAlternatePassphrase, setPerfectMoneyAlternatePassphrase] =
    useState({
      value: "",
      key: "perfectMoneyAlternatePassphrase",
    });
  const [apiBankKey, setApiBankKey] = useState({
    value: "",
    key: "apiBankKey",
  });
  const [isUsePerfectMoney, setIsUsePerfectMoney] = useState({
    value: "false",
    key: "isUsePerfectMoney",
  });
  const [bankSuffix, setBankSuffix] = useState({
    value: "",
    key: "bankSuffix",
  });
  const [bankPrefix, setBankPrefix] = useState({
    value: "",
    key: "bankPrefix",
  });
  const [isUseBank, setIsUseBank] = useState({
    value: "false",
    key: "isUseBank",
  });

  const [bankId, setBankId] = useState({
    value: "",
    key: "bankId",
  });

  const [bankAccountName, setBankAccountName] = useState({
    value: "",
    key: "bankAccountName",
  });

  const [bankAccountNumber, setBankAccountNumber] = useState({
    value: "",
    key: "bankAccountNumber",
  });

  const [bankQRTemplate, setBankQRTemplate] = useState({
    value: "",
    key: "bankQRTemplate",
  });

  const [depositDiscount, setDepositDiscount] = useState({
    value: [],
    key: "depositDiscount",
  });

  const [errorMessage, setErrorMessage] = useState({
    paypalClientID: "",
    paypalClientSecret: "",
  });

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = () => {
    dispatch(
      SettingActions.getSettings({
        body: "apiBankKey,depositDiscount,paypalClientID,paypalClientSecret,isUsePaypal,bankSuffix,bankPrefix,isUseBank,bankAccountName,bankAccountNumber,bankQRTemplate,bankId,isUsePerfectMoney,perfectMoneyAccount,perfectMoneyName,perfectMoneyAlternatePassphrase",
        onSuccess: (rs) => {
          if (!isEmpty(rs)) {
            setState(rs, "paypalClientID", setPaypalClientID);
            setState(rs, "paypalClientSecret", setPaypalClientSecret);
            setState(rs, "isUsePaypal", setIsUsePaypal);
            setState(rs, "bankSuffix", setBankSuffix);
            setState(rs, "bankPrefix", setBankPrefix);
            setState(rs, "isUseBank", setIsUseBank);
            setState(rs, "bankId", setBankId);
            setState(rs, "bankAccountName", setBankAccountName);
            setState(rs, "bankAccountNumber", setBankAccountNumber);
            setState(rs, "bankQRTemplate", setBankQRTemplate);
            setState(rs, "depositDiscount", setDepositDiscount);
            setState(rs, "isUsePerfectMoney", setIsUsePerfectMoney);
            setState(rs, "perfectMoneyAccount", setPerfectMoneyAccount);
            setState(rs, "perfectMoneyName", setPerfectMoneyName);
            setState(rs, "apiBankKey", setApiBankKey);
            setState(
              rs,
              "perfectMoneyAlternatePassphrase",
              setPerfectMoneyAlternatePassphrase
            );
          }
        },
      })
    );
  };
  const validate = (callback) => {
    const tempError = {
      paypalClientID: "",
      paypalClientSecret: "",
    };
    let countError = 0;

    // if (isEmpty(paypalClientID.value)) {
    //   tempError.paypalClientID = "Paypal Client ID không được bỏ trống";
    //   countError++;
    // }

    // if (isEmpty(paypalClientSecret.value)) {
    //   tempError.paypalClientSecret = "Paypal Client Secret không được bỏ trống";
    //   countError++;
    // }

    if (countError === 0) {
      callback();
    } else {
      setErrorMessage(tempError);
    }
  };

  const setSetting = () => {
    dispatch(
      SettingActions.setSettings({
        body: [
          { ...isUsePaypal },
          { ...paypalClientID },
          { ...paypalClientSecret },
          { ...isUseBank },
          { ...bankPrefix },
          { ...bankSuffix },
          { ...bankAccountName },
          { ...bankAccountNumber },
          { ...bankId },
          { ...bankQRTemplate },
          {
            key: depositDiscount.key,
            value: depositDiscount.value.map((x) => {
              return {
                amount: Number(x?.amount),
                discountPercent: Number(x?.discountPercent),
              };
            }),
          },
          { ...isUsePerfectMoney },
          { ...perfectMoneyAccount },
          { ...perfectMoneyName },
          { ...perfectMoneyAlternatePassphrase },
          { ...apiBankKey },
        ],
      })
    );
  };

  const setState = (arr, name, callback) => {
    try {
      if (name === "depositDiscount") {
        const temp = arr.filter((x) => {
          return x.key === name;
        });
        if (!_.isEmpty(temp)) {
          const currentSetting = temp[0];
          callback({
            key: "depositDiscount",
            value: currentSetting.value.map((x, index) => {
              return {
                ...x,
                id: index,
              };
            }),
          });
        }
      } else {
        const temp = arr.filter((x) => {
          return x.key === name;
        });
        if (temp.length > 0) {
          callback(temp[0]);
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const tabList = [
    {
      name: "Ngân hàng",
      onClick: () => {},
    },
    {
      name: "Paypal",
      onClick: () => {},
    },
    {
      name: "Perfect Money",
      onClick: () => {},
    },
  ];
  const contentList = [
    <BankSetting
      dataSet={{
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
      }}
    />,
    <Paypal
      dataSet={{
        isUsePaypal,
        setIsUsePaypal,
        paypalClientID,
        setPaypalClientID,
        paypalClientSecret,
        setPaypalClientSecret,
        errorMessage,
        setErrorMessage,
      }}
    />,
    <PerfectMoney
      dataSet={{
        isUsePerfectMoney,
        perfectMoneyAccount,
        perfectMoneyName,
        perfectMoneyAlternatePassphrase,
        setPerfectMoneyName,
        setIsUsePerfectMoney,
        setPerfectMoneyAccount,
        setPerfectMoneyAlternatePassphrase,
        errorMessage,
        setErrorMessage,
      }}
    />,
  ];
  return (
    <MST.Container
      title={"Thanh toán"}
      right={
        <div>
          <MST.Button
            onClick={() => {
              validate(setSetting);
            }}
          >
            Lưu cài đặt
          </MST.Button>
        </div>
      }
    >
      <DepositDiscountSetting
        depositDiscount={depositDiscount}
        setDepositDiscount={setDepositDiscount}
      />
      <div className="payment-setting-container">
        <div className="payment-setting-paypal-title mb-20">
          Phương thức thanh toán
        </div>
        <Tab contentList={contentList} list={tabList} />
      </div>
    </MST.Container>
  );
}

export default PaymentSettingPage;

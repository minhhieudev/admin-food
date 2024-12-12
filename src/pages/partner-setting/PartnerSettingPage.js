import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SettingActions } from "../../app/services/setting/setting.slice";
import MST from "../../components";
import "./style.css";
import { PartnerActions } from "../../app/services/partner/partner.slice";
import OngTrumImport from "./OngTrumImport";
import OngTrumRemove from "./OngTrumRemove";
import { formatPriceVND } from "../../app/utils/format";
import PaymentActivityButton from "./PaymentActivityButton";
function PartnerSettingPage() {
  const dispatch = useDispatch();

  const [isUsePartner1dg, setIsUsePartner1dg] = useState({
    value: "false",
    key: "isUsePartner1dg",
  });
  const [isUsePartnerOngtrum, setIsUsePartnerOngtrum] = useState({
    value: "false",
    key: "isUsePartnerOngtrum",
  });
  const [partnerBalance, setPartnerBalance] = useState(0);
  const [partnerAPIKey, setPartnerAPIKey] = useState({
    value: "",
    key: "PARTNER_1dg.me_API_KEY",
  });

  const [ongTrumBalance, setOngTrumBalance] = useState(0);
  const [ongTrumAPIKey, setOngTrumAPIKey] = useState({
    value: "",
    key: "PARTNER_ongtrum_API_KEY",
  });

  const getBalance = async () => {
    dispatch(
      PartnerActions.getBalance({
        partnerCode: "1dg.me",
        onSuccess: (balance) => {
          setPartnerBalance(formatPriceVND(balance || 0));
        },
      })
    );
    dispatch(
      PartnerActions.getBalance({
        partnerCode: "ongtrum",
        onSuccess: (balance) => {
          setOngTrumBalance(formatPriceVND(balance || 0));
        },
      })
    );
  };

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = () => {
    dispatch(
      SettingActions.getSettings({
        body: "PARTNER_1dg.me_API_KEY,PARTNER_ongtrum_API_KEY,isUsePartner1dg,isUsePartnerOngtrum",
        onSuccess: (rs) => {
          getBalance();
          if (!isEmpty(rs)) {
            setState(rs, "PARTNER_1dg.me_API_KEY", setPartnerAPIKey);
            setState(rs, "PARTNER_ongtrum_API_KEY", setOngTrumAPIKey);
            setState(rs, "isUsePartner1dg", setIsUsePartner1dg);
            setState(rs, "isUsePartnerOngtrum", setIsUsePartnerOngtrum);
          }
        },
      })
    );
  };
  const validate = (callback) => {
    const tempError = {
      partnerBalance: "",
      partnerAPIKey: "",
    };
    let countError = 0;

    // if (isEmpty(partnerAPIKey.value)) {
    //   tempError.partnerAPIKey = "Api key không được bỏ trống";
    //   countError++;
    // }

    if (countError === 0) {
      callback();
    } else {
      // xử lý validate error message
    }
  };

  const setSetting = () => {
    dispatch(
      SettingActions.setSettings({
        body: [
          { ...partnerAPIKey },
          { ...ongTrumAPIKey },
          { ...isUsePartner1dg },
          { ...isUsePartnerOngtrum },
        ],
        onSuccess: () => {
          getBalance();
        },
      })
    );
  };

  const setState = (arr, name, callback) => {
    try {
      callback(
        arr.filter((x) => {
          return x.key === name;
        })[0]
      );
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <MST.Container
      title={"Đối tác"}
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
      <div className="partner-setting-container">
        <div className="partner-setting-content">
          <div
            style={{
              position: "relative",
            }}
          >
            <PaymentActivityButton partner={"1dg.me"} />
          </div>
          <div className="d-flex ai-center">
            <div className="partner-setting-paypal-title">1DG.ME</div>
          </div>
          <div className="mt-20">
            <div className="payment-setting-field-name">Cho phép sử dụng</div>
            <MST.Switch
              enable={isUsePartner1dg?.value === "true"}
              onClick={() => {
                setIsUsePartner1dg({
                  key: "isUsePartner1dg",
                  value: isUsePartner1dg?.value === "true" ? "false" : "true",
                });
              }}
            />
          </div>
          <div className="mt-20">
            <div className="partner-setting-field-name ">Số dư hiện tại</div>
            <MST.Input
              right={<div className="partner-setting-vnd">VND</div>}
              value={partnerBalance}
              disabled={true}
            />
          </div>
          <div className="mt-20">
            <div className="partner-setting-field-name ">API key</div>
            <MST.Input
              value={partnerAPIKey?.value}
              onChange={(e) => {
                setPartnerAPIKey({
                  ...partnerAPIKey,
                  value: e.target.value,
                });
              }}
              placeholder="Nhập API Key"
            />
          </div>
        </div>
        <div className="partner-setting-content">
          <div
            style={{
              position: "relative",
            }}
          >
            <PaymentActivityButton partner={"ongtrum"} />
          </div>
          <div className="d-flex ai-center">
            <div className="partner-setting-paypal-title">ongtrum</div>
          </div>{" "}
          <div className="mt-20">
            <div className="payment-setting-field-name">Cho phép sử dụng</div>
            <MST.Switch
              enable={isUsePartnerOngtrum?.value === "true"}
              onClick={() => {
                setIsUsePartnerOngtrum({
                  key: "isUsePartnerOngtrum",
                  value:
                    isUsePartnerOngtrum?.value === "true" ? "false" : "true",
                });
              }}
            />
          </div>
          <div className="mt-20">
            <div className="partner-setting-field-name ">Số dư hiện tại</div>
            <MST.Input
              right={<div className="partner-setting-vnd">XU</div>}
              value={ongTrumBalance}
              disabled={true}
            />
          </div>
          <div className="mt-20">
            <div className="partner-setting-field-name ">API key</div>
            <MST.Input
              value={ongTrumAPIKey?.value}
              onChange={(e) => {
                setOngTrumAPIKey({
                  key: "PARTNER_ongtrum_API_KEY",
                  value: e.target.value,
                });
              }}
              placeholder="Nhập API Key"
            />
          </div>
          <div className="mt-20">
            <div className="partner-setting-field-name ">Import dịch vụ</div>
            <div className="d-flex ai-center">
              <OngTrumImport />
              <OngTrumRemove />
            </div>
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default PartnerSettingPage;

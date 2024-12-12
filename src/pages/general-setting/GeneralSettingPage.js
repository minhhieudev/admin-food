import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SettingActions } from "../../app/services/setting/setting.slice";
import MST from "../../components";
import GeneralSettingAPIKey from "./GeneralSetting.APIKey";
import GeneralSettingGeneral from "./GeneralSetting.General";
import GeneralSettingSupport from "./GeneralSetting.Support";
import "./style.css";
function GeneralSettingPage() {
  const dispatch = useDispatch();

  const [systemName, setSystemName] = useState({ value: "" });
  const [systemDescription, setSystemDescription] = useState({ value: "" });
  const [facebook, setFacebook] = useState({ value: "" });
  const [zalo, setZalo] = useState({ value: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "" });
  const [telegram, setTelegram] = useState({ value: "" });
  const [chatgpt, setChatgpt] = useState({ value: "", key: "chatgpt" });
  const [errorMessage, setErrorMessage] = useState({
    systemName: "",
    systemDescription: "",
    facebook: "",
    zalo: "",
    telegram: "",
    phoneNumber: "",
    chatgpt: "",
  });

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = () => {
    dispatch(
      SettingActions.getSettings({
        body: "systemName,systemDescription,facebook,zalo,telegram,phoneNumber,chatgpt",
        onSuccess: (rs) => {
          if (!isEmpty(rs)) {
            setState(rs, "systemName", setSystemName);
            setState(rs, "systemDescription", setSystemDescription);
            setState(rs, "facebook", setFacebook);
            setState(rs, "zalo", setZalo);
            setState(rs, "telegram", setTelegram);
            setState(rs, "phoneNumber", setPhoneNumber);
            setState(rs, "chatgpt", setChatgpt);
          }
        },
      })
    );
  };

  const validate = (callback) => {
    const tempError = {
      systemName: "",
      systemDescription: "",
      facebook: "",
      zalo: "",
      telegram: "",
      phoneNumber: "",
      chatgpt: "",
    };
    let countError = 0;

    // if (isEmpty(systemName.value)) {
    //   tempError.systemName = "Tên hệ thống không được bỏ trống";
    //   countError++;
    // }

    // if (isEmpty(systemDescription.value)) {
    //   tempError.systemDescription = "Mô tả hệ thống không được bỏ trống";
    //   countError++;
    // }

    // if (isEmpty(zalo.value)) {
    //   tempError.zalo = "Số điện thoại không được bỏ trống";
    //   countError++;
    // }

    // if (isEmpty(facebook.value)) {
    //   tempError.facebook = "Link Facebook không được bỏ trống";
    //   countError++;
    // }

    // if (isEmpty(phoneNumber.value)) {
    //   tempError.phoneNumber = "Số điện thoại không được bỏ trống";
    //   countError++;
    // }

    // if (isEmpty(telegram.value)) {
    //   tempError.telegram = "Địa chỉ Telegram không được bỏ trống";
    //   countError++;
    // }

    // if (isEmpty(chatgpt.value)) {
    //   tempError.chatgpt = "ChatGPT API Key không được bỏ trống";
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
          { ...zalo },
          { ...facebook },
          { ...systemDescription },
          { ...systemName },
          { ...telegram },
          { ...phoneNumber },
          {
            ...chatgpt,
          },
        ],
      })
    );
  };

  const setState = (arr, name, callback) => {
    callback(
      arr.filter((x) => {
        return x.key === name;
      })[0]
    );
  };

  return (
    <MST.Container
      title={"Cài đặt chung"}
      right={
        <div>
          <MST.Button onClick={() => validate(setSetting)}>
            Lưu cài đặt
          </MST.Button>
        </div>
      }
    >
      <div className="general-setting-content">
        <GeneralSettingGeneral
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          systemName={systemName}
          setSystemDescription={setSystemDescription}
          setSystemName={setSystemName}
          systemDescription={systemDescription}
        />
        <GeneralSettingSupport
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          facebook={facebook}
          setFacebook={setFacebook}
          zalo={zalo}
          setTelegram={setTelegram}
          telegram={telegram}
          setZalo={setZalo}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
        <GeneralSettingAPIKey
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          setChatgpt={setChatgpt}
          chatgpt={chatgpt}
        />
      </div>
    </MST.Container>
  );
}

export default GeneralSettingPage;

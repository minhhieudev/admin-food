import React from "react";
import MST from "../../components";

function GeneralSettingSupport({
  zalo,
  facebook,
  setZalo,
  setFacebook,
  telegram,
  setTelegram,
  phoneNumber,
  setPhoneNumber,
  errorMessage,
  setErrorMessage,
}) {
  return (
    <div className="general-setting-general-container">
      <div>
        <span className="general-setting-title">Thông tin hỗ trợ</span>
      </div>
      <div className="mt-20">
        <div>
          <span>Telegram</span>
        </div>
        <div className="mt-4 mb-4">
          <MST.Input
            errorMessage={errorMessage?.telegram}
            value={telegram.value}
            onChange={(e) => {
              setTelegram({
                ...telegram,
                value: e.target.value,
              });
              setErrorMessage({
                ...errorMessage,
                telegram: "",
              });
            }}
            placeholder="Nhập Telegram"
          />
        </div>
      </div>
      <div className="mt-20">
        <div>
          <span>Số điện thoại</span>
        </div>
        <div className="mt-4 mb-4">
          <MST.Input
            errorMessage={errorMessage?.phoneNumber}
            value={phoneNumber.value}
            onChange={(e) => {
              setPhoneNumber({
                ...phoneNumber,
                value: e.target.value,
              });
              setErrorMessage({
                ...errorMessage,
                phoneNumber: "",
              });
            }}
            placeholder="Nhập số điện thoại"
          />
        </div>
      </div>
      <div className="mt-20">
        <div>
          <span>Facebook</span>
        </div>
        <div className="mt-4 mb-4">
          <MST.Input
            errorMessage={errorMessage?.facebook}
            value={facebook.value}
            onChange={(e) => {
              setFacebook({
                ...facebook,
                value: e.target.value,
              });
              setErrorMessage({
                ...errorMessage,
                facebook: "",
              });
            }}
            placeholder="Nhập link Facebook"
          />
        </div>
      </div>
      <div className="mt-20">
        <div>
          <span>Zalo</span>
        </div>
        <div className="mt-4 mb-4">
          <MST.Input
            errorMessage={errorMessage?.zalo}
            value={zalo.value}
            onChange={(e) => {
              setZalo({
                ...zalo,
                value: e.target.value,
              });
              setErrorMessage({
                ...errorMessage,
                zalo: "",
              });
            }}
            placeholder="Nhập số điện thoại Zalo"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralSettingSupport;

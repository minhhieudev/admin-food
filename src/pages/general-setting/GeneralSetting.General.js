import React from "react";
import MST from "../../components";

function GeneralSettingGeneral({
  systemName,
  setSystemName,
  systemDescription,
  setSystemDescription,
  errorMessage,
  setErrorMessage,
}) {
  return (
    <div className="general-setting-general-container">
      <div>
        <span className="general-setting-title">Thông tin chung</span>
      </div>
      <div className="mt-20">
        <div>
          <span>Tên hệ thống</span>
        </div>
        <div className="mt-4 mb-4">
          <MST.Input
            maxLength={255}
            errorMessage={errorMessage?.systemName}
            placeholder="Nhập tên hệ thống"
            value={systemName?.value}
            onChange={(e) => {
              setSystemName({
                ...systemName,
                value: e?.target?.value,
              });
              setErrorMessage({
                ...errorMessage,
                systemName: "",
              });
            }}
          />
        </div>
        <div>
          <span className="general-setting-input-small-description">
            {Number(systemName?.value?.length)}/255
          </span>
        </div>
      </div>
      <div className="mt-20">
        <div>
          <span>Mô tả hệ thống</span>
        </div>
        <div className="mt-4 mb-4">
          <MST.Input
            errorMessage={errorMessage?.systemDescription}
            placeholder="Nhập mô tả hệ thống"
            value={systemDescription?.value}
            onChange={(e) => {
              setSystemDescription({
                ...systemDescription,
                value: e?.target?.value,
              });
              setErrorMessage({
                ...errorMessage,
                systemDescription: "",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralSettingGeneral;

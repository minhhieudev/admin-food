import React from "react";
import MST from "../../components";

function GeneralSettingAPIKey({
  chatgpt,
  setChatgpt,
  errorMessage,
  setErrorMessage,
}) {
  return (
    <div className="general-setting-general-container">
      <div>
        <span className="general-setting-title">API Key</span>
      </div>
      <div className="mt-20">
        <div>
          <span>Chat GPT</span>
        </div>
        <div className="mt-4 mb-4">
          <MST.Input
            errorMessage={errorMessage?.chatgpt}
            value={chatgpt?.value}
            onChange={(e) => {
              setChatgpt({
                key: "chatgpt",
                value: e.target.value,
              });
              setErrorMessage({
                ...errorMessage,
                chatgpt: "",
              });
            }}
            placeholder="Nhập ChatGPT API Key"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralSettingAPIKey;

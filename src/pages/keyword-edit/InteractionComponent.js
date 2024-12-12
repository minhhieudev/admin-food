import React from "react";
import MST from "../../components";
import Tab from "../../components/tab/Tab";

function InteractionComponent({ keywordDetail }) {
  const tabList = [
    {
      name: "Youtube",
      onClick: () => {},
    },
    {
      name: "Dailymotion",
      onClick: () => {},
    },
    {
      name: "Tiktok",
      onClick: () => {},
    },
  ];

  const contentList = [<OneContent />, <OneContent />, <OneContent />];

  return (
    <div className="keyword-create-content-general">
      <div className="keyword-create-content">
        <div className="keyword-create-title">Tương tác</div>
        <div className="mt-8">
          <Tab contentList={contentList} list={tabList} />
        </div>
      </div>
    </div>
  );
}

export default InteractionComponent;

const OneIcon = ({ up }) => {
  return (
    <div
      style={{
        paddingInline: 15,
      }}
    >
      {up ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 11.3333L5.29289 8.04044C5.68342 7.64991 6.31658 7.64991 6.70711 8.04044L7.95956 9.29289C8.35008 9.68341 8.98325 9.68341 9.37377 9.29289L14 4.66666M14 4.66666H10.6667M14 4.66666V8"
            stroke="#23C16B"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4.66666L5.29289 7.95956C5.68342 8.35008 6.31658 8.35008 6.70711 7.95956L7.95956 6.7071C8.35008 6.31658 8.98325 6.31658 9.37377 6.7071L14 11.3333M14 11.3333V8M14 11.3333H10.6667"
            stroke="#FF5247"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

const OneContent = () => {
  return (
    <div className="keyword-edit-container">
      <div className="keyword-create-one-field">
        <div className="keyword-create-one-field-name">Tổng tương tác</div>
        <div>
          <MST.Input
            inputStyle={{
              marginLeft: 35,
            }}
            left={<OneIcon />}
            disabled
            value={0}
          />
        </div>
      </div>
      {[1, 2, 3, 4].map((x, index) => {
        return (
          <div className="d-flex" key={`${index}`}>
            <div className="keyword-create-one-field">
              <div className="keyword-create-one-field-name">Tổng comment</div>
              <div>
                <MST.Input
                  inputStyle={{
                    marginLeft: 35,
                  }}
                  left={<OneIcon />}
                  disabled
                  value={0}
                />
              </div>
            </div>
            <div className="keyword-create-one-field ml-20">
              <div className="keyword-create-one-field-name">Hôm qua</div>
              <div>
                <MST.Input
                  inputStyle={{
                    marginLeft: 35,
                  }}
                  left={<OneIcon />}
                  disabled
                  value={0}
                />
              </div>
            </div>
            <div className="keyword-create-one-field ml-20">
              <div className="keyword-create-one-field-name">Tuần trước</div>
              <div>
                <MST.Input
                  inputStyle={{
                    marginLeft: 35,
                  }}
                  left={<OneIcon />}
                  disabled
                  value={0}
                />
              </div>
            </div>
            <div className="keyword-create-one-field ml-20">
              <div className="keyword-create-one-field-name">Tháng trước</div>
              <div>
                <MST.Input
                  inputStyle={{
                    marginLeft: 35,
                  }}
                  left={<OneIcon />}
                  disabled
                  value={0}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

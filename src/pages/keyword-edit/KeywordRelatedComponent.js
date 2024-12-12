import React from "react";

function KeywordRelatedComponent() {
  return (
    <div className="keyword-related-container">
      <div className="keyword-related-content">
        <div className="keyword-create-title">Từ khóa liên quan</div>
        <div>
          {[1, 2, 3].map((x, index) => {
            return (
              <div className="keyword-platform-container" key={`${index}`}>
                <div className="keyword-platform-content">
                  <div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.26253 5.59187C1.33483 4.47881 2.22972 3.60651 3.34376 3.55131C4.95697 3.47139 7.2627 3.375 9 3.375C10.7373 3.375 13.043 3.47139 14.6562 3.55131C15.7703 3.60651 16.6652 4.47881 16.7375 5.59187C16.8067 6.65827 16.875 7.97043 16.875 9C16.875 10.0296 16.8067 11.3417 16.7375 12.4081C16.6652 13.5212 15.7703 14.3935 14.6562 14.4487C13.043 14.5286 10.7373 14.625 9 14.625C7.2627 14.625 4.95697 14.5286 3.34376 14.4487C2.22972 14.3935 1.33483 13.5212 1.26253 12.4081C1.19327 11.3417 1.125 10.0296 1.125 9C1.125 7.97043 1.19327 6.65827 1.26253 5.59187Z"
                        fill="#FC0D1B"
                      />
                      <path
                        d="M7.3125 6.75V11.25L11.8125 9L7.3125 6.75Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="keyword-platform-name">Youtube</div>
                </div>
                <div>
                  {[1, 2, 3].map((y, index) => {
                    return (
                      <div className="d-flex" key={`y-${index}`}>
                        <div className="keyword-one-keyword-related">
                          Black Pink How You Like That
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default KeywordRelatedComponent;

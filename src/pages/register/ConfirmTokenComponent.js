import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./style.css";
import SysFetch from '../../app/fetch';

const ConfirmTokenComponent = () => {
  const { token } = useParams();
  console.log('111:',token)
  const navigate = useNavigate();
  const [isVerify, setIsVerify] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await SysFetch.post('admin-auth/register/verify-email', { token });
        setIsVerify(res.success);
      } catch (error) {
        setIsVerify(false);
      }
    };
    
    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <div className="container">
      <div className="box">
        <div className="title">Xác minh tài khoản</div>
        <div>
          {isVerify === null ? (
            <div className="loading">Đang xác minh...</div>
          ) : isVerify ? (
            <div className="result">
              <div className="icon success">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M36.6664 18.4667V20.0001C36.6643 23.5941 35.5005 27.0912 33.3486 29.9698C31.1966 32.8484 28.1718 34.9542 24.7253 35.9732C21.2787 36.9923 17.5951 36.8699 14.2238 35.6244C10.8525 34.3788 7.9741 32.0769 6.01794 29.0618C4.06179 26.0468 3.13266 22.4802 3.36914 18.8939C3.60561 15.3077 4.99502 11.8939 7.33014 9.16185C9.66526 6.42976 12.821 4.5257 16.3267 3.73364C19.8323 2.94158 23.5001 3.30395 26.783 4.76673"
                    stroke="#23C16B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M36.6667 6.66663L20 23.35L15 18.35"
                    stroke="#23C16B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="message success">Xác minh thành công</div>
              <div className="message success">
                bạn có thể truy cập trang{" "}
                <span onClick={() => navigate("/login")} className="link">
                  tại đây
                </span>
              </div>
            </div>
          ) : (
            <div className="result">
              <div className="icon error">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M30 10L10 30" stroke="#FF5247" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 10L30 30" stroke="#FF5247" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="message error">Xác minh không thành công</div>
              <div className="message error">vui lòng kiểm tra lại</div>
            </div>
          )}
        </div>
        <div className="login-prompt">
          Bạn đã có tài khoản?{" "}
          <span onClick={() => navigate("/login")} className="link">
            Đăng nhập
          </span>
        </div>
        <div className="divider" />
        <div className="footer-text">
          Bằng việc tiếp tục, bạn đã đồng ý với Điều khoản dịch vụ của MST và xác nhận đã đọc và hiểu Chính sách về quyền riêng tư của chúng tôi, cũng như bạn đã đủ 13 tuổi.
        </div>
      </div>
    </div>
  );
};

export default ConfirmTokenComponent;

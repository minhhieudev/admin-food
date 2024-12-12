import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CONST from "../../app/services/const";
import { setConfigAxios } from "../../app/fetch";
import "./style.css";
import { LoginActions } from "../../app/services/login/login.slice";
import Checkbox from "../../components/base/checkbox/Checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import MST from "../../components";
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);
    if (accessToken) {
      setConfigAxios(accessToken);
      const userInfo = localStorage.getItem(CONST.STORAGE.USER_INFO);
      dispatch(LoginActions.setUserInfo(JSON.parse(userInfo || {})));
      navigate("/services/dashboard");
    }
  }, [dispatch, navigate]);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    login30Days: false,
  });

  const onCheckLogin = () => {
    toast.loading("Đăng nhập");
    dispatch(
      LoginActions.checkLogin({
        body: loginInfo,
        onSuccess: (rs) => {
          toast.dismiss();
          const { accessToken, refreshToken, admin } = rs;
          localStorage.setItem(CONST.STORAGE.ACCESS_TOKEN, accessToken);
          localStorage.setItem(CONST.STORAGE.REFRESH_TOKEN, refreshToken);
          localStorage.setItem(
            CONST.STORAGE.USER_INFO,
            JSON.stringify(admin || {})
          );

          window.location.href = "/";
        },
        onFail: (error) => {
          toast.dismiss();
          toast.error(error);
        },
      })
    );
  };

  const [showPassWord, setShowPassWord] = useState(false);
  return (
    <div className="container">
      <div className="login-border">
        <div className="login-container">
          <div className="login-content">
            {/* left */}

            <div className="login-left">
              <div className="login-card">
                <div className="login-logo">
                  <img alt="admin" src={require("../../images/logo.webp")} />
                  <p
                    style={{
                      fontSize: 24,
                      marginLeft: 10,
                    }}
                  >
                    Healthy Food Store
                  </p>
                </div>
                <p
                  className="poppins-medium"
                  style={{
                    fontSize: 24,
                  }}
                >
                  Đăng nhập
                </p>
                {/* username and password */}
                <div className="group-input">
                  <div className="login-input">
                    <p
                      style={{
                        marginBottom: "4px",
                      }}
                    >
                      Địa chỉ Email
                    </p>
                    <div className="pass-input">
                      <input
                        placeholder="..."
                        value={loginInfo.email}
                        onChange={(e) =>
                          setLoginInfo({
                            ...loginInfo,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="login-input">
                    <p
                      style={{
                        marginBottom: "4px",
                      }}
                    >
                      Mật khẩu
                    </p>
                    <div className="pass-input">
                      <input
                        placeholder="***"
                        type={showPassWord ? "text" : "password"}
                        value={loginInfo.password}
                        onChange={(e) =>
                          setLoginInfo({
                            ...loginInfo,
                            password: e.target.value,
                          })
                        }
                      />

                      {showPassWord ? (
                        <EyeSlashIcon
                          className="icon"
                          width={18}
                          height={18}
                          color="gray"
                          onClick={() => {
                            setShowPassWord(!showPassWord);
                          }}
                        />
                      ) : (
                        <EyeIcon
                          className="icon"
                          width={18}
                          height={18}
                          color="gray"
                          onClick={() => {
                            setShowPassWord(!showPassWord);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="forget-pass">
                    <div className="login-checkbox">
                      <Checkbox
                        checked={loginInfo.login30Days}
                        onClick={() => {
                          setLoginInfo({
                            ...loginInfo,
                            login30Days: !loginInfo.login30Days,
                          });
                        }}
                      />
                      <div>
                        <span
                          style={{
                            color: "gray",
                            marginLeft: "4px",
                          }}
                        >
                          Đăng nhập 30 ngày
                        </span>
                      </div>
                    </div>
                    <p className="poppins-medium text-primary">
                      Quên mật khẩu?
                    </p>
                  </div>
                  <div className="btn-area">
                    <MST.Button onClick={onCheckLogin}>Đăng nhập</MST.Button>
                    <div className="btn-register" onClick={() => { navigate("/register") }}>
                      <button >Đăng ký</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="login-right">
              <img
                alt="admin"
                src={require("../../images/service-manager.jpg")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

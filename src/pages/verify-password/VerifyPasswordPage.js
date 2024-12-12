import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import MST from "../../components";
import "./style.css";
import SysFetch from "../../app/fetch";
import axios from "axios";



function VerifyPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassWord, setShowPassWord] = useState(false);
  const [token, setToken] = useState('');


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromQuery = queryParams.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    } 
  }, [location, navigate]);

  useEffect(() => {
    const getTokenVerifyPassword = async () => {
      const body = {
        email
      }
      const res = await SysFetch.post(`/admin-auth/getTokenVerifyPassword`, body);
      if (res.success) {
        setToken(res.token);
      }
      else (
        toast.error(res.message)
      )
    }
    getTokenVerifyPassword();

  }, [email]);

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    const body = {
      password,
      token
    }
    const res = await SysFetch.post(`/admin-auth/verify-password`, body);
    if (res.success) {
      toast.success('Tạo mới thành công')
      navigate("/login");
    }
    else (
      toast.error(res.message)
    )
  };

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
                  Xác nhận mật khẩu
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
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value,
                          )
                        }
                        readOnly
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
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value,
                          )
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
                  <div className="login-input">
                    <p
                      style={{
                        marginBottom: "4px",
                      }}
                    >
                      Nhập lại mật khẩu
                    </p>
                    <div className="pass-input">
                      <input
                        placeholder="***"
                        type={showPassWord ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value,
                          )
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

                  <div className="btn-area">
                    <MST.Button onClick={onSubmit}>Xác nhận</MST.Button>
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

export default VerifyPasswordPage;

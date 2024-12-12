import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CONST from "../../app/services/const";
import { setConfigAxios } from "../../app/fetch";
import "./style.css";
import Checkbox from "../../components/base/checkbox/Checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import MST from "../../components";
import { RegisterActions } from "../../app/services/register/register.slice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: '',
    password: "",
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = () => {
    console.log('Data',username + email + password)
    dispatch(
      RegisterActions.register({
        body: {
          //bioLink: registerUsername,
          username,
          email,
          password,
        },
        onSuccess: (message) => {
          alert(message);
          navigate("/login")
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
                  Đăng ký
                </p>
                {/* username and password */}
                <div className="group-input">
                  <div className="login-input">
                    <p
                      style={{
                        marginBottom: "4px",
                      }}
                    >
                      Tên người dùng
                    </p>
                    <div className="pass-input">
                      <input
                        placeholder="..."
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value)
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
                      Địa chỉ Email
                    </p>
                    <div className="pass-input">
                      <input
                        placeholder="..."
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
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
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
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
                    <div className="btn-register" onClick={onRegister}>
                      <button >Đăng ký</button>
                    </div>
                    <MST.Button onClick={() => { navigate("/login") }}>Đăng nhập</MST.Button>
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

export default RegisterPage;

import React, { useState } from "react";
import MST from "../../components";
import "./style.css";
import { useDispatch } from "react-redux";
import { LoginActions } from "../../app/services/login/login.slice";
import { isEmpty } from "lodash";

function ChangePasswordPage() {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [errorMessage, setErrorMessage] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const validate = (callback) => {
    const tempMessage = {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    };
    let count = 0;

    if (isEmpty(oldPassword)) {
      tempMessage.oldPassword = "Mật khẩu không được để trống";
      count++;
    }

    if (isEmpty(newPassword) || newPassword.length < 6) {
      tempMessage.newPassword =
        "Mật khẩu không được để trống và có độ dài từ 6 ký tự";
      count++;
    }

    if (isEmpty(rePassword)) {
      tempMessage.rePassword = "Mật khẩu không được để trống";
      count++;
    }

    if (newPassword !== rePassword) {
      tempMessage.newPassword = "Nhập lại mật khẩu không đúng";
      tempMessage.rePassword = "Nhập lại mật khẩu không đúng";
      count++;
    }

    if (count > 0) {
      setErrorMessage(tempMessage);
    } else {
      callback();
    }
  };

  const onChange = () => {
    dispatch(
      LoginActions.changePassword({
        body: {
          oldPassword,
          newPassword,
        },
        onSuccess: () => {
          setNewPassword("");
          setOldPassword("");
          setRePassword("");
        },
      })
    );
  };

  return (
    <MST.Container title={"Thay đổi mật khẩu"}>
      <div className="change-password-content">
        <div
          style={{
            width: 400,
          }}
        >
          <div className="mb-20">
            <div className="mb-4">Mật khẩu cũ</div>
            <MST.Input
              errorMessage={errorMessage.oldPassword}
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setErrorMessage({
                  ...errorMessage,
                  oldPassword: "",
                });
              }}
              placeholder="Nhập mật khẩu cũ"
              type="password"
            />
          </div>
          <div className="mb-20">
            <div className="mb-4">Mật khẩu mới</div>
            <MST.Input
              errorMessage={errorMessage.newPassword}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrorMessage({
                  ...errorMessage,
                  newPassword: "",
                });
              }}
              placeholder="Nhập mật lại mật khẩu mới"
              type="password"
            />
          </div>
          <div className="mb-20">
            <div className="mb-4">Nhập mật mật khẩu mới</div>
            <MST.Input
              errorMessage={errorMessage.rePassword}
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
                setErrorMessage({
                  ...errorMessage,
                  rePassword: "",
                });
              }}
              placeholder="Nhập mật mật khẩu mới"
              type="password"
            />
          </div>
          <div>
            <MST.Button onClick={() => validate(onChange)}>Xác nhận</MST.Button>
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default ChangePasswordPage;

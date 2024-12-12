import React, { useEffect, useState } from "react";
import Modal from "../base/modal/Modal";
import MST from "..";
import CONST from "../../app/services/const";
import "./style.css";
import { useNavigate } from "react-router-dom";
function UserInfo() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem(CONST.STORAGE.USER_INFO));
  const [showMenu, setShowMenu] = useState(false);
  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {}, []);

  const content = (
    <div>
      <div className="modal-header">Thông báo</div>
      <div className="modal-body">Bạn có muốn đăng xuất không?</div>
      <div className="modal-body">
        <div className="d-flex jc-between">
          <div />
          <MST.Button onClick={onLogout}>Xác nhận</MST.Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        content={content}
        isShow={isShow}
        onHide={() => setIsShow(false)}
      />
      <div
        onMouseOver={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        className="header-user-container"
      >
        <img
          alt="admin"
          className="header-user-avatar"
          src={require("../../images/logo.webp")}
        />
        <span className="header-user-name">{userInfo?.email}</span>
      </div>
      {showMenu ? (
        <div
          className="header-user-menu"
          onMouseOver={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <div
            className="header-user-one-menu"
            onClick={() => navigate("/system/change-password")}
          >
            Thay đổi mật khẩu
          </div>
          <div className="header-user-one-menu" onClick={() => setIsShow(true)}>
            Đăng xuất
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserInfo;

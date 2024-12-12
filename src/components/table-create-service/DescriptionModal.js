import React from "react";
import Modal from "../base/modal/Modal";

function DescriptionModal({ isShow, onHide, content }) {
  return <Modal isShow={isShow} onHide={onHide} content={content} />;
}

export default DescriptionModal;

import React from "react";
import "./style.css";
import { useContainerDimensions } from "../../../app/hooks";
import ReactModal from "react-modal";
function Modal({
  content,
  isShow,
  onHide,
  contentWidth = 400,
  contentStyle = {},
  classlist = "",
  classlistModalContent = "",
}) {
  return (
    <ReactModal
      isOpen={isShow}
      className="modal-wrapper"
      overlayClassName={classlist === "" ? "modal-overlay" : classlist}
    >
      <div className="modal-wrapper" onClick={onHide}></div>
      <div className="modal-container">
        <div
          className={
            classlistModalContent === ""
              ? "modal-content"
              : classlistModalContent
          }
          style={{
            minWidth: contentWidth,
            ...contentStyle,
          }}
        >
          <div>{content}</div>
        </div>
      </div>
    </ReactModal>
  );
}

export default Modal;

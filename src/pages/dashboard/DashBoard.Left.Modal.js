import React, { useMemo, useState } from "react";
import Modal from "../../components/base/modal/Modal";
import SVGInboxIcon from "../../components/dashboard/icon/inboxIcon";
import DashBoardLeftTotalCustomer from "../../components/dashboard/DashBoardLeft.Total.Customer";
import InboxArrowDown from "../../components/dashboard/icon/InboxArrowDown";
import TrashIcon from "../../components/dashboard/icon/trashIcon";
import InboxStackIcon from "../../components/dashboard/icon/inboxStackIcon";

function DashBoardLeftModal({ item, setIsShow, isShow }) {
  const onHide = () => {
    setIsShow(false);
  };

  const contentModal = useMemo(() => {
    return (
      <>
        <div className="dash-board-left-modal">
          <div className="dash-board-left-modal-title">
            <div>
              <SVGInboxIcon width={14} height={14} />
            </div>
            <div>Chi tiết số lượng đơn hàng theo trạng thái</div>
          </div>
          <div
            onClick={(e) => {
              setIsShow(false);
            }}
            className="dash-board-left-modal-icon"
          >
            X
          </div>
        </div>
        <div className="dash-board-left-modal-popup">
          <div>
            <DashBoardLeftTotalCustomer
              item={item?.completed}
              title={"Tổng đơn hoàn thành"}
              icon={<InboxStackIcon width={20} height={20} color="#FFFFFF" />}
              classList="dash-board-left-modal-popup-childe"
              classListTitle="dash-board-left-modal-popup-title"
            />
          </div>
          <div>
            <DashBoardLeftTotalCustomer
              item={item?.running}
              title={"Tổng đơn đang chạy"}
              icon={<InboxArrowDown width={20} height={20} color="#FFFFFF" />}
              classList="dash-board-left-modal-popup-childe"
              classListTitle="dash-board-left-modal-popup-title"
            />
          </div>
        </div>
        <div>
          <DashBoardLeftTotalCustomer
            item={item?.cancelled}
            title={"Tổng đơn đã hủy"}
            icon={<TrashIcon width={20} height={20} color="#FFFFFF" />}
            classList="dash-board-left-modal-popup-childe"
            classListTitle="dash-board-left-modal-popup-title"
          />
        </div>
      </>
    );
  }, [item]);

  return (
    <div className="d-flex jc-center">
      <Modal
        content={contentModal}
        isShow={isShow}
        onHide={onHide}
        classlist="modal-overlay-edit"
        classlistModalContent="modal-content-edit"
      />
    </div>
  );
}

export default DashBoardLeftModal;

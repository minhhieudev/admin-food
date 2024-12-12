import React, { useEffect, useState } from "react";
import Modal from "../../components/base/modal/Modal";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { ServiceActions } from "../../app/services/service/service.slice";

function ServiceCreateCreateServiceGroupModal({
  serviceGroupID,
  setServiceGroupID,
}) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [isShow, setIsShow] = useState(false);

  const onHide = () => setIsShow(false);
  const onShow = () => setIsShow(true);

  useEffect(() => {
    return () => {
      setName("");
    };
  }, [isShow]);

  const onCreate = () => {
    dispatch(
      ServiceActions.createServiceGroup({
        name,
        onSuccess: (rs) => {
          setServiceGroupID({
            value: rs?._id,
            name: rs?.name,
          });
          dispatch(ServiceActions.getCreateInfo());
          onHide();
        },
      })
    );
  };

  const renderContent = (
    <div>
      <div className="modal-header">Thêm nhóm dịch vụ</div>
      <div className="modal-body">
        <div className="mb-8">Tên nhóm dịch vụ</div>
        <MST.Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên nhóm dịch vụ"
        />
      </div>
      <div className="modal-footer">
        <div className="d-flex jc-between">
          <div />
          <MST.Button onClick={onCreate}>Xác nhận</MST.Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <MST.Button onClick={onShow}>Thêm nhóm dịch vụ</MST.Button>
      <Modal isShow={isShow} onHide={onHide} content={renderContent} />
    </div>
  );
}

export default ServiceCreateCreateServiceGroupModal;

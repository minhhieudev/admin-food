import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ServiceActions } from "../../app/services/service/service.slice";
import MST from "../../components";
import Modal from "../../components/base/modal/Modal";

function ServiceCreateCreateServiceTagModal({ serviceTags, setServiceTags }) {
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
      ServiceActions.createServiceTag({
        name,
        onSuccess: () => {
          dispatch(ServiceActions.getCreateInfo());
          onHide();
          setServiceTags([...serviceTags, { name: name, value: name }]);
        },
      })
    );
  };

  const renderContent = (
    <div>
      <div className="modal-header">Thêm thẻ dịch vụ</div>
      <div className="modal-body">
        <div className="mb-8">Tên thẻ dịch vụ</div>
        <MST.Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập thẻ dịch vụ"
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
      <MST.Button onClick={onShow}>Thêm thẻ dịch vụ</MST.Button>
      <Modal isShow={isShow} onHide={onHide} content={renderContent} />
    </div>
  );
}

export default ServiceCreateCreateServiceTagModal;

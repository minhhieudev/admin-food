import React, { useEffect, useState } from "react";
import Modal from "../../components/base/modal/Modal";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { IngredientActions } from "../../app/services/ingredient/ingredient.slice";

function ServiceCreateCreateIngredientTagModal({
  ingredientGroupID,
  setIGroupID,
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
    console.log(name)
    dispatch(
      IngredientActions.createIngredientGroup({
        body: { name },
        onSuccess: (rs) => {
          setIGroupID({
            value: rs?._id,
            name: rs?.name,
          });
          dispatch(IngredientActions.getCreateInfo());
          onHide();
        },
      })
    );
  };

  const renderContent = (
    <div>
      <div className="modal-header">Thêm nhóm thành phần</div>
      <div className="modal-body">
        <div className="mb-8">Tên nhóm</div>
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

export default ServiceCreateCreateIngredientTagModal
  ;

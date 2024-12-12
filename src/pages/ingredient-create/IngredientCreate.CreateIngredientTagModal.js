import React, { useEffect, useState } from "react";
import Modal from "../../components/base/modal/Modal";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { IngredientActions } from "../../app/services/ingredient/ingredient.slice";
import { HexColorPicker } from "react-colorful"; 

function CreateIngredientTagModal({
  ingredientGroupID,
  setITags,
}) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
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
      IngredientActions.createIngredientTag({
        body: {
          name,
          color,
        },
        onSuccess: (rs) => {
          setITags({
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
      <div className="modal-header">Thêm tag</div>
      <div className="modal-body">
        <div className="mb-8">Tên</div>
        <MST.Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên tag"
        />
        <div className="mb-8 mt-3">Chọn màu</div>
        <HexColorPicker color={color} onChange={setColor} />
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
      <MST.Button onClick={onShow}>Thêm Tag</MST.Button>
      <Modal isShow={isShow} onHide={onHide} content={renderContent} />
    </div>
  );
}

export default CreateIngredientTagModal;

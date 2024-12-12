import {
  ClipboardDocumentCheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import MST from "..";
import Modal from "../base/modal/Modal";
import Select from "../base/select/Select";
const AMOUNT_TYPES = [
  { name: "VND", value: "amount" },
  { name: "Phần trăm", value: "percent" },
];

const defaultValues = {
  label: "",
  value: "",
  price: {
    value: "",
    amountType: "amount",
  },
  description: "",
};

const defaultErrors = {
  label: "",
  value: "",
  price: "",
};

function AttributeDropdownModal(props) {
  const { isShow, onHide, item, customPrice = [], onSubmitOption } = props;
  const [listOption, setListOption] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);
  const amountTypeSelected = AMOUNT_TYPES.find(
    (type) => type.value === values.price?.amountType
  );
  const isUpdateOption =
    listOption.findIndex((option) => option.label === values.label) > -1;

  useEffect(() => {
    if (item.options?.length) {
      const mapListOption = item.options.map((option) => {
        if (option.price) return option;
        const mapItem = {
          ...option,
          price: {
            value: "",
            amountType: "amount",
          },
        };
        const findCustomPrice = customPrice.find(
          (custom) =>
            custom.attributeCode === item.code &&
            option.value === custom.mappingValue
        );
        if (findCustomPrice) {
          mapItem.price.value = findCustomPrice.price;
          mapItem.price.amountType = findCustomPrice.customType;
        }

        return mapItem;
      });
      setListOption(mapListOption);
    } else {
      setListOption([]);
    }
  }, [item, customPrice.length]);

  useEffect(() => {
    setValues(defaultValues);
    setErrors(defaultErrors);
  }, [isShow]);

  const validateData = (values) => {
    let errorName = "";
    let errorValue = "";
    let errorPrice = "";

    if (!values.label) {
      errorName = "Tên lựa chọn không được để trống";
    }
    if (!values.value) {
      errorValue = "Dữ liệu không được để trống";
    }
    if (!values.price.value) {
      errorPrice = "Giá cộng thêm không được để trống";
    }
    if (
      values.price.amountType === "percent" &&
      !(Number(values.price.value) > 0 && Number(values.price.value) < 100)
    ) {
      errorPrice = "Giá cộng thêm không hợp lệ";
    }

    // check exits value
    const valueHasExist = listOption
      .filter((option) => option.label !== values.label)
      .map((option) => option.value);
    if (valueHasExist.length && valueHasExist.includes(values.value)) {
      errorValue = "Dữ liệu này đã tồn tại";
    }
    if (!errorName && !errorValue && !errorPrice) {
      setErrors({
        label: "",
        value: "",
        price: "",
      });
      return true;
    } else {
      setErrors({
        label: errorName,
        value: errorValue,
        price: errorPrice,
      });
      return false;
    }
  };

  const handleClickAdd = () => {
    if (validateData(values)) {
      const newListOptions = [...listOption];
      const findIndex = newListOptions.findIndex(
        (option) => option.label === values.label
      );
      if (findIndex > -1) {
        // update
        newListOptions[findIndex] = values;
      } else {
        newListOptions.push(values);
      }
      setListOption(newListOptions);
      setValues(defaultValues);
    }
  };

  const content = (
    <div className="AttributeDropdownModal_container">
      <div className="AttributeDropdownModal_header">
        <p className="AttributeDropdownModal_title">Tùy chỉnh options</p>
        <span style={{ cursor: "pointer" }} onClick={onHide}>
          <XMarkIcon width={24} height={24} color="#72777A" />
        </span>
      </div>

      <div className="AttributeDropdownModal_fields">
        <div className="AttributeDropdownModal_fields_left">
          <div className="AttributeDropdownModal_fields_item_field">
            <div className="AttributeDropdownModal_fields_left_field_title">
              Tên lựa chọn<span style={{ color: "red" }}> *</span>
            </div>

            <MST.Input
              errorMessage={errors.label}
              placeholder="Nhập tên lựa chọn"
              maxLength={225}
              value={values.label}
              onChange={(e) => {
                setValues({ ...values, label: e.target.value });
              }}
              containerClassName="AttributeDropdownModal_input_container"
              errorContainerClassName="AttributeDropdownModal_input_error"
            />
          </div>

          <div className="AttributeDropdownModal_fields_item_field">
            <div className="AttributeDropdownModal_fields_left_field_title">
              Dữ liệu<span style={{ color: "red" }}> *</span>
            </div>

            <MST.Input
              errorMessage={errors.value}
              value={values.value}
              placeholder="Nhập dữ liệu"
              maxLength={225}
              containerClassName="AttributeDropdownModal_input_container"
              errorContainerClassName="AttributeDropdownModal_input_error"
              onChange={(e) => {
                setValues({ ...values, value: e.target.value });
              }}
            />
          </div>

          <div
            className="AttributeDropdownModal_fields_item_field"
            style={{ marginBottom: 0 }}
          >
            <div className="AttributeDropdownModal_fields_left_field_title">
              Giá cộng thêm<span style={{ color: "red" }}> *</span>
            </div>

            <div className="AttributeDropdownModal_fields_left_price_input_container">
              <MST.Input
                type="number"
                errorMessage={errors.price}
                value={values.price.value}
                placeholder="Nhập giá cộng thêm"
                containerClassName="AttributeDropdownModal_input_container"
                errorContainerClassName="AttributeDropdownModal_input_error"
                onChange={(e) => {
                  setValues({
                    ...values,
                    price: { ...values.price, value: e.target.value },
                  });
                }}
              />
              <div className="AttributeDropdownModal_fields_left_price_input_customType">
                <Select.Simple
                  canSearch={false}
                  placeholder="Chọn loại giá"
                  selected={amountTypeSelected}
                  setSelected={(type) => {
                    setValues({
                      ...values,
                      price: { ...values.price, amountType: type.value },
                    });
                  }}
                  width={120}
                  data={AMOUNT_TYPES}
                  itemTextStyle={{ fontSize: 12 }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AttributeDropdownModal_fields_right">
          <div className="AttributeDropdownModal_fields_right_desc">
            <div className="AttributeDropdownModal_fields_left_field_title">
              Mô tả
            </div>
            <textarea
              placeholder="Nhập mô tả"
              value={values.description}
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
              rows="4"
              cols="50"
              style={{
                fontFamily: "Cabin",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                fontSize: 16,
                flex: 1,
              }}
            />
          </div>
          <div className="AttributeDropdownModal_fields_right_button_container">
            <div
              className="AttributeDropdownModal_fields_right_button_add"
              onClick={handleClickAdd}
            >
              <span>
                {isUpdateOption ? (
                  <ClipboardDocumentCheckIcon
                    width={20}
                    height={20}
                    color="#FF8900"
                  />
                ) : (
                  <ChevronDoubleDownIcon
                    width={20}
                    height={20}
                    color="#FF8900"
                  />
                )}
              </span>
              <p className="AttributeDropdownModal_fields_right_add_text">
                {isUpdateOption ? "Lưu lựa chọn" : "Thêm lựa chọn"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {listOption.length ? (
        <>
          <div className="separate" />

          <div className="AttributeDropdownModal_list">
            {listOption.map((option) => (
              <ItemOption
                key={option.label}
                option={option}
                isSelected={option.label === values.label}
                onUpdateOption={(option) => {
                  setValues(option);
                }}
                onDeleteOption={(option) => {
                  setListOption(
                    listOption.filter((item) => item.label !== option.label)
                  );
                  if (option.label === values.label) {
                    setValues(defaultValues);
                  }
                }}
              />
            ))}
          </div>
        </>
      ) : null}

      <div className="separate" />

      <div className="AttributeDropdownModal_action_buttons">
        <MST.Button onClick={onHide} type="outlined" className="mr-8">
          Huỷ
        </MST.Button>
        <MST.Button
          disabled={!listOption.length}
          onClick={() => {
            onSubmitOption && onSubmitOption(listOption);
            onHide();
          }}
        >
          Xác nhận
        </MST.Button>
      </div>
    </div>
  );
  return (
    <Modal
      isShow={isShow}
      onHide={onHide}
      content={content}
      contentWidth={1024}
      contentStyle={{
        maxHeight: "calc(100vh - 80px)",
        overflowY: "scroll",
      }}
    />
  );
}

const ItemOption = ({ option, isSelected, onUpdateOption, onDeleteOption }) => {
  return (
    <div
      className="AttributeDropdownModal_list_item_container"
      style={{ borderColor: isSelected ? "#FF8900" : "#E3E5E5" }}
    >
      <div className="AttributeDropdownModal_list_item_container_left">
        <div className="AttributeDropdownModal_list_item_top">
          <p className="AttributeDropdownModal_list_item_tile">
            {option.label}
          </p>
          <p className="AttributeDropdownModal_list_item_value">
            {option.value}
          </p>
        </div>
        <div>
          <p className="AttributeDropdownModal_list_item_desc">
            {option.description}
          </p>
        </div>

        <div className="AttributeDropdownModal_list_item_bottom">
          <p className="AttributeDropdownModal_list_item_price">
            Giá cộng thêm:
          </p>
          <p className="AttributeDropdownModal_list_item_price_value">
            {`${option.price.value} ${
              option.price.amountType === "amount" ? "VND" : "%"
            }`}
          </p>
        </div>
      </div>
      <div className="AttributeDropdownModal_list_item_container_right">
        <span className="action_button" onClick={() => onUpdateOption(option)}>
          <PencilIcon width={16} height={16} color="#72777A" />
        </span>
        <span className="action_button" onClick={() => onDeleteOption(option)}>
          <TrashIcon width={16} height={16} color="#FF5247" />
        </span>
      </div>
    </div>
  );
};

export default AttributeDropdownModal;

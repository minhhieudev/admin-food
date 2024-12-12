import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./style.css";
import MST from "..";
import DeleteIcon from "./icons/DeleteIcon";
import Select from "../base/select/Select";
import DescriptionModal from "./DescriptionModal";
import EditIcon from "./icons/EditIcon";
import CogIcon from "./icons/CogIcon";
import Modal from "../base/modal/Modal";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import AttributeDropdownModal from "./AttributeDropdownModal";

const dataTypeList = [
  { name: "text", value: "text" },
  { name: "number", value: "number" },
  { name: "dropdown", value: "select" },
];

function TableCreateService({ data, onChange, customPrice }) {
  const onRemove = (id) => {
    onChange(data.filter((x) => x?.id !== id));
  };

  const onChangeData = (item) => {
    onChange(
      data.map((x) => {
        if (!isEmpty(x?.id)) {
          if (x?.id === item?.id) {
            return item;
          } else {
            return x;
          }
        } else {
          if (x?._id === item?._id) {
            return item;
          } else {
            return x;
          }
        }
      })
    );
  };

  return (
    <div>
      <table className="tcs-table-container">
        <thead className="tcs-td-head">
          <tr>
            <td className={`tcs-td-base`}>Tên thuộc tính</td>
            <td
              className={`tcs-td-base`}
              style={{
                width: 150,
              }}
            >
              Mã thuộc tính
            </td>
            <td
              className={`tcs-td-base`}
              style={{
                width: 100,
              }}
            >
              Kiểu dữ liệu
            </td>
            <td
              className={`tcs-td-base`}
              style={{
                width: 200,
              }}
            >
              Mô tả
            </td>
            <td
              className={`tcs-td-base`}
              style={{
                width: 70,
              }}
            >
              Bắt buộc
            </td>
            <td
              style={{
                width: 80,
              }}
              className={`tcs-td-base`}
            >
              Thao tác
            </td>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <OneItem
                item={item}
                key={index}
                onRemove={onRemove}
                onChangeData={onChangeData}
                customPrice={customPrice}
              />
            );
          })}
        </tbody>
      </table>
      {isEmpty(data) ? (
        <div className="tcs-table-no-data">Không có dữ liệu</div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TableCreateService;

const OneItem = ({ item, onRemove, onChangeData, customPrice }) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowAutoCommentModal, setIsShowAutoCommentModal] = useState(false);
  const [showAttributeDropdownModal, setShowAttributeDropdownModal] =
    useState(false);
  const [tempDescription, setTempDescription] = useState(
    item?.description || ""
  );

  const handleSubmitOption = (listOption) => {
    onChangeData({
      ...item,
      options: listOption,
    });
  };

  useEffect(() => {
    if (isShow) {
      setTempDescription(item?.description || "");
    }
  }, [isShow]);

  const modalContent = useMemo(() => {
    return (
      <div>
        <div className="modal-header">Mô tả</div>
        <div className="modal-body">
          <div>
            <textarea
              placeholder="Nhập mô tả"
              value={tempDescription}
              onChange={(e) => {
                setTempDescription(e.target.value);
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
              }}
            />
          </div>
        </div>
        <div className="modal-footer">
          <div className="d-flex jc-between">
            <div />
            <MST.Button
              onClick={() => {
                onChangeData({
                  ...item,
                  description: tempDescription,
                });
                setIsShow(false);
              }}
            >
              Xác nhận
            </MST.Button>
          </div>
        </div>
      </div>
    );
  }, [item, tempDescription]);

  const onShowAutoComment = () => {
    setIsShowAutoCommentModal(true);
  };

  const modalAutoCommentContent = useMemo(() => {
    return (
      <div>
        <div className="modal-header">Tuỳ chỉnh</div>
        <div className="modal-body">
          <div>
            <div className="mb-8">Cho phép tạo bình luận tự động</div>
            <MST.Switch
              enable={item?.commentType}
              onClick={() =>
                onChangeData({
                  ...item,
                  commentType: !item?.commentType,
                })
              }
            />
          </div>
        </div>
        <div className="modal-footer">
          <div className="d-flex jc-between">
            <div />
            <MST.Button
              type="outlined"
              onClick={() => {
                setIsShowAutoCommentModal(false);
              }}
            >
              Đóng
            </MST.Button>
          </div>
        </div>
      </div>
    );
  }, [item, tempDescription, onChangeData]);

  return (
    <>
      <Modal
        isShow={isShowAutoCommentModal}
        onHide={() => {
          setIsShowAutoCommentModal(false);
        }}
        content={modalAutoCommentContent}
      />
      <DescriptionModal
        isShow={isShow}
        onHide={() => setIsShow(false)}
        content={modalContent}
      />

      {showAttributeDropdownModal ? (
        <AttributeDropdownModal
          isShow={showAttributeDropdownModal}
          onHide={() => setShowAttributeDropdownModal(false)}
          item={item}
          customPrice={customPrice}
          onSubmitOption={handleSubmitOption}
        />
      ) : null}

      <tr className="tcs-tr">
        <td className={`tcs-td-border`}>
          <MST.Input
            errorMessage={item?.errorMessage?.label}
            value={item?.label}
            onChange={(e) => {
              onChangeData({
                ...item,
                label: e.target.value,
                errorMessage: {
                  ...item.errorMessage,
                  label: "",
                },
              });
            }}
            placeholder="Nhập tên thuộc tính"
            style={{
              borderWidth: 0,
            }}
          />
        </td>
        <td className={`tcs-td-border`}>
          <MST.Input
            errorMessage={item?.errorMessage?.code}
            value={item?.code}
            placeholder="Nhập mã thuộc tính"
            style={{
              borderWidth: 0,
            }}
            onChange={(e) => {
              onChangeData({
                ...item,
                code: e.target.value,
                errorMessage: {
                  ...item.errorMessage,
                  code: "",
                },
              });
            }}
          />
        </td>
        <td
          className={`tcs-td-border ${
            item?.dataType.value === "select" ? "dropdown-container" : ""
          }`}
        >
          <Select.Simple
            top={false}
            selected={item?.dataType}
            setSelected={(e) => {
              onChangeData({
                ...item,
                dataType: e,
              });
            }}
            canSearch={false}
            data={dataTypeList}
            width={100}
          />
          {item?.dataType.value === "select" && (
            <span
              className="dropdown-icon-edit"
              onClick={() => setShowAttributeDropdownModal(true)}
            >
              <Cog8ToothIcon width={16} height={16} color="#ff8900" />
            </span>
          )}
        </td>
        <td className={`tcs-td-border`}>
          {item?.description ? (
            <div
              className="d-flex"
              style={{
                justifyContent: "space-between",
                paddingLeft: 4,
                paddingRight: 4,
              }}
              onClick={() => setIsShow(true)}
            >
              <div
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  flex: 1,
                  width: 170,
                }}
              >
                {item?.description}
              </div>
              <div
                style={{
                  borderRadius: 50,
                  backgroundColor: "#F7F9FA",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 4,
                  marginLeft: 4,
                }}
              >
                <EditIcon />
              </div>
            </div>
          ) : (
            <button className="btn-description" onClick={() => setIsShow(true)}>
              Thêm mô tả
            </button>
          )}
        </td>
        <td className={`tcs-td-border`}>
          <div className="d-flex jc-center ai-center">
            <MST.Checkbox
              checked={item?.required}
              onClick={() =>
                onChangeData({
                  ...item,
                  required: !item?.required,
                })
              }
            />
          </div>
        </td>
        <td className={`tcs-td-border`}>
          <div className="d-flex jc-center">
            <button
              className="tcs-delete-btn"
              onClick={() => onRemove(item?.id)}
            >
              <DeleteIcon />
            </button>
            <button className="tcs-cog-btn" onClick={onShowAutoComment}>
              <CogIcon />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

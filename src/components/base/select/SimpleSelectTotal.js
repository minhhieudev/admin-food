import React, { useEffect, useRef, useState } from "react";
import "./select.css";
import DeleteIcon from "../../table-create-service/icons/DeleteIcon";
import { shortenContent } from "../../../app/utils/format";

/**
 *
 * SimpleSelect:
 *
 * - [placeholer]: default là "Chọn..."
 * - [data]: danh sách cần được render
 * - [selected]: option được chọn sau khi người dùng click
 * - [setSelected]: set lại data khi người dùng có hành động thoát khỏi select
 * - [search]: từ khoá cần tìm kiếm
 * - [setSearch]: set lại từ khoá tìm kiếm
 * - [canSearch]: default là true, false sẻ ẩn đi thanh tìm kiếm
 *
 */
export default function SimpleSelectTotal(props) {
  const {
    placeholder = "",
    data = [],
    selected,
    setSelected = undefined,
    canSearch = true,
    width = 160,
    validate = false,
    errorTitle,
    top = true,
    canRemove = false,
    onRemove = undefined,
    selectShowOptionsStyles = {},
    itemTextStyle = {},
  } = props;

  const divRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current?.contains(event.target)) {
        setIsShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isShow) {
      canSearch && setSearch && setSearch("");
    }
  }, [isShow, canSearch]);

  const onSelect = (item) => {
    setSelected(item);
    setIsShow(false);
  };

  return (
    <div
      ref={divRef}
      style={{
        width,
        position: "relative",
      }}
    >
      <div
        onClick={() => {
          setIsShow(!isShow);
        }}
        style={
          validate
            ? {
                height: 50,
                borderWidth: 1,
                borderColor: "#DC5345",
                borderRadius: 8,
                borderStyle: "solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingInline: 10,
                cursor: "pointer",
                zIndex: 15,
                width,
                boxSizing: "border-box",
              }
            : {
                height: "100%",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingInline: 10,
                cursor: "pointer",
                zIndex: 15,
                width: 160,
                boxSizing: "border-box",
                fontSize: 16,
              }
        }
      >
        <div
          style={{
            color: "#FF8900",
            display: "flex",
            fontSize: 16,
          }}
        >
          <span style={{ textOverflow: "ellipsis", width: "100%" }}>
            {selected?.name?.length > 0
              ? `${shortenContent(selected?.name)}`
              : placeholder}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={16}
          height={16}
          strokeWidth={1.5}
          stroke="#FF8900"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {validate ? (
        <span
          style={{
            display: "flex",
            color: "red",
            marginTop: 2,
            paddingLeft: 4,
          }}
        >
          {errorTitle}
        </span>
      ) : (
        <></>
      )}
      {isShow ? (
        <div
          className={
            top ? "select-show-options-total" : "select-show-options-bottom"
          }
          style={
            top
              ? {
                  width,
                  top: 40,
                  ...selectShowOptionsStyles,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }
              : { width, bottom: 54, ...selectShowOptionsStyles }
          }
        >
          {canSearch ? (
            <div
              style={{
                borderWidth: 1,
                borderColor: "#CDCFD0",
                borderRadius: 8,
                borderStyle: "solid",
                height: 40,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                position: "relative",
                margin: 5,
              }}
            >
              <input
                style={{
                  flex: 1,
                  borderWidth: 0,
                  height: 36,
                  paddingInline: 20,
                  borderRadius: 8,
                }}
                value={search}
                onChange={(e) => {
                  setSearch && setSearch(e.target.value);
                }}
                placeholder="Tìm kiếm"
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  right: 20,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#CDCFD0"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <></>
          )}
          {(search.length === 0
            ? data
            : data.filter(
                (x) => x.name.toLowerCase().search(search.toLowerCase()) > -1
              )
          ).map((oneItem) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 100,
                }}
              >
                <div
                  className="select-one-item-total"
                  key={oneItem?.name}
                  style={
                    selected?.value === oneItem?.value
                      ? {
                          padding: "0px 8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          marginBottom: 2,
                          transitionDuration: "0.5s",
                          fontSize: 12,
                          borderRadius: 20,
                          margin: "0px 5px",
                          background: "#cdcfd030",
                          height: 20,
                        }
                      : {
                          padding: "0px 8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          marginBottom: 2,
                          transitionDuration: "0.5s",
                          fontSize: 12,
                          borderRadius: 20,
                          margin: "0px 5px",
                          height: 20,
                        }
                  }
                >
                  {oneItem?.icon && oneItem?.icon}
                  <div
                    onClick={() => onSelect(oneItem)}
                    style={{
                      ...itemTextStyle,
                    }}
                  >
                    {oneItem?.name}
                  </div>
                  {selected?.value === oneItem?.value ? (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4.5 12.75L10.5 18.75L19.5 5.25"
                          stroke="#090A0A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <>
                      {canRemove ? (
                        <div>
                          <button
                            onClick={() => onRemove(oneItem?.value)}
                            style={{
                              borderRadius: 50,
                              width: 30,
                              height: 30,
                              borderWidth: 0,
                              backgroundColor: "#ff000010",
                              zIndex: 81,
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

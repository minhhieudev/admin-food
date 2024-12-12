"use client";
import { useEffect, useRef, useState } from "react";
import "./select.css";

/**
 *
 * MultipleSelect:
 *
 * - [placeholer]: default là "Chọn..."
 * - [data]: danh sách cần được render
 * - [selectedList]: danh sách được chọn sau khi người dùng click từng options
 * - [setSelectedList]: set lại data khi người dùng có hành động thoát khỏi select
 * - [search]: từ khoá cần tìm kiếm
 * - [setSearch]: set lại từ khoá tìm kiếm
 * - [canSearch]: default là true, false sẻ ẩn đi thanh tìm kiếm
 *
 */
export default function MultipleSelect(props) {
  const {
    placeholder = "",
    data = [],
    selectedList = [],
    setSelectedList = undefined,
    canSearch = true,
    width,
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
      setSearch("");
    }
  }, [isShow]);

  const onSelect = (item) => {
    const checkItem = selectedList.filter((x) => x.value == item.value);

    if (checkItem.length > 0) {
      setSelectedList(selectedList.filter((x) => x.name != item.name));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  return (
    <div
      ref={divRef}
      style={{
        position: "relative",
        width: width || 200,
      }}
    >
      <div
        onClick={() => {
          setIsShow(!isShow);
        }}
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: "#CDCFD0",
          borderRadius: 8,
          borderStyle: "solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 10,
          cursor: "pointer",
          zIndex: 15,
          width: width || 200,
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            color: selectedList.length > 0 ? "black" : "#72777A",
          }}
        >
          {selectedList.length > 0
            ? `${selectedList.map((x) => x.name).join(", ")}`
            : placeholder}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={16}
          height={16}
          strokeWidth={1.5}
          stroke="#72777A"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {isShow ? (
        <div
          className="select-show-options"
          style={{
            backgroundColor: "white",
            width: width || 200,
            position: "absolute",
            marginTop: 5,
            padding: 5,
            borderWidth: 1,
            borderColor: "#CDCFD0",
            borderRadius: 8,
            borderStyle: "solid",
            zIndex: 80,
            maxHeight: 200,
            overflow: "auto",
          }}
        >
          {canSearch ? (
            <div
              style={{
                borderWidth: 1,
                borderColor: "#CDCFD0",
                borderRadius: 8,
                borderStyle: "solid",
                width: width - 20 || 200,
                height: 40,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <input
                style={{
                  flex: 1,
                  borderWidth: 0,
                  height: 36,
                  borderRadius: 8,
                  paddingInline: 20,
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nhập từ khoá cần tìm"
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
          {(search.length == 0
            ? data
            : data.filter(
                (x) => x.name.toLowerCase().search(search.toLowerCase()) > -1
              )
          ).map((oneItem) => {
            const checkItem = selectedList.filter(
              (x) => x?.value == oneItem?.value
            );

            return (
              <div
                className="select-one-item"
                key={oneItem?.name}
                onClick={() => onSelect(oneItem)}
                style={{
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingInline: 20,
                  cursor: "pointer",
                  marginBottom: 2,
                }}
              >
                <div>{oneItem?.name}</div>
                {checkItem.length > 0 ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.916 4.62598C20.2607 4.85575 20.3538 5.3214 20.124 5.66604L11.124 19.166C10.9994 19.353 10.7975 19.4742 10.5739 19.4964C10.3503 19.5185 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9875 3.67678 12.5126 3.96967 12.2197C4.26256 11.9268 4.73744 11.9268 5.03033 12.2197L10.3834 17.5728L18.876 4.83399C19.1057 4.48935 19.5714 4.39622 19.916 4.62598Z"
                        fill="#FF8900"
                      />
                    </svg>
                  </div>
                ) : (
                  <></>
                )}
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

import React from "react";
import { useNavigate } from "react-router";
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        display: "flex",
        textAlign: "center",
      }}
    >
      <div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={681.179}
            height={339.741}
          >
            <g data-name="Group 405" transform="translate(479.371 328.054)">
              <path
                fill="#c41311"
                d="M-457.687 2.584a9.129 9.129 0 0 1-9.1 9.1h-4.849a1.771 1.771 0 0 1-1.77-1.772v-14.66a1.77 1.77 0 0 1 1.77-1.77h4.849a9.128 9.128 0 0 1 9.1 9.102Z"
                data-name="Path 371"
              />
              <rect
                width={16.183}
                height={2.697}
                fill="#c41311"
                data-name="Rectangle 358"
                rx={1.035}
                transform="translate(-479.371 -2.473)"
              />
              <rect
                width={16.183}
                height={2.697}
                fill="#c41311"
                data-name="Rectangle 359"
                rx={1.035}
                transform="translate(-479.371 4.944)"
              />
              <path
                fill="none"
                stroke="#c41311"
                strokeWidth={2}
                d="M-220.082-133.551v-35.246h-97.037v-25.1l85.71-130.1h41.938v128.258h28.162v26.937h-28.162v48.978s-22.959-.134-30.611 0c-34.111.6-178.62-11.732-118.61 60.416S-462.759 1.955-462.759 1.955m175.945-197.69h66.732v-100.4Z"
                data-name="Path 372"
              />
              <path
                fill="none"
                stroke="#c41311"
                strokeWidth={2}
                d="M-58.157-327.054c56.63 0 79.894 54.793 79.894 105.3S-1.527-116.147-58.157-116.147s-79.894-55.1-79.894-105.607 23.263-105.3 79.894-105.3Zm0 27.243c-36.121 0-48.671 38.263-48.671 78.057s12.55 78.363 48.671 78.363 48.671-38.569 48.671-78.363-12.551-78.057-48.671-78.057Z"
                data-name="Path 373"
              />
              <path
                fill="none"
                stroke="#c41311"
                strokeWidth={2}
                d="M142.035-168.797H44.999v-25.1l85.708-130.092h41.94v128.258h28.16v26.937h-28.16v48.978h-30.612Zm-66.728-26.938h66.728v-100.4Z"
                data-name="Path 374"
              />
            </g>
          </svg>
        </div>
        <div
          style={{
            marginBottom: 20,
            fontSize: 20,
          }}
        >
          Trang không tồn tại
        </div>
        <div
          style={{
            color: "blue",
          }}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;

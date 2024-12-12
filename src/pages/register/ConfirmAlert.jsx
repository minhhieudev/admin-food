import { useRouter } from "next/navigation";
import React from "react";

function ConfirmAlert({ isVerify }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-[100vh] absolute w-[100vw]">
      <div className="p-10 w-[460px] text-center rounded-lg bg-white shadow-md">
        <div className="text-[#090A0A] font-cabin text-xl font-semibold leading-8">Xác minh tài khoản</div>
        <div>
          {isVerify ? (
            <div className="justify-center items-center my-3">
              <div className="justify-center items-center flex mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M36.6664 18.4667V20.0001C36.6643 23.5941 35.5005 27.0912 33.3486 29.9698C31.1966 32.8484 28.1718 34.9542 24.7253 35.9732C21.2787 36.9923 17.5951 36.8699 14.2238 35.6244C10.8525 34.3788 7.9741 32.0769 6.01794 29.0618C4.06179 26.0468 3.13266 22.4802 3.36914 18.8939C3.60561 15.3077 4.99502 11.8939 7.33014 9.16185C9.66526 6.42976 12.821 4.5257 16.3267 3.73364C19.8323 2.94158 23.5001 3.30395 26.783 4.76673"
                    stroke="#23C16B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.6667 6.66663L20 23.35L15 18.35"
                    stroke="#23C16B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="text-green-400 mt-3 text-center font-poppins text-lg font-normal leading-6">Xác minh thành công</div>
              <div className="text-green-400 mt-3 text-center font-poppins text-lg font-normal leading-6">
                bạn có thể truy cập trang{" "}
                <span
                  onClick={() => {
                    router.replace("/login");
                  }}
                  className="text-orange-400 text-center font-poppins text-lg font-normal leading-6"
                >
                  tại đây
                </span>
              </div>
            </div>
          ) : (
            <div className="justify-center items-center my-3">
              <div className="justify-center items-center flex mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M30 10L10 30" stroke="#FF5247" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 10L30 30" stroke="#FF5247" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className="mt-3 px-9 text-red-500 text-center font-poppins text-lg font-normal leading-6">Xác minh không thành công</div>
              <div className="mt-3 px-9 text-red-500 text-center font-poppins text-lg font-normal leading-6">vui lòng kiếm tra lại</div>
            </div>
          )}
        </div>
        <div className="flex p-1 justify-center items-center gap-2 text-[#090A0A] font-cabin text-sm font-normal leading-[1.14rem]">
          Bạn đã có tài khoản?{" "}
          <span
            onClick={() => {
              router.replace("/login");
            }}
            className="text-[#090A0A] font-cabin text-base font-semibold leading-4"
          >
            Đăng nhập
          </span>
        </div>
        <div className="bg-[#E3E5E5] h-[1px] my-6" />
        <div className="text-gray-600 text-center font-cabin text-xs font-normal leading-4">
          Bằng việc tiếp tục, bạn đã đồng ý với Điều khoản dịch vụ của MST và xác nhận đã đọc và hiểu Chính sách về quyền riêng tư của chúng
          tôi, cũng như bạn đã đủ 13 tuổi.
        </div>
      </div>
    </div>
  );
}

export default ConfirmAlert;

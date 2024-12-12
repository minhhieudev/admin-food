import React from "react";

import { ToastContainer } from "react-toastify";
import GlobalLoading from "./GlobalLoading";
import './init.css';
function InitComponent() {


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          borderRadius: 10,
        }}
      />
      <GlobalLoading />
    </>
  );
}

export default InitComponent;

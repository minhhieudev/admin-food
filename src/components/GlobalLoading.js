import React from "react";
import Loading from "./Loading";
import { useSelector } from "react-redux";

function GlobalLoading() {
  const isLoading = useSelector((state) => state.app.isLoading);
  return isLoading ? (
    <Loading />
  ) : (
    <></>
  );
}

export default GlobalLoading;

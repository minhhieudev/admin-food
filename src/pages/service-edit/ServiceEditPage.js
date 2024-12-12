import React, { useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import ServiceCreatePage from "../service-create/ServiceCreatePage";
import { useDispatch } from "react-redux";
import { ServiceActions } from "../../app/services/service/service.slice";
function ServiceEditPage() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getDetail();
    }
    return () => {
      dispatch(ServiceActions.setServiceDetail(undefined));
    };
  }, [params]);

  const getDetail = () => {
    dispatch(
      ServiceActions.getServiceById({
        id: params.id,
      })
    );
  };

  return <ServiceCreatePage />;
}

export default ServiceEditPage;

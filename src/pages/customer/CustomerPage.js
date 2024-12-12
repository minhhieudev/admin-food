import React from "react";
import { useNavigate } from "react-router";
import MST from "../../components";
import PlugIcon from "../../images/icons/PlugIcon";
import CustomerList from "./CustomerList";
import "./style.css";
function CustomerPage() {
  return (
    <MST.Container title="Danh sách khách hàng">
      <div className="customer-content">
        <CustomerList />
      </div>
    </MST.Container>
  );
}

export default CustomerPage;

import React from "react";
import "./style.css";
import MST from "../../components";
import KeywordCreateModal from "./Keyword.CreateModal";
import KeywordList from "./KeywordList";
function KeywordPage() {
  return (
    <MST.Container title={"Danh sách từ khoá"} right={<KeywordCreateModal />}>
      <div className="keyword-content">
        <KeywordList />
      </div>
    </MST.Container>
  );
}

export default KeywordPage;

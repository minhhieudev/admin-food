import React from "react";
import "./style.css";
import MST from "../../components";
import TopicCreateModal from "./Topic.CreateModal";
import TopicList from "./TopicList";
function TopicPage() {
  return (
    <MST.Container title={"Danh sách chủ đề"} right={<TopicCreateModal />}>
      <div className="topic-content">
        <TopicList />
      </div>
    </MST.Container>
  );
}

export default TopicPage;

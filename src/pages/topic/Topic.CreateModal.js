import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TopicActions } from "../../app/services/topic/topic.slice";
import MST from "../../components";
import Modal from "../../components/base/modal/Modal";

function TopicCreateModal() {
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isShow) {
      setTopicName("");
    }
  }, [isShow]);

  const onHide = () => setIsShow(false);

  const onShow = () => setIsShow(true);

  const validate = (callback) => {
    callback();
  };

  const callback = () => {
    dispatch(
      TopicActions.createTopic({
        body: {
          topicName,
        },
        onSuccess: onHide,
      })
    );
  };

  const renderContent = (
    <div>
      <div className="modal-header">
        <span>Thêm chủ đề</span>
      </div>
      <div className="modal-body">
        <div className="mb-4">Tên chủ đề</div>
        <MST.Input
          errorMessage={errorMessage}
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          placeholder="Nhập tên chủ đề"
        />
      </div>
      <div className="modal-footer">
        <div className="d-flex jc-between">
          <div />
          <div className="d-flex">
            <MST.Button className="mr-8" onClick={onHide} type="outlined">
              Hủy
            </MST.Button>
            <MST.Button onClick={() => validate(callback)}>Xác nhận</MST.Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal content={renderContent} isShow={isShow} onHide={onHide} />
      <MST.Button onClick={onShow}>Thêm chủ đề</MST.Button>
    </div>
  );
}

export default TopicCreateModal;

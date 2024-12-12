import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeywordActions } from "../../app/services/keyword/keyword.slice";
import MST from "../../components";
import Modal from "../../components/base/modal/Modal";
import {
  TopicActions,
  TopicSelectors,
} from "../../app/services/topic/topic.slice";
import Select from "../../components/base/select/Select";

function KeywordCreateModal() {
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  const [keywordName, setKeywordName] = useState("");
  const [topic, setTopic] = useState({
    name: "",
    value: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const topicList = useSelector(TopicSelectors.topicList);

  useEffect(() => {
    if (isShow) {
      dispatch(TopicActions.getAllTopics());
    } else {
      setKeywordName("");
      setTopic({
        name: "",
        value: "",
      });
    }
  }, [isShow]);

  const onHide = () => setIsShow(false);

  const onShow = () => setIsShow(true);

  const validate = (callback) => {
    callback();
  };

  const callback = () => {
    dispatch(
      KeywordActions.createKeyword({
        body: {
          keyword: keywordName,
          topicCode: topic.value,
        },
        onSuccess: onHide,
      })
    );
  };

  const renderContent = (
    <div>
      <div className="modal-header">
        <span>Thêm từ khoá</span>
      </div>
      <div className="modal-body">
        <div>
          <div className="mb-4">Tên từ khoá</div>
          <MST.Input
            errorMessage={errorMessage}
            value={keywordName}
            onChange={(e) => setKeywordName(e.target.value)}
            placeholder="Nhập tên từ khoá"
          />
        </div>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <div className="mb-4">Chủ đề</div>
          <Select.Simple
            placeholder="Chọn chủ đề"
            width={"100%"}
            data={topicList.map((x) => {
              return {
                value: x._id,
                name: x.topicName,
              };
            })}
            selected={topic}
            setSelected={setTopic}
          />
        </div>
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
      <MST.Button onClick={onShow}>Thêm từ khoá</MST.Button>
    </div>
  );
}

export default KeywordCreateModal;

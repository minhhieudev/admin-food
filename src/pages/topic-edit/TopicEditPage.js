import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  TopicActions,
  TopicSelectors,
} from "../../app/services/topic/topic.slice";
import MST from "../../components";
import "./style.css";

function TopicEditPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const topicDetail = useSelector(TopicSelectors.topicDetail);
  useEffect(() => {
    if (params.id) {
      getDetail();
    }
    return () => {
      dispatch(TopicActions.setTopicDetail(undefined));
    };
  }, [params]);

  const getDetail = () => {
    dispatch(
      TopicActions.getTopicById({
        id: params.id,
      })
    );
  };
  useEffect(() => {
    if (topicDetail) {
      setTopicName(topicDetail?.topicName);
      setFollowRate(topicDetail?.followRate);
      setSearchRate(topicDetail?.searchRate);
      setIsEnabled(topicDetail?.isEnabled);
    }
  }, [topicDetail]);

  const [topicName, setTopicName] = useState("");
  const [followRate, setFollowRate] = useState("");
  const [searchRate, setSearchRate] = useState("");
  const [isEnabled, setIsEnabled] = useState("");

  const validate = (callback) => {
    callback();
  };

  const onEdit = () => {
    dispatch(
      TopicActions.edit({
        onSuccess: () => {
          toast.success("Cập nhật chủ đề thành công");
        },
        id: topicDetail._id,
        body: {
          topicName,
          isEnabled,
        },
      })
    );
  };

  return (
    <MST.Container
      title={"Cập nhật chủ đề"}
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/keyword/topics")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button onClick={() => validate(onEdit)}>Lưu lại</MST.Button>
        </div>
      }
    >
      <div className="topic-create-content">
        <div className="topic-create-one-field">
          <div className="topic-create-one-field-name">Trạng thái</div>
          <div>
            <MST.Switch
              onClick={() => setIsEnabled(!isEnabled)}
              enable={isEnabled}
            />
          </div>
        </div>
        <div className="topic-create-one-field">
          <div className="topic-create-one-field-name">Tên chủ đề</div>
          <div>
            <MST.Input
              disabled
              value={topicName}
              onChange={(e) => {
                setTopicName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="topic-create-one-field">
          <div className="topic-create-one-field-name">Tỷ lệ tìm kiếm</div>
          <div>
            <MST.Input disabled value={searchRate} />
          </div>
        </div>
        <div className="topic-create-one-field">
          <div className="topic-create-one-field-name">Lượng truy cập</div>
          <div>
            <MST.Input disabled value={followRate} />
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default TopicEditPage;

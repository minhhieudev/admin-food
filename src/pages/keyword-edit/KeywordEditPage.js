import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  KeywordActions,
  KeywordSelectors,
} from "../../app/services/keyword/keyword.slice";
import MST from "../../components";
import "./style.css";
import InteractionComponent from "./InteractionComponent";
import KeywordRelatedComponent from "./KeywordRelatedComponent";

function KeywordEditPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const keywordDetail = useSelector(KeywordSelectors.keywordDetail);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      getDetail();
    }
    return () => {
      dispatch(KeywordActions.setKeywordDetail(undefined));
    };
  }, [params]);

  const getDetail = () => {
    dispatch(
      KeywordActions.getKeywordById({
        id: params.id,
      })
    );
  };
  useEffect(() => {
    if (keywordDetail) {
      setKeyword(keywordDetail?.keyword);
      setTopic(keywordDetail?.topicCode?.topicName);
      setIsEnabled(keywordDetail?.isEnabled);
    }
  }, [keywordDetail]);

  const [keyword, setKeyword] = useState("");
  const [topic, setTopic] = useState("");
  const [isEnabled, setIsEnabled] = useState(keywordDetail?.isEnabled || false);

  const validate = (callback) => {
    callback();
  };

  const onEdit = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(
        KeywordActions.edit({
          onSuccess: () => {
            toast.success("Cập nhật từ khoá thành công");
            setIsLoading(false);
            setIsEnabled(!isEnabled);
          },
          onFail: () => {
            setIsLoading(false);
          },
          id: params.id,
          body: {
            isEnabled: !isEnabled,
          },
        })
      );
    }
  }, [isEnabled, isLoading]);

  return (
    <MST.Container>
      <div className="d-flex">
        <div className="keyword-create-content">
          <div className="keyword-create-content-general">
            <div className="keyword-create-title">Thông tin chung</div>
            <div className="keyword-create-one-field">
              <div className="keyword-create-one-field-name">Trạng thái</div>
              <div>
                <MST.Switch onClick={onEdit} enable={isEnabled} />
              </div>
            </div>
            <div className="keyword-create-one-field">
              <div className="keyword-create-one-field-name">Tên từ khoá</div>
              <div>
                <MST.Input
                  disabled
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="keyword-create-one-field">
              <div className="keyword-create-one-field-name">Chủ đề</div>
              <div>
                <MST.Input disabled value={topic} />
              </div>
            </div>
          </div>
          <InteractionComponent />
        </div>
        <KeywordRelatedComponent />
      </div>
    </MST.Container>
  );
}

export default KeywordEditPage;

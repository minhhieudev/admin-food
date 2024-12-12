import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TopicActions,
  TopicSelectors,
} from "../../app/services/topic/topic.slice";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import TopicOptionsModal from "./Topic.Options";
import TopicSearch from "./TopicSearch";

function TopicList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topicList = useSelector(TopicSelectors.topicList);
  const pagination = useSelector(TopicSelectors.pagination);
  useEffect(() => {
    dispatch(TopicActions.getTopics());
  }, [pagination.page, navigate, dispatch]);

  useEffect(() => {
    getTopicList();
  }, [navigate, dispatch]);

  const getTopicList = () => {
    dispatch(TopicActions.getTopics());
  };

  const thead = [
    {
      name: "STT",
      style: { width: 40 },
      className: "",
    },
    {
      name: "Tên chủ đề",
      style: {
        textAlign: "left",
      },
    },
    {
      name: "Tổng theo dõi",
      style: { width: 200 },
    },
    {
      name: "Tổng từ khoá",
      style: {
        width: 140,
      },
    },
    {
      name: "Trạng thái",
      style: {
        width: 140,
      },
    },

    {
      name: "thao tác",
      style: {
        width: 100,
      },
    },
  ];

  const genRenderList = useCallback(() => {
    return (topicList || []).map((x, index) => {
      return [
        { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
        {
          value: x?.topicName,
          style: {
            textAlign: "left",
          },
        },
        { value: x?.totalFollows },
        {
          value: x?.totalKeywords,
        },
        { value: x?.isEnabled ? "Trạng thái 1" : "Trạng thái 2" },
        {
          value: <TopicOptionsModal id={x?._id} />,
        },
      ];
    });
  }, [topicList]);

  const onChangePage = (page) => {
    dispatch(
      TopicActions.setPagination({
        ...pagination,
        page,
      })
    );
  };

  return (
    <div>
      <TopicSearch />
      <MST.Table head={thead} body={genRenderList()} />
      <div className="topic-pagination">
        <Pagination
          onChange={onChangePage}
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalPage={pagination.totalPage}
          total={pagination.total}
        />
      </div>
    </div>
  );
}

export default TopicList;

export const odGenColor = (content) => {
  switch (content) {
    case "running":
      return "#FF8900";
    case "completed":
      return "#23C16B";
  }
};
export const odGenStatus = (status) => {
  switch (status) {
    case "running":
      return "Đang chạy";
    case "completed":
      return "Hoàn tất";
    case "cancelled":
      return "Đã huỷ";
    default:
      return "...";
  }
};

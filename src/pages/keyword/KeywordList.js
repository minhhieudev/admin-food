import moment from "moment/moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  KeywordActions,
  KeywordSelectors,
} from "../../app/services/keyword/keyword.slice";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import KeywordSearch from "./KeywordSearch";
import KeywordOptionsModal from "./Keyword.Options";

function KeywordList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const keywordList = useSelector(KeywordSelectors.keywordList);
  const pagination = useSelector(KeywordSelectors.pagination);
  useEffect(() => {
    dispatch(KeywordActions.getKeywords());
  }, [pagination.page, navigate, dispatch]);

  useEffect(() => {
    getKeywordList();
  }, [navigate, dispatch]);

  const getKeywordList = () => {
    dispatch(KeywordActions.getKeywords());
  };

  const thead = [
    {
      name: "STT",
      style: { width: 40 },
      className: "",
    },
    {
      name: "từ khoá",
      style: {
        textAlign: "left",
      },
    },
    {
      name: "Tổng view",
      style: { width: 100 },
    },
    {
      name: "Tổng like",
      style: {
        width: 100,
      },
    },
    {
      name: "Tổng comment",
      style: {
        width: 110,
      },
    },
    {
      name: "Tổng video",
      style: {
        width: 100,
      },
    },
    {
      name: "Trạng thái",
      style: {
        width: 140,
      },
    },
    {
      name: "Ngày tạo",
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
    return (keywordList || []).map((x, index) => {
      return [
        { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
        {
          value: x?.keyword,
          style: {
            textAlign: "left",
          },
        },
        { value: x?.totalViews },
        {
          value: x?.totalLikes,
        },
        {
          value: x?.totalComments,
        },
        {
          value: x?.totalVideos,
        },
        { value: x?.isEnabled ? "Trạng thái 1" : "Trạng thái 2" },
        { value: moment(x?.createdAt).format("HH:mm DD/MM/YYYY") },
        {
          value: <KeywordOptionsModal id={x?._id} />,
        },
      ];
    });
  }, [keywordList]);

  const onChangePage = (page) => {
    dispatch(
      KeywordActions.setPagination({
        ...pagination,
        page,
      })
    );
  };

  return (
    <div>
      <KeywordSearch />
      <MST.Table head={thead} body={genRenderList()} />
      <div className="keyword-pagination">
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

export default KeywordList;

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

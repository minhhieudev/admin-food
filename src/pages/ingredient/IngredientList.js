import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IngredientActions, IngredientSelectors } from "../../app/services/ingredient/ingredient.slice";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import IngredientSearch from "./IngredientSearch";
import EyeIcon from "./icons/EyeIcon";
import ServiceDeleteModal from "./Ingredient.Options";


function IngredientList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredientList = useSelector(IngredientSelectors.ingredientList);
  const pagination = useSelector(IngredientSelectors.pagination);

  useEffect(() => {
    if (pagination.page !== undefined && pagination.pageSize !== undefined) {
      dispatch(IngredientActions.getIngredients({ page: pagination.page, pageSize: pagination.pageSize }));
    }
  }, [pagination.page, pagination.pageSize, dispatch]);

  useEffect(() => {
    getIngredientList();
    return () => {
      dispatch(IngredientActions.resetState());
    };
  }, [dispatch]);

  const getIngredientList = () => {
    if (pagination.page !== undefined && pagination.pageSize !== undefined) {
      dispatch(IngredientActions.getIngredients({ page: pagination.page, pageSize: pagination.pageSize }));
    }
  };

  const thead = [
    {
      name: "STT",
      style: { width: 20 },
      className: "",
    },
    {
      name: "Tên thành phần",
      style: { width: 120 },
      className: "",
    },
    // {
    //   name: "Mã thành phần",
    //   style: {
    //     textAlign: "center",
    //   },
    // },
    // {
    //   name: "Mô tả",
    //   style: {

    //   },
    // },
    {
      name: "Thẻ TP",
      style: { width: 150 },
    },
    {
      name: "Nhóm TP",
      style: { width: 100 },
    },
    {
      name: "Ảnh",
      style: { width: 200 },
    },
    {
      name: "Thao tác",
      style: {
        width: 100,
      },
    },
  ];

  const genRenderList = useCallback(() => {
    return (ingredientList || []).map((ingredient, index) => {
      return [
        { value: index + 1 },
        { value: ingredient.name },
        //{ value: ingredient.code },
        // { value: <div dangerouslySetInnerHTML={{ __html: ingredient.description }} /> },
        {
          value: ingredient.iTags?.map(tag => (
            <div key={tag._id} style={{ color: tag.color }}>
              {tag.iTagName}
            </div>
          )),
        },
        {
          value: ingredient.iGroupID?.name , 
        },
        {
          value: <img
            src={`${process.env.REACT_APP_CDN_URL}${ingredient.image}`}
            alt={ingredient.image}
            style={{ maxWidth: "100%", height: "50px" }}
          />
        },
        {
          value: <ServiceDeleteModal id={ingredient._id} />,
        },
      ];
    });
  }, [ingredientList, navigate]);


  const onChangePage = (page) => {
    if (pagination.page !== undefined) {
      dispatch(
        IngredientActions.setPagination({
          ...pagination,
          page,
        })
      );
    }
  };

  return (
    <div >
      <IngredientSearch />
      <MST.Table head={thead} body={genRenderList()} />
      {pagination.page !== undefined && (
        <div className="ingredient-pagination">
          <Pagination
            onChange={onChangePage}
            page={pagination.page}
            pageSize={pagination.pageSize}
            totalPage={pagination.totalPage}
            total={pagination.total}
          />
        </div>
      )}
    </div>
  );
}

export default IngredientList;

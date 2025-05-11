import moment from "moment";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IngredientActions, IngredientSelectors } from "../../app/services/ingredient/ingredient.slice";
import MST from "../../components";
import Pagination from "../../components/base/pagination/Pagination";
import Select from "../../components/base/select/Select";
import IngredientSearch from "./IngredientSearch";
import EyeIcon from "./icons/EyeIcon";
import ServiceDeleteModal from "./Ingredient.Options";


function IngredientList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredientList = useSelector(IngredientSelectors.ingredientList);
  const pagination = useSelector(IngredientSelectors.pagination);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [filteredList, setFilteredList] = useState([]);

  // Tạo danh sách nhóm từ ingredientList, loại bỏ các phần tử trùng lặp và thêm lựa chọn "Tất cả"
  const groupList = useMemo(() => {
    if (!ingredientList || !ingredientList.length) return [{ name: "Tất cả", value: "all" }];
    
    const uniqueGroups = {};
    ingredientList.forEach(item => {
      if (item.iGroupID && item.iGroupID._id && item.iGroupID.name) {
        uniqueGroups[item.iGroupID._id] = {
          name: item.iGroupID.name,
          value: item.iGroupID._id
        };
      }
    });
    
    // Thêm lựa chọn "Tất cả" vào đầu danh sách
    return [{ name: "Tất cả", value: "all" }, ...Object.values(uniqueGroups)];
  }, [ingredientList]);

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

  useEffect(() => {
    if (selectedGroup && selectedGroup.value && selectedGroup.value !== "all") {
      const filtered = ingredientList.filter(item => 
        item.iGroupID && item.iGroupID._id === selectedGroup.value
      );
      setFilteredList(filtered);
    } else {
      // Nếu chọn "Tất cả" hoặc không chọn gì, hiển thị toàn bộ danh sách
      setFilteredList(ingredientList);
    }
  }, [selectedGroup, ingredientList]);

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
    return (filteredList || []).map((ingredient, index) => {
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
  }, [filteredList]);


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

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <IngredientSearch />
        <div style={{ width: "250px" }}>
          <Select.Simple
            placeholder="Lọc theo nhóm thành phần"
            data={groupList}
            selected={selectedGroup}
            setSelected={handleGroupChange}
            width={250}
          />
        </div>
      </div>
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MealActions,
  MealSelectors,
} from "../../app/services/meal/meal.slice";
import { formatPriceVND } from "../../app/utils/format";
import Pagination from "../../components/base/pagination/Pagination";
import Table from "../../components/base/table/Table";
import MealDeleteModal from "./Meal.Options";
import "./style.css";
import moment from "moment/moment";
import Modal from "../../components/base/modal/Modal";

function MealList() {
  const dispatch = useDispatch();
  const mealList = useSelector(MealSelectors.mealList) || [];
  const pagination = useSelector(MealSelectors.pagination) || { page: 1, pageSize: 10, total: 0 };

  useEffect(() => {
    dispatch(MealActions.getMeals({ 
      page: pagination.page,
      onSuccess: (response) => {
        console.log('API response:', response);
      },
      onError: (error) => {
        console.error('API error:', error);
      }
    }));
  }, [pagination.page, dispatch]);


  const thead = [
    { name: "STT", style: { width: 20 }, className: "" },
    { style: { textAlign: "center" }, name: "Tên khách hàng" },
    { name: "Khung giờ", style: { width: 120 } },
    { name: "Ngày giao", style: { width: 120 } },
    { name: "Trạng thái", style: { width: 120 } },
    { name: "Thao tác", style: { width: 100 } },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'Đang chờ', color: 'orange' };
      case 'done':
        return { text: 'Hoàn thành', color: 'green' };
      case 'cancelled':
        return { text: 'Đã hủy', color: 'red' };
      case 'inprogress':
        return { text: 'Đang xử lý', color: 'blue' };
      default:
        return { text: 'Không xác định', color: 'gray' };
    }
  };

  const handleStatusChange = (() => {
    let isUpdating = false; // Cờ để theo dõi trạng thái cập nhật

    return (mealId, newStatus) => {
      // Kiểm tra xem trạng thái mới có khác với trạng thái hiện tại không
      const currentMeal = mealList.find(meal => meal._id === mealId);
      if (currentMeal && currentMeal.status !== newStatus && !isUpdating) {
        isUpdating = true; // Đánh dấu là đang cập nhật
        // Dispatch action to update meal status
        dispatch(MealActions.updateMealStatus({ id: mealId, status: newStatus }));
        
        // Reset cờ sau một khoảng thời gian nhất định (ví dụ: 1 giây)
        setTimeout(() => {
          isUpdating = false;
        }, 1000);
      }
    };
  })();

  const genDataTable = () => {
    try {
      console.log('Generating table data with mealList:', mealList);
      if (!Array.isArray(mealList) || mealList.length === 0) {
        console.log('MealList is empty or not an array');
        return [];
      }
      
      // Sắp xếp mealList theo estimatedDate (ngày giao)
      const sortedMealList = [...mealList].sort((a, b) => {
        const dateA = moment(a.estimatedDate);
        const dateB = moment(b.estimatedDate);
        return dateA.isBefore(dateB) ? -1 : 1;  // Sắp xếp tăng dần
      });
  
      return sortedMealList.map((x, index) => {
        const status = getStatusStyle(x.status);
  
        return [
          { value: (pagination.page - 1) * pagination.pageSize + (index + 1) },
          { value: `${x.customerID.info.firstName} ${x.customerID.info.lastName}` },
          { value: x?.estimatedTime },
          { value: moment(x.estimatedDate).format("DD/MM/YYYY") },
          {
            value: (
              <span style={{ color: status.color }}>
                {status.text}
              </span>
            ),
          },
          { value: <MealDeleteModal id={x._id} /> },
        ];
      });
    } catch (error) {
      console.error('Error in genDataTable:', error);
      return [];
    }
  };
  

  return (
    <div style={{ marginTop: '10px' }}>
      <Table head={thead} body={genDataTable()} />
      <div className="meal-pagination">
        <Pagination
          {...pagination}
          onChange={(page) => {
            console.log('Pagination onChange called with page:', page);
            dispatch(
              MealActions.setPagination({
                ...pagination,
                page,
              })
            );
          }}
        />
      </div>
    </div>
  );
}

export default MealList;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MealActions, MealSelectors } from "../../app/services/meal/meal.slice";
import MST from "../../components";
import moment from "moment";
import { toast } from "react-toastify";

function MealEditPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [mealDetail, setMealDetail] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (params.id) {
      dispatch(
        MealActions.getMealById({
          id: params.id,
          onSuccess: (data) => {
            setMealDetail(data.meal);
            setStatus(data.meal.status || "");
          },
        })
      );
    }
    return () => {
      dispatch(MealActions.setMealDetail(undefined));
    };
  }, [params.id]);

  const handleStatusChange = (newStatus) => {
    dispatch(
      MealActions.updateMealStatus({
        id: params.id,
        status: newStatus,
        onSuccess: () => {
          setStatus(newStatus);
          toast.success("Cập nhật trạng thái thành công");
        },
      })
    );
  };

  if (!mealDetail) return null;

  return (
    <MST.Container title="Chi tiết bữa ăn">
      <div className="meal-edit-content">
        <div className="meal-detail-section">
          <h3>Thông tin thời gian</h3>
          <div className="meal-detail-info">
            <p>
              <strong>Ngày dự kiến:</strong>{" "}
              {moment(mealDetail.estimatedDate).format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Khung giờ:</strong> {mealDetail.estimatedTime}
            </p>
          </div>
        </div>

        <div className="meal-detail-section">
          <h3>Trạng thái</h3>
          <div className="status-buttons">
            <MST.Button
              type={status === "pending" ? "primary" : "outlined"}
              onClick={() => handleStatusChange("pending")}
              className="mr-8"
            >
              Đang chờ
            </MST.Button>
            <MST.Button
              type={status === "inprogress" ? "primary" : "outlined"}
              onClick={() => handleStatusChange("inprogress")}
              className="mr-8"
            >
              Đang xử lý
            </MST.Button>
            <MST.Button
              type={status === "done" ? "primary" : "outlined"}
              onClick={() => handleStatusChange("done")}
              className="mr-8"
            >
              Hoàn thành
            </MST.Button>
            <MST.Button
              type={status === "cancelled" ? "primary" : "outlined"}
              onClick={() => handleStatusChange("cancelled")}
            >
              Đã hủy
            </MST.Button>
          </div>
        </div>

        <div className="meal-detail-section">
          <h3>Thành phần yêu cầu</h3>
          <div className="meal-ingredients-list">
            {mealDetail.favoriteIngredients.map((ingredient) => (
              <div key={ingredient._id} className="ingredient-item">
                <img
                  src={`${process.env.REACT_APP_SC_BACKEND_API}/images/${ingredient.image}`}
                  alt={ingredient.name}
                  className="ingredient-image"
                />
                <div className="ingredient-info">
                  <h4>{ingredient.name}</h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: ingredient.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default MealEditPage; 
import React, { useEffect, useState } from "react";
import Modal from "../../components/base/modal/Modal";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { MealActions } from "../../app/services/meal/meal.slice";
import moment from "moment";

function MealDetailModal({ id, isShow, onHide }) {
  const dispatch = useDispatch();
  const [mealDetail, setMealDetail] = useState(null);

  useEffect(() => {
    if (isShow && id) {
      dispatch(
        MealActions.getMealById({
          id,
          onSuccess: (data) => {
            setMealDetail(data.meal);
          },
        })
      );
    }
  }, [isShow, id]);

  const renderContent = () => {
    if (!mealDetail) return null;

    return (
      <div>
        <div className="modal-header">Chi tiết bữa ăn</div>
        <div className="modal-body">
          <div className="meal-detail-section">
            <h3>Thông tin thời gian</h3>
            <div className="meal-detail-info">
              <p><strong>Ngày dự kiến:</strong> {moment(mealDetail.estimatedDate).format("DD/MM/YYYY")}</p>
              <p><strong>Khung giờ:</strong> {mealDetail.estimatedTime}</p>
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
                    <div dangerouslySetInnerHTML={{ __html: ingredient.description }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <MST.Button onClick={onHide}>Đóng</MST.Button>
        </div>
      </div>
    );
  };

  return (
    <Modal content={renderContent()} isShow={isShow} onHide={onHide} />
  );
}

export default MealDetailModal; 
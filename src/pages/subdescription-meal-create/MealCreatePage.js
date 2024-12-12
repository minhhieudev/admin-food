import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "../../components/base/select/Select";

import {
  SubdescriptionMealActions,
  subdescriptionMealSelectors,
} from "../../app/services/subdescription-meal/subdescriptionMeal.slice";
import MST from "../../components";
import "./style.css";

function MealCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mealDetail = useSelector(subdescriptionMealSelectors.mealDetail);

  const [name, setName] = useState('');
  const [totalDate, setTotalDate] = useState(0);
  const [mealsPerDay, setMealsPerDay] = useState(0);
  const [totalSub, setTotalSub] = useState(0);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    if (mealDetail) {
      setTotalDate(mealDetail?.totalDate);
      setMealsPerDay(mealDetail?.mealsPerDay);
      setTotalSub(mealDetail?.totalSub);
      setName(mealDetail?.name);
    }
  }, [mealDetail]);

  const validate = (callback) => {
    const tempEM = {
      name: "",
      totalDate: "",
      mealsPerDay: "",
      totalSub: "",
    };

    let errorCount = 0;

    if (isEmpty(name)) {
      errorCount++;
      tempEM.name = "Tên không được để trống";
    }

    if (totalDate <= 0) {
      errorCount++;
      tempEM.totalDate = "Số ngày phải lớn hơn 0";
    }

    if (mealsPerDay <= 0) {
      errorCount++;
      tempEM.mealsPerDay = "Số bữa ăn mỗi ngày phải lớn hơn 0";
    }

    if (totalSub <= 0) {
      errorCount++;
      tempEM.totalSub = "Tổng số phải lớn hơn 0";
    }

    setErrorMessage(tempEM);

    if (errorCount === 0) {
      callback();
    }
  };
  const onCreate = () => {
    dispatch(
      SubdescriptionMealActions.createSubdescriptionMeal({
        onSuccess: (id) => {
          toast.success("Tạo mới gói bữa ăn thành công");
          navigate(`/services/sub-meals`);
        },
        body: {
          name,
          totalDate,
          mealsPerDay,
          totalSub,
        },
      })
    );
  };

  const onEdit = () => {
    dispatch(
      SubdescriptionMealActions.edit({
        onSuccess: () => {
          toast.success("Cập nhật gói bữa ăn thành công");
          navigate(`/services/sub-meals`);
        },
        id: mealDetail._id,
        body: {
          name,
          totalDate,
          mealsPerDay,
          totalSub,
        },
      })
    );
  };

  const pakageData = [

    {
      name: 'Siêu vip',
      value: 'vip'
    },
    {
      name: 'Bình thường',
      value: 'vip2'
    },

  ]

  return (
    <MST.Container
      title={mealDetail ? "Cập nhật gói bữa ăn" : "Thêm gói bữa ăn"}
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/services/sub-meals")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button
            onClick={
              mealDetail
                ? () => validate(onEdit)
                : () => validate(onCreate)
            }
          >
            Lưu lại
          </MST.Button>
        </div>
      }
    >
      <div className="meal-create-content">
        <div className="meal-create-one-field">
          <div className="modal-body">
            <div className="service-create-one-field-name">
              Tên gói bữa ăn<span className="color-red"> *</span>
            </div>
            <MST.Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên gói bữa ăn"
              errorMessage={errorMessage.name}
            />
          </div>

          <div className="custom">
            <div className="modal-body">
              <div className="service-create-one-field-name">
                Số ngày<span className="color-red"> *</span>
              </div>
              <MST.Input
                type="number"
                value={totalDate}
                onChange={(e) => setTotalDate(e.target.value)}
                placeholder="Nhập số ngày"
                errorMessage={errorMessage.totalDate}
              />
            </div>

            <div className="modal-body">
              <div className="service-create-one-field-name">
                Số bữa ăn mỗi ngày<span className="color-red"> *</span>
              </div>
              <MST.Input
                type="number"
                value={mealsPerDay}
                onChange={(e) => setMealsPerDay(e.target.value)}
                placeholder="Nhập số bữa ăn mỗi ngày"
                errorMessage={errorMessage.mealsPerDay}
              />
            </div>
            <div className="modal-body">
              <div className="service-create-one-field-name">
                Tổng số<span className="color-red"> *</span>
              </div>
              <MST.Input
                type="number"
                value={totalSub}
                onChange={(e) => setTotalSub(e.target.value)}
                placeholder="Nhập tổng số"
                errorMessage={errorMessage.totalSub}
              />
            </div>
          </div>

        </div>
      </div>
    </MST.Container>
  );
}

export default MealCreatePage;

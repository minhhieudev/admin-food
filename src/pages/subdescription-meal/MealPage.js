import React from "react";
import MST from "../../components";
import SubdescriptionMealList from "./MealList";
import PlugIcon from "../../images/icons/PlugIcon";
import { useNavigate } from "react-router";


function SubdescriptionMealPage() {
  const navigate = useNavigate();

  const onCreate = () => navigate("/services/sub-meals/create");

  return (
    <MST.Container title={"Danh sách gói bữa ăn"}
      right={
        <div>
          <MST.Button
            onClick={onCreate}
            icon={
              <div className="service-icon-create">
                <PlugIcon />
              </div>
            }
          >
           Thêm gói bữa ăn
          </MST.Button>
        </div>
      }
    >
      <div className="meal-content">
        <SubdescriptionMealList />
      </div>
    </MST.Container>
  );

}

export default SubdescriptionMealPage;

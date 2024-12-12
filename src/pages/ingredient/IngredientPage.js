import React, { useEffect } from "react";
import MST from "../../components";
import IngredientList from "./IngredientList";
import { useDispatch } from "react-redux";
import { IngredientActions } from "../../app/services/ingredient/ingredient.slice";
import PlugIcon from "../../images/icons/PlugIcon";
import { useNavigate } from "react-router";


function IngredientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(IngredientActions.setCurrentCustomer(undefined));
    };
  }, []);

  const onCreate = () => navigate("/services/ingredients/create");

  return (
    <MST.Container title={"Danh sách thành phần"}
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
           Thêm thành phần
          </MST.Button>
        </div>
      }
    >
      <div className="ingredient-content">
        <IngredientList />
      </div>
    </MST.Container>
  );

}

export default IngredientPage;

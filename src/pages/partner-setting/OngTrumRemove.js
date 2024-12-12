import React, { useState } from "react";
import MST from "../../components";
import { useDispatch } from "react-redux";
import { SettingActions } from "../../app/services/setting/setting.slice";
import { toast } from "react-toastify";

function OngTrumRemove() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onRequestRemove = () => {
    if (!isLoading) {
      dispatch(
        SettingActions.removeOngTrumService({
          onSuccess: () => {
            setIsLoading(false);
            toast.success("Gỡ bỏ dịch vụ ongtrum thành công");
          },
        })
      );
    }
  };
  return (
    <div className="ml-8">
      <MST.Button
        isLoading={isLoading}
        onClick={onRequestRemove}
        type="outlined"
      >
        Gỡ bỏ
      </MST.Button>
    </div>
  );
}

export default OngTrumRemove;

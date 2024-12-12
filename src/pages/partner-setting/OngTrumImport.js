import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { SettingActions } from "../../app/services/setting/setting.slice";
import MST from "../../components";
import Modal from "../../components/base/modal/Modal";
import Pagination from "../../components/base/pagination/Pagination";
import "../../components/base/table/style.css";
import { toast } from "react-toastify";
function OngTrumImport() {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    if (!isShow) {
      setPercent(0);
    }
  }, [isShow]);

  const onLoadService = () => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(
        SettingActions.getOngTrumService({
          onSuccess: (rs) => {
            setData(rs);
            setIsLoading(false);
            setIsShow(true);
          },
          onFail: (rs) => {
            setIsLoading(false);
          },
        })
      );
    }
  };

  const onRequestImport = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(
        SettingActions.bulkCreate({
          onSuccess: (rs) => {
            setIsLoading(false);
            setIsShow(false);
            toast.success("Import dịch vụ ongtrum thành công");
          },
          onFail: (rs) => {
            setIsLoading(false);
          },
          data: data.map((x) => {
            return {
              ...x,
              price: Number(
                ((x.price / 100) * (100 + Number(percent))).toFixed(2)
              ),
            };
          }),
        })
      );
    }
  }, [percent]);

  const modalContent = (
    <div>
      <div className="modal-header">Import dịch vụ ongtrum</div>
      <div className="modal-body">
        <div className="mb-20">
          <div className="mb-8">Nhập giá chênh lệch (%)</div>
          <MST.Input
            min={0}
            type="number"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            placeholder="Nhập giá chênh lệch"
          />
        </div>
        <div
          style={{
            maxHeight: height - 400,
            maxWidth: width - 100,
            overflow: "auto",
          }}
        >
          <table className="table-container">
            <thead className="table-td-head">
              <tr>
                <th
                  style={{
                    width: 20,
                  }}
                  className={`table-td-base`}
                >
                  #
                </th>
                <th
                  style={{
                    width: 200,
                  }}
                  className={`table-td-base`}
                >
                  Mã dịch vụ
                </th>
                <th
                  style={{
                    width: 150,
                  }}
                  className={`table-td-base`}
                >
                  Nhóm dịch vụ
                </th>
                <th
                  style={{
                    width: 200,
                  }}
                  className={`table-td-base`}
                >
                  Script
                </th>
                <th
                  style={{
                    width: 100,
                  }}
                  className={`table-td-base`}
                >
                  Giá hiện tại
                </th>
                <th
                  style={{
                    width: 120,
                  }}
                  className={`table-td-base`}
                >
                  Giá sau import
                </th>
                <th className={`table-td-base`}>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(currentPage - 1, currentPage + 9).map((x, index) => {
                return (
                  <tr className="table-tr" key={`${index}`}>
                    <td className={`table-td-base`}>
                      {index + 1 + (currentPage - 1) * 10}
                    </td>
                    <td className={`table-td-base`}>{x.serviceCode}</td>
                    <td className={`table-td-base`}>{x.scriptGroupCode}</td>
                    <td className={`table-td-base`}>{x.scriptCode}</td>
                    <td className={`table-td-base`}>{x.price}</td>
                    <td className={`table-td-base`}>
                      {((x.price / 100) * (100 + Number(percent))).toFixed(2)}
                    </td>
                    <td className={`table-td-base`}>
                      <div
                        style={{
                          width: "100%",
                          overflow: "auto",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: x.description,
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPage={data.length / 10}
          page={currentPage}
          pageSize={10}
          total={data.length}
          onChange={(e) => {
            setCurrentPage(e);
          }}
        />
      </div>
      <div className="modal-footer">
        <div className="d-flex jc-between">
          <div />
          <div className="d-flex">
            <MST.Button
              type="outlined"
              onClick={() => {
                setIsShow(false);
              }}
              className="mr-8"
            >
              Đóng
            </MST.Button>
            <MST.Button isLoading={isLoading} onClick={onRequestImport}>
              Import
            </MST.Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = useMemo(() => {
    return isShow ? (
      <Modal
        contentWidth={width - 100}
        isShow={isShow}
        onHide={() => setIsShow(false)}
        content={modalContent}
      />
    ) : (
      <></>
    );
  }, [isShow, currentPage, percent, height, width]);

  return (
    <div>
      {renderModal}
      <MST.Button isLoading={isLoading} onClick={onLoadService}>
        Import
      </MST.Button>
    </div>
  );
}

export default OngTrumImport;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MealActions } from "../../app/services/meal/meal.slice";
import MST from "../../components";
import moment from "moment";
import { toast } from "react-toastify";
import "./style.css";
import PrintModal from "../../components/PrintModal";
import { OrderActions } from "../../app/services/order/order.slice";
import { useDispatch, useSelector } from "react-redux";
import { OrderSelectors } from "../../app/services/order/order.slice"; // Thêm import này

function getButtonStyle(buttonStatus, currentStatus) {
    if (buttonStatus === currentStatus) {
        const styles = {
            pending: {
                color: "#ffa500",
                border: "1px solid #ffa500",
                backgroundColor: "transparent",
            },
            inprogress: {
                color: "#0000ff",
                border: "1px solid #0000ff",
                backgroundColor: "transparent",
            },
            done: {
                color: "#008000",
                border: "1px solid #008000",
                backgroundColor: "transparent",
            },
            cancelled: {
                color: "#ff0000",
                border: "1px solid #ff0000",
                backgroundColor: "transparent",
            },
        };
        return styles[buttonStatus];
    }
    return { color: "#000", borderColor: "transparent", backgroundColor: "transparent" };
}

function MealDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [mealDetail, setMealDetail] = useState(null);
    const [status, setStatus] = useState("");
    const [showPrintModal, setShowPrintModal] = useState(false);
    const orderDetail = useSelector(OrderSelectors.orderDetail);

    const getMealDetail = () => {
        dispatch(
            MealActions.getMealById({
                id: params.id,
                onSuccess: (data) => {
                    setMealDetail(data.meal);
                    setStatus(data.meal.status || "");
                },
            })
        );
    };

    useEffect(() => {
        if (params.id) {
            getMealDetail();
        }
        return () => {
            dispatch(MealActions.setMealDetail(undefined));
            dispatch(OrderActions.setOrderDetail(undefined));
        };
    }, [params.id]);

    const handleStatusChange = (newStatus) => {
        console.log('handleStatusChangehandleStatusChange:');

        // Lưu trạng thái cũ
        const oldStatus = status;

        // Cập nhật UI ngay lập tức
        setStatus(newStatus);

        dispatch(
            MealActions.updateMealStatus({
                id: params.id,
                status: newStatus,
                onSuccess: () => {
                    // Refresh lại toàn bộ dữ liệu
                    toast.success("Cập nhật trạng thái thành công");
                    getMealDetail();

                },
                onError: () => {
                    // Rollback về trạng thái cũ nếu có lỗi
                    setStatus(oldStatus);
                    toast.error("Cập nhật trạng thái thất bại");
                }
            })
        );
    };

    const getButtonStyle = (buttonStatus) => {
        const styles = {
            pending: {
                color: "#ffa500",
                border: "1px solid #ffa500",
                backgroundColor: buttonStatus === status ? "#fff3e0" : "transparent",
            },
            inprogress: {
                color: "#0000ff",
                border: "1px solid #0000ff",
                backgroundColor: buttonStatus === status ? "#e3f2fd" : "transparent",
            },
            done: {
                color: "#008000",
                border: "1px solid #008000",
                backgroundColor: buttonStatus === status ? "#e8f5e9" : "transparent",
            },
            cancelled: {
                color: "#ff0000",
                border: "1px solid #ff0000",
                backgroundColor: buttonStatus === status ? "#ffebee" : "transparent",
            },
        };

        return buttonStatus === status ? styles[buttonStatus] : {
            color: "#000",
            border: "1px solid #d9d9d9",
            backgroundColor: "transparent",
        };
    };

    const getOrderDetail = (orderId) => {
        dispatch(OrderActions.getOrderById(orderId));  // Gửi trực tiếp orderId string
    };

    const handlePrint = () => {
        if (mealDetail?.orderID) {
            getOrderDetail(mealDetail.orderID);
            setShowPrintModal(true);
        }
    };

    // Đảm bảo có dữ liệu trước khi render
    if (!mealDetail) {
        return <div>Loading...</div>;
    }

    return (
        <MST.Container
            title="Chi tiết bữa ăn"
            right={
                <div className="d-flex">
                    <MST.Button
                        onClick={() => navigate("/services/meals")}
                        type="outlined"
                        className="mr-8"
                    >
                        Quay lại
                    </MST.Button>
                    <MST.Button
                        onClick={handlePrint}
                        type="outlined"
                        className="mr-8"
                        style={{
                            color: '#1890ff',
                            borderColor: '#1890ff'
                        }}
                    >
                        In phiếu giao hàng
                    </MST.Button>
                </div>
            }
        >
            <div className="meal-detail-content">
                <div className="meal-detail-section">
                    <h3>Thông tin thời gian</h3>
                    <div className="meal-detail-info">
                        <p>
                            <strong>Ngày dự kiến:</strong>{"  "}
                            {moment(mealDetail.estimatedDate).format("DD/MM/YYYY")}
                        </p>
                        <p>
                            <strong>Khung giờ:  </strong> {mealDetail.estimatedTime}
                        </p>
                    </div>
                </div>

                <div className="meal-detail-section">
                    <h3>Trạng thái hiện tại</h3>
                    <div className="status-display">
                        {(() => {
                            switch (status) {
                                case 'pending':
                                    return <span className="status-tag pending">Đang chờ</span>;
                                case 'inprogress':
                                    return <span className="status-tag inprogress">Đang xử lý</span>;
                                case 'done':
                                    return <span className="status-tag done">Hoàn thành</span>;
                                case 'cancelled':
                                    return <span className="status-tag cancelled">Đã hủy</span>;
                                default:
                                    return <span className="status-tag">Chưa xác định</span>;
                            }
                        })()}
                    </div>
                </div>

                <div className="meal-detail-section">
                    <h3>Cập nhật trạng thái</h3>
                    <div className="status-buttons">
                        <MST.Button
                            onClick={() => handleStatusChange("pending")}
                            className="mr-8"
                            style={getButtonStyle("pending")}
                            disabled={status === "pending"}
                        >
                            Đang chờ
                        </MST.Button>
                        <MST.Button
                            onClick={() => handleStatusChange("inprogress")}
                            className="mr-8"
                            style={getButtonStyle("inprogress")}
                            disabled={status === "inprogress"}
                        >
                            Đang xử lý
                        </MST.Button>
                        <MST.Button
                            onClick={() => handleStatusChange("done")}
                            className="mr-8"
                            style={getButtonStyle("done")}
                            disabled={status === "done"}
                        >
                            Hoàn thành
                        </MST.Button>
                        <MST.Button
                            onClick={() => handleStatusChange("cancelled")}
                            style={getButtonStyle("cancelled")}
                            disabled={status === "cancelled"}
                        >
                            Hủy
                        </MST.Button>
                    </div>
                </div>

                <div className="meal-detail-section">
                    <h3>Thành phần yêu cầu</h3>
                    <div className="meal-ingredients-list">
                        {mealDetail.favoriteIngredients.map((ingredient) => (
                            <div key={ingredient._id} className="ingredient-item">
                                <img
                                    src={`${process.env.REACT_APP_CDN_URL}${ingredient.image}`}
                                    alt={ingredient.name}
                                    className="ingredient-image"
                                />
                                <div className="ingredient-info">
                                    <h4>{ingredient.name}</h4>
                                    {/* <div
                                        dangerouslySetInnerHTML={{ __html: ingredient.description }}
                                    /> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="meal-detail-section">
                    <h3>Mục tiêu mong muốn</h3>
                    <div className="meal-ingredients-list">
                        {mealDetail?.orderTags?.map((tag, index) => {
                            // Danh sách màu cố định
                            const colors = ["#ff4d4f", "#40a9ff", "#ffc53d", "#73d13d", "#9254de", "#fa8c16"];
                            // Lấy màu dựa trên index
                            const color = colors[index % colors.length];

                            return (
                                <div
                                    key={index}
                                    className="ingredient-item"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    {/* Hình tròn màu */}
                                    <div
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "50%",
                                            backgroundColor: color, // Màu được chọn từ danh sách
                                            marginRight: "8px",
                                        }}
                                    ></div>
                                    {/* Nội dung mục tiêu */}
                                    <div className="ingredient-info">
                                        <h4 style={{ margin: 0 }}>{tag}</h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>

            <PrintModal
                isShow={showPrintModal}
                onHide={() => setShowPrintModal(false)}
                orderDetail={orderDetail}
                mealDetail={mealDetail}
            />
        </MST.Container>
    );
}

export default MealDetail; 
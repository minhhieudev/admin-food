import React from 'react';
import Modal from "../base/modal/Modal";
import moment from "moment";
import MST from "..";
import "./style.css";

function PrintModal({ isShow, onHide, orderDetail, mealDetail }) {
  const handleClose = () => {
    if (onHide) {
      onHide();
    }
  };

  const printContent = () => {
    const content = document.getElementById('print-content');
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Phiếu Giao Hàng</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .print-content { max-width: 800px; margin: 0 auto; }
            .print-header { 
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .print-title { 
              font-size: 24px; 
              font-weight: bold;
              margin: 0;
              padding: 10px 0;
            }
            .print-date {
              font-size: 14px;
              color: #666;
            }
            .print-section {
              margin-bottom: 20px;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            .print-section h3 {
              color: #008000;
              margin: 0 0 15px 0;
              font-size: 18px;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            .print-section p {
              margin: 8px 0;
              line-height: 1.5;
            }
            .print-section strong {
              display: inline-block;
              width: 150px;
            }
            .ingredients-list2 {
              display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 450px;
            }
            .ingredients-list li {
              padding: 5px 0;
              border-bottom: 1px dashed #eee;
              
 
            }
            .signature-section {
              margin-top: 50px;
              text-align: right;
              padding-right: 50px;
            }
            .signature-line {
              border-top: 1px solid #000;
              width: 200px;
              display: inline-block;
              margin-top: 50px;
            }
            .signature-label {
              margin-top: 5px;
              font-size: 14px;
            }
            @media print {
              body { padding: 0; }
              .print-section { border: none; }
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const renderContent = () => {
    return (
      <div>
        <div className="modal-header">
          <h3>Phiếu Giao Hàng</h3>
          <button className="close-button" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          {(!orderDetail || !mealDetail) ? (
            <div>Loading...</div>
          ) : (
            <div id="print-content" className="print-content">
              <div className="print-header">
                <h2 className="print-title">PHIẾU GIAO HÀNG</h2>
                <div className="print-date">
                  Ngày in: {moment().format("HH:mm DD/MM/YYYY")}
                </div>
              </div>

              <div className="print-section">
                <h3>Thông Tin Khách Hàng</h3>
                <p><strong>Tên khách hàng:</strong> {orderDetail.customerName}</p>
                <p><strong>Số điện thoại:</strong> {orderDetail?.phoneNumber}</p>
                <p><strong>Địa chỉ:</strong> {orderDetail.addressDelivery}</p>
              </div>

              <div className="print-section">
                <h3>Thông Tin Giao Hàng</h3>
                <p><strong>Ngày giao:</strong> {moment(mealDetail.estimatedDate).format("DD/MM/YYYY")}</p>
                <p><strong>Khung giờ:</strong> {mealDetail.estimatedTime}</p>
              </div>

              <div className="print-section">
                <h3>Thành phần món ăn:</h3>
                <ul className="ingredients-list2">
                  {mealDetail.favoriteIngredients.map((ingredient) => (
                    <li key={ingredient._id}>{ingredient.name}</li>
                  ))}
                </ul>
              </div>

              <div className="print-section">
                <h3>Ghi chú</h3>
                <p>{orderDetail.note || 'Không có'}</p>
              </div>

              <div className="signature-section">
                <div className="signature-line"></div>
                <div className="signature-label">Chữ ký người nhận</div>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <div className="d-flex jc-between">
            <div />
            <div className="d-flex">
              <MST.Button type="outlined" className="mr-8" onClick={handleClose}>
                Đóng
              </MST.Button>
              <MST.Button onClick={printContent}>
                In phiếu
              </MST.Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <Modal content={renderContent()} isShow={isShow} onHide={handleClose} closeOnOverlayClick={true} />;
}

export default PrintModal; 
import React, { useState } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";

const transactionHistory = [
  {
    id: 1,
    userId: 12345,
    username: "user1",
    time: "2024-11-25 14:30",
    amount: 50000,
    type: "Nạp tiền vào ví",
    details: {
      method: "Nạp qua ngân hàng",
      amount: 50000,
      date: "2024-11-25",
      time: "14:30",
    },
  },
  {
    id: 2,
    userId: 12346,
    username: "user2",
    time: "2024-11-24 19:15",
    amount: 100000,
    type: "Mua vé",
    details: {
      movie: "Avatar 2",
      seat: "A3, A4",
      cinema: "Rạp Galaxy Nguyễn Du",
      showtime: "2024-11-25 20:00",
      amount: 100000,
      voucher: "Giảm giá 10%",
      date: "2024-11-25",
      time: "20:00",
    },
  },
  {
    id: 3,
    userId: 12347,
    username: "user3",
    time: "2024-11-23 12:45",
    amount: 300000,
    type: "Mua thẻ thành viên",
    details: {
      cardType: "Thẻ Vàng",
      validity: "12 tháng",
      benefits: ["Giảm giá 10%", "Ưu tiên đặt vé"],
      amount: 300000,
      date: "2024-11-23",
      time: "12:45",
    },
  },
  {
    id: 4,
    userId: 12348,
    username: "user4",
    time: "2024-11-22 16:00",
    amount: 150000,
    type: "Mua vé",
    details: {
      movie: "The Hunger Games: The Ballad of Songbirds and Snakes",
      seat: "B1, B2",
      cinema: "CGV Vincom Bà Triệu",
      showtime: "2024-11-23 18:30",
      amount: 150000,
      voucher: "Giảm 20% cho sinh viên",
      date: "2024-11-23",
      time: "18:30",
    },
  },
  {
    id: 5,
    userId: 12349,
    username: "user5",
    time: "2024-11-20 13:00",
    amount: 200000,
    type: "Mua thẻ thành viên",
    details: {
      cardType: "Thẻ Bạc",
      validity: "6 tháng",
      benefits: ["Giảm giá 5%", "Được tham gia sự kiện"],
      amount: 200000,
      date: "2024-11-20",
      time: "13:00",
    },
  },
  {
    id: 6,
    userId: 12350,
    username: "user6",
    time: "2024-11-19 11:45",
    amount: 120000,
    type: "Nạp tiền vào ví",
    details: {
      method: "Nạp qua ví điện tử",
      amount: 120000,
      date: "2024-11-19",
      time: "11:45",
    },
  },
];

const TransactionHistory = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateChange = (event, setter) => {
    setter(event.target.value);
  };

  const filteredTransactions = transactionHistory.filter((transaction) => {
    const transactionDate = new Date(transaction.time);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && transactionDate < start) return false;
    if (end && transactionDate > end) return false;

    return true;
  });

  const renderDetails = () => {
    if (!selectedTransaction) return null;

    const { type, details } = selectedTransaction;

    if (type === "Mua vé") {
      return (
        <div>
          <p>
            <b>Phim:</b> {details.movie}
          </p>
          <p>
            <b>Ghế:</b> {details.seat}
          </p>
          <p>
            <b>Rạp:</b> {details.cinema}
          </p>
          <p>
            <b>Thời gian chiếu:</b> {details.time}
          </p>
          <p>
            <b>Giá vé:</b> {details.amount.toLocaleString()}đ
          </p>
        </div>
      );
    }

    if (type === "Mua thẻ thành viên") {
      return (
        <div>
          <p>
            <b>Loại thẻ:</b> {details.cardType}
          </p>
          <p>
            <b>Thời hạn:</b> {details.validity}
          </p>
          <p>
            <b>Quyền lợi:</b>
          </p>
          <ul>
            {details.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <p>
            <b>Giá:</b> {details.amount.toLocaleString()}đ
          </p>
        </div>
      );
    }

    if (type === "Nạp tiền vào ví") {
      return (
        <div>
          <p>
            <b>Phương thức:</b> {details.method}
          </p>
          <p>
            <b>Số tiền:</b> {details.amount.toLocaleString()}đ
          </p>
          <p>
            <b>Thời gian:</b> {details.date} {details.time}
          </p>
        </div>
      );
    }

    return <p>Không có thông tin chi tiết.</p>;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản Lý Lịch Sử Giao Dịch</h2>
      <Row className="mb-3">
        <Col>
          <Form.Label>Chọn ngày bắt đầu</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e, setStartDate)}
          />
        </Col>
        <Col>
          <Form.Label>Chọn ngày kết thúc</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(e, setEndDate)}
          />
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Số thứ tự
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Username
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              ID Người dùng
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Thời gian
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Số tiền giao dịch
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Nội dung
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Thông tin chi tiết
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.username}</td>
              <td>{item.userId}</td>
              <td>{item.time}</td>
              <td>{item.amount.toLocaleString()}đ</td>
              <td>{item.type}</td>
              <td
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedTransaction(item)}
              >
                Chi tiết
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {filteredTransactions.length === 0 && (
        <div className="alert alert-warning">Lịch sử giao dịch trống</div>
      )}
      {selectedTransaction && (
        <Modal show={true} onHide={() => setSelectedTransaction(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin giao dịch</Modal.Title>
          </Modal.Header>
          <Modal.Body>{renderDetails()}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setSelectedTransaction(null)}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default TransactionHistory;

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Dashboard = () => {
  // Dữ liệu biểu đồ doanh thu gần đây
  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: [500000, 600000, 550000, 700000, 750000, 800000, 900000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Dữ liệu biểu đồ số vé bán
  const ticketsData = {
    labels: ["Phim A", "Phim B", "Phim C", "Phim D"],
    datasets: [
      {
        label: "Số vé bán được",
        data: [120, 200, 150, 180],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  // Dữ liệu biểu đồ tròn tỉ lệ doanh thu
  const pieChartData = {
    labels: ["Vé", "Bắp Nước", "Dịch Vụ Khác"],
    datasets: [
      {
        data: [60, 25, 15], // Tỉ lệ doanh thu của từng thành phần (ví dụ: vé 60%, bắp nước 25%, dịch vụ khác 15%)
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4C6A", "#48A1D2", "#FFD700"],
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Phim Sắp Chiếu</Card.Header>
            <Card.Body>
              <ul>
                <li>Phim A - 20:00 15/12</li>
                <li>Phim B - 22:00 15/12</li>
                <li>Phim C - 19:00 16/12</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Lịch Chiếu Sắp Tới</Card.Header>
            <Card.Body>
              <ul>
                <li>Phim A - 15/12, 20:00</li>
                <li>Phim B - 15/12, 22:00</li>
                <li>Phim C - 16/12, 19:00</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Doanh Thu Gần Đây</Card.Header>
            <Card.Body>
              <Line data={revenueData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Thống Kê Số Vé Bán</Card.Header>
            <Card.Body>
              <Line data={ticketsData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Tỉ Lệ Doanh Thu</Card.Header>
            <Card.Body>
              <Pie data={pieChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Tỉ Lệ Ghế Trống/Đặt</Card.Header>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>Phòng 1:</strong> 30 ghế trống / 20 ghế đặt
                </div>
                <div>
                  <strong>Phòng 2:</strong> 40 ghế trống / 10 ghế đặt
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

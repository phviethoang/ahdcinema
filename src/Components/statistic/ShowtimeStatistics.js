import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ShowtimeStatistics = () => {
  // Dữ liệu giả định cho các suất chiếu và vé bán
  const showtimeData = [
    { showtime: "Phim A - 15/12 20:00", ticketsSold: 120 },
    { showtime: "Phim B - 15/12 22:00", ticketsSold: 100 },
    { showtime: "Phim C - 16/12 19:00", ticketsSold: 90 },
    { showtime: "Phim D - 17/12 18:00", ticketsSold: 80 },
    { showtime: "Phim E - 18/12 21:00", ticketsSold: 75 },
    { showtime: "Phim F - 19/12 20:00", ticketsSold: 70 },
    { showtime: "Phim G - 20/12 19:00", ticketsSold: 65 },
    { showtime: "Phim H - 21/12 21:00", ticketsSold: 60 },
    { showtime: "Phim I - 22/12 18:00", ticketsSold: 55 },
    { showtime: "Phim J - 23/12 20:00", ticketsSold: 50 },
  ];

  // Trạng thái top suất chiếu
  const [top, setTop] = useState(3);

  // Lọc dữ liệu theo lựa chọn top
  const filteredData = showtimeData
    .sort((a, b) => b.ticketsSold - a.ticketsSold)
    .slice(0, top);

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: filteredData.map((item) => item.showtime),
    datasets: [
      {
        label: "Số vé bán",
        data: filteredData.map((item) => item.ticketsSold),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="text-center my-4">
            Thống Kê Suất Chiếu Bán Vé Chạy Nhất
          </h3>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-3">
          <Form>
            <Form.Group controlId="topShowtimesSelect">
              <Form.Label>Chọn Top Suất Chiếu</Form.Label>
              <Form.Control
                as="select"
                value={top}
                onChange={(e) => setTop(Number(e.target.value))}
              >
                <option value={3}>Top 3</option>
                <option value={5}>Top 5</option>
                <option value={10}>Top 10</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Header>Thống Kê Vé Bán Theo Suất Chiếu</Card.Header>
            <Card.Body>
              <Bar data={chartData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowtimeStatistics;

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

const GenreStatistics = () => {
  // Dữ liệu giả định cho các thể loại và lượt xem
  const genreData = [
    { genre: "Hành động", views: 20000 },
    { genre: "Hài", views: 18000 },
    { genre: "Tình cảm", views: 15000 },
    { genre: "Kinh dị", views: 14000 },
    { genre: "Phiêu lưu", views: 12000 },
    { genre: "Khoa học viễn tưởng", views: 11000 },
    { genre: "Hoạt hình", views: 10000 },
    { genre: "Thể thao", views: 9500 },
    { genre: "Tâm lý", views: 9000 },
    { genre: "Âm nhạc", views: 8500 },
    { genre: "Lịch sử", views: 8000 },
    { genre: "Tội phạm", views: 7500 },
    { genre: "Chiến tranh", views: 7000 },
    { genre: "Viễn Tây", views: 6500 },
    { genre: "Cổ trang", views: 6000 },
  ];

  // Trạng thái top thể loại
  const [top, setTop] = useState(5);

  // Lọc dữ liệu theo lựa chọn top
  const filteredData = genreData
    .sort((a, b) => b.views - a.views)
    .slice(0, top);

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: filteredData.map((item) => item.genre),
    datasets: [
      {
        label: "Lượt xem",
        data: filteredData.map((item) => item.views),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="text-center my-4">Thống Kê Thể Loại Phim</h3>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-3">
          <Form>
            <Form.Group controlId="topGenresSelect">
              <Form.Label>Chọn Top Thể Loại</Form.Label>
              <Form.Control
                as="select"
                value={top}
                onChange={(e) => setTop(Number(e.target.value))}
              >
                <option value={5}>Top 5</option>
                <option value={10}>Top 10</option>
                <option value={15}>Top 15</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Header>Thống Kê Lượt Xem Theo Thể Loại</Card.Header>
            <Card.Body>
              <Bar data={chartData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GenreStatistics;

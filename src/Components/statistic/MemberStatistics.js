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

const MemberStatistics = () => {
  // Dữ liệu giả định cho các thành viên và số tiền đã mua
  const memberData = [
    { name: "Nguyễn Văn A", amount: 1200000 },
    { name: "Trần Thị B", amount: 1100000 },
    { name: "Lê Văn C", amount: 1050000 },
    { name: "Phạm Thị D", amount: 980000 },
    { name: "Hoàng Văn E", amount: 950000 },
    { name: "Ngô Thị F", amount: 880000 },
    { name: "Đặng Văn G", amount: 850000 },
    { name: "Vũ Thị H", amount: 820000 },
    { name: "Phan Văn I", amount: 800000 },
    { name: "Đỗ Thị J", amount: 780000 },
    { name: "Bùi Văn K", amount: 750000 },
    { name: "Nguyễn Thị L", amount: 700000 },
    { name: "Phạm Văn M", amount: 650000 },
    { name: "Hoàng Thị N", amount: 600000 },
    { name: "Lý Văn O", amount: 550000 },
  ];

  // Trạng thái top thành viên
  const [top, setTop] = useState(5);

  // Lọc dữ liệu theo lựa chọn top
  const filteredData = memberData
    .sort((a, b) => b.amount - a.amount)
    .slice(0, top);

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: filteredData.map((member) => member.name),
    datasets: [
      {
        label: "Số tiền đã mua (VND)",
        data: filteredData.map((member) => member.amount),
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
          <h3 className="text-center my-4">Thống Kê Thành Viên Tích Cực</h3>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-3">
          <Form>
            <Form.Group controlId="topMembersSelect">
              <Form.Label>Chọn Top Thành Viên</Form.Label>
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
            <Card.Header>Thống Kê Số Tiền Đã Mua</Card.Header>
            <Card.Body>
              <Bar data={chartData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MemberStatistics;

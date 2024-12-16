import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const MovieStatistics = () => {
  // Dữ liệu doanh thu theo tháng
  const revenueData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu (triệu VND)",
        data: [50, 60, 75, 80, 90, 100, 120, 140, 150, 160, 180, 200],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Dữ liệu vé bán theo tháng
  const ticketsData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Số vé bán được (nghìn vé)",
        data: [100, 110, 120, 150, 170, 200, 220, 250, 300, 320, 350, 400],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="text-center my-4">
            Thống Kê Doanh Thu & Vé Bán Theo Tháng
          </h3>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Doanh Thu Theo Tháng</Card.Header>
            <Card.Body>
              <Line data={revenueData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Số Vé Bán Theo Tháng</Card.Header>
            <Card.Body>
              <Line data={ticketsData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Header>Thống Kê Doanh Thu Theo Năm</Card.Header>
            <Card.Body>
              <Line
                data={{
                  labels: ["2020", "2021", "2022", "2023", "2024"],
                  datasets: [
                    {
                      label: "Doanh thu (tỷ VND)",
                      data: [5, 6, 7.5, 8, 9],
                      borderColor: "rgba(54, 162, 235, 1)",
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      fill: true,
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieStatistics;

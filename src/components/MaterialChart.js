import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const MaterialChart = ({ pillMaterial }) => {
  const name = pillMaterial.map((item) => {
    return item[0];
  });

  const amount = pillMaterial.map((item) => {
    return item[1];
  });

  const data = {
    labels: name,
    datasets: [
      {
        data: amount,
        borderWidth: 0,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        hoverBorderWidth: 0, // hover 시 border 넓이
        hoverBorderColor: "white", // hover 시 border 색상
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        maxWidth: 150,
        maxHeight: 100,
        labels: {
          boxWidth: 10,
          boxHeight: 10,

          font: {
            family: "Pretendard-Regular",
            size: 14,
            weight: 100,
          },
          padding: 20,
        },
      },

      tooltip: {
        titleFont: {
          size: 18,
          family: "Pretendard-Regular",
        },
        bodyFont: {
          size: 20,
          weight: 800,
          family: "Pretendard-Regular",
        },

        titleMarginBottom: 10,
        enabled: true,
        backgroundColor: "black",
        boxPadding: 10,
        cornerRadius: 10,
      },
    },
  };
  return (
    <Div>
      <Doughnut
        data={data}
        options={options}
        centerText="This is the center text"
      />
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 260px;
  margin-top: 20px;
`;

const CenterText = styled.p`
  position: absolute;
`;

export default MaterialChart;

import { useState, useEffect } from "react";
import styled from "styled-components";

const MaterialSummary = ({ pillMaterial }) => {
  const [sum, setSum] = useState(null);
  useEffect(() => {
    let number = 0;
    if (pillMaterial) {
      pillMaterial.map((item, index) => {
        number += item[1];
      });
    }
    setSum(number);
  }, []);
  return (
    <Container>
      {pillMaterial.map((item, index) => (
        <Line key={index}>
          <Rank>{index + 1}</Rank>
          <Info>
            {item[0]} ({(item[1] / sum).toFixed(2) * 100}%)
          </Info>
        </Line>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const Line = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Rank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 40px; /* height를 추가하여 width와 같은 값으로 지정 */
  max-width: 36px; /* width보다 작은 값 */
  max-height: 36px; /* height보다 작은 값 */
  font-size: 35px;
  font-weight: 900;
  background-color: rgba(240, 79, 135, 0.1);
  color: #f04f87;
  border-radius: 50%;
  border: 4px solid rgba(240, 79, 135, 0.3);
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 700;
  font-size: 20px;
  width: 100%;
  margin-left: 15px;
`;

export default MaterialSummary;

import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as X } from "../images/X.svg";

const Multi = ({ setIsMultiVisible }) => {
  const [arr, setArr] = useState(() => {
    if (!localStorage.getItem("multiKeyWord")) {
      return Array(10).fill("내용");
    } else {
      return JSON.parse(localStorage.getItem("multiKeyWord"));
    }
  });

  const save = () => {
    localStorage.setItem("multiKeyWord", JSON.stringify(arr));
  };

  return (
    <Container>
      <HeaderBarWrapper>
        <HeaderBarContainer>
          <X
            width="15"
            height="15"
            fill="white"
            onClick={() => {
              setIsMultiVisible(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </HeaderBarContainer>
      </HeaderBarWrapper>
      <Wrapper>
        <HeaderText>멀티검색</HeaderText>{" "}
        <EffectContainer>
          {arr.map((item, index) => (
            <EffectWrapper>
              <InputBox>
                <InputHeader>{index + 1}</InputHeader>
                <Input
                  type="text"
                  value={arr[index]}
                  onChange={(e) => {
                    let tmp = [...arr];
                    tmp[index] = e.target.value;
                    setArr(tmp);
                  }}
                />
              </InputBox>
            </EffectWrapper>
          ))}
        </EffectContainer>
        <SaveBtn onClick={() => save()} whileTap={{ scale: 0.95 }}>
          저장
        </SaveBtn>
      </Wrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 800px;
  height: max-content;
  background: white;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  border-radius: 15px;
  margin-top: 30px;
  margin-bottom: 40px;
`;
const HeaderBarWrapper = styled.div`
  width: 100%;
  height: 40px;
  background: #0b2239;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;
const HeaderBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 20px;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
`;
const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 10px 20px;
`;

const EffectContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  border-radius: 15px;
  font-size: 18px;
  white-space: pre-line;
  margin-bottom: 10px;
`;

const EffectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) => props.Direction};
  height: 100%;
`;

const HeaderText = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 40px;
  margin: 10px 0px 20px 0px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: rgba(228, 232, 239, 0.7);
  font-size: 15px;
`;

const InputHeader = styled.div`
  width: 20px;
  font-size: 22px;
  margin-right: 20px;
  margin-left: 0px;
  font-weight: bold;
  text-align: center;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 10px;
`;

const SaveBtn = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  padding: 5px 25px;
  background-color: #14d267;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  color: white;
  cursor: pointer;
`;

export default Multi;

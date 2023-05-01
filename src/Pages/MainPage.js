import styled from "styled-components";
import { motion, AnimatePresence, scrollY } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const MainPage = () => {
  const imgRef = useRef();

  return (
    <Container>
      <Wrapper>
        <Box></Box>
        <Text
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          마이드러그인포에서
        </Text>
        <SmallText
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          의약품 정보를 쉽게 찾아보세요.
        </SmallText>

        <Img
          ref={imgRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 1.5, delay: 0 },
          }}
          whileHover={{ scale: 0.98, opacity: 0.4 }}
          src={require("../images/배경.png")}
          alt="메인"
        ></Img>
        {/* <StartButton>시작하기</StartButton> */}
      </Wrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(247, 249, 250, 0.1);
  overflow: hidden;
`;

const Wrapper = styled(motion.div)`
  width: 100%;
  max-width: 1024px;
  min-height: 600px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Box = styled.div`
  padding: 40px 0px;
`;

const Text = styled(motion.p)`
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  background: #00c6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0072ff,
    #00c6ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0072ff,
    #00c6ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: transparent;
  -webkit-background-clip: text;
`;

const SmallText = styled(motion.p)`
  font-size: 3rem;
  text-align: center;
  font-weight: 900;
  margin-bottom: 100px;
`;

const Img = styled(motion.img)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  scale: 1;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
  }
`;

export default MainPage;

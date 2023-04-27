import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";

// 2.멀티검색에서 저장누르면 저장됐다고
// 3.멀티검색에서 x누르면 저장할거냐고 물어봐야됨

// 5.세부창에서 위에 성분 3개까지 ,로 자르기
// 6.여기에 스크롤로 구현을 하든 그렇게 해야할듯?

// 1.검색했는데 검색어가 없으면 없다고
export const NoResultPopup = () => {
  const FailLottie = () => {
    const failContainer = useRef();
    useEffect(() => {
      lottie.loadAnimation({
        container: failContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,

        animationData: require("../lotties/failData.json"),
      });
    }, []);

    return <Lottie ref={failContainer}></Lottie>;
  };

  return (
    <Container
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      bgcolor={"#e3342f"}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Msg fcolor={"white"}>검색결과가 없어요.</Msg>
        <FailLottie />
      </div>
    </Container>
  );
};

// 4.검색어 바뀔때마다 갱신됐다고 알림
export const SearchCompletePopup = ({ resultExist }) => {
  const [isVisible, setIsVisible] = useState(true);

  const CompleteLottie = () => {
    const completeContainer = useRef();
    useEffect(() => {
      lottie.loadAnimation({
        container: completeContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,

        animationData: require("../lotties/successData.json"),
      });

      const time = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      return () => clearTimeout(time);
    }, []);

    return <Lottie ref={completeContainer}></Lottie>;
  };

  return (
    <Container
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      bgcolor={"white"}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Msg fcolor={"#303237"}>결과가 갱신됐어요.</Msg>
        <CompleteLottie />
      </div>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  margin-top: 78vh;
  display: flex;
  justify-content: center;
  height: min-content;
  z-index: 900;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.bgcolor};
  border-radius: 50px;
  padding: 2px 4px;
`;

const Msg = styled.div`
  color: ${(props) => props.fcolor};
  font-weight: bold;
  margin: 0px 15px;
  font-size: 20px;
`;

const Lottie = styled.div`
  width: 50px;
  height: 50px;
`;

const SuccessLottie = styled.div`
  width: 50px;
  height: 50px;
`;

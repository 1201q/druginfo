import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";

// 3.멀티검색에서 x누르면 저장할거냐고 물어봐야됨  완료
// 5.세부창에서 위에 성분 3개까지 ,로 자르기       완료
// 6.여기에 스크롤로 구현을 하든 그렇게 해야할듯?   완료

// 1.검색했는데 검색어가 없으면 없다고
export const NoResultPopup = ({ showPopup }) => {
  const [isVisible, setIsVisible] = useState(showPopup);
  useEffect(() => {
    setIsVisible(showPopup);
  }, [showPopup]);
  const FailLottie = () => {
    const failContainer = useRef();
    useEffect(() => {
      lottie.loadAnimation({
        container: failContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,

        animationData: require("../lotties/failData.json"),
      });

      const time = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      return () => clearTimeout(time);
    }, []);

    return <Lottie ref={failContainer}></Lottie>;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Container
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, scale: 0 }}
          transition={{ duration: 0.2 }}
          bgcolor={"#e3342f"}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Msg fcolor={"white"}>검색결과가 없어요.</Msg>
            <FailLottie />
          </div>
        </Container>
      )}
    </AnimatePresence>
  );
};

// 2.멀티검색에서 저장누르면 저장됐다고
// 4.검색어 바뀔때마다 갱신됐다고 알림
export const SearchCompletePopup = ({ showPopup, text }) => {
  const [isVisible, setIsVisible] = useState(showPopup);

  useEffect(() => {
    setIsVisible(showPopup);
  }, [showPopup]);

  const CompleteLottie = () => {
    const completeContainer = useRef();
    useEffect(() => {
      lottie.loadAnimation({
        container: completeContainer.current,
        renderer: "svg",
        loop: false,
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
    <AnimatePresence>
      {isVisible && (
        <Container
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ y: 10, scale: 0 }}
          bgcolor={"white"}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Msg fcolor={"#303237"}>{text}</Msg>
            <CompleteLottie />
          </div>
        </Container>
      )}
    </AnimatePresence>
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

//modal
const ModalContainer = styled(motion.div)`
  position: fixed;
  margin-top: 78vh;
  display: flex;
  justify-content: center;
  height: min-content;
  z-index: 10100;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 50px;
  padding: 2px 4px;
`;

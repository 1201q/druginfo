import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as X } from "../images/X.svg";
import { ReactComponent as Angle } from "../images/angle-right.svg";
import { ReactComponent as Bookmark } from "../images/bookmark.svg";
import { ReactComponent as Glass } from "../images/glass.svg";
import { debounce, throttle } from "lodash";
import { useRecoilState } from "recoil";
import {
  detailDataState,
  simpleDataState,
  otherDataState,
} from "../Context/Context";

const Sidebar = ({ setIsMultiVisible, setKeyWord, keyWord }) => {
  // recoil
  const [detailDataArr, setDetailDataArr] = useRecoilState(detailDataState);
  const [simpleDataArr, setSimpleDataArr] = useRecoilState(simpleDataState);
  const [otherDataArr, setOtherDataArr] = useRecoilState(otherDataState);

  const [arr, setArr] = useState(() => {
    if (!localStorage.getItem("multiKeyWord")) {
      return ["검색어를", "검색해보세요."];
    } else {
      return JSON.parse(localStorage.getItem("multiKeyWord"));
    }
  });

  const [historyArr, setHistoryArr] = useState(() => {
    if (!localStorage.getItem("searchHistory")) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem("searchHistory"));
    }
  });

  const [top, setTop] = useState(window.scrollY);
  const handscroll = debounce(() => {
    const offset = window.scrollY;
    setTop(offset);
  }, 10);

  const [history, setHistory] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handscroll);
    return () => {
      window.removeEventListener("scroll", handscroll);
    };
  }, [handscroll]);

  useEffect(() => {
    if (localStorage.getItem("searchHistory")) {
      setHistoryArr(JSON.parse(localStorage.getItem("searchHistory")));
    }
  }, [detailDataArr]);

  const deleteHistory = (item, idx) => {
    let wordArr = JSON.parse(localStorage.getItem("searchHistory"));
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(wordArr.filter((item, selectIdx) => idx !== selectIdx))
    );

    let selectIdx = idx === 0 ? 1 : idx - 1;

    if (idx > 1) {
      localStorage.setItem(
        "recentSearchKeyWord",
        JSON.parse(localStorage.getItem("searchHistory"))[idx - 1]
      );
    } else if (idx === 0) {
      if (JSON.parse(localStorage.getItem("searchHistory"))[1]) {
        localStorage.setItem(
          "recentSearchKeyWord",
          JSON.parse(localStorage.getItem("searchHistory"))[1]
        );
      } else {
        localStorage.setItem("recentSearchKeyWord", "탁센");
      }
    }
    setHistoryArr(JSON.parse(localStorage.getItem("searchHistory")));
  };

  const deleteMulti = (item, idx) => {
    console.log(idx);
  };

  return (
    <Container
      mtop={`${40 + top}px`}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
    >
      <AnimatePresence>
        <HistoryWrapper layoutId="1">
          {history ? (
            <motion.div animate={{ opacity: 1 }}>
              <PillHeader>최근검색어</PillHeader>
              {historyArr.map((item, index) => (
                <PillComponent key={index} whileTap={{ scale: 0.95 }}>
                  <PillComponentClick
                    onClick={() => {
                      setKeyWord(item);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {item}
                  </PillComponentClick>
                  <PillRemoveBtn
                    onClick={() => {
                      deleteHistory(item, index);
                    }}
                  >
                    <X width={12} height={12} fill="#919191" />
                  </PillRemoveBtn>
                </PillComponent>
              ))}
            </motion.div>
          ) : (
            <SideBox
              onClick={() => setHistory(true)}
              whileHover={{ scale: 1.04 }}
            >
              <motion.div
                style={{ display: "flex", alignItems: "center" }}
                layoutId="header"
              >
                <Bookmark
                  width={20}
                  height={20}
                  fill="#303237"
                  style={{ marginRight: "10px" }}
                />
                최근검색어
              </motion.div>
              <Angle width={20} height={20} fill="#919191" />
            </SideBox>
          )}
        </HistoryWrapper>
      </AnimatePresence>
      <AnimatePresence>
        <Wrapper layoutId="2">
          {!history ? (
            <motion.div>
              <PillHeader>멀티검색</PillHeader>
              {arr
                .filter((item) => {
                  return item !== "";
                })
                .map((item, index) => (
                  <PillComponent key={`${index}-1`} whileTap={{ scale: 0.95 }}>
                    <PillComponentClick
                      onClick={() => {
                        setKeyWord(item);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {item}
                    </PillComponentClick>
                  </PillComponent>
                ))}
              <SearchBtn
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMultiVisible(true)}
              >
                멀티검색
              </SearchBtn>
            </motion.div>
          ) : (
            <SideBox
              onClick={() => setHistory(false)}
              whileHover={{ scale: 1.04 }}
            >
              <motion.div
                layoutId="header"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Glass
                  width={18}
                  height={20}
                  fill="#303237"
                  style={{ marginRight: "10px" }}
                />
                멀티검색
              </motion.div>
              <Angle width={20} height={20} fill="#919191" />
            </SideBox>
          )}
        </Wrapper>
      </AnimatePresence>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  min-width: 300px;
  max-width: 300px;
  margin-left: 40px;
  margin-top: ${(props) => props.mtop};
`;

const Wrapper = styled(motion.div)`
  position: relative;

  height: max-content;
  background-color: white;
  padding: 20px;
  padding-top: 20px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  margin-bottom: 40px;
`;

const HistoryWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  position: relative;
  height: max-content;
  background-color: white;

  padding: 20px;
  padding-top: 20px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  margin-bottom: 20px;
  font-size: 23px;
`;

// 컴포넌트
const PillComponent = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  color: gray;
  font-size: 18px;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  text-overflow: inherit;

  &:hover {
    background-color: #eeeeee;
  }
`;

const PillComponentClick = styled(motion.div)`
  width: 90%;
`;

const PillHeader = styled(motion.div)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-top: 0px;
`;

const PillRemoveBtn = styled.div`
  position: absolute;
  right: 0;
  margin-right: 5px;
`;

const SearchBtn = styled(motion.button)`
  top: 0;
  right: 0;
  left: 0;

  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin-top: 20px;
  font-size: 15px;
  cursor: pointer;
`;

const SideBox = styled(motion.div)`
  display: flex;

  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  padding-left: 10px;
`;

export default Sidebar;

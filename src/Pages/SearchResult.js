import styled from "styled-components";
import EffectRecommend from "../components/EffectRecommend";
import Component from "../components/Component";
import { Ring } from "@uiball/loaders";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  simpleDataState,
  detailDataState,
  otherDataState,
} from "../Context/Context";
import { useRecoilValue } from "recoil";
import ExpandedInfo from "../components/ExpandedInfo";
import Sidebar from "../components/SideBar";
import { ReactComponent as SearchImg } from "../images/searchimg.svg";
import Multi from "../components/Multi";
import lottie from "lottie-web";

import { NoResultPopup, SearchCompletePopup } from "../components/PopupModal";

const SearchResult = ({ searchLoading, setKeyWord, keyWord, resultExist }) => {
  const detailDataArr = useRecoilValue(detailDataState);
  const simpleDataArr = useRecoilValue(simpleDataState);
  const otherDataArr = useRecoilValue(otherDataState);

  const hasData =
    detailDataArr &&
    simpleDataArr &&
    detailDataArr.length > 0 &&
    simpleDataArr.length > 0;

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectIndex, setSelectIndex] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMultiVisible, setIsMultiVisible] = useState(false);
  const [isFloatingBtnVisible, setIsFloatingBtnVisible] = useState(true);

  const [multiSearchArr, setMultiSearchArr] = useState(() => {
    if (!localStorage.getItem("multiKeyWord")) {
      return [""];
    } else {
      return JSON.parse(localStorage.getItem("multiKeyWord"));
    }
  });

  const LoadingLottie = () => {
    const loadingContainer = useRef();
    useEffect(() => {
      lottie.loadAnimation({
        container: loadingContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../lotties/LoadingData.json"),
      });
    }, []);

    return (
      <div>
        <div ref={loadingContainer}></div>
      </div>
    );
  };

  useEffect(() => {
    console.log(resultExist);
  }, [resultExist]);

  return (
    <AnimatePresence>
      <Container>
        <>
          <Wrapper>
            <HeaderText>검색</HeaderText>
            {hasData && <EffectRecommend />}
            {searchLoading ? (
              <Loading>
                <LoadingLottie />
              </Loading>
            ) : (
              <Box>
                {simpleDataArr && otherDataArr ? (
                  simpleDataArr.map((item, index) => (
                    <Component
                      key={index}
                      index={index}
                      setIsExpanded={setIsExpanded}
                      setSelectIndex={setSelectIndex}
                      setIsFloatingBtnVisible={setIsFloatingBtnVisible}
                    />
                  ))
                ) : (
                  <div>결과가 없어요.</div>
                )}
              </Box>
            )}
          </Wrapper>
          {isExpanded && (
            <ExpandedWrapper>
              <ExpandedInfoWrapper>
                <ExpandedInfo
                  selectIndex={selectIndex}
                  setIsExpanded={setIsExpanded}
                  setIsFloatingBtnVisible={setIsFloatingBtnVisible}
                />
              </ExpandedInfoWrapper>
            </ExpandedWrapper>
          )}
          {isMultiVisible && (
            <ExpandedWrapper>
              <ExpandedInfoWrapper>
                <Multi
                  setIsMultiVisible={setIsMultiVisible}
                  setIsFloatingBtnVisible={setIsFloatingBtnVisible}
                  setMultiSearchArr={setMultiSearchArr}
                />
              </ExpandedInfoWrapper>
            </ExpandedWrapper>
          )}
        </>
        {isSidebarVisible && (
          <Sidebar
            keyWord={keyWord}
            multiSearchArr={multiSearchArr}
            setKeyWord={setKeyWord}
            setIsMultiVisible={setIsMultiVisible}
            setIsFloatingBtnVisible={setIsFloatingBtnVisible}
          />
        )}
        {isFloatingBtnVisible && (
          <SidebarOpenBtn
            onClick={() => {
              setIsSidebarVisible(!isSidebarVisible);
            }}
            whileTap={{ scale: 0.9 }}
          >
            <SearchImg width={"35px"} height={"35px"} fill="white" />
          </SidebarOpenBtn>
        )}
        {resultExist && resultExist !== "default" && (
          <SearchCompletePopup resultExist={resultExist} />
        )}
        {!resultExist && <NoResultPopup resultExist={!resultExist} />}
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  background-color: rgba(247, 249, 250, 0.1);
  overflow: hidden;
`;

const Wrapper = styled(motion.div)`
  width: 100%;
  max-width: 1024px;
`;

const HeaderText = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 40px;
  margin: 30px 0px 20px 0px;
`;

const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;

const Loading = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 100px;
`;

const ExpandedWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  padding-bottom: 70px;
  z-index: 800;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(48, 50, 55, 0.8);
`;

const ExpandedInfoWrapper = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
`;

const SidebarOpenBtn = styled(motion.button)`
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 999;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: none;
  background: #396afc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #2948ff,
    #396afc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #2948ff,
    #396afc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export default SearchResult;

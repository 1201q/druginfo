import styled from "styled-components";
import EffectRecommend from "../components/EffectRecommend";
import Component from "../components/Component";
import { RaceBy } from "@uiball/loaders";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  simpleDataState,
  detailDataState,
  otherDataState,
} from "../Context/Context";
import { useRecoilValue } from "recoil";
import ExpandedInfo from "../components/ExpandedInfo";

const SearchResult = ({ searchLoading }) => {
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

  return (
    <AnimatePresence>
      <Container>
        <Wrapper>
          <HeaderText>검색</HeaderText>
          {hasData && <EffectRecommend />}
          {searchLoading ? (
            <Loading>
              <RaceBy size={250} speed={1} lineWeight={10} />
              <div style={{ marginTop: 30 }}>로딩중</div>
            </Loading>
          ) : (
            <Box>
              {simpleDataArr && otherDataArr && simpleDataArr.length > 0 ? (
                simpleDataArr.map((item, index) => (
                  <Component
                    key={index}
                    index={index}
                    setIsExpanded={setIsExpanded}
                    setSelectIndex={setSelectIndex}
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
              />
            </ExpandedInfoWrapper>
          </ExpandedWrapper>
        )}
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
  justify-content: center;
  margin-top: 90px;
`;

const ExpandedWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
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

export default SearchResult;

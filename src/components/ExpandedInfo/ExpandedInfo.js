import styled from "styled-components";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import {
  detailDataState,
  otherDataState,
  simpleDataState,
} from "../../Context/Context";
import { convertMg } from "../../Context/Context";

import MaterialChart from "./MaterialChart";
import MaterialSummary from "./MaterialSummary";
import PillTable from "./PillTable";

import { ReactComponent as X } from "../../images/X.svg";

const pillColor = {
  하양: "#ffffff",
  노랑: "#eadc00",
  주황: "#f25b00",
  분홍: "#f24482",
  빨강: "#d70000",
  갈색: "#7f0707",
  연두: "#6fcd00",
  초록: "#008d21",
  청록: "#2baec6",
  파랑: "#008fd9",
  남색: "#002371",
  자주: "#bf0199",
  보라: "#7a00a7",
  회색: "#7b7b7b",
  검정: "#000000",
  투명: "",
};

const pillShape = {
  원형: "https://www.health.kr/images/pills/shape01.jpg",
  타원형: "https://www.health.kr/images/pills/shape02.jpg",
  반원형: "https://www.health.kr/images/pills/shape03.jpg",
  삼각형: "https://www.health.kr/images/pills/shape04.jpg",
  사각형: "https://www.health.kr/images/pills/shape05.jpg",
  마름모형: "https://www.health.kr/images/pills/shape06.jpg",
  장방형: "https://www.health.kr/images/pills/shape07.jpg",
  육각형: "https://www.health.kr/images/pills/shape08.jpg",
  팔각형: "https://www.health.kr/images/pills/shape09.jpg",
  오각형: "https://www.health.kr/images/pills/shape10.jpg",
  기타: "",
};

const pillType = {
  정제: "https://www.health.kr/images/pills/type01.jpg",
  경질: "https://www.health.kr/images/pills/type02.jpg",
  연질: "https://www.health.kr/images/pills/type03.jpg",
  기타: "",
};
const ExpandedInfo = ({
  setIsExpanded,
  selectIndex,
  setIsFloatingBtnVisible,
}) => {
  const detailDataArr = useRecoilValue(detailDataState);
  const otherDataArr = useRecoilValue(otherDataState);
  const simpleDataArr = useRecoilValue(simpleDataState);

  const [pillStyle, setPillStyle] = useState(null);
  const [pillMaterial, setPillMaterial] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectIndex >= 0) {
      getPillMaterial(detailDataArr[selectIndex]);
      getPillStyle(otherDataArr[selectIndex]);
    }
  }, [selectIndex]);

  const parseXML = (string) => {
    let returnArr = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(string, "text/xml");
    const articles = xmlDoc.getElementsByTagName("ARTICLE");

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const paragraphs = article.getElementsByTagName("PARAGRAPH");
      const articleTitle = article.getAttribute("title");

      if (articleTitle) {
        returnArr.push(articleTitle);
      }

      for (let j = 0; j < paragraphs.length; j++) {
        const paragraph = paragraphs[j];
        const content = paragraph.textContent;

        if (content) {
          returnArr.push(content);
        }
      }
    }

    return returnArr
      .join("\n")
      .trim()
      .replace(/(<([^>]+)>)/gi, "")
      .replaceAll("&nbsp;", "");
  };

  const getPillStyle = (data) => {
    if (data) {
      const style = {
        color1: pillColor[data.COLOR_CLASS1],
        color2: pillColor[data.COLOR_CLASS2],
        shape: pillShape[data.DRUG_SHAPE],
        frontAnal: data.MARK_CODE_FRONT_ANAL,
        frontImg: data.MARK_CODE_FRONT_IMG,
        frontSummary: data.PRINT_FRONT,
        backAnal: data.MARK_CODE_BACK_ANAL,
        backImg: data.MARK_CODE_BACK_IMG,
        backSummary: data.PRINT_BACK,
        frontLine: data.LINE_FRONT,
        backLine: data.LINE_BACK,
      };

      setPillStyle(style);
    }
  };

  const getPillMaterial = (data) => {
    const material = [];
    data.MATERIAL_NAME.split("|성분명").map((item, i) => {
      if (i > 0) {
        const str = item.split("단위")[0].split("|");
        const name = str[0].replace(":", "").trim();
        const mg = Number(str[1].split(":")[1].trim());

        material.push([name, mg]);
      }
    });
    setPillMaterial(material);
  };
  return (
    <AnimatePresence>
      <Container
        initial={{ opacity: 0.6, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
          duration: 0.6,
        }}
      >
        <HeaderBarWrapper>
          <HeaderBarContainer>
            <X
              width="15"
              height="15"
              fill="white"
              onClick={() => {
                setIsExpanded(false);
                setIsFloatingBtnVisible(true);
              }}
              style={{ cursor: "pointer" }}
            />
          </HeaderBarContainer>
        </HeaderBarWrapper>
        <Wrapper>
          <EffectContainer>
            <EffectWrapper>
              <Thumbnail
                src={
                  otherDataArr[selectIndex]
                    ? otherDataArr[selectIndex].ITEM_IMAGE
                    : require("../../images/thumbnail.png")
                }
                alt=""
              />
              <div>
                <ComponentHeader>
                  {selectIndex >= 0 &&
                    detailDataArr[selectIndex].ITEM_NAME.replace(
                      /\([^)]*\)/g,
                      ""
                    )}
                </ComponentHeader>
                <ComponentInfo>
                  {selectIndex >= 0 && simpleDataArr[selectIndex].SPCLTY_PBLC}{" "}
                  <hr></hr>
                  {selectIndex >= 0 && simpleDataArr[selectIndex].ENTP_NAME}
                </ComponentInfo>
                <Type>
                  <ComponentType fcolor={"#3182f6"} fBg={"#e8f3ff"}>
                    {selectIndex >= 0 && simpleDataArr[selectIndex].PRDUCT_TYPE
                      ? simpleDataArr[selectIndex].PRDUCT_TYPE.replace(
                          /\[[^\]]*\]/g,
                          ""
                        )
                      : "정보없음"}
                  </ComponentType>

                  {/* 약품 */}
                  {selectIndex >= 0 &&
                    detailDataArr[selectIndex].MAIN_ITEM_INGR.replace(
                      /\[[^\]]*\]/g,
                      ""
                    )
                      .split("|")
                      .map((item, index) =>
                        index <= 1 ? (
                          <ComponentType
                            fcolor={"#303237"}
                            fBg={"#f2f4f6"}
                            key={index}
                          >
                            {item}
                          </ComponentType>
                        ) : index === 2 ? (
                          <ComponentType
                            fcolor={"#303237"}
                            fBg={"#f2f4f6"}
                            key={index}
                          >
                            그 외...
                          </ComponentType>
                        ) : null
                      )}
                </Type>
              </div>
            </EffectWrapper>
          </EffectContainer>
          <EffectContainer>
            <EffectWrapper>
              <Header>효능효과</Header>
              <Text style={{ display: "flex", alignItems: "center" }}>
                {selectIndex >= 0 &&
                  parseXML(detailDataArr[selectIndex].EE_DOC_DATA)}
              </Text>
            </EffectWrapper>
          </EffectContainer>
          <EffectContainer>
            <EffectWrapper>
              <Header>약품모양</Header>
              <Text
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {selectIndex >= 0 && detailDataArr[selectIndex].CHART}
                </div>
                {pillStyle && (
                  <PillTable
                    pillColor={pillColor}
                    pillStyle={pillStyle}
                    selectIndex={selectIndex}
                  />
                )}
              </Text>
            </EffectWrapper>
          </EffectContainer>
          <Span>
            {/* 유효성분 */}
            <EffectContainer>
              <EffectWrapper>
                <Header
                  style={{
                    position: "absolute",
                    width: "fit-content",
                    marginBottom: "10px",
                  }}
                >
                  유효성분
                </Header>
                {pillMaterial && <MaterialChart pillMaterial={pillMaterial} />}
              </EffectWrapper>
            </EffectContainer>
            {/* 성분함량 */}
            <EffectContainer>
              <OtherWrapper>
                <Header style={{ width: "fit-content", marginBottom: "10px" }}>
                  주요성분함량
                </Header>
                {selectIndex >= 0 && pillMaterial && (
                  <>
                    <MaterialSummary pillMaterial={pillMaterial} />
                  </>
                )}
              </OtherWrapper>
            </EffectContainer>
            {/* 다른결과 */}
            <EffectContainer>
              <OtherWrapper>
                <Header style={{ width: "fit-content", marginBottom: "10px" }}>
                  다른결과
                </Header>
                {selectIndex >= 0 && (
                  <>
                    <OtherLinkBtn
                      bgcolor="#03C75A"
                      fcolor="white"
                      href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${convertMg(
                        detailDataArr[selectIndex].ITEM_NAME
                      )}`}
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={require("../../images/naverLogo.png")}
                        alt=""
                        width={30}
                        style={{ marginRight: "10px", marginLeft: "15px" }}
                      />
                      네이버 검색결과
                    </OtherLinkBtn>
                    <OtherLinkBtn
                      bgcolor="#EEEDEB"
                      fcolor="#333333"
                      href={`https://www.google.co.kr/search?q=${convertMg(
                        detailDataArr[selectIndex].ITEM_NAME
                      )}`}
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={require("../../images/GoogleLogo.png")}
                        alt=""
                        width={30}
                        style={{ marginRight: "10px", marginLeft: "15px" }}
                      />
                      구글 검색결과
                    </OtherLinkBtn>
                    <OtherLinkBtn
                      bgcolor="#EEEDEB"
                      fcolor="#333333"
                      href={`https://100.daum.net/search/entry?q=${convertMg(
                        detailDataArr[selectIndex].ITEM_NAME
                      )}`}
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={require("../../images/daumLogo.png")}
                        alt=""
                        width={30}
                        style={{ marginRight: "10px", marginLeft: "15px" }}
                      />
                      다음사전 검색결과
                    </OtherLinkBtn>
                    <OtherLinkBtn
                      bgcolor="#EEEDEB"
                      fcolor="#333333"
                      href={`https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=${detailDataArr[selectIndex].ITEM_SEQ}`}
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={require("../../images/governmentLogo.png")}
                        alt=""
                        width={30}
                        style={{ marginRight: "10px", marginLeft: "15px" }}
                      />
                      식약처 검색결과
                    </OtherLinkBtn>
                  </>
                )}
              </OtherWrapper>
            </EffectContainer>
          </Span>
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
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
  padding: 20px 20px;
`;

const Thumbnail = styled(motion.img)`
  width: 25%;
  height: min-content;
  border-radius: 10px;
  margin-right: 22px;
`;

const EffectContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  border-radius: 15px;
  font-size: 18px;
  white-space: pre-line;
  margin-bottom: 20px;
`;

const Span = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const EffectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) => props.Direction};
  height: 100%;
  padding: 20px 20px;
`;

const OtherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;

  height: 100%;
  padding: 20px 20px;
`;

const Header = styled.div`
  position: ${(props) => props.Hposition};
  min-width: max-content;
  height: fit-content;
  background-color: #ffeeee;
  color: #f04452;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 8px;
  margin: 0px 15px 0px 0px;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const Text = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const ComponentHeader = styled(motion.div)`
  font-size: 38px;
  font-weight: 900;

  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

const ComponentInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  color: #868686;
  font-size: 15px;
  font-weight: 500;
  margin-top: 5px;
  margin-left: 2px;

  hr {
    margin: 0px 8px;
    background-color: #868686;
    font-weight: 600;
  }

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const ComponentType = styled.div`
  width: max-content;
  background-color: ${(props) => props.fBg};
  color: ${(props) => props.fcolor};
  font-weight: bold;
  font-size: 16px;
  padding: 5px 8px;
  margin: 10px 10px 0px 0px;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    word-wrap: break-word;
    white-space: normal;
  }
`;

const Type = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const OtherLinkBtn = styled(motion.a)`
  width: 100%;
  text-decoration: none;
  height: fit-content;
  display: flex;
  align-items: center;
  border: none;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.fcolor};
  cursor: pointer;
  padding: 10px 0px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export default ExpandedInfo;

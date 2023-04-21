import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import {
  detailDataState,
  otherDataState,
  simpleDataState,
} from "../Context/Context";
import MaterialChart from "../components/MaterialChart";
import MaterialSummary from "../components/MaterialSummary";

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

const ExpandedInfo = ({ setIsExpanded, selectIndex }) => {
  const detailDataArr = useRecoilValue(detailDataState);
  const otherDataArr = useRecoilValue(otherDataState);
  const simpleDataArr = useRecoilValue(simpleDataState);

  const [pillStyle, setPillStyle] = useState(null);
  const [pillMaterial, setPillMaterial] = useState(null);
  // const [selectIndex, setselectIndex] = useState("?"); // data중 내가 클릭한 인덱스가 몇 번째인지.

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    if (selectIndex >= 0) {
      getPillMaterial(detailDataArr[selectIndex]);
      getPillStyle(otherDataArr[selectIndex]);
    }
  }, [selectIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    return returnArr.join("\n").trim();
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
        onClick={() => {
          setIsExpanded(false);
        }}
      >
        <Wrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <EffectContainer>
            <EffectWrapper>
              <Thumbnail
                src={
                  otherDataArr[selectIndex]
                    ? otherDataArr[selectIndex].ITEM_IMAGE
                    : require("../images/thumbnail.png")
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
                <div style={{ display: "flex" }}>
                  <ComponentType fcolor={"#3182f6"} fBg={"#e8f3ff"}>
                    {selectIndex >= 0 &&
                      simpleDataArr[selectIndex].PRDUCT_TYPE.replace(
                        /\[[^\]]*\]/g,
                        ""
                      )}
                  </ComponentType>
                  <ComponentType fcolor={"#303237"} fBg={"#f2f4f6"}>
                    {selectIndex >= 0 &&
                      detailDataArr[selectIndex].MAIN_ITEM_INGR.replace(
                        /\[[^\]]*\]/g,
                        ""
                      )}
                  </ComponentType>
                </div>
              </div>
            </EffectWrapper>
          </EffectContainer>
          <EffectContainer>
            <EffectWrapper>
              <Header>효능효과</Header>
              <div style={{ display: "flex", alignItems: "center" }}>
                {selectIndex >= 0 &&
                  parseXML(detailDataArr[selectIndex].EE_DOC_DATA)}
              </div>
            </EffectWrapper>
          </EffectContainer>
          <EffectContainer>
            <EffectWrapper>
              <Header>약품모양</Header>
              <div
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
                  <Table>
                    <table>
                      <tbody>
                        <tr>
                          <th>모양</th>
                          <td colSpan={4}>
                            <img src={pillStyle.shape} alt="" />
                          </td>
                        </tr>
                        <tr>
                          <th>색상</th>
                          <td
                            style={{
                              width: "10%",
                              backgroundColor: "rgba(0,128,255,0.1)",
                            }}
                          >
                            앞
                          </td>
                          <td
                            style={{
                              width: "30%",
                            }}
                          >
                            {otherDataArr[selectIndex].COLOR_CLASS1 ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {otherDataArr[selectIndex].COLOR_CLASS1}

                                <div
                                  style={{
                                    width: "13px",
                                    height: "13px",
                                    borderRadius: "50%",
                                    border: "1px solid gray",
                                    marginLeft: "10px",

                                    backgroundColor:
                                      pillColor[
                                        otherDataArr[selectIndex].COLOR_CLASS1
                                      ],
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div>없음</div>
                            )}
                          </td>
                          <td
                            style={{
                              width: "10%",
                              backgroundColor: "rgba(0,128,255,0.1)",
                            }}
                          >
                            뒤
                          </td>
                          <td
                            style={{
                              width: "30%",
                            }}
                          >
                            {otherDataArr[selectIndex].COLOR_CLASS2 ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {otherDataArr[selectIndex].COLOR_CLASS2}
                                {"  "}
                                <div
                                  style={{
                                    width: "13px",
                                    height: "13px",
                                    borderRadius: "50%",
                                    border: "1px solid gray",
                                    marginLeft: "10px",
                                    backgroundColor:
                                      pillColor[
                                        otherDataArr[selectIndex].COLOR_CLASS2
                                      ],
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div>없음</div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>분할선</th>
                          <td
                            style={{
                              width: "10%",
                              backgroundColor: "rgba(0,128,255,0.1)",
                            }}
                          >
                            앞
                          </td>
                          <td style={{ width: "30%" }}>
                            {pillStyle.frontLine ? pillStyle.frontLine : "없음"}
                          </td>
                          <td
                            style={{
                              width: "10%",
                              backgroundColor: "rgba(0,128,255,0.1)",
                            }}
                          >
                            뒤
                          </td>
                          <td style={{ width: "30%" }}>
                            {pillStyle.backLine ? pillStyle.backLine : "없음"}
                          </td>
                        </tr>
                        <tr>
                          <th>표시</th>
                          <td
                            style={{
                              width: "10%",
                              backgroundColor: "rgba(0,128,255,0.1)",
                            }}
                          >
                            앞
                          </td>
                          <td style={{ width: "30%" }}>
                            {pillStyle.frontSummary
                              ? pillStyle.frontSummary
                              : "없음"}
                          </td>
                          <td
                            style={{
                              width: "10%",
                              backgroundColor: "rgba(0,128,255,0.1)",
                            }}
                          >
                            뒤
                          </td>
                          <td style={{ width: "30%" }}>
                            {pillStyle.backSummary
                              ? pillStyle.backSummary
                              : "없음"}
                          </td>
                        </tr>
                        <tr>
                          <th>마크</th>
                          <td
                            style={{
                              width: "10%",
                              backgroundColor: "rgba(0,128,255,0.1)",
                            }}
                          >
                            앞
                          </td>
                          <td style={{ width: "30%" }}>
                            {pillStyle.frontImg ? (
                              <img
                                src={pillStyle.frontImg}
                                alt=""
                                width={"40px"}
                              />
                            ) : (
                              "없음"
                            )}
                          </td>
                          <td
                            style={{
                              width: "10%",
                              backgroundColor: "rgba(0,128,255,0.1)",
                            }}
                          >
                            뒤
                          </td>
                          <td style={{ width: "30%" }}>
                            {pillStyle.backImg ? (
                              <img
                                src={pillStyle.backImg}
                                alt=""
                                width={"40px"}
                              />
                            ) : (
                              "없음"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Table>
                )}
              </div>
            </EffectWrapper>
          </EffectContainer>
          <Span>
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
            <EffectContainer>
              <OtherWrapper>
                <Header style={{ width: "fit-content", marginBottom: "10px" }}>
                  성분함량
                </Header>
                {selectIndex >= 0 && pillMaterial && (
                  <>
                    <MaterialSummary pillMaterial={pillMaterial} />
                  </>
                )}
              </OtherWrapper>
            </EffectContainer>
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
                      href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${detailDataArr[selectIndex].ITEM_NAME}`}
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={require("../images/naverLogo.png")}
                        alt=""
                        width={30}
                        style={{ marginRight: "10px", marginLeft: "15px" }}
                      />
                      네이버 검색결과
                    </OtherLinkBtn>
                    <OtherLinkBtn
                      bgcolor="#EEEDEB"
                      fcolor="#333333"
                      href={`https://www.google.co.kr/search?q=${detailDataArr[selectIndex].ITEM_NAME}`}
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={require("../images/GoogleLogo.png")}
                        alt=""
                        width={30}
                        style={{ marginRight: "10px", marginLeft: "15px" }}
                      />
                      구글 검색결과
                    </OtherLinkBtn>
                    <OtherLinkBtn
                      bgcolor="#EEEDEB"
                      fcolor="#333333"
                      href={`https://100.daum.net/search/entry?q=${detailDataArr[selectIndex].ITEM_NAME}`}
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={require("../images/daumLogo.png")}
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
                        src={require("../images/governmentLogo.png")}
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

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  background: white;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  border-radius: 15px;
  cursor: pointer;
  margin-top: 40px;
  margin-bottom: 40px;
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
`;

const ComponentHeader = styled(motion.div)`
  font-size: 38px;
  font-weight: 900;
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
`;

const Table = styled.div`
  overflow: hidden;
  margin-top: 15px;

  table {
    width: 100%;
    border: 1px solid #d7dcdf;
    border-top: 2px solid rgba(0, 128, 255, 0.5);
    color: #333333;
    border-collapse: collapse;
  }
  th {
    width: 10%;
    text-align: center;
    padding-bottom: 10px;
    border: 1px solid #d7dcdf;
    background-color: #f8f7f6;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 500;
  }
  td {
    width: ${(props) => props.tdWidth};
    background-color: ${(props) => (props.mybg ? props.mybg : "#ffffff")};
    text-align: center;
    padding: 3px 10px;
    border: 1px solid #d7dcdf;
    font-size: 16px;
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

import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { simpleDataState, detailDataState } from "../Context/Context";

const EffectRecommend = () => {
  const detailDataArr = useRecoilValue(detailDataState);
  const simpleDataArr = useRecoilValue(simpleDataState);
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

  return (
    <Container
      initial={{ translateY: 20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Wrapper>
        <Header>
          <ComponentType>추천</ComponentType>
          <p>
            {simpleDataArr.length > 0 && simpleDataArr[0].ITEM_NAME}의
            효능효과를 추천해드릴게요!
          </p>
        </Header>
        <Text>{parseXML(detailDataArr[0].EE_DOC_DATA)}</Text>
      </Wrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  padding: 20px;
  font-size: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #d6d6d6;
  padding-bottom: 10px;
  margin-bottom: 15px;
  font-weight: 800;

  p {
    margin: 0;
    font-size: 20px;
  }
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 18px;
  white-space: pre-line;
`;

const ComponentType = styled.div`
  min-width: max-content;
  background-color: #ffeeee;
  color: #f04452;
  font-weight: bold;
  font-size: 15px;
  padding: 3px 5px;
  margin-right: 10px;
  border-radius: 5px;
`;

export default EffectRecommend;

import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilValue } from "recoil";
import {
  detailDataState,
  simpleDataState,
  otherDataState,
} from "../../Context/Context";
import { Ring } from "@uiball/loaders";

const Component = ({
  index,
  setIsExpanded,
  setSelectIndex,
  setIsFloatingBtnVisible,
}) => {
  const [imgLink, setImgLink] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);
  const detailDataArr = useRecoilValue(detailDataState);
  const simpleDataArr = useRecoilValue(simpleDataState);
  const otherDataArr = useRecoilValue(otherDataState);

  useEffect(() => {
    if (otherDataArr[index]) {
      setImgLink(otherDataArr[index].ITEM_IMAGE);
    } else {
      setImgLink(null);
    }
  }, [otherDataArr[index]]);

  return (
    <AnimatePresence>
      <Container
        onClick={() => {
          setIsExpanded(true);
          setSelectIndex(index);
          setIsFloatingBtnVisible(false);
        }}
      >
        <Wrapper>
          {imgLink ? (
            <div>
              {imgLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 280,
                    height: 153,
                    marginBottom: 19,
                  }}
                >
                  <Ring color="black" speed={1} lineWeight={5} />
                </div>
              ) : null}
              <Thumbnail
                src={imgLink}
                alt=""
                onLoad={() => setImgLoading(false)}
                style={{ display: imgLoading && "none" }}
              />
            </div>
          ) : (
            <Thumbnail src={require("../../images/thumbnail.png")} alt="" />
          )}

          <ComponentHeader>
            {simpleDataArr[index].ITEM_NAME.replace(/\([^)]*\)/g, "")}
          </ComponentHeader>

          <ComponentInfo>
            {simpleDataArr[index].SPCLTY_PBLC} <hr></hr>{" "}
            {simpleDataArr[index].ENTP_NAME}
          </ComponentInfo>
          <ComponentType>
            {simpleDataArr[index].PRDUCT_TYPE
              ? simpleDataArr[index].PRDUCT_TYPE.replace(/\[[^\]]*\]/g, "")
              : "정보없음"}
          </ComponentType>
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    transition: all 0.2s;
  }
`;

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 20px 20px;
`;

const Thumbnail = styled(motion.img)`
  width: 280px;
  height: 153px;
  border-radius: 10px;
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const ComponentHeader = styled(motion.div)`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`;

const ComponentInfo = styled.div`
  display: flex;
  justify-content: center;
  color: #868686;
  font-size: 14px;
  font-weight: 500;

  hr {
    margin: 0px 8px;
    background-color: #868686;
    font-weight: 600;
  }
`;

const ComponentType = styled.div`
  width: max-content;
  background-color: #e8f3ff;
  color: #3182f6;
  font-weight: bold;
  font-size: 13px;
  padding: 5px 8px;
  margin: 10px 0px 0px 0px;
  border-radius: 10px;
`;

export default Component;

import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { ReactComponent as Pill } from "../images/pills.svg";
import { convertKeyword } from "../Context/Context";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Header = ({ setKeyWord }) => {
  const [searchKeyWord, setsearchKeyWord] = useState("");
  const [inputFocus, setInputFocus] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setKeyWord(convertKeyword(searchKeyWord)[0]);
    setsearchKeyWord("");
  };

  const inputRef = useRef();

  return (
    <Container>
      <Wrapper>
        <Box>
          <StyledLink to="/">
            <LogoBox>
              <img
                src={require(`../images/headerLogo.png`)}
                alt=""
                style={{ width: "130px", height: "100%" }}
              />
            </LogoBox>
          </StyledLink>
          <SearchBox>
            <img src={require("../images/Vector.png")} alt="검색" />
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="검색"
                value={searchKeyWord}
                onChange={(e) => {
                  setsearchKeyWord(e.target.value);
                }}
                ref={inputRef}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                style={{
                  borderBottomLeftRadius: inputFocus ? "0px" : "6px",
                  borderBottomRightRadius: inputFocus ? "0px" : "6px",
                }}
              />
            </form>
            {inputFocus && (
              <RecommendContainer>
                <RecommendTopHeader>
                  검색어 자동 보정이 적용 중이에요.
                </RecommendTopHeader>
                <RecommendKeyWordLine>
                  <KeyWordHeader>보정</KeyWordHeader>
                  <RecommendKeyWord>
                    {searchKeyWord === ""
                      ? "검색어"
                      : convertKeyword(searchKeyWord)[0]}
                  </RecommendKeyWord>
                </RecommendKeyWordLine>
              </RecommendContainer>
            )}
          </SearchBox>
        </Box>
      </Wrapper>
    </Container>
  );
};

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0px 4px 7px 0px #00000012;
  height: 60px;
  color: white;
  z-index: 100;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  height: 100%;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 900;
  cursor: pointer;
`;
const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 250px;
    height: 36px;
    border: none;
    background: rgba(228, 232, 239, 0.7);
    border-radius: 6px;
    font-size: 17px;
    outline: none;
    padding: 0px 15px 0px 40px;
  }

  input::placeholder {
    color: #8b90a4;
    font-size: 14px;
  }

  img {
    position: absolute;
    margin-left: 13px;
    width: 16px;
    height: 16px;
  }
`;

const RecommendContainer = styled.div`
  width: 265px;
  height: 40px;
  position: absolute;
  top: 35px;
  background-color: white;
  border-radius: 10px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  color: BLACK;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  padding: 15px 20px 20px 20px;
`;

const RecommendKeyWordLine = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const KeyWordHeader = styled.div`
  min-width: max-content;
  background-color: #eeeeee;
  color: #2a3039;
  font-weight: bold;
  font-size: 11px;
  padding: 3px 5px;
  margin-right: 10px;
  border-radius: 5px;
`;

const RecommendTopHeader = styled.p`
  font-size: 13px;
  color: #808080;
`;

const RecommendKeyWord = styled.p`
  font-size: 13px;
  color: #808080;
`;

export default Header;

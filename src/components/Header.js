import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Header = ({ setKeyWord }) => {
  const { param } = useParams();

  const [searchKeyWord, setsearchKeyWord] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    setKeyWord(searchKeyWord);
    setsearchKeyWord("");
  };

  const onHistoryClick = (item) => {
    setKeyWord(item);
    setsearchKeyWord("");
  };

  return (
    <Container>
      <Wrapper>
        <Box>
          <LogoBox>
            <img src={require("../images/Line.png")} alt="로고" />
          </LogoBox>
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
              />
            </form>
          </SearchBox>
        </Box>
      </Wrapper>
      <HistoryWrapper>
        <HistoryBox>
          <HistoryHeader>최근검색어</HistoryHeader>
          {JSON.parse(localStorage.getItem("searchHistory")) &&
            JSON.parse(localStorage.getItem("searchHistory")).map(
              (item, index) => (
                <History key={index} onClick={() => onHistoryClick(item)}>
                  {item}
                </History>
              )
            )}
        </HistoryBox>
      </HistoryWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background: linear-gradient(90.14deg, #0066ff 0.03%, #00a3ff 100%);
  box-shadow: 0px 4px 7px 0px #00000012;
  height: 60px;
  color: white;
  z-index: 300;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const HistoryWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 8px 0px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px -2px 12px 0px,
    rgba(0, 0, 0, 0.18) 0px -1px 5px 0px;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  height: 100%;
`;

const HistoryBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  height: 100%;
`;

const HistoryHeader = styled.div`
  color: #303237;
  font-weight: 600;
  margin-right: 30px;
  font-size: 20px;
`;

const History = styled.div`
  color: #868686;
  font-weight: 100;
  margin-right: 25px;
  cursor: pointer;
  font-size: 17px;

  &:hover {
    font-weight: 800;
    color: #303237;
  }
`;

const LogoBox = styled.div`
  cursor: pointer;

  img {
    width: 30px;
    height: 20px;
  }
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 250px;
    height: 36px;
    border: none;
    background: #ffffff;
    border-radius: 6px;
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

export default Header;

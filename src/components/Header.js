import styled from "styled-components";
import { useEffect, useState } from "react";

const Header = ({ setKeyWord, setSearchLoading }) => {
  const [searchKeyWord, setsearchKeyWord] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchLoading(true);
    setKeyWord(searchKeyWord);
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
    </Container>
  );
};

const Container = styled.div`
  top: 0;
  width: 100%;
  background: linear-gradient(90.14deg, #0066ff 0.03%, #00a3ff 100%);
  box-shadow: 0px 4px 7px 0px #00000012;
  height: 60px;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Box = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  height: 100%;
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

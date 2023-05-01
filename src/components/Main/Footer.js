import styled from "styled-components";
import { ReactComponent as GithubLogo } from "../../images/git.svg";
const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Box>
          <div>
            <a href="https://www.mfds.go.kr/index.do">
              <Logo src={require("../../images/MFDSLogo.jfif")} alt="" />
            </a>
            <Text>
              마이드러그인포는 식품의약품안전처의 공공데이터를 활용한
              서비스입니다
            </Text>
            <Text>© 2023 mydruginfo. All rights reserved.</Text>
          </div>
          <LogoBox>
            <a href="https://github.com/1201q/druginfo">
              <GithubLogo />
            </a>
          </LogoBox>
        </Box>
      </Wrapper>
    </Container>
  );
};

const Container = styled.footer`
  position: absolute;
  margin-top: 330px;
  left: 0;
  width: 100vw;
  height: 50px;
  background-color: white;
  border-top: 1px solid #e6e6e6;

  @media screen and (max-width: 768px) {
    margin-top: 100px;
  }
`;

const Wrapper = styled.div`
  padding-top: 30px;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding-bottom: 20px;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 0px 15px;
  }
`;

const Text = styled.p`
  color: #d0d0d0;
  margin-top: 3px;
  font-size: 14px;
  white-space: pre;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 5px;

  @media screen and (max-width: 768px) {
    width: 100px;
  }
`;

const LogoBox = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
`;

export default Footer;

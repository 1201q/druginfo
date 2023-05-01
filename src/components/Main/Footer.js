import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Logo src={require("../../images/MFDSLogo.jfif")} alt="" />{" "}
        <Text>마이드러그인포는 공공데이터를 활용한 서비스입니다</Text>
      </Wrapper>
    </Container>
  );
};

const Container = styled.footer`
  position: absolute;
  margin-top: 150px;
  left: 0;
  width: 100vw;
  height: 50px;
  background-color: white;
  border-top: 1px solid #e6e6e6;
`;

const Wrapper = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const Text = styled.p`
  color: #d0d0d0;
  margin-left: 30px;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 200px;

  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

export default Footer;

import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as X } from "../images/X.svg";

const Sidebar = () => {
  let arr = [
    "아고틴정25밀리그램",
    "콘서타OROS서방정밀리그램",
    "아고틴정25밀리그램",
    "콘서타OROS서방정밀리그램",
    "아고틴정25밀리그램",
    "콘서타OROS서방정밀리그램",
    "아고틴정25밀리그램",
    "콘서타OROS서방정밀리그램",
    "아고틴정25밀리그램",
    "콘서타OROS서방정밀리그램",
  ];
  return (
    <Container initial={{ scale: 0.4 }} animate={{ scale: 1 }}>
      <Wrapper>
        {arr.map((item, index) => (
          <PillComponent>
            <div>{item}</div>
            <PillRemoveBtn>
              <X width={12} height={12} fill="gray" />
            </PillRemoveBtn>
          </PillComponent>
        ))}

        <SearchBtn whileTap={{ scale: 0.9 }}>멀티검색</SearchBtn>
      </Wrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  max-width: 300px;
  margin-left: 40px;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  position: relative;
  min-height: 400px;
  height: max-content;
  background-color: white;
  padding: 20px;
  padding-top: 30px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.09);
  margin-bottom: 40px;
`;

// 컴포넌트
const PillComponent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: gray;
  font-size: 18px;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  text-overflow: inherit;

  &:hover {
    background-color: #eeeeee;
  }
`;

const PillRemoveBtn = styled.div`
  position: absolute;
  right: 0;
  margin-right: 5px;
`;

const SearchBtn = styled(motion.button)`
  top: 0;
  right: 0;
  left: 0;

  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin-top: 20px;
  font-size: 15px;
  cursor: pointer;
`;

export default Sidebar;

import { atom } from "recoil";

// fetch 데이터
export const detailDataState = atom({
  key: "detailData",
  default: [],
});

export const simpleDataState = atom({
  key: "simpleData",
  default: [],
});

export const otherDataState = atom({
  key: "otherData",
  default: [],
});

// 입력한 단어 검색하기 좋게 return
export const convertKeyword = (string) => {
  let myWord = string.replace("/s/g", "").toLowerCase();
  let remainString = myWord;

  const numberMatch = myWord.match(/\d+/);

  //숫자가 있으면
  if (numberMatch) {
    myWord = myWord.substring(0, numberMatch.index);
    remainString = remainString.substring(
      numberMatch.index,
      remainString.length
    );
  }

  myWord = myWord
    .replace("밀리그램", "")
    .replace("밀리그람", "")
    .replace("캅셀", "")
    .replace("캅쎌", "")
    .replace("캡슐", "");
  return [
    myWord.replace(/[^\uAC00-\uD7A3ㄱ-ㅎㅏ-ㅣ]/g, ""),
    remainString.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ\x20]/g, ""),
  ];
};

export const convertMg = (string) => {
  const startParenIndex = string.indexOf("(");
  const endParenIndex = string.indexOf(")", startParenIndex);

  string = string.replace(/\s+/g, "");

  if (startParenIndex !== -1 && endParenIndex !== -1) {
    string =
      string.substring(0, startParenIndex) +
      string.substring(endParenIndex + 1);
  }

  string = string.replace(/밀리그램/g, "mg");
  string = string.replace(/밀리그람/g, "mg");

  return string;
};

export const recommendKeyWord = (string) => {
  let myArr = [];
  myArr.push(string);
  return myArr;
};

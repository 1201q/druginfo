import axios from "axios";
import { useEffect, useState } from "react";

import SearchResult from "./Pages/SearchResult";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useRecoilState } from "recoil";
import {
  detailDataState,
  simpleDataState,
  otherDataState,
} from "./Context/Context";
import { useQueries } from "react-query";

import { convertKeyword } from "./Context/Context";

const SETTING = {
  LOCALHOST_URL1: process.env.REACT_APP_LOCALHOST_URL1,
  LOCALHOST_URL2: process.env.REACT_APP_LOCALHOST_URL2,
  LOCALHOST_URL3: process.env.REACT_APP_LOCALHOST_URL3,

  SERVER_URL1: process.env.REACT_APP_SERVER_URL1,
  SERVER_URL2: process.env.REACT_APP_SERVER_URL2,
  SERVER_URL3: process.env.REACT_APP_SERVER_URL3,
};

const APIURL = {
  URL1:
    window.location.hostname === "localhost"
      ? SETTING.LOCALHOST_URL1
      : SETTING.SERVER_URL1,
  URL2:
    window.location.hostname === "localhost"
      ? SETTING.LOCALHOST_URL2
      : SETTING.SERVER_URL2,
  URL3:
    window.location.hostname === "localhost"
      ? SETTING.LOCALHOST_URL3
      : SETTING.SERVER_URL3,
};

function App() {
  const [keyWord, setKeyWord] = useState(() => {
    if (
      !localStorage.getItem("recentSearchKeyWord") ||
      localStorage.getItem("recentSearchKeyWord") === "undefined"
    ) {
      return "탁센";
    } else {
      return localStorage.getItem("recentSearchKeyWord");
    }
  });
  const [prevKeyWord, setPrevKeyWord] = useState("");
  const [pillList, setPillList] = useState([]);

  // recoil
  const [detailDataArr, setDetailDataArr] = useRecoilState(detailDataState);
  const [simpleDataArr, setSimpleDataArr] = useRecoilState(simpleDataState);
  const [otherDataArr, setOtherDataArr] = useRecoilState(otherDataState);

  // useQuery
  const queries = useQueries([
    {
      queryKey: ["detail", keyWord],
      queryFn: () =>
        axios.get(APIURL.URL1, { params }).then((res) => res.data.body.items),
      enabled: Boolean(keyWord),
      staleTime: 300000, // 5분
    },
    {
      queryKey: ["simple", keyWord],
      queryFn: () =>
        axios.get(APIURL.URL2, { params }).then((res) => res.data.body.items),
      enabled: Boolean(keyWord),
      staleTime: 300000,
    },
    {
      queryKey: ["other", keyWord],
      queryFn: () =>
        axios
          .get(APIURL.URL3, {
            params: {
              type: "json",
              item_name: keyWord,
              numOfRows: 20,
            },
          })
          .then((res) => res.data.body.items),
      enabled: Boolean(keyWord),
      staleTime: 300000,
    },
  ]);

  const [detailArr, simpleArr, otherArr] = queries.map((query) => query.data);
  const [detailDataLoading, simpleDataLoading, otherDataLoading] = queries.map(
    (query) => query.isLoading
  );

  useEffect(() => {
    if (!detailDataLoading) {
      setDetailDataArr([]);
      setDetailDataArr(detailArr);
      if (detailArr.length > 0) {
        localStorage.setItem("recentSearchKeyWord", keyWord);
      }
      updateSearchHistory();
    }
  }, [detailArr]);

  useEffect(() => {
    if (!simpleDataLoading) {
      setSimpleDataArr([]);
      setSimpleDataArr(simpleArr);

      let list = [];
      simpleArr.map((item) => {
        list.push(item.ITEM_SEQ);
      });
      setPillList(list);
    }
  }, [simpleArr]);

  useEffect(() => {
    if (otherArr && pillList) {
      setOtherDataArr([]);
      let imageList = Array(pillList.length).fill(null);
      otherArr.map((item) => {
        if (pillList.indexOf(item.ITEM_SEQ) !== -1) {
          imageList[pillList.indexOf(item.ITEM_SEQ)] = item;
        }
      });
      setOtherDataArr(imageList);
    }
  }, [pillList, otherArr]);

  useEffect(() => {
    if (keyWord !== prevKeyWord) {
      setPrevKeyWord(keyWord);
    }
  }, [keyWord]);

  const params = {
    serviceKey: process.env.REACT_APP_DECODING_KEY,
    type: "json",
    item_name: keyWord,
  };

  const updateSearchHistory = () => {
    let historyArr = JSON.parse(localStorage.getItem("searchHistory"));

    if (historyArr === null) {
      //보통 이 사이트에 처음 접속했을 경우
      localStorage.setItem("searchHistory", "[]");
    } else {
      const maxLength = 9;
      //만약 로컬스토리지에 배열이 존재할 경우
      //[검사] arr에 내가 방금 검색한 키워드가 포함되어있지 않을경우에만 배열을 업데이트
      //[검사] 배열의 length가 10이 넘어가면 index 0을 삭제하고 push
      if (historyArr.indexOf(keyWord) === -1) {
        if (historyArr.length > maxLength) {
          historyArr.shift();
        }
        historyArr.push(keyWord);
        localStorage.setItem("searchHistory", JSON.stringify(historyArr));
      }
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header setKeyWord={setKeyWord} />
        <Routes>
          <Route
            path="/"
            element={
              <SearchResult
                keyWord={keyWord}
                setKeyWord={setKeyWord}
                searchLoading={simpleDataLoading}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import axios from "axios";
import { useEffect, useState } from "react";

import SearchResult from "./Pages/SearchResult";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailComponent from "./components/DetailComponent";
import { useRecoilState } from "recoil";
import {
  detailDataState,
  simpleDataState,
  otherDataState,
} from "./Context/Context";

function App() {
  const [keyWord, setKeyWord] = useState(() => {
    if (!localStorage.getItem("searchKeyWord")) {
      return "탁센";
    } else {
      return localStorage.getItem("searchKeyWord");
    }
  });
  const [prevKeyWord, setPrevKeyWord] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);

  // recoil
  const [detailDataArr, setDetailDataArr] = useRecoilState(detailDataState);
  const [simpleDataArr, setSimpleDataArr] = useRecoilState(simpleDataState);
  const [otherDataArr, setOtherDataArr] = useRecoilState(otherDataState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (keyWord !== prevKeyWord) {
      setDetailDataArr([]);
      setSimpleDataArr([]);
      setOtherDataArr([]);
      setPrevKeyWord(keyWord);
      setSearchLoading(true);
      getDrugDetailData();
      getDrugSimpleData();
    }
  }, [keyWord]);

  const params = {
    serviceKey: process.env.REACT_APP_DECODING_KEY,
    type: "json",
    item_name: keyWord,
  };

  const LOCALHOST_URL1 = process.env.REACT_APP_LOCALHOST_URL1;
  const LOCALHOST_URL2 = process.env.REACT_APP_LOCALHOST_URL2;
  const LOCALHOST_URL3 = process.env.REACT_APP_LOCALHOST_URL3;

  const SERVER_URL1 = process.env.REACT_APP_SERVER_URL1;
  const SERVER_URL2 = process.env.REACT_APP_SERVER_URL2;
  const SERVER_URL3 = process.env.REACT_APP_SERVER_URL3;

  const URL1 =
    window.location.hostname === "localhost" ? LOCALHOST_URL1 : SERVER_URL1;
  const URL2 =
    window.location.hostname === "localhost" ? LOCALHOST_URL2 : SERVER_URL2;
  const URL3 =
    window.location.hostname === "localhost" ? LOCALHOST_URL3 : SERVER_URL3;

  const getDrugDetailData = () => {
    axios
      .get(URL1, { params })
      .then((res) => {
        setDetailDataArr(res.data.body.items);

        if (res.data.body.items) {
          localStorage.setItem("searchKeyWord", keyWord);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDrugSimpleData = () => {
    axios
      .get(URL2, { params })
      .then((res) => {
        let list = [];

        setSimpleDataArr(res.data.body.items);
        setSearchLoading(false);

        res.data.body.items.map((item) => {
          list.push(item.ITEM_SEQ);
        });

        getDrugOtherData(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDrugOtherData = (list) => {
    let imageList = Array(list.length).fill(null);
    axios
      .get(URL3, {
        params: {
          type: "json",
          item_name: keyWord,
          numOfRows: 20,
        },
      })
      .then((res) => {
        res.data.body.items.map((item) => {
          if (list.indexOf(item.ITEM_SEQ) !== -1) {
            imageList[list.indexOf(item.ITEM_SEQ)] = item;
          }
        });
        setOtherDataArr(imageList);
      });
  };

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
    <div className="App">
      <BrowserRouter>
        <Header
          keyWord={keyWord}
          prevKeyWord={prevKeyWord}
          setKeyWord={setKeyWord}
          setSearchLoading={setSearchLoading}
          getDrugDetailData={getDrugDetailData}
          getDrugSimpleData={getDrugSimpleData}
        />
        <Routes>
          <Route
            path="/"
            element={<SearchResult searchLoading={searchLoading} />}
          ></Route>
          <Route path="/detail/:param" element={<DetailComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

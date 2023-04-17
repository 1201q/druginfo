import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
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
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [keyWord, setKeyWord] = useState("아토목");

  const [searchLoading, setSearchLoading] = useState(true);

  // recoil
  const [detailDataArr, setDetailDataArr] = useRecoilState(detailDataState);
  const [simpleDataArr, setSimpleDataArr] = useRecoilState(simpleDataState);
  const [otherDataArr, setOtherDataArr] = useRecoilState(otherDataState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setDetailDataArr([]);
    setSimpleDataArr([]);
    setOtherDataArr([]);
    getDrugDetailData();
    getDrugSimpleData();
  }, [keyWord]);

  const params = {
    serviceKey: process.env.REACT_APP_DECODING_KEY,
    type: "json",
    item_name: keyWord,
  };

  const getDrugDetailData = () => {
    axios
      .get(
        "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService04/getDrugPrdtPrmsnDtlInq03",
        { params }
      )
      .then((res) => {
        setDetailDataArr(res.data.body.items);
        console.log(res.data.body.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDrugSimpleData = () => {
    axios
      .get(
        "https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService04/getDrugPrdtPrmsnInq04",
        { params }
      )
      .then((res) => {
        let list = [];

        // console.log(res.data.body.items);

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
      .get(
        `/getMdcinGrnIdntfcInfoList01?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`,
        {
          params: {
            type: "json",
            item_name: keyWord,
            numOfRows: 20,
          },
        }
      )
      .then((res) => {
        res.data.body.items.map((item) => {
          if (list.indexOf(item.ITEM_SEQ) !== -1) {
            imageList[list.indexOf(item.ITEM_SEQ)] = item;
          }
        });

        // console.log(res.data.body.items);
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
        <Header setKeyWord={setKeyWord} setSearchLoading={setSearchLoading} />
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

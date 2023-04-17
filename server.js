const express = require("express");
const cheerio = require("cheerio");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/api/:searchTerm", async (req, res) => {
  const searchTerm = req.params.searchTerm;

  let apiUrl = `https://terms.naver.com/medicineSearch.naver?mode=nameSearch&query=${searchTerm}`;
  let test =
    "https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetailCache?cacheSeq=201804018aupdateTs2023-01-03%2018:24:18.156751b";
  let en = "https://openapi.naver.com/v1/search/encyc.json";

  const params = {
    query: searchTerm,
  };

  const headers = {
    "X-Naver-Client-Id": "gE24AQOP4zbj3kqVbuza",
    "X-Naver-Client-Secret": "PAbQyqtUkp",
  };

  try {
    const response = await axios.get(en, {
      params,
      headers,
      withCredentials: true,
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const srcLink = $("div.thumb_area img").attr("data-src");
    console.log(response.data);
    res.json(response.data.items[0].thumbnail);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

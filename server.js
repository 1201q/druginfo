const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());

app.get("/:param", async (req, res) => {
  try {
    console.log(req.params.param);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `이 약이 무슨 효능효과를 가지고 있는지에 대해 100글자 이내로 요약해줘.=> ${req.params.param}`,
      max_tokens: 120,
    });
    console.log(completion.data.choices[0]);
    res.send(completion.data.choices[0].text);
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("서버열림");
});

import axios from "axios";
import { useState } from "react";
import { atom } from "recoil";

//recoil
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

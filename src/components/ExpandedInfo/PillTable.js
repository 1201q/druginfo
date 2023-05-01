import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import {
  detailDataState,
  otherDataState,
  simpleDataState,
} from "../../Context/Context";

const PillTable = ({ pillColor, pillStyle, selectIndex }) => {
  const otherDataArr = useRecoilValue(otherDataState);
  return (
    <Table>
      <table>
        <tbody>
          <tr>
            <th>모양</th>
            <td colSpan={4}>
              <img src={pillStyle.shape} alt="" />
            </td>
          </tr>
          <tr>
            <th>색상</th>
            <td
              style={{
                width: "10%",
                backgroundColor: "rgba(0,128,255,0.1)",
              }}
            >
              앞
            </td>
            <td
              style={{
                width: "30%",
              }}
            >
              {otherDataArr[selectIndex].COLOR_CLASS1 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {otherDataArr[selectIndex].COLOR_CLASS1}

                  <div
                    style={{
                      width: "13px",
                      height: "13px",
                      borderRadius: "50%",
                      border: "1px solid gray",
                      marginLeft: "10px",

                      backgroundColor:
                        pillColor[otherDataArr[selectIndex].COLOR_CLASS1],
                    }}
                  ></div>
                </div>
              ) : (
                <div>없음</div>
              )}
            </td>
            <td
              style={{
                width: "10%",
                backgroundColor: "rgba(0,128,255,0.1)",
              }}
            >
              뒤
            </td>
            <td
              style={{
                width: "30%",
              }}
            >
              {otherDataArr[selectIndex].COLOR_CLASS2 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {otherDataArr[selectIndex].COLOR_CLASS2}
                  {"  "}
                  <div
                    style={{
                      width: "13px",
                      height: "13px",
                      borderRadius: "50%",
                      border: "1px solid gray",
                      marginLeft: "10px",
                      backgroundColor:
                        pillColor[otherDataArr[selectIndex].COLOR_CLASS2],
                    }}
                  ></div>
                </div>
              ) : (
                <div>없음</div>
              )}
            </td>
          </tr>
          <tr>
            <th>분할선</th>
            <td
              style={{
                width: "10%",
                backgroundColor: "rgba(0,128,255,0.1)",
              }}
            >
              앞
            </td>
            <td style={{ width: "30%" }}>
              {pillStyle.frontLine ? pillStyle.frontLine : "없음"}
            </td>
            <td
              style={{
                width: "10%",
                backgroundColor: "rgba(0,128,255,0.1)",
              }}
            >
              뒤
            </td>
            <td style={{ width: "30%" }}>
              {pillStyle.backLine ? pillStyle.backLine : "없음"}
            </td>
          </tr>
          <tr>
            <th>표시</th>
            <td
              style={{
                width: "10%",
                backgroundColor: "rgba(0,128,255,0.1)",
              }}
            >
              앞
            </td>
            <td style={{ width: "30%" }}>
              {pillStyle.frontSummary ? pillStyle.frontSummary : "없음"}
            </td>
            <td
              style={{
                width: "10%",
                backgroundColor: "rgba(0,128,255,0.1)",
              }}
            >
              뒤
            </td>
            <td style={{ width: "30%" }}>
              {pillStyle.backSummary ? pillStyle.backSummary : "없음"}
            </td>
          </tr>
          <tr>
            <th>마크</th>
            <td
              style={{
                width: "10%",
                backgroundColor: "rgba(0,128,255,0.1)",
              }}
            >
              앞
            </td>
            <td style={{ width: "30%" }}>
              {pillStyle.frontImg ? (
                <img src={pillStyle.frontImg} alt="" width={"40px"} />
              ) : (
                "없음"
              )}
            </td>
            <td
              style={{
                width: "10%",
                backgroundColor: "rgba(0,128,255,0.1)",
              }}
            >
              뒤
            </td>
            <td style={{ width: "30%" }}>
              {pillStyle.backImg ? (
                <img src={pillStyle.backImg} alt="" width={"40px"} />
              ) : (
                "없음"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </Table>
  );
};

const Table = styled.div`
  overflow: hidden;
  margin-top: 15px;

  table {
    width: 100%;
    border: 1px solid #d7dcdf;
    border-top: 2px solid rgba(0, 128, 255, 0.5);
    color: #333333;
    border-collapse: collapse;
  }
  th {
    width: 10%;
    text-align: center;
    padding-bottom: 10px;
    border: 1px solid #d7dcdf;
    background-color: #f8f7f6;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 500;
  }
  td {
    width: ${(props) => props.tdWidth};
    background-color: ${(props) => (props.mybg ? props.mybg : "#ffffff")};
    text-align: center;
    padding: 3px 10px;
    border: 1px solid #d7dcdf;
    font-size: 16px;
  }
`;

export default PillTable;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import BubbleChart from "@weknow/react-bubble-chart-d3";
// import CodeOffIcon from "@mui/icons-material/CodeOff";
import "../assets/css/styles.scss";
import uncodeImg from "../assets/img/uncode.png";
import codeImg from "../assets/img/code.png";
import shareImg from "../assets/img/share.png";
import axios from "axios";
import { serverURL } from "../config";
import { isEmpty } from "../utils";

const bubbleClick = (label) => {
  console.log("Custom bubble click func:", label);
};
const legendClick = (label) => {
  console.log("Customer legend click func:", label);
};
const tooltipFunc = () => {
  console.log("Customer tooltip click func");
};

var tooltipProps = [
  {
    css: "symbol",
    prop: "_id",
  },
  {
    css: "value",
    prop: "value",
    display: "Last Value",
  },
];
const Bubble = () => {
  const [selected, setSelected] = useState(1);
  const [pList, setPlist] = useState([]);
  const [nList, setNlist] = useState([]);
  const [itemList, setItemList] = useState([]);
  const pdata = [
    {
      label: "iMesh",
      value: 45.15,
      color: "black",
    },
    {
      label: "iMesh",
      value: 31.24,
      color: "black",
    },
  ];
  const ndata = [
    {
      label: "iMesh",
      value: 5,
      color: "black",
    },
    {
      label: "iMesh",
      value: 4,
      color: "black",
    },
  ];

  const handleClick = (index) => {
    repeatHandle(index)
    // setTimeout(() => {
    //   repeatHandle(index)
    // }, 400);
  };
  const repeatHandle = (index) => {
    setSelected(index);
    let temp_pList = [];
    let temp_nList = [];
    if (!isEmpty(itemList)) {
      itemList.forEach((item) => {
        if (selected === 1) {
          if (500 > item.change_30_days && item.change_30_days > 10) {
            temp_pList.push({
              label: item.category,
              value: Math.ceil(Number(item.change_30_days)) + 50,
              color: "black",
            });
          } else if (-500 <item.change_30_days && item.change_30_days < -10) {
            temp_nList.push({
              label: item.category,
              value: Math.ceil(Number(-item.change_30_days)) + 50,
              color: "black",
            });
          }
        } else if (selected === 2) {
          if (500 > item.change_90_days && item.change_90_days > 10) {
            temp_pList.push({
              label: item.category,
              value: Math.ceil(Number(item.change_90_days)) + 50,
              color: "black",
            });
          } else if (-500 < item.change_90_days && item.change_90_days < -10) {
            temp_nList.push({
              label: item.category,
              value: Math.ceil(Number(-item.change_90_days)) + 50,
              color: "black",
            });
          }
        } else if (selected === 3) {
          if (500 > item.change_180_days && item.change_180_days > 10) {
            temp_pList.push({
              label: item.category,
              value: Math.ceil(Number(item.change_180_days)) + 50,
              color: "black",
            });
          } else if (-500 < item.change_180_days && item.change_180_days < -10) {
            temp_nList.push({
              label: item.category,
              value: Math.ceil(-Number(item.change_180_days)) + 50,
              color: "black",
            });
          }
        }
      });
      console.log("temp_pList:", temp_pList);
      console.log("temp_nList:", temp_nList);
      setPlist(temp_pList);
      setNlist(temp_nList);
    }
  }
  const getBubbleData = () => {
    axios.post(serverURL + "/api/bubble/items")
      .then((res) => {
        const data = res.data;
        console.log("result:", data);
        if (data.status === 0) {
          setItemList(data.list);
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };
  useEffect(() => {
    getBubbleData();
  }, []);

  useEffect(() => {
    handleClick(selected);
  }, [itemList]);

  // pdata.sort((a, b) => a.value - b.value);
  // pdata.reverse();
  // ndata.sort((a, b) => a.value - b.value);
  // ndata.reverse();
  return (
    <>
      {pList.length > 0 && nList.length > 0 ? (
        <div className="App">
          <div className="headercontainer">
            <div className="headerleft">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <a
                className={`leftelement ${selected === 1 ? "selected" : ""}`}
                onClick={() => handleClick(1)}
              >
                3M
              </a>
              <div className="vertical-line"></div>
              <a
                className={`leftelement ${selected === 2 ? "selected" : ""}`}
                onClick={() => handleClick(2)}
              >
                6M
              </a>
              <div className="vertical-line"></div>
              <a
                className={`leftelement ${selected === 3 ? "selected" : ""}`}
                onClick={() => handleClick(3)}
              >
                12M
              </a>
            </div>
            <div className="headerright">
              <img src={uncodeImg} alt="" className="uncodeimg" />
              <div className="right-vertical-line"></div>
              <img src={shareImg} alt="" className="shareimg" />
            </div>
          </div>
          <div className="totalcontainer">
            <div className="positive-bubble">
              <BubbleChart
                graph={{
                  zoom: 0.9,
                  offsetX: 0.08,
                  offsetY: 0.05,
                }}
                valueFont={{
                  family: "Arial",
                  size: 20,
                  color: "#fff",
                  weight: "bold",
                }}
                labelFont={{
                  family: "Arial",
                  size: 20,
                  color: "#fff",
                  weight: "bold",
                }}
                width={2000}
                height={1600}
                padding={50}
                sortBubbles="descending"
                //Custom bubble/legend click functions such as searching using the label, redirecting to other page
                bubbleClickFunc={bubbleClick}
                legendClickFun={legendClick}
                data={pList}
              />
            </div>
            <div className="horizontal_linebody">
              <div className="text-container">
                <div className="horizontalname">by securezero.net</div>
              </div>
              <div className="custom-line"></div>
            </div>
            <div className="negative-bubble">
              <BubbleChart
                style={{ backgroundColor: "blue" }}
                graph={{
                  zoom: 0.9,
                  offsetX: 0.08,
                  offsetY: 0.05,
                }}
                valueFont={{
                  family: "Arial",
                  size: 20,
                  color: "#fff",
                  weight: "bold",
                }}
                labelFont={{
                  family: "Arial",
                  size: 20,
                  color: "#fff",
                  weight: "bold",
                }}
                width={2000}
                height={1600}
                padding={50}
                sortBubbles="ascending"
                bubbleClickFunc={bubbleClick}
                legendClickFun={legendClick}
                tooltip={true}
                tooltipProps={tooltipProps}
                tooltipFunc={tooltipFunc}
                data={nList}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Bubble;

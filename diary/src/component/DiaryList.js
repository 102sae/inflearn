import React, { useEffect, useState } from "react";
import "./DiaryList.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
const DiaryList = ({ data }) => {
  const [sortType, setSortType] = useState("latest");
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();

  const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
  ];

  const onHandleChange = (e) => {
    setSortType(e.target.value);
  };

  const onClickNew = () => {
    navigate("/new");
  };

  useEffect(() => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        //최신순 - 내림차순
        return Number(b.date) - Number(a.date);
      } else {
        //오래된 순 - 오름차순
        return Number(a.date) - Number(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(data)); //값은 같고 주소만 다른 새로운 배열
    copyList.sort(compare);
    setSortedData(copyList);
  }, [sortType, data]);

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select onChange={onHandleChange} value={sortType}>
            {sortOptionList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <Button
            text={"새 일기 작성"}
            type={"positive"}
            onClick={onClickNew}
          />
        </div>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item, index) => (
          <DiaryItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;

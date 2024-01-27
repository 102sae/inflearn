import React, { useContext, useEffect, useState } from "react";
import Header from "../component/Header";
import Button from "../component/Button";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate } from "../util";
import DiaryList from "../component/DiaryList";

const Home = () => {
  const [pivotDate, setPivotDate] = useState(new Date());
  const [filterdData, setFilterdData] = useState([]);
  const data = useContext(DiaryStateContext);

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const headerTitle = `${pivotDate.getFullYear()}년 ${
    pivotDate.getMonth() + 1
  }월`;

  useEffect(() => {
    if (data.length >= 1) {
      const { beginTimeStamp, endTImeStamp } = getMonthRangeByDate(pivotDate);
      setFilterdData(
        data.filter((item) => {
          return item.date >= beginTimeStamp && item.date <= endTImeStamp;
        })
      );
    }
  }, [data, pivotDate]);

  return (
    <div className="Home">
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={filterdData} />
    </div>
  );
};
export default Home;

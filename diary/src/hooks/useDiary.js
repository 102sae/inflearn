import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [diary, setDiary] = useState();

  useEffect(() => {
    const matchDiary = data.find((it) => String(it.id) === String(id));
    if (matchDiary) setDiary(matchDiary);
    else {
      alert("해당 일기가 없습니다.");
      navigate("/", { replace: true });
      //replace true로 뒤로가기 비활성화
    }
  }, [data, id]);

  return diary;
};

export default useDiary;

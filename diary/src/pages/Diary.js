import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import { getFormattedDate, setPagetitle } from "../util";
import Button from "../component/Button";
import Viewer from "../component/Viewer";
const Diary = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  useEffect(() => {
    setPagetitle(`${id}번 일기`);
  }, []);

  if (!data) {
    return <div>일기를 불러오는 중...</div>;
  } else {
    const { date, emotionId, content } = data;
    const title = `${getFormattedDate(new Date(Number(date)))}의 기록`;
    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text="< 뒤로가기" onClick={goBack} />}
          rightChild={<Button text="수정하기" onClick={goEdit} />}
        />
        <h2>{id}번 일기</h2>
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
};

export default Diary;

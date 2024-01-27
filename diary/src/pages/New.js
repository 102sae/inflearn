import React, { useContext, useEffect } from "react";
import Header from "../component/Header";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import Editor from "../component/Editor";
import { DiaryDispatchContext } from "../App";
import { setPagetitle } from "../util";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    const { date, content, emotionId } = data;
    const timestamp = new Date(date).getTime();
    console.log(timestamp);
    onCreate(timestamp, content, emotionId);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    setPagetitle("새 일기 쓰기");
  }, []);

  return (
    <div className="New">
      <Header
        title="새 일기 쓰기"
        leftChild={<Button text="< 뒤로가기" onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;

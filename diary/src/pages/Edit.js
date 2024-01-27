import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import { DiaryDispatchContext } from "../App";
import Editor from "../component/Editor";

const Edit = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const goBack = () => {
    navigate(-1);
  };
  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };

  const onSubmit = (data) => {
    if (window.confirm("수정하시겠습니까?")) {
      const { date, emotionId, content } = data;
      const timestamp = new Date(date).getTime();
      console.log(timestamp);
      onUpdate(id, timestamp, content, emotionId);
      navigate("/", { replace: true });
    }
  };
  if (!data) return <div>일기를 불러오는 중...</div>;
  else {
    return (
      <div className="Edit">
        <Header
          title="일기 수정하기"
          rightChild={
            <Button text="삭제하기" onClick={onClickDelete} type="negative" />
          }
          leftChild={<Button text="< 뒤로가기" onClick={goBack} />}
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    );
  }
};
export default Edit;

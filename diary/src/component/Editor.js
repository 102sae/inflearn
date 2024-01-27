import React, { useCallback, useEffect, useState } from "react";
import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./Editor.css";
import EmotionItem from "./EmotionItem";

const Editor = ({ initData, onSubmit }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: "",
  });

  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };

  const handleChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(state);
  };

  const handleOnGoBack = () => {
    navigate(-1);
  };
  //컴포넌트가 마운트 된 시점이후 다시 생성되지 않도록 useCallback으로 감싸준다.
  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
      ...state,
      emotionId,
    }));
  }, []);

  //작성중인 일기가 있을 경우
  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  }, [initData]);

  return (
    <div className="Editor">
      <div className="editor_section">
        {/**날짜 */}
        <h4>오늘의 날짜</h4>
        <div className="input_wrapper">
          <input type="date" value={state.date} onChange={handleChangeDate} />
        </div>
      </div>
      <div className="editor_section">
        {/**감정 */}
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((emotion) => (
            <EmotionItem
              key={emotion.id}
              {...emotion}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === emotion.id}
            />
          ))}
        </div>
      </div>
      <div className="editor_section">
        {/**일기 */}
        <h4>오늘의 일기</h4>
        <div className="input_wrapper">
          <textarea
            placeholder="오늘 있었던 일들을 적어보세요."
            value={state.content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className="bottom_section">
        {/**버튼 */}
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Editor;

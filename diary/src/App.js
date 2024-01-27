import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
import React, { useEffect, useReducer, useRef, useState } from "react";

const mockdata = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "오늘은 좋은 날이다.",
    emotionId: 2,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "오늘은 행복한 날이다.",
    emotionId: 1,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "오늘은 슬픈 날이다.",
    emotionId: 3,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE": {
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? { ...action.data } : item
      );
    }
    case "DELETE":
      return state.filters(
        (item) => String(item.id) !== String(action.data.id)
      );
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
<div className="App">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/new" element={<New />} />
    <Route path="/diary/:id" element={<Diary />} />
  </Routes>
</div>;
function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockdata,
    });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        date,
        content,
        emotionId,
      },
    });
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date,
        content,
        emotionId,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      data: {
        id: targetId,
      },
    });
  };

  return isDataLoaded ? (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  ) : (
    <div>로딩중...</div>
  );
}

export default App;

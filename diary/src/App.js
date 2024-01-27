import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
import React, { useEffect, useReducer, useRef, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE": {
      const newState = state.map((item) =>
        String(item.id) === String(action.data.id) ? { ...action.data } : item
      );
      localStorage.setItem("diary", JSON.stringify(newState));

      return newState;
    }
    case "DELETE": {
      const newState = state.filter(
        (item) => String(item.id) !== String(action.data.id)
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
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
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    //내림차순 정렬 후 id 부여, id 중복 방지
    localData.sort((a, b) => Number(b.date) - Number(a.date));
    idRef.current = localData[0].id + 1;

    dispatch({ type: "INIT", data: localData });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    console.log(date, content, emotionId);
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
            <Route path="/edit/:id" element={<Edit />} />
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

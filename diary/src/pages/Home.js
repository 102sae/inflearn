import React from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("sort"));
  return (
    <div>
      <Editor
        onSubmit={() => {
          alert("작성 완료!");
        }}
        initData={{
          data: new Date().getTime(),
          emotionId: 1,
          content: "작성중인 일기",
        }}
      />
    </div>
  );
};
export default Home;

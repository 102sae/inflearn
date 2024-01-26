import "./App.css";
import { getEmotionImgById } from "./util";
function App() {
  return (
    <div className="App">
      <img src={getEmotionImgById(1)} alt="emotion1" />
      <img src={getEmotionImgById(2)} alt="emotion2" />
      <img src={getEmotionImgById(3)} alt="emotion3" />
      <img src={getEmotionImgById(4)} alt="emotion4" />
      <img src={getEmotionImgById(5)} alt="emotion5" />
    </div>
  );
}

export default App;

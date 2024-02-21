const count = 20; //한번 새로운 item이 추가될 때마다 추가되는 item의 개수
let itemIndex = 0;

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const list = document.querySelector(".list");
      //타켓과  교차하는 영역이 있을 때
      if (entry.isIntersecting) {
        for (let i = itemIndex; i < itemIndex + count; i++) {
          //item을 count 숫자만큼 추가
          const item = document.createElement("p");
          item.classList.add("item");
          item.textContent = i;
          list.appendChild(item);
        }
        itemIndex += count;
      }
    });
  },
  { root: null, threshold: 0.5 }
);
//root가 null이면 뷰포트를 기준으로 교차하는 영역을 계산한다.
//threshold는 교차하는 영역의 비율을 나타낸다. 0.5는 50%를 의미한다.
//0.5이상이면 콜백실행

//list의 끝부분을 알려주는 p 타켓 요소를 관찰
observer.observe(document.querySelector(".end"));

// 스크롤 기능 함수
const handleScroll = (event: WheelEvent) => {
  event.preventDefault();
  const currentScrollPosition = window.scrollY;
  // 스크롤 당 이동 px 수
  const scrollThreshold = 700;

  // 설정된 스크롤 위치에서
  if (currentScrollPosition <= scrollThreshold) {
    // 마우스 휠을 아래로 스크롤할 때
    if (event.deltaY > 0) {
      window.scrollBy({
        // scrollThreshold 만큼 아래로 이동
        top: scrollThreshold,
        behavior: 'smooth', // 부드러운 스크롤
      });
    } else {
      // 마우스 휠을 위로 스크롤할 때
      window.scrollBy({
        // scrollThreshold 만큼 위로 이동
        top: -scrollThreshold,
        behavior: 'smooth',
      });
    }
    // 설정된 높이 아래로 내려갈 시
  } else if (currentScrollPosition > scrollThreshold) {
    // 위로 올릴 때 700px 위치로 이동
    if (event.deltaY <= 0) {
      window.scrollTo({
        top: 700,
        behavior: 'smooth',
      });
    }
  }
};

export default handleScroll;

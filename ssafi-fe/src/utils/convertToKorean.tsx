// 숫자를 한글로 바꿔주는 함수
function convertToKoreannum(num:string, word:string) {
  const number = parseInt(num.replace(/,/g, ''), 10);
  if (num === '' || number === 0) {
    return `${word} 금액을 입력해주세요.`;
  }
  const unitWords = ['', '만 ', '억 ', '조 ', '경 '];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = '원';

  for (let i = 0; i < splitCount;) {
    let unitResult = (number % (splitUnit ** (i + 1))) / (splitUnit ** i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
    i += 1;
  }

  for (let i = 0; i < resultArray.length;) {
    if (resultArray[i]) {
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    i += 1;
  }

  return resultString;
}

export default convertToKoreannum;

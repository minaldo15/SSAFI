import axios from 'axios';
// 실제투자
const apiToken = process.env.REACT_APP_PROD_TOKEN;
const apiKey = process.env.REACT_APP_PROD_APPKEY;
const apiSecret = process.env.REACT_APP_PROD_APPSECRET;
// 모의투자
// const vtsCano = process.env.REACT_APP_CANO;
// const vtsToken = process.env.REACT_APP_VTS_TOKEN;
// const vtsKey = process.env.REACT_APP_VTS_APPKEY;
// const vtsSecret = process.env.REACT_APP_VTS_APPSECRET;
const vtsCano = localStorage.getItem('cano') || '';
const vtsToken = localStorage.getItem('apiAccessToken') || '';
const vtsKey = localStorage.getItem('appKey') || '';
const vtsSecret = localStorage.getItem('secretKey') || '';

type FetchAccountResult = {
  refinedOutput: any[];
  AccountData: any;
};

function getCurrentTime() {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 0-based index
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0'); // 24-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return {
    formatted: `${month}.${day} ${hours}:${minutes}`,
    month,
    day,
    hours,
    minutes,
    seconds,
  };
}

export const fetchTradeVolumeRanking = async (callback: any) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiToken}`,
      appkey: apiKey,
      appsecret: apiSecret,
      tr_id: 'FHPST01710000',
    },
    params: {
      FID_COND_MRKT_DIV_CODE: 'J',
      FID_COND_SCR_DIV_CODE: '20171',
      FID_INPUT_ISCD: '0002',
      FID_DIV_CLS_CODE: '0',
      FID_BLNG_CLS_CODE: '0',
      FID_TRGT_CLS_CODE: '111111111',
      FID_TRGT_EXLS_CLS_CODE: '000000',
      FID_INPUT_PRICE_1: '0',
      FID_INPUT_PRICE_2: '0',
      FID_VOL_CNT: '0',
      FID_INPUT_DATE_1: '0',
    },
  };

  try {
    const currentTime = getCurrentTime();
    const response = await axios.get(
      '/uapi/domestic-stock/v1/quotations/volume-rank',
      config,
    );
    console.log(response.data);

    if (response.data.rt_cd === '0') {
      callback(currentTime); // 현재 시간을 callback 함수에 전달
      return response.data.output;
    } else {
      console.error('API Error:', response.data.msg1);
      callback(null); // 오류가 발생하면 null을 callback 함수에 전달
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    callback(null); // 오류가 발생하면 null을 callback 함수에 전달
    return [];
  }
};

// 종목코드를 가져오는 함수
export async function fetchStockCode() {
  const response = await fetch('/kospi200.txt');
  const text = await response.text();
  const lines = text.trim().split('\n'); // 빈 줄 제거 후 줄 단위로 나눔
  return lines.map((line) => {
    const [code, name] = line.split(','); // 쉼표로 나눈 후 첫 번째 항목은 종목코드, 두 번째 항목은 종목명
    return {
      stockCode: code.padStart(6, '0'), // 종목코드 앞에 '0'을 붙여 6자리로 만듦
      stockName: name,
    };
  });
}

export const fetchStockPrice = async (stockCode: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'FHKST01010100',
    },
    params: {
      fid_cond_mrkt_div_code: 'J',
      fid_input_iscd: stockCode,
    },
  };

  try {
    const response = await axios.get(
      '/uapi/domestic-stock/v1/quotations/inquire-price',
      config,
    );
    // console.log('현재가 조회', response);

    if (response.data.rt_cd === '0') {
      const output = response.data.output;
      // 필요한 두 개의 속성만 반환
      return {
        stck_prpr: output.stck_prpr,
        prdy_vrss_sign: output.prdy_vrss_sign,
      };
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};

export const fetchBuyStock = async (
  stockCode: string,
  division: string,
  amount: string,
  price: string,
) => {
  console.log(stockCode, division, amount, price);
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC0802U',
      // hashkey: vtsHash,
    },
  };
  const request = {
    CANO: vtsCano, // 계좌번호 앞 8자리
    ACNT_PRDT_CD: '01', // 계좌번호 뒤 2자리
    PDNO: stockCode, // 종목코드(6자리)
    ORD_DVSN: division, // 주문구분(00:지정가, 01:시장가)
    ORD_QTY: amount, // 주문수량
    ORD_UNPR: price, // 주문단가
  };
  try {
    const response = await axios.post(
      '/uapi/domestic-stock/v1/trading/order-cash',
      request,
      config,
    );
    console.log(response);

    if (response.data.rt_cd === '0') {
      return response.data.output;
      window.alert('매수 성공!');
    } else {
      console.error('API Error:', response.data.msg1);
      window.alert(`매수 실패, ${response.data.msg1}`);
      return [];
    }
  } catch (error: any) {
    console.error('Network Error:', error);
    console.error('Server Response:', error.response); // 서버 응답 로깅
    window.alert('매수 실패');
    return [];
  }
};

export const fetchSellStock = async (
  stockCode: string,
  division: string,
  amount: string,
  price: string,
) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC0801U',
      // hashkey: vtsHash,
    },
  };
  const request = {
    CANO: vtsCano, // 계좌번호 앞 8자리
    ACNT_PRDT_CD: '01', // 계좌번호 뒤 2자리
    PDNO: stockCode, // 종목코드(6자리)
    ORD_DVSN: division, // 주문구분(00:지정가, 01:시장가)
    ORD_QTY: amount, // 주문수량
    ORD_UNPR: price, // 주문단가
  };
  try {
    const response = await axios.post(
      '/uapi/domestic-stock/v1/trading/order-cash',
      request,
      config,
    );
    console.log(response);

    if (response.data.rt_cd === '0') {
      return response.data.output;
      window.alert('매도 성공!');
    } else {
      console.error('API Error:', response.data.msg1);
      window.alert(`매도 실패, ${response.data.msg1}`);
      return [];
    }
  } catch (error: any) {
    console.error('Network Error:', error);
    console.error('Server Response:', error.response); // 서버 응답 로깅
    window.alert('매도 실패');
    return [];
  }
};

export const fetchModifyStock = async (
  stockCode: string,
  division: string,
  amount: string,
  price: string,
) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC0803U',
      // hashkey: vtsHash,
    },
  };
  const request = {
    CANO: vtsCano, // 계좌번호 앞 8자리
    ACNT_PRDT_CD: '01', // 계좌번호 뒤 2자리
    KRX_FWDG_ORD_ORGNO: '00950', // 주문시 한국투자증권 시스템에서 지정된 영업점코드
    ORGN_ODNO: '6635', // 주식일별주문체결조회 API output1의 odno(주문번호) 값 입력
    ORD_DVSN: division, // 주문구분(00:지정가, 01:시장가)
    RVSE_CNCL_DVSN_CD: '01', // 정정취소구분(01:정정, 02:취소)
    ORD_QTY: amount, // 주문수량 [잔량전부 취소] "0" 설정
    ORD_UNPR: price, // 주문단가 [취소] "0" 설정
    QTY_ALL_ORD_YN: 'Y', // [정정/취소] Y : 잔량전부 N : 잔량일부
  };
  try {
    const response = await axios.post(
      '/uapi/domestic-stock/v1/trading/order-rvsecncl',
      request,
      config,
    );
    console.log(response);

    if (response.data.rt_cd === '0') {
      return response.data.output;
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error: any) {
    console.error('Network Error:', error);
    console.error('Server Response:', error.response); // 서버 응답 로깅
    return [];
  }
};

export const fetchCheckAccount = async (): Promise<
  FetchAccountResult | never[]
> => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC8434R',
    },
    params: {
      cano: vtsCano,
      acnt_prdt_cd: '01', // 계좌번호 뒤 2자리
      afhr_flpr_yn: 'N', // 기본값(or 시간외단일가) -> N만 사용
      ofl_yn: '', // 공란 Default
      inqr_dvsn: '01', // 조회구분(01: 대출일별, 02: 종목별)
      unpr_dvsn: '01', // 단기구분(01: 기본값)
      fund_sttl_icld_yn: 'N', // Default
      fncg_amt_auto_rdpt_yn: 'N', // Default
      prcs_dvsn: '01', // 전일매매(00: 포함, 01: 미포함)
      ctx_area_fk100: '', // 공란
      ctx_area_nk100: '', // 공란
    },
  };

  try {
    const response = await axios.get(
      '/uapi/domestic-stock/v1/trading/inquire-balance',
      config,
    );
    // console.log('balance 요청', response);

    if (response.data.rt_cd === '0') {
      const refinedOutput = response.data.output1.map((item: any) => {
        return {
          pdno: item.pdno, // 종목코드
          prdt_name: item.prdt_name, // 종목명
          hldg_qty: item.hldg_qty, // 보유수량
          pchs_avg_pric: item.pchs_avg_pric, // 매입평균가
          prpr: item.prpr, // 현재가
          evlu_amt: item.evlu_amt, // 평가금액
          evlu_pfls_amt: item.evlu_pfls_amt, // 손익금액
          evlu_pfls_rt: item.evlu_pfls_rt, // 손익률
        };
      });
      const AccountData = response.data.output2;
      return { refinedOutput, AccountData };
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};

export const fetchCheckOrder = async () => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTSC9115R',
    },
    params: {
      cano: vtsCano,
      acnt_prdt_cd: '01',
      inqr_strt_dt: '20230925',
      inqr_end_dt: '20231015',
      sll_buy_dvsn_cd: '00', // 매도매수구분
      inqr_dvsn: '00', // 조회구분
      pdno: '', // 종목번호 공란(전체)
      ccld_dvsn: '00', // 체결(전체) 01:체결, 02:미체결
      ord_gno_brno: '',
      odno: '',
      inqr_dvsn_3: '',
      inqr_dvsn_1: '',
      ctx_area_fk100: '',
      ctx_area_nk100: '',
    },
  };

  try {
    const response = await axios.get(
      '/uapi/domestic-stock/v1/trading/inquire-daily-ccld',
      config,
    );

    if (response.data.rt_cd === '0') {
      return response.data;
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};

export const fetchAskingPrice = async (stockCode: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'FHKST01010200',
    },
    params: {
      fid_cond_mrkt_div_code: 'J',
      fid_input_iscd: stockCode,
    },
  };

  try {
    const response = await axios.get(
      '/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn',
      config,
    );
    // console.log('매매호가 조회', response);
    if (response.data.rt_cd === '0') {
      const output = response.data.output1;
      return {
        askp1: output.askp1,
        askp2: output.askp2,
        askp3: output.askp3,
        askp_rsqn1: output.askp_rsqn1,
        askp_rsqn2: output.askp_rsqn2,
        askp_rsqn3: output.askp_rsqn3,
        bidp1: output.bidp1,
        bidp2: output.bidp2,
        bidp3: output.bidp3,
        bidp_rsqn1: output.bidp_rsqn1,
        bidp_rsqn2: output.bidp_rsqn2,
        bidp_rsqn3: output.bidp_rsqn3,
      };
    } else {
      console.error('API Error:', response.data.msg1);
      return null;
    }
  } catch (error) {
    console.error('Network Error:', error);
    return null;
  }
};

export const fetchStockInfo = async (stockCode: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'FHKST03010100',
    },
    params: {
      fid_cond_mrkt_div_code: 'J',
      fid_input_iscd: stockCode,
      fid_input_date_1: '20230101', // 시작일자
      fid_input_date_2: '20231231', // 종료일자
      fid_period_div_code: 'D', // 기간분류코드 (D:일봉, W:주봉, M:월봉, Y:년봉)
      fid_org_adj_prc: '1', // 수정주가 원주가 가격여부 (0:수정주가 1:원주가)
    },
  };

  try {
    const response = await axios.get(
      '/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice',
      config,
    );
    // console.log('주식정보', response);
    if (response.data.rt_cd === '0') {
      return response.data.output1;
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};

export const fetchMinutePrices = async (stockCode: string) => {
  const currentTime = getCurrentTime();
  const hoursMinutesSeconds = `${currentTime.hours}${currentTime.minutes}${currentTime.seconds}`;
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'FHKST03010200',
    },
    params: {
      fid_etc_cls_code: '',
      fid_cond_mrkt_div_code: 'J',
      fid_input_iscd: stockCode,
      fid_input_hour_1: hoursMinutesSeconds, // 현재시간
      fid_pw_data_incu_yn: 'Y',
    },
  };

  try {
    const response = await axios.get(
      '/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice',
      config,
    );
    // console.log('분봉조회', response);
    if (response.data.rt_cd === '0') {
      return response.data.output2;
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};

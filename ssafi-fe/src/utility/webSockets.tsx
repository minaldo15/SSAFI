import React, { useState, useEffect, useCallback } from 'react';

const WebSocketComponent = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [logs, setLogs] = useState([]);
  const [data, setData] = useState({});
  const [stockCode1, setStockCode1] = useState('');
  const [stockCode2, setStockCode2] = useState('');
  const [encryptKey, setEncryptKey] = useState('');
  const [iv, setIv] = useState('');

  // 로그 추가 함수
  // const addLog = useCallback((message, type) => {
  //   setLogs((prev) => [...prev, { message, type }]);
  // }, []);

  // useEffect(() => {
  //   const ws = new WebSocket('wss://your-websocket-url');
  //   setWebSocket(ws);

  //   ws.onopen = () => {
  //     addLog('Connected to the server', 'info');
  //   };

  //   ws.onmessage = (e) => {
  //     const recvdata = filterUnicode(e.data);
  //     addLog(`Received: ${recvdata}`, 'received');

  //     if (recvdata[0] === '0' || recvdata[0] === '1') {
  //       const strArray = recvdata.split('|');

  //       const trid = strArray[1];
  //       const bodydata = strArray[3];

  //       if (trid === 'H0STCNT0') {
  //         addLog(bodydata, 'data');
  //       }

  //       // 이후에는 데이터 처리 로직을 다룹니다.
  //       // 예를 들면, 상태를 변경하거나, 다른 컴포넌트로 데이터를 전달합니다.
  //       // ...
  //     } else {
  //       try {
  //         const obj = JSON.parse(recvdata);
  //         const trid = obj.header.tr_id;
  //         const encyn = obj.header.encrypt;

  //         // 여기서도 상태를 업데이트하거나, 필요한 로직을 구현합니다.
  //         // 예를 들면, 키와 IV를 상태에 저장합니다.
  //         if (trid === 'H0STCNI0' || trid === 'H0STCNI9') {
  //           setEncryptKey(obj.body.output.key);
  //           setIv(obj.body.output.iv);
  //         }
  //       } catch (error) {
  //         addLog(`Error: ${error.message}`, 'error');
  //       }
  //     }
  //   };

  //   ws.onclose = () => {
  //     addLog('Connection closed', 'info');
  //   };

  //   ws.onerror = (error) => {
  //     addLog(`WebSocket Error: ${error.message}`, 'error');
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, [addLog]);

  // return (
  //   <div>
  //     {/* 로그 출력 섹션 */}
  //     <div>
  //       {logs.map((log, index) => (
  //         <div key={index} className={log.type}>
  //           {log.message}
  //         </div>
  //       ))}
  //     </div>

  //     {/* 데이터 출력 섹션 */}
  //     <div>
  //       {Object.entries(data).map(([key, value]) => (
  //         <div key={key}>
  //           {key}: {value}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default WebSocketComponent;

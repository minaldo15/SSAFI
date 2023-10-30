import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import './StockTabs.css';

interface Stock {
  code: string;
  name: string;
  prdy_vrss_sign: number;
  stck_prpr: number;
}

interface StockEachProps {
  stock: Stock;
  clickedStar: Record<string, boolean>;
  toggleStar: (stock: Stock) => void;
  onStockClick: (stockCode: string) => void;
  toggleState: number;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Name = styled.div<{ width?: number }>`
  width: ${(props) => `${props.width}px`};
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
`;

const Price = styled.div<{ color: string }>`
  font-size: 15px;
  text-align: end;
  color: ${(props) => props.color};
  margin-left: 5px;
`;

const StockEach = ({ stock, clickedStar, toggleStar, onStockClick, toggleState }: StockEachProps) => {
  const nameRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);
  const [namewidth, setNameWidth] = useState(0);
  const [pricewidth, setPriceWidth] = useState(0);

  useEffect(() => {
    if (priceRef.current) {
      const price = priceRef.current.offsetWidth;
      setPriceWidth(price);
      setNameWidth(150 - price);
    }
  }, [stock.stck_prpr, toggleState]);

  return (
    <Container>
      <LeftContainer>
        <svg
          className={`star ${clickedStar[stock.code] ? 'filled' : ''}`}
          onClick={() => toggleStar(stock)}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
        >
          <path
            d="M10 2.60396L11.7217 6.74345L11.9563 7.30742L12.5651 7.35623L17.0341 7.7145L13.6292 10.6311L13.1653 11.0285L13.307 11.6226L14.3473 15.9835L10.5213 13.6466L10 13.3282L9.47875 13.6466L5.65272 15.9835L6.69296 11.6226L6.83468 11.0285L6.3708 10.6311L2.96595 7.7145L7.43488 7.35623L8.04372 7.30742L8.27829 6.74345L10 2.60396Z"
            stroke="var(--star-color)"
            stroke-width="1.5"
          />
        </svg>
        <Name ref={nameRef} width={namewidth} onClick={() => { onStockClick(stock.code); }}>
          {stock.name}
        </Name>
      </LeftContainer>
      <Price ref={priceRef}
        color={
          Number(stock.prdy_vrss_sign) === 5
            ? 'var(--lower-color)'
            : Number(stock.prdy_vrss_sign) === 2
            ? 'var(--upper-color)'
            : 'var(--black-color)'
        }
      >
        {Number.isNaN(Number(stock.stck_prpr))
          ? <div style={{ fontSize: '12px' }}>Loading...</div>
          : Number(stock.stck_prpr).toLocaleString()}
      </Price>
    </Container>
  );
};

export default StockEach;

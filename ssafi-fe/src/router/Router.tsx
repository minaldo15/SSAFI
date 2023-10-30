/* eslint-disable import/no-unresolved, import/extensions */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../main';
import Mbti from '../mbti';
import Kakao from '../components/Login/kakao';
import News from '../news';
import Trade from '../trade';
import NewsDetail from '../components/NewsDetails';
import Footer from '../components/Footer';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mbti" element={<Mbti />} />
        <Route path="/auth" element={<Kakao />} />
        <Route path="/news/*" element={<News />} />
        <Route path="/trade/*" element={<Trade />} />
        <Route path="/detail" element={<NewsDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

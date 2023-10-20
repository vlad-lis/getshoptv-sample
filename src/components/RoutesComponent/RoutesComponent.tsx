import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import PromoPage from '../../pages/PromoPage/PromoPage';

const RoutesComponent = (): ReactElement => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/promo' element={<PromoPage />} />
    </Routes>
  );
};

export default RoutesComponent;

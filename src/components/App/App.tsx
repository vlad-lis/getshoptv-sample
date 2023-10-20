import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from '../RoutesComponent/RoutesComponent';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
};

export default App;

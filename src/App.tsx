import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './components/RoutesComponent/RoutesComponent';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
};

export default App;

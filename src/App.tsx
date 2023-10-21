import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import applicationFormReducer from './store/applicationFormSlice';
import RoutesComponent from './components/RoutesComponent/RoutesComponent';

const store = configureStore({
  reducer: {
    applicationForm: applicationFormReducer,
  },
});

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <RoutesComponent />
      </Provider>
    </BrowserRouter>
  );
};

export default App;

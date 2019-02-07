import React from 'react';
import MainPage from '../MainPage/MainPage'
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <MainPage/>
    </ErrorBoundary>
  );
}

export default App;


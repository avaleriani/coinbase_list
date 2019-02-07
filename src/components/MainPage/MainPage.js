import React from 'react';
import List from "../List/List";
import Spinner from "../Spinner/Spinner";
import fetchJsonHook from "../hooks/useFetchAPI";
import './main-page.scss';

function MainPage() {
  const { data, isLoading, isError } = fetchJsonHook(
    `${ process.env.REACT_APP_API_BASE_URL }/products`
    , []
  );

  return (
    <div className="main-page">
      { isError && <div>There was an error while getting data from the API, please try again.</div> }
      { isLoading ? <Spinner/> : <List data={ data }/> }
    </div>
  );
}

export default MainPage;


import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import renderer from "react-test-renderer";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainPage/>, div);
  ReactDOM.unmountComponentAtNode(div);
});


test('Component matches snapshot', () => {
  const component = renderer.create(
    <MainPage/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
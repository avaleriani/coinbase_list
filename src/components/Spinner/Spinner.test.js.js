import React from "react";
import renderer from "react-test-renderer";
import Spinner from "../Spinner/Spinner";

test('Component matches snapshot', () => {
  const component = renderer.create(
    <Spinner/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
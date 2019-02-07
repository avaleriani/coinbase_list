import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<List />, div);
  ReactDOM.unmountComponentAtNode(div);
});
//
//
// it('can render and update a counter', () => {
//   // Test first render and effect
//   act(() => {
//     ReactDOM.render(<Counter />, container);
//   });
//   const button = container.querySelector('button');
//   const label = container.querySelector('p');
//   expect(label.textContent).toBe('You clicked 0 times');
//   expect(document.title).toBe('You clicked 0 times');
//
//   // Test second render and effect
//   act(() => {
//     button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
//   });
//   expect(label.textContent).toBe('You clicked 1 times');
//   expect(document.title).toBe('You clicked 1 times');
// });
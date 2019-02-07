import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';

const data =
  [{
    "id": "BCH-USD",
    "base_currency": "BCH",
    "quote_currency": "USD",
    "base_min_size": "0.01",
    "base_max_size": "350",
    "quote_increment": "0.01",
    "display_name": "BCH/USD",
    "status": "online",
    "margin_enabled": false,
    "status_message": null,
    "min_market_funds": "10",
    "max_market_funds": "1000000",
    "post_only": false,
    "limit_only": false,
    "cancel_only": false,
    "accessible": true
  }, {
    "id": "BCH-BTC",
    "base_currency": "BCH",
    "quote_currency": "BTC",
    "base_min_size": "0.01",
    "base_max_size": "200",
    "quote_increment": "0.00001",
    "display_name": "BCH/BTC",
    "status": "online",
    "margin_enabled": false,
    "status_message": null,
    "min_market_funds": "0.001",
    "max_market_funds": "30",
    "post_only": false,
    "limit_only": true,
    "cancel_only": false,
    "accessible": true
  }];

it('renders when empty', () => {
  const div = document.createElement('div');
  ReactDOM.render(<List/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Component matches snapshot', () => {
  const component = renderer.create(
    <List data={data}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});

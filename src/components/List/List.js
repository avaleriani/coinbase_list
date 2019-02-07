import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './list.scss';
import Spinner from "../Spinner/Spinner";

class List extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      allLoaded: false
    };
  }

  componentDidMount() {
    this.getStatsFromProducts(this.props.data);
  }

  //This function iterates over each product and call the api for getting the stats
  //every 300ms to not get the 429 too many request error. Then updates the state every
  //time a response is achieved.
  async getStatsFromProducts(products) {
    const originalContext = this;
    let genObj = genFunc();

    let interval = setInterval(() => {
      let generatorResult = genObj.next();

      if (generatorResult.value) {
        generatorResult.value.then(value => {
          originalContext.setState({
            items: [...originalContext.state.items, value]
          })
        });
      }

      if (generatorResult.done) {
        clearInterval(interval);
        originalContext.setState({ allLoaded: true });
      }
    }, 300);

    function* genFunc() {
      for(let item of products) {
        yield fetch(`${ process.env.REACT_APP_API_BASE_URL }/products/${ item.id }/stats`)
          .then(async(response) => {
            return {
              "id": item.id,
              "display_name": item.display_name,
              "status": item.status,
              "stats": await response.json()
            };
          });
      }
    }
  }

  displayStatus = (status) => {
    let statusClass = "offline";

    if (status === "online") {
      statusClass = "online";
    }

    return <div className={ `status status--${ statusClass }` }/>;
  };

  displayStats = (stats) => {
    let open, high, low, volume, last, volume_30day;
    if (stats) {
      ({ open, high, low, volume, last, volume_30day } = stats);
    }

    return (
      <Fragment>
        <td>{ open }</td>
        <td>{ high }</td>
        <td>{ low }</td>
        <td>{ volume }</td>
        <td>{ last }</td>
        <td>{ volume_30day }</td>
      </Fragment>
    )
  };


  render() {
    return (
      <Fragment>
        <table className="list">
          <thead>
          <tr>
            <th>Name</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Volume</th>
            <th>Last</th>
            <th>Volume 30 days</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          { this.state.items.map((item) => {
            return <tr key={ `row-${ item.id }` }>
              <td>{ item.display_name }</td>
              { this.displayStats(item.stats) }
              <td>{ this.displayStatus(item.status) }</td>
            </tr>
          })
          }
          </tbody>
        </table>
        <div className="spinner-container"> { this.state.allLoaded ? null : <Spinner/> }</div>
      </Fragment>
    );
  }
}

List.propTypes = {
  data: PropTypes.array
};

List.defaultProps = {
  data: []
};

export default List;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './list.scss';
import Spinner from "../Spinner/Spinner";

class List extends Component {
  constructor(props) {
    super();
    this.state = {
      items: props.data
    };
  }

  componentDidMount() {
    this.getStatsFromProducts(this.props.data).then((result) => {
      this.setState({ items: result });
    })
  }

  async getStatsFromProducts(products) {
    let genObj = genFunc();
    const productsStatsArr = [];

    return new Promise(function(resolve, reject) {
      try {
        let interval = setInterval(() => {
          let generatorResult = genObj.next();

          if (generatorResult.value) {
            generatorResult.value.then(value => {
              productsStatsArr.push(value);
            });
          }

          if (generatorResult.done) {
            clearInterval(interval);
            resolve(productsStatsArr);
          }
        }, 300);
      } catch(e) {
        reject(e);
      }
    });

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
        <td>{ open || open === 0 ? open : <Spinner/> }</td>
        <td>{ high || high === 0 ? high : <Spinner/> }</td>
        <td>{ low || low === 0 ? low : <Spinner/> }</td>
        <td>{ volume || volume === 0 ? volume : <Spinner/> }</td>
        <td>{ last || last === 0 ? last : <Spinner/> }</td>
        <td>{ volume_30day || volume_30day === 0 ? volume_30day : <Spinner/> }</td>
      </Fragment>
    )
  };


  render() {
    return (
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
          return <tr key={ `row${ item.id }` }>
            <td>{ item.display_name }</td>
            { this.displayStats(item.stats) }
            <td>{ this.displayStatus(item.status) }</td>
          </tr>
        })
        }
        </tbody>
      </table>
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

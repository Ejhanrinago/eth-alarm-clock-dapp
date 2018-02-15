import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { inject, observer } from 'mobx-react';

const INITIAL_STATE = {
  logs: []
};

@inject('timeNodeStore')
@observer
class TimeNodeLogs extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const logsArrayUpdated = (newLogsArray) => {
      this.setState({
        logs: newLogsArray
      });
    };

    this.props.timeNodeStore.startClient(logsArrayUpdated);
  }

  formatUnix(unix) {
    return moment.unix(unix).format('DD/MM/YYYY HH:MM:SS');
  }

  render() {
    return (
      <div id="timeNodeLogs">
        <div data-pages="card" className="card card-default">
          <div className="card-header">
            <div className="card-title">Logs</div>
            <div className="card-controls">
              <ul>
                <li>
                  <a data-toggle="refresh" className="card-refresh" href="#"><i className="card-icon card-icon-refresh"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-body">
            {this.state.logs.map(([ timestamp, message ], index) => {
              return (
                <p key={index} className="no-margin"><span>{this.formatUnix(timestamp)}</span> {message}</p>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

TimeNodeLogs.propTypes = {
  timeNodeStore: PropTypes.any
};

export default TimeNodeLogs;

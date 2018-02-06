import React, { Component } from 'react'
import SidePanel from '../SidePanel/SidePanel';
import SearchOverlay from '../Search/SearchOverlay';
import Header from '../Header/Header';
import { Route } from 'react-router-dom';
import { ScheduleRoute } from '../ScheduleWizard/ScheduleRoute';
import { TransactionsRoute } from '../TransactionsRoute/TransactionsRoute';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSearchOverlay: false
    };
    this.updateSearchState = this.updateSearchState.bind(this);
  }

  updateSearchState(enabled) {
    this.setState({ showSearchOverlay: enabled });
  }

  render() {
    let searchOverlayPlaceholder = null;
    if (this.state.showSearchOverlay) {
      searchOverlayPlaceholder = <SearchOverlay updateSearchState={this.updateSearchState}/>;
    }

    return (
      <div>
        <SidePanel />
        <div className="page-container">
          <Header updateSearchState={this.updateSearchState}/>
          <div className="page-content-wrapper">
            <div className="content sm-gutter">
              <Route exact path="/" component={ScheduleRoute}/>
              <Route path="/transactions" component={TransactionsRoute}/>
            </div>
          </div>
        </div>
        {searchOverlayPlaceholder}
      </div>
    );
  }
}

export default App

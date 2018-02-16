import React, { Component } from 'react'
import SidePanel from '../SidePanel/SidePanel';
import SearchOverlay from '../Search/SearchOverlay';
import Header from '../Header/Header';
import { Route, Switch } from 'react-router-dom';
import AwaitingMining from '../Common/AwaitingMining';
import TransactionsRoute from '../TransactionsRoute/TransactionsRoute';
import TimeNodeRoute from '../TimeNode/TimeNodeRoute';
import { ScheduleRoute } from '../ScheduleWizard/ScheduleRoute';
import URLNotFound from '../Common/URLNotFound';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSearchOverlay: false
    };
    this.updateSearchState = this.updateSearchState.bind(this);
    this.onEscKey = this.onEscKey.bind(this);
  }

  /*
    A function that enables or disables the overlay
    of the Search function.
  */
  updateSearchState(enabled) {
    this.setState({ showSearchOverlay: enabled });
  }

  /*
    Esc keypress listener. Used for:
    - Detecting when to close the search overlay
  */
  onEscKey(event){
    if(event.keyCode === 27) {
      if(this.state.showSearchOverlay) {
        this.updateSearchState(false);
      }
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onEscKey, false);
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
              <Switch>
                <Route exact path="/" component={ScheduleRoute}/>
                <Route path="/awaiting/:type/:hash" component={AwaitingMining}/>
                <Route path="/transactions" component={TransactionsRoute}/>
                <Route path="/timenode" component={TimeNodeRoute}/>
                <Route component={URLNotFound}/>
              </Switch>
            </div>
          </div>
        </div>
        {searchOverlayPlaceholder}
      </div>
    );
  }
}

export default App

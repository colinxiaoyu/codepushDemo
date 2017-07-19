/**
 * Created by hufeng on 1/20/16.
 */
import React from 'react';

import {ScrollView,RefreshControl} from 'react-native';
import {QMLoading} from 'qmkit';

const noop = () => {
};


/**
 * android swipe-refrehs-view
 */
export default class SwipeRefreshView extends React.Component{


  static defaultProps = {
      onScroll: noop,
      needInitLoading: false,
      onRefreshStart: noop

  };
  constructor(props){
    super(props);
    this.state = {
      isRefreshing: false
    };
    this._onRefresh =this._onRefresh.bind(this);
    this._endRefreshing =this._endRefreshing.bind(this);
    this.getScrollResponder =this.getScrollResponder.bind(this);
  }

  render() {
    if (this.props.needInitLoading) {
      return (<QMLoading/>);
    }

    return (

        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={this.props.contentContainerStyle}
          scrollEventThrottle={32}
          removeClippedSubviews={true}
          onScroll={this.props.onScroll}
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', 'orange', 'lightgreen']}
            progressBackgroundColor="#ffff00"
          />
        }
        >
          {this.props.children}
        </ScrollView>

    );
  }


  _onRefresh() {
    this.setState({
      isRefreshing: true
    }, () => {
      this.props.onRefreshStart(this._endRefreshing);
    });
  }


  _endRefreshing() {
    this.setState({
      isRefreshing: false
    });
  }

  getScrollResponder() {
    return this._swipeRefreshView.getScrollResponder();
  }
}




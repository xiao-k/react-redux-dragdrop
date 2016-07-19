import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import * as slimeActions from '../actions/slime';

import DragDropCircles from '../components/DragDropCircles';

class SlimeContainer extends Component {
  constructor(props) {
    super(props);

    this.dropAction = this.dropAction.bind(this);
  }

  componentWillMount() {
    this.props.slimeActionBind.setSlimeCircles();
  }

  dropAction( dropSlimeCircleData ){
    const { slimeActionBind } = this.props;
    slimeActionBind.droppedSlime( dropSlimeCircleData );
  }

  render() {
    const {
      dropCircle, dragCircles
    } = this.props;

    return (
        <div>
          <DragDropCircles
            dropCircle={dropCircle}
            dragCircles={dragCircles}
            dropAction={this.dropAction}
          />
        </div>
    );
  }
};

function mapStateToProps( state ){
  const { dropCircle, dragCircles } = state.rootReducer.slime;
  return {
    dropCircle,
    dragCircles
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    slimeActionBind: bindActionCreators(slimeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlimeContainer);
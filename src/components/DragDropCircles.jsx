import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from "react-dnd";

import DragSlimeCircle from './DragSlimeCircle';
import DropKingSlimeCircle from './DropKingSlimeCircle';

export default class DragDropCircles extends React.Component {
  render(){
    var { dropCircle, dragCircles, dropAction } = this.props;
    const itemType = "slimeCircle";
    return (
      <div>
        <DropKingSlimeCircle
          dropCircle={dropCircle}
          type={itemType}
        />

        { dragCircles.map( dragCircleData => {
            return (
                  <DragSlimeCircle
                    key={dragCircleData.id}
                    dragCircleData={dragCircleData}
                    dropAction={dropAction}
                    type={itemType}
                  />
            );
          })
        }
      </div>
    );
  }
}

DragDropCircles.propTypes = {
  dropCircle: PropTypes.shape({
    isMultiple: PropTypes.bool.isRequired,
    mainCircle: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top:  PropTypes.number.isRequired,
      r:    PropTypes.number.isRequired
    }).isRequired,
    childCircle: PropTypes.arrayOf(PropTypes.shape({
      left: PropTypes.number,
      top:  PropTypes.number,
      r:    PropTypes.number
    }))
  }).isRequired,
  dragCircles: PropTypes.arrayOf(PropTypes.shape({
    id:   PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top:  PropTypes.number.isRequired,
    r:    PropTypes.number.isRequired
  })).isRequired,
  dropAction: PropTypes.func.isRequired
}

export default DragDropContext( HTML5Backend )( DragDropCircles );
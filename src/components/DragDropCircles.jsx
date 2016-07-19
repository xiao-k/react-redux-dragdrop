import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from "react-dnd";

import DragSlimeCircle from './DragSlimeCircle';
import DropKingSlimeCircle from './DropKingSlimeCircle';

export default class DragDropCircles extends React.Component {
  render(){
    var { dropCircle, dragCircles, dropAction } = this.props;
    const itemType = "slimeCircle";

    var dropCircleStart = {};
    var dropCircleEnd = {};
    if( dropCircle.isKingSlime ){
      dropCircleStart = {
              top:  dropCircle.mainCircle.top,
              left: dropCircle.mainCircle.left };
      dropCircleEnd = {
              top:  spring( dropCircle.mainCircle.top  - 10, {stiffness: 320, damping: 5} ),
              left: spring( dropCircle.mainCircle.left - 10, {stiffness: 320, damping: 5} ) };
    }
    else {
      dropCircleStart = {
              top:  dropCircle.mainCircle.top,
              left: dropCircle.mainCircle.left };
      dropCircleEnd = {
              top:  dropCircle.mainCircle.top,
              left: dropCircle.mainCircle.left };
    }
    return (
      <div>
        <Motion
          key={"999"}
          defaultStyle={ dropCircleStart }
          style={ dropCircleEnd }
        >
          { ( motionMainTopLeft ) =>
            <DropKingSlimeCircle
              dropCircle={dropCircle}
              motionMainTopLeft={motionMainTopLeft}
              type={itemType}
            />
          }
        </Motion>

        { dragCircles.map( dragCircleData => {
            var startXY = { left: dropCircle.mainCircle.left, top: dropCircle.mainCircle.top },
                endXY   = { left: spring(dragCircleData.left, {stiffness: 320, damping: 9}),
                            top: spring(dragCircleData.top, {stiffness: 320, damping: 9}) };
            return (
              <Motion
                key={ dragCircleData.id }
                defaultStyle={ startXY }
                style={ endXY }
              >
                { ( value ) => (
                  <DragSlimeCircle
                    key={dragCircleData.id}
                    dropAction={dropAction}
                    dragCircleData={dragCircleData}
                    motionValue={value}
                    type={itemType}
                  />
                ) }
              </Motion>
            );
          } )
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
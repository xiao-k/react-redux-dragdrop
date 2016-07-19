import React, { PropTypes } from "react";
import { DropTarget } from "react-dnd";
import slimePng from '../images/slime.png';
import kingSlimePng from '../images/kingslime.png';

const styles = {
  svg: {
    width: "100%",
    height: "100%" }
}

export default class DropKingSlimeCircle extends React.Component {
  render(){
    var {
      dropCircle, motionMainTopLeft, connectDropTarget, hovered
    } = this.props;
    const mainDivStyle = {
      normal: {
          position: "absolute",
          borderRadius: "50%",
          backgroundColor: ( hovered ? "#ff0000" : "#aaaaaa" ),
          top:    dropCircle.mainCircle.top + "px",
          left:   dropCircle.mainCircle.left + "px",
          width:  ( dropCircle.mainCircle.r * 2 ) + "px",
          height: ( dropCircle.mainCircle.r * 2 ) + "px",
          textAlign: "center"
      },
      king: {
          position: "absolute",
          top:    motionMainTopLeft.top + "px",
          left:   motionMainTopLeft.left + "px",
          width:  ( dropCircle.mainCircle.r * 2 ) + "px",
          height: ( dropCircle.mainCircle.r * 2 ) + "px"
      }
    };

    if( dropCircle.isKingSlime ){
      return (
        <div
          style={mainDivStyle.king}
        >
          <img
            src={kingSlimePng}
            style={{width: "100%", height: "auto"}}
          />
        </div>
      );
    }
    else if( dropCircle.isMultiple ){
      return connectDropTarget(
        <div
          style={mainDivStyle.normal}
        >
          { dropCircle.childCircle.map( childCircleData => (
            <div
              key={childCircleData.id}
              style={{ position: "absolute",
                       top:  (childCircleData.y - childCircleData.r) + "px",
                       left: (childCircleData.x - childCircleData.r) + "px",
                       width:  ( childCircleData.r * 2 ) + "px",
                       height: ( childCircleData.r * 2 ) + "px" }}
            >
              <img src={slimePng} style={{width: "100%", height: "auto"}} />
            </div>
          ) ) }
        </div>
      );
    }
    else {
      return connectDropTarget(
        <div
          style={mainDivStyle.normal}
        >
          <span>{ dropCircle.mainCircle.name }</span>
        </div>
      );
    }
  }
}

DropKingSlimeCircle.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  dropCircle: PropTypes.shape({
    isMultiple: PropTypes.bool.isRequired,
    mainCircle: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top:  PropTypes.number.isRequired,
      r:    PropTypes.number.isRequired
    }).isRequired,
    childCircle: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      r: PropTypes.number.isRequired
    }))
  }).isRequired,
  motionMainTopLeft: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top:  PropTypes.number.isRequired,
  })
};

function collect(connect, monitor) {
  return {
    hovered: monitor.isOver(),
    connectDropTarget: connect.dropTarget()
  };
}

const dropSpec = {
  drop(props, monitor, component) {
    return { dropped: true };
  }
}

export default DropTarget(props => props.type, dropSpec, collect)(DropKingSlimeCircle);

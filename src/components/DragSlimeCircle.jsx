import React, { PropTypes } from "react";
import { DragSource } from "react-dnd";
import slimePng from '../images/slime.png';

export default class DragSlimeCircle extends React.Component {
  render(){
    var { dragCircleData, connectDragSource } = this.props;
    return connectDragSource(
      <div style={{
        position: "absolute",
        top:    dragCircleData.top,
        left:   dragCircleData.left,
        width:  ( dragCircleData.r * 2 ) + "px",
        height: ( dragCircleData.r * 2 ) + "px"
      }}>
        <img src={slimePng} style={{width: "100%", height: "auto"}} />
      </div>
    );
  }
}
DragSlimeCircle.propTypes = {
  connectDragSource: React.PropTypes.func.isRequired,
  dropAction : PropTypes.func.isRequired,
  dragCircleData: PropTypes.shape({
    id:   PropTypes.number.isRequired,
    r:    PropTypes.number.isRequired
  }).isRequired
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const dragSpec = {
  // dragが始まったときの処理
  beginDrag( props ) {
    // dragされ始めたら自分のidを返す
    const { dragCircleData } = props;
    return { dragCircleData };
  },

  // dragが終わったときの処置
  endDrag(props, monitor) {
    // beginDragで返されたidを取ってくる
    const source = monitor.getItem();
    // dropSpecのdropで返されたidを取ってくる
    const target = monitor.getDropResult();
    // dropActionを発火させる
    if (target) props.dropAction(source.dragCircleData);
  }
}

export default DragSource(props => props.type, dragSpec, collect)(DragSlimeCircle);

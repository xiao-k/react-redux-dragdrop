import d3 from 'd3';

export function setSlimeCircles(){
  const windowData = {
          innerWidth:  window.innerWidth,
          innerHeight: window.innerHeight };
  const MAIN_R = ( windowData.innerWidth > windowData.innerHeight ) ?
                  windowData.innerHeight / 7 : windowData.innerWidth / 7,
        MAIN_LEFT = windowData.innerWidth  * 3 / 6 - MAIN_R,
        MAIN_TOP  = windowData.innerHeight * 3 / 6 - MAIN_R,
        CHILD_R  = MAIN_R / 3,
        INTERVAL = 20;
  var dragCircles = [],
      dropCircleData   = {};
  var loopCnt = 0;

  // set slime circles (drag circles) data
  while( loopCnt <= 7 ){
    var tmpDragXY = returnDragXY(
                        loopCnt,
                        { left: MAIN_LEFT, top: MAIN_TOP, r: MAIN_R },
                        CHILD_R,
                        INTERVAL
                     );
    dragCircles.push({
      id:  loopCnt,
      left: tmpDragXY.left,
      top:  tmpDragXY.top,
      r:    CHILD_R
    });
    loopCnt++;
  }

  // set king slime circles (drop circles) data
  dropCircleData = {
    isMultiple: false,
    mainCircle: {
      left: MAIN_LEFT,
      top:  MAIN_TOP,
      r:    MAIN_R
    },
    childCircle: []
  };

  // dispatch
  return {
    type: 'SET_INIT_SLIME_CIRLES',
    dropCircleData,
    dragCircles
  };
}

function returnDragXY( index, mainCircleData, childR, interval ){
  var resultXY = {},
      squrt = returnSlant( mainCircleData.r, childR, interval ),
      distance =  mainCircleData.r + interval + childR,
      mainX = mainCircleData.left + mainCircleData.r,
      mainY = mainCircleData.top + mainCircleData.r;
  switch( index ){
    case 0:
      resultXY.left = mainX - squrt - childR;
      resultXY.top  = mainY - squrt - childR;
      break;
    case 1:
      resultXY.left = mainX - childR;
      resultXY.top  = mainY - distance - childR;
      break;
    case 2:
      resultXY.left = mainX + squrt - childR;
      resultXY.top  = mainY - squrt - childR;
      break;
    case 3:
      resultXY.left = mainX + distance - childR;
      resultXY.top  = mainY - childR;
      break;
    case 4:
      resultXY.left = mainX + squrt - childR;
      resultXY.top  = mainY + squrt - childR;
      break;
    case 5:
      resultXY.left = mainX - childR;
      resultXY.top  = mainY + ( distance ) - childR;
      break;
    case 6:
      resultXY.left = mainX - squrt - childR;
      resultXY.top  = mainY + squrt - childR;
      break;
    case 7:
      resultXY.left = mainX - ( distance ) - childR;
      resultXY.top  = mainY - childR;
      break;
    default:
      resultXY.left = 0;
      resultXY.top  = 0;
  }
  return resultXY;
}

function returnSlant( mainR, childR, interval ){
  return ( mainR + childR + interval ) / Math.sqrt(2);
}

function getD3PackCalculation( targetList, mainR ){
    var d3JsonChildren = [],
        pack, packCalculations, packLen,
        resultChildCircle = [];
    for (var i = targetList.length - 1; i >= 0; i--) {
      d3JsonChildren.push({
        id: targetList[i].id,
        name: targetList[i].name,
        count: 1
      });
    }
    pack = d3
            .layout.pack()
            .size([ ( mainR * 2 ), ( mainR * 2 )])
            .value(function(d) { return d.count; });
    packCalculations = pack.nodes( {
                        name:     "data",
                        children: d3JsonChildren
                       } );
    // set multiple main circle
    packLen = packCalculations.length;
    for(var i = 1; i < packLen; i++){
      resultChildCircle.push({
        id: i,
        x:  packCalculations[i].x,
        y:  packCalculations[i].y,
        r:  packCalculations[i].r
      });
    }

    return resultChildCircle;
}

export function droppedSlime( dropSlimeCircleData ){
  return ( dispatch, getState ) => {
    // calc linked circle
    var newDragCircles = getState().rootReducer.slime.dragCircles.concat();
    const len = newDragCircles.length;
    for( var i = 0; i < len; i++ ){
        if( newDragCircles[i].id === dropSlimeCircleData.id ){
            newDragCircles.splice(i, 1);
            break;
        }
    }
    // calc drop child circle
    var { dropCircle } = getState().rootReducer.slime,
        targetDropChildData = [];
    if( dropCircle.isMultiple ){
      targetDropChildData = dropCircle.childCircle.concat();
    }
    targetDropChildData.push( dropSlimeCircleData );

    return dispatch({
      type: 'DROPPED_CIRCLE',
      isKingSlime: ( targetDropChildData.length === 8 ),
      newDragCircles,
      newDropChildCircle: getD3PackCalculation(
                              targetDropChildData,
                              dropCircle.mainCircle.r
                          )
    });
  }
}

export default function slime(state = {
  dragCircles: [],
  dropCircle: {
    isKingSlime: false,
    isMultiple: false,
    mainCircle: {
      top: 0,
      left: 0,
      r: 0
    },
    childCircles: []
  }
}, action = {}) {
  switch (action.type) {
    case 'SET_INIT_SLIME_CIRLES':
      return Object.assign({}, state, {
        dropCircle:  action.dropCircleData
      });
    case 'ADD_SLIME_CIRLE':
      var addedDragCircles = state.dragCircles.concat();
      addedDragCircles.push(action.addDragCircle);
      return Object.assign({}, state, {
        dragCircles: addedDragCircles,
      });
    case 'DROPPED_CIRCLE':
      return Object.assign({}, state, {
        dragCircles: action.newDragCircles,
        dropCircle:  Object.assign(
                            {},
                            state.dropCircle,
                            { isMultiple: true,
                              isKingSlime: action.isKingSlime,
                              mainCircle:  state.dropCircle.mainCircle,
                              childCircle: action.newDropChildCircle } )
      });
    default:
      return state;
  }
}
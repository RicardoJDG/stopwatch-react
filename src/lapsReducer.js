const initialLapState = {
  isRunning: false,
  elapsedTime: 0,
  laps: [],
  totalLapsTime: 0,
  best: Number.POSITIVE_INFINITY,
  worst: Number.NEGATIVE_INFINITY,
};

const Actions = {
  RECORD_LAP: 'RECORD_LAP',
  RESET: 'RESET',
  TOGGLE_TIMER: 'TOGGLE_TIMER',
  UPDATE_TIMER: 'UPDATE_TIMER',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECORD_LAP':
      return {
        ...state,
        laps: [action.payload, ...state.laps],
        totalLapsTime: state.totalLapsTime + action.payload.lapTime,
        best: action.payload.lapTime < state.best ? action.payload.lapTime : state.best,
        worst: action.payload.lapTime > state.worst ? action.payload.lapTime : state.worst,
      };
    case 'RESET':
      return initialLapState;
    case 'TOGGLE_TIMER':
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        elapsedTime: action.payload.time,
      };
    default:
      return state;
  }
};

export { Actions, reducer, initialLapState };

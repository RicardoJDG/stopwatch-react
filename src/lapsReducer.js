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
    case 'RECORD_LAP': {
      const lapTime = state.elapsedTime - state.totalLapsTime;
      return {
        ...state,
        laps: [{ lapNumber: state.laps.length + 1, lapTime: lapTime }, ...state.laps],
        totalLapsTime: state.totalLapsTime + lapTime,
        best: lapTime < state.best ? lapTime : state.best,
        worst: lapTime > state.worst ? lapTime : state.worst,
      };
    }
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

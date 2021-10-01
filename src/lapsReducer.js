const initialLapState = {
  laps: [],
  totalLapsTime: 0,
  best: Number.POSITIVE_INFINITY,
  worst: Number.NEGATIVE_INFINITY,
};

const Actions = {
  RECORD_LAP: 'RECORD_LAP',
  RESET: 'RESET',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECORD_LAP':
      return {
        laps: [action.payload, ...state.laps],
        totalLapsTime: state.totalLapsTime + action.payload.lapTime,
        best: action.payload.lapTime < state.best ? action.payload.lapTime : state.best,
        worst: action.payload.lapTime > state.worst ? action.payload.lapTime : state.worst,
      };
    case 'RESET':
      return initialLapState;
    default:
      return state;
  }
};

export { Actions, reducer, initialLapState };

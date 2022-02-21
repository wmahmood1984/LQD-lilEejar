const initState = {
  sidebar: false,
};

const generalReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SIDEBAR":
      return { ...state, sidebar: payload };
    default:
      return state;
  }
};

export default generalReducer;

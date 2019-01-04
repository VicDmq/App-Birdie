const actionCreators = {
  updateDatas: datas => {
    return { type: "UpdateDatas", payload: datas };
  },
  updateDemographicDataType: demographicDataType => {
    return { type: "UpdateDemographicDataType", payload: demographicDataType };
  }
};

const initialState = {
  datas: [[]],
  demographicDataType: "Education"
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UpdateDatas": {
      return {
        ...state,
        datas: payload
      };
    }
    case "UpdateDemographicDataType": {
      return {
        ...state,
        demographicDataType: payload
      };
    }
  }

  return state;
};

module.exports = { actionCreators, reducer };

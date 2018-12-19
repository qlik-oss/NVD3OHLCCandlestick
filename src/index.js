import paint from './paint';

export default {
  initialProperties: {
    qHyperCubeDef: {
      qDimensions: [],
      qMeasures: [],
      qInitialDataFetch: [{
        qWidth: 7,
        qHeight: 1000
      }]
    }
  },
  definition: {
    type: "items",
    component: "accordion",
    items: {
      dimensions: {
        uses: "dimensions",
        min: 1,
        max: 1
      },
      measures: {
        uses: "measures",
        min: 4,
        max: 4
      },
      sorting: {
        uses: "sorting"
      },
      settings : {
        uses : "settings",
        items : {
          chartType: {
            ref: "chartType",
            type: "string",
            component: "dropdown",
            label: "Chart Type",
            options: [
              {
                value: "ohlc",
                label: "OHLC"
              }, {
                value: "candlestick",
                label: "Candlestick"
              }
            ],
            defaultValue: "ohlc"
          }
        }
      }
    }
  },
  snapshot: {
    canTakeSnapshot: true
  },
  paint: function ($element, layout) {
    try {
      paint($element, layout);
    } catch (exception) {
      console.error(exception); // eslint-disable-line no-console
      throw exception;
    }
  }
};

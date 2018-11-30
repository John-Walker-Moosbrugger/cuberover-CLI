import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    commands: {
      // commands autofill in order of this list
      forward: {
        name: "forward",
        variables: ["Distance", "Speed", "Acceleration", "Delay"]
      },
      reverse: {
        name: "reverse",
        variables: ["Distance", "Speed", "Acceleration", "Delay"]
      },
      left: {
        name: "left",
        variables: ["Angle", "Speed", "Acceleration", "Delay"]
      },
      right: {
        name: "right",
        variables: ["Angle", "Speed", "Acceleration", "Delay"]
      },
      lockwheels: {
        name: "lockwheels",
        variables: ["End", "Side"]
      },
      loadconfig: {
        name: "loadconfig",
        variables: ["Config", "Version"]
      }
    },
    history: [
      {
        Name: "left",
        Speed: "12",
        Delay: "12",
        Angle: "23",
        Acceleration: "1",
        Time: "12:15:15",
        Status: "complete"
      },
      {
        Name: "left",
        Speed: "12",
        Delay: "12",
        Angle: "23",
        Acceleration: "1",
        Time: "12:15:49",
        Status: "complete"
      }
    ],
    variables: {
      Angle: {
        default: "0",
        units: "deg"
      },
      Distance: {
        default: "0",
        units: "cm"
      },
      Speed: {
        default: "4",
        units: "cm/s"
      },
      Acceleration: {
        default: "1",
        units: ""
      },
      Delay: {
        default: "0",
        units: "s"
      },
      End: {
        default: "",
        units: ""
      },
      Side: {
        default: "",
        units: ""
      },
      Config: {
        default: "",
        units: ""
      },
      Version: {
        default: "",
        units: ""
      }
    }
  },
  mutations: {},
  actions: {}
});

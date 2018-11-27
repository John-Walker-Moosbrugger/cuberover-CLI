<template>
  <div class="hello">
    <h1>CubeRover CLI Demo</h1>
    <input 
      name="cli-input" 
      id="cli-input" 
      v-model="userInput"
      v-on:keydown.tab.prevent="tabPressed"
      v-on:keydown.enter.prevent="enterPressed"
      @input="keyPressed"
      ref="input"
      />
    <p class = "cliDisplay" v-if="increment === 0">
      <span class="cliDisplay__userInput">{{ userInput }}</span>
      <span class="cliDisplay__autoFill">{{ autofill }}</span>
    </p>
    <p class = "cliDisplay" v-if="increment > 0">
      <span class="cliDisplay__userInput">{{ command.name }} [ {{ preFocused }}</span>
      <span class="cliDisplay__focused">{{ focused }}</span>
      <span class="cliDisplay__userInput">{{postFocused}} ]</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function() {
    return {
      userInput: "",
      autofill: "",
      focused: "",
      preFocused: "",
      postFocused: "",
      increment: 0,
      command: {
        name: ""
      },
      commands: {
        // commands autofill in order of this list
        left: {
          name: "left",
          variables: ["Angle", "Speed", "Acceleration", "Delay"]
        },
        lockwheels: {
          name: "lockwheels",
          variables: ["End", "Side"]
        },
        loadconfig: {
          name: "loadconfig",
          variables: ["Name", "Version"]
        }
      },
      variables: {
        Angle: {
          default: "0",
          units: "&deg;"
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
        Name: {
          default: "",
          units: ""
        },
        Version: {
          default: "",
          units: ""
        }
      }
    };
  },
  methods: {
    tabPressed: function() {
      if (this.increment == 0) {
        for (let key in this.commands) {
          let cmdName = this.commands[key].name;
          if (cmdName.substring(0, this.userInput.length) === this.userInput) {
            this.fillCommand(cmdName);
          }
        }
      } else {
        this.fillVar();
      }
      this.increment++;
      this.autoFill();
      // Is this the end of the command?
      // reset increment
    },
    enterPressed: function() {
      console.log("submitted");
    },
    keyPressed: function() {
      this.autofill = "";
      if (this.increment === 0) {
        for (let key in this.commands) {
          let cmdName = this.commands[key].name;
          if (cmdName === this.userInput) {
            this.fillCommand(cmdName);
          }
        }
      }
      this.autoFill();
    },
    autoFill: function() {
      let cmdFill = "";
      let varFill = "";
      // autofill if we are typing command
      if (this.increment === 0) {
        for (let key in this.commands) {
          let cmdName = this.commands[key].name;
          if (cmdName.substring(0, this.userInput.length) === this.userInput) {
            cmdFill = cmdName.substring(this.userInput.length, cmdName.length);
            varFill = "[ " + this.commands[key].variables.toString() + " ]";
            varFill.replace(/,/gi, ", ");
            break;
          }
        }
        this.autofill = cmdFill + " " + varFill;
      } else {
        // autofill if we are typing variable
        var index = 0;
        this.preFocused = "";
        this.focused = "";
        this.postFocused = "";
        for (let variable of this.commands[this.command.name].variables) {
          index++;
          if (
            this.increment > this.commands[this.command.name].variables.length
          ) {
            this.increment = 1;
          }
          if (index < this.increment) {
            this.preFocused += variable + ", ";
          } else if (index == this.increment) {
            this.focused = variable;
          } else {
            this.postFocused += variable + ", ";
          }
        }
        // Removes trailing comma and space.
        this.postFocused = this.postFocused.slice(0, -2);
        index = 0;
      }
    },
    fillCommand: function(cmdName) {
      this.command.name = cmdName;
      this.userInput = "";
      this.increment++;
      // set command name to command
      // set user input to ""
      // increment ++
    },
    fillVar: function() {
      let variable = this.commands[this.command.name].variables[
        this.increment - 1
      ];
      if (this.userInput == "" && this.command[variable] == undefined) {
        this.command[variable] = this.variables[variable].default;
        console.log(this.command);
      } else {
        if (this.userInput != "") {
          this.command[variable] = this.userInput;
        }
        this.userInput = "";
        console.log(this.command);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#cli-input {
  width: 100%;
  resize: none;

  // &:focus {
  //   height: 0;
  //   margin: 0;
  //   padding: 0;
  //   border: none;
  // }
}

.cliDisplay {
  background-color: #d8d8dd;
  padding: 1rem;
  border-radius: 4px;
  text-align: left;

  &__userInput {
    color: #2d2d2d;
    font-weight: bold;
  }

  &__autoFill {
    color: #878787;
  }

  &__focused {
    background-color: #2d2d2d;
    border-radius: 4px;
    color: #f1f1f1;
    padding: 8px;
    padding-left: 6px;
    padding-right: 6px;
    margin-right: 4px;
  }
}
</style>

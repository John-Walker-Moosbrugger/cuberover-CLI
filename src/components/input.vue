<template>
  <div class="cli-input__container">
    <input 
      name="cli-input" 
      id="cli-input" 
      v-model="userInput"
      v-on:keydown.tab.prevent="tabPressed"
      v-on:keydown.enter.prevent="enterPressed"
      v-on:keydown.esc.prevent="escapePressed"
      @input="keyPressed"
      ref="input"
      spellcheck="false"
      type="text"
      />
    <p class = "cliDisplay" v-if="increment === 0">
      <span class="cliDisplay__userInput">>  {{ userInput }}</span>
      <span class="cliDisplay__autoFill">{{ autofill }}</span>
    </p>
    <p class = "cliDisplay" v-if="increment > 0">
      <span class="cliDisplay__userInput">>  {{ command.name }} [ {{ preFocused }}</span>
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
      history: [],
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
          variables: ["Name", "Version"]
        }
      },
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
            break;
          }
        }
      } else {
        this.fillVar();
        this.increment++;
      }
      this.autoFill();
      // Is this the end of the command?
      // reset increment
    },

    enterPressed: function() {
      if (this.command.name != "") {
        this.history.push(this.command);
        this.command = { name: "" };
        this.userInput = "";
        this.increment = 0;
      }
      console.log(this.history);
    },

    escapePressed: function() {
      this.command = { name: "" };
      this.userInput = "";
      this.increment = 0;
      this.autofill = "";
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
      if (this.increment === 0 && this.userInput != "") {
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
            this.preFocused += this.autoFillVar(variable) + ", ";
          } else if (index == this.increment) {
            this.focused = this.autoFillVar(variable, true);
          } else {
            this.postFocused += this.autoFillVar(variable) + ", ";
          }
        }
        // Removes trailing comma and space.
        this.postFocused = this.postFocused.slice(0, -2);
        index = 0;
      }
    },

    autoFillVar: function(variable, focused = "false") {
      if (focused == true && this.userInput != "") {
        return this.userInput + this.variables[variable].units;
      } else if (this.command[variable] != undefined) {
        return this.command[variable] + this.variables[variable].units;
      } else {
        return variable;
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
      } else {
        if (this.userInput != "") {
          this.command[variable] = this.userInput;
        }
        this.userInput = "";
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
  position: absolute;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  height: 100%;
  background-color: transparent;
  color: transparent;
  border: none;
  border-radius: 4px;
  transition: 0.15s ease;
  border-bottom: 4px solid #d8d8dd;

  &:focus {
    border: none;
    outline: none;
    border-bottom: 4px solid #67cc77;
  }
}
.cli-input__container {
  position: relative;
}
.cliDisplay {
  background-color: #d8d8dd;
  padding: 1rem;
  border-radius: 5px 5px 0px 0px;
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

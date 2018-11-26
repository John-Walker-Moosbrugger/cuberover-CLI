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
      <span class="cliDisplay__userInput">{{ command.name }} [ </span>
      <span class="cliDisplay__autoFill" v-for="(item, index) in commands[command.name].variables" v-bind:key="index">{{ item }}, </span>
      <span class="cliDisplay__userInput"> ]</span>
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
          variables: ["end", "side"]
        },
        loadconfig: {
          name: "loadconfig",
          variables: ["name", "version"]
        }
      }
    };
  },
  methods: {
    tabPressed: function() {
      // Is this a command or variable
      // If it is a command make sure command is complete or autofill it.
      // fillcommand()
      // if it is a variable
      // fill var()
      this.increment++;
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
      }
      this.autofill = cmdFill + " " + varFill;
    },
    fillCommand: function(cmdName) {
      this.command.name = cmdName;
      this.userInput = "";
      this.increment++;
      console.log(this.command);
      // set command name to command
      // set user input to ""
      // increment ++
    },
    fillVar: function() {
      // add command key and if there is no value autofull that
      // set user input to empty
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
}
</style>

<template>
  <div class="his-item">
    <div class="his__main">
      <div class="his__main--command">{{ command }}</div>
      <div class="his__main--time">{{time}}</div>
    </div>
    <div class="his__status">{{ item.status }}</div>
  </div>
</template>

<script>
export default {
  name: "cli-history",
  props: ["item"],
  data: function() {
    return {
      time: "12:15"
    };
  },
  computed: {
    command: function() {
      let variables = this.$store.state.commands[this.item.name].variables;
      let name = this.$store.state.commands[this.item.name].name;
      let title = name + " [ ";
      let tempVar = "";
      for (let variable of variables) {
        let lower = variable.toLowerCase();
        tempVar =
          this.item[lower] + this.$store.state.variables[variable].units;
        title += tempVar + ", ";
      }
      title = title.slice(0, -2) + " ]";
      return title;
    }
  }
};
</script>

<style lang="scss" scoped>
.his {
  &-item {
    color: #e5e5e5;
    text-align: left;
  }
  &__main {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    background: #424242;
    border-radius: 4px 4px 0px 0px;
    padding: 10px;
    padding-left: 40px;
  }
  &__status {
    padding-left: 40px;
    min-height: 4px;
    background: #67cc77;
    border-radius: 0px 0px 4px 4px;
  }
}
</style>

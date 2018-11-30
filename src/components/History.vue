<template>
  <div id="History">
    <div
      id="history-item"
      v-for="(item, key) in history"
      v-bind:key="key"
      v-bind:title="item.title"
    ></div>
  </div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      history: [
        {
          name: "left",
          speed: "12",
          delay: "12",
          angle: "23",
          acceleration: "1",
          status: "complete"
        },
        {
          name: "left",
          speed: "12",
          delay: "12",
          angle: "23",
          acceleration: "1",
          status: "complete"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#History {
  height: calc(100vh - 100px);
}
</style>

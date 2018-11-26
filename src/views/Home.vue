<template>
  <div class="home">
    <cli-input/>
  </div>
</template>

<script>
// @ is an alias to /src
import cliInput from "@/components/input.vue";

export default {
  name: "home",
  components: {
    "cli-input": cliInput
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 600px;
  margin: 0 auto;
  text-align: center;
  color: #878787;
}
</style>

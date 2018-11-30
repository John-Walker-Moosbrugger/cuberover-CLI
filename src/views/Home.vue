<template>
  <div class="home">
    <cli-history/>
    <cli-input/>
  </div>
</template>

<script>
// @ is an alias to /src
import cliInput from "@/components/input.vue";
import cliHistory from "@/components/History.vue";

export default {
  name: "home",
  components: {
    "cli-input": cliInput,
    "cli-history": cliHistory
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 0;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  color: #878787;
}
</style>

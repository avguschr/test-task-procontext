<template>
  <div>
    <div v-for="(list, index) in lists" :key="index">
      <list :list="list" />
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
export default {
  name: "left-panel",
  components: {
    List,
  },
  props: {
    lists: Array,
  },
};
</script>

<style lang="scss" scoped></style>

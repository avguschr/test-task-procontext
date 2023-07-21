<template>
  <div class="main">
    <left-panel :lists="getLists" />
    <right-panel :lists="getLists" />
  </div>
</template>

<script>
import { store } from "@/store";
import { mapActions, mapState } from "pinia";
import LeftPanel from "@/components/leftPanel/LeftPanel.vue";
import RightPanel from "@/components/rightPanel/RightPanel.vue";
export default {
  name: "home-view",
  components: {
    LeftPanel,
    RightPanel,
  },
  methods: {
    ...mapActions(store, ["sortListsAction"]),
  },
  computed: {
    ...mapState(store, ["getLists"]),
  },
  mounted() {
    this.sortListsAction();
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2%;
  margin: 5%;
  div {
    background: #f3e9f7;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>

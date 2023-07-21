<template>
  <div class="item">
    <div>
      <input
        @change="changeSelect"
        :checked="item.selected ? true : false"
        :id="item.title"
        type="checkbox"
      />
      <label :for="item.title">{{ item.title }}</label>
    </div>
    <div class="info">
      <input
        @change="changeCount"
        @keyup.enter="canEdit = false"
        v-if="canEdit"
        type="text"
        :value="item.count"
        min="0"
      />
      <p v-else>{{ item.count }}</p>
      <input
        @change="changeColor"
        @keyup.enter="canEdit = false"
        :value="item.color"
        v-if="canEdit"
        type="color"
      />
      <div v-else class="info__color" :style="{ background: item.color }"></div>
      <i @click="canEdit = !canEdit" class="fa-solid fa-pen"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { store } from "@/store";
export default {
  name: "item-component",
  props: {
    item: Object,
    listId: String,
  },
  data() {
    return {
      canEdit: false,
    };
  },
  methods: {
    ...mapActions(store, [
      "changeItemCountAction",
      "changeItemColorAction",
      "changeItemCheckedAction",
    ]),
    changeCount(e) {
      this.changeItemCountAction(this.listId, this.item.id, e.target.value);
    },
    changeColor(e) {
      this.changeItemColorAction(this.listId, this.item.id, e.target.value);
    },
    changeSelect(e) {
      this.changeItemCheckedAction(this.listId, this.item.id, e.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .info {
    display: flex;
    align-items: center;
    .info__color {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      margin-right: 10px;
      border-radius: 5px;
    }
    i {
      cursor: pointer;
    }
    input {
      &[type="color"] {
        margin-right: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>

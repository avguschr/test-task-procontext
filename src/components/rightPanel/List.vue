<template>
  <div class="list">
    <div
      class="list__title"
      :style="
        list.open ? { borderRadius: '10px 10px 0 0' } : { borderRadius: '10px' }
      "
    >
      <p>{{ list.title }}</p>
      <button @click="sorted = true" v-if="!sorted">Сортировать</button>
      <button @click="mixItems()" v-else>Перемешать</button>
    </div>
    <div v-if="list.open" class="list__items">
      <div v-if="sorted">
        <div v-for="(item, index) in list.items" :key="index">
          <div
            class="item__colorBlock"
            :style="{ background: item.color }"
            @click="removeItem(item.id)"
            v-for="index in item.count"
            :key="index"
          ></div>
        </div>
      </div>

      <div v-else>
        <div
          class="item__colorBlock"
          @click="removeItem(item.itemId)"
          :style="{ background: item.color }"
          v-for="(item, index) in mixedItems"
          :key="index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { store } from "@/store";
export default {
  name: "list-component",
  props: {
    list: Object,
  },
  data() {
    return {
      sorted: true,
      mixedItems: [],
    };
  },
  methods: {
    ...mapActions(store, ["mixItemsAction", "removeItemAction"]),
    mixItems() {
      this.sorted = false;
      this.mixedItems = this.mixItemsAction(this.list.id);
    },
    removeItem(id) {
      const index = this.mixedItems.findIndex((item) => item.id === id);
      this.mixedItems.splice(index, 1);
      this.removeItemAction(this.list.id, id);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  border: solid #fff 1px;
  border-radius: 10px;
  margin-bottom: 10px;
  .list__title {
    background: #fff;
    border-radius: 10px 10px 0 0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    button {
      background: #f3e9f7;
      padding: 5px 10px;
      border-radius: 10px;
      border: none;
      outline: inherit;
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        background: #e7c9f3;
      }
    }
  }

  .list__items {
    padding: 10px;
    .item__colorBlock {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-right: 5px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="list">
    <div class="list__title">
      <i
        @click="openList(list.id)"
        :class="
          list.open ? 'fa-solid fa-angle-down' : 'fa-solid fa-angle-right'
        "
      ></i>
      <input
        @change="changeSelect"
        :checked="list.selected ? true : false"
        :id="list.title"
        type="checkbox"
      />
      <label :for="list.title">{{ list.title }}</label>
    </div>
    <div v-if="list.open" class="items">
      <item
        :listId="list.id"
        :item="item"
        v-for="(item, index) in list.items"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { store } from "@/store";
import Item from "./Item.vue";
export default {
  name: "list-component",
  props: {
    list: Object,
  },
  components: {
    Item,
  },
  methods: {
    ...mapActions(store, ["openListAction", "changeListCheckedAction"]),
    openList(id) {
      this.openListAction(id);
    },
    changeSelect(e) {
      this.changeListCheckedAction(this.list.id, e.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  .list__title {
    cursor: pointer;
    margin-bottom: 10px;
    i {
      margin-right: 10px;
    }
    p {
      display: inline;
    }
  }

  .items {
    margin-left: 40px;

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
      }
    }
  }
}
</style>

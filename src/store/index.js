import { defineStore } from "pinia";
import { data } from "@/data/data";
import { v4 as uuidv4 } from "uuid";

export const store = defineStore("store", {
  state: () => ({
    lists: data.map((a) => {
      return { ...a };
    }),
  }),
  actions: {
    openListAction(id) {
      const index = this.lists.findIndex((list) => list.id === id);
      this.lists[index].open = !this.lists[index].open;
    },
    changeItemCountAction(listId, itemId, value) {
      if (+value >= 0) {
        const listIndex = this.lists.findIndex((list) => list.id === listId);
        const itemIndex = this.lists[listIndex].items.findIndex(
          (list) => list.id === itemId
        );
        this.lists[listIndex].items[itemIndex].count = +value;
      }
      this.sortListsAction();
    },
    changeItemColorAction(listId, itemId, value) {
      const listIndex = this.lists.findIndex((list) => list.id === listId);
      const itemIndex = this.lists[listIndex].items.findIndex(
        (list) => list.id === itemId
      );
      this.lists[listIndex].items[itemIndex].color = value;
    },
    changeItemCheckedAction(listId, itemId, value) {
      const listIndex = this.lists.findIndex((list) => list.id === listId);
      const itemIndex = this.lists[listIndex].items.findIndex(
        (list) => list.id === itemId
      );
      this.lists[listIndex].items[itemIndex].selected = value;
      if (!value) {
        this.lists[listIndex].selected = false;
      }
    },
    changeListCheckedAction(listId, value) {
      const listIndex = this.lists.findIndex((list) => list.id === listId);
      this.lists[listIndex].selected = value;
      if (value) {
        this.lists[listIndex].items.forEach((item) => {
          item.selected = true;
        });
      } else {
        this.lists[listIndex].items.forEach((item) => {
          item.selected = false;
        });
      }
    },

    sortListsAction() {
      this.lists.map((list) => list.items.sort((a, b) => a.count - b.count));
    },

    mixItemsAction(listId) {
      const listIndex = this.lists.findIndex((list) => list.id === listId);
      let newItemsList = [];
      this.lists[listIndex].items.forEach((item) => {
        for (let i = 0; i < item.count; i++) {
          newItemsList.push({
            id: uuidv4(),
            itemId: item.id,
            color: item.color,
          });
        }
      });
      newItemsList.sort(() => Math.random() - 0.5);
      return newItemsList;
    },
    removeItemAction(listId, itemId) {
      const listIndex = this.lists.findIndex((list) => list.id === listId);
      const itemIndex = this.lists[listIndex].items.findIndex(
        (list) => list.id === itemId
      );
      if (this.lists[listIndex].items[itemIndex].count > 0) {
        this.lists[listIndex].items[itemIndex].count--;
      }
    },
  },
  getters: {
    getLists: (state) => state.lists,
  },
});

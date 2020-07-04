<template>
  <div class="container">
    <Filters
      @change="setFilter($event, 'filter')"
      :items="sorting"
      :value="filter"
    />
    <Filters
      @change="setFilter($event, 'category')"
      :items="allcats"
      :value="category"
    />
    <div class="items">
      <Item v-for="item in ItemsPerPage.value" :key="item.id" :item="item" />
    </div>
    <div class="buttons">
      <button :disabled="page < 2" @click="changePage()">
        <=
      </button>
      {{ page }}
      <button
        :disabled="ItemsPerPage.count <= perPage * page"
        @click="changePage(true)"
      >
        =>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    perPage: 10,
    page: 1,
    filter: "sooner",
    category: "all"
  }),
  watchQuery(newQuery) {
    this.setQuery(newQuery);
  },
  computed: {
    ...mapState({
      items: "items",
      sorting: "sorting"
    }),
    ItemsPerPage() {
      const filtering = (items, filter) => {
        const sortItems = [...items];
        switch (filter) {
          case "sooner":
            return sortItems.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
          case "later":
            return sortItems.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );

          default:
            return sortItems;
        }
      };
      const category = (items, by) => {
        const catItems = [...items];
        return by === "all"
          ? catItems
          : catItems.filter(el => el.category.some(item => item === by));
      };
      const result = filtering(
        category(this.items, this.category),
        this.filter
      );
      return {
        count: result.length,
        value: result.slice(
          (this.page - 1) * this.perPage,
          this.perPage * this.page
        )
      };
    },
    allcats() {
      return [...["all"], ...new Set(this.items.flatMap(el => el.category))];
    }
  },
  mounted() {
    this.setQuery(this.$route.query);
    this.changeQuery();
  },
  methods: {
    setFilter(v, c) {
      this[c] = v;
      this.changeQuery();
    },
    changePage(page) {
      page ? this.page++ : this.page--;
      this.changeQuery();
    },
    changeQuery() {
      this.$router.push({
        path: this.$route.path,
        query: {
          filter: this.filter,
          category: this.category,
          page: parseInt(this.page)
        }
      });
    },
    setQuery(param) {
      if (param.filter && this.sorting.some(el => el === param.filter))
        this.filter = param.filter;
      if (param.category && this.allcats.some(el => el === param.category))
        this.category = param.category;
      if (
        parseInt(param.page) &&
        this.ItemsPerPage.count >= this.perPage * this.page
      )
        this.page = parseInt(param.page);
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 768px;
  padding: 50px;
}
.items {
  display: grid;
  margin: 0 auto;
}
.buttons {
  display: flex;
  margin: 2rem auto;
  align-items: center;
}
</style>

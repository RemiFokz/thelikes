<template>
  <div class="item">
    <h2>{{ item.header }}</h2>
    <h3>{{ item.text }}</h3>
    <ul class="cat">
      <li v-for="(c, ind) in item.category" :key="ind">{{ c }}</li>
    </ul>
    <button :disabled="loading" v-if="!item.like" @click="like(true)">
      &#9829;
    </button>
    <button :disabled="loading" v-else @click="like(false)">&#9825;</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    ...mapActions({
      API_LIKE: "API_LIKE"
    }),
    like(value) {
      this.loading = true;
      this.API_LIKE({ id: this.item.id, value }).finally(
        () => (this.loading = false)
      );
    }
  }
};
</script>
<style scoped>
.item {
  padding: 1rem;
  border: 1px solid black;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>

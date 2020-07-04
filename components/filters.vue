<template>
  <select @change="$emit('change', $event.target.value)">
    <option
      :selected="item === value"
      v-for="(item, ind) in items"
      :key="ind"
      >{{ item }}</option
    >
  </select>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      required: true
    }
  }
};
</script>

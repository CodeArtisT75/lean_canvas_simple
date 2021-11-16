<template>
  <li class="canvas-item">
    <b-card v-b-tooltip="'created by: ' +item.user.name" no-body>
      <b-card-body>
        <b-badge class="delete-btn" variant="danger" @click="deleteItem">&Cross;</b-badge>
        {{item.title}}
      </b-card-body>
    </b-card>
  </li>
</template>

<script>
  export default {
    name: "TaskItem",
    props: {
      item: '',
      delete: ''
    },
    methods: {
      deleteItem() {
        this.$emit('delete', this.item._id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .canvas-item {
    margin-bottom: 5px;

    .delete-btn {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
      user-select: none;
    }
  }
</style>

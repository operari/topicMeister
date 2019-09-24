<template lang="pug">
  button(@click.stop="$emit('click')" type="button" :class="[mix, 'add']")
</template>
<script>
  export default {
    props: ['mix'],
    data: () => ({
    }),
    methods: {
    }
  }
</script>
<style lang="scss">
  .add {
    &::before,
    &::after {
      position: absolute;
      top: calc(50% - 1px / 2);
      left: calc(50% - 9px / 2);
      width: 9px;
      height: 1px;
      content: '';
      background-color: white;
    }
    &::after {
      transform: rotate(90deg);
    }
    position: relative;
    width: 25px;
    height: 25px;
    padding: 0;
    border: 0;
    border-radius: 100%;
    background-color: #8b7edf;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  }
</style>
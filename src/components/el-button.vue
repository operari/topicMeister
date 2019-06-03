<template lang="pug">
  button(@click="$emit('click')" :class="[mix, 'button']" type="button") {{ title }}
</template>
<script>
  export default {
    props: ['mix', 'title'],
    data: () => ({
    }),
    methods: {
    }
  }
</script>
<style lang="scss">
  .button {
    font-size: 13px;
    line-height: 15px;
    font-weight: 500;
    display: inline-block;
    padding: 11px 8px;
    margin: 0 4px;
    text-align: center;
    text-transform: uppercase;
    color: #8B7EDF;
    border: 0;
    background-color: transparent;
  }
</style>
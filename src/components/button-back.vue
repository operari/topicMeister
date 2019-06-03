<template lang="pug">
  button(@click="$emit('click')" type="button" class="button-back svg-icon svg-icon--arrow-left svg-icon--small")
</template>
<script>
  export default {
    props: [],
    data: () => ({
    }),
    methods: {
    }
  }
</script>
<style lang="scss">
  .button-back {
    display: inline-block;
    margin-right: 4px;
  }
</style>
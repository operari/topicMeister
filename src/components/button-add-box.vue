<template lang="pug">
  button(@click="$emit('click')" type="button" :class="[mix, 'svg-icon svg-icon--add-box svg-icon--small']")
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
</style>
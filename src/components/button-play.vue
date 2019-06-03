<template lang="pug">
  button(@click="$emit('click')" type="button" :class="[mix, 'svg-icon svg-icon--small svg-icon--play']")
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
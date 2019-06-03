<template lang="pug">
  button(@click.stop="$emit('click')" type="button" :class="[mix, 'svg-icon svg-icon--more']")
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
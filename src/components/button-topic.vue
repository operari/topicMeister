<template lang="pug">
  button(
    @click="$emit('click-concept')"
    class="topics__topic"
    type="button")
    span {{ title }}
    span(
      v-show="!isRemoveTopics"
      class="svg-icon svg-icon--arrow"
    )
    span(
      @click.stop="$emit('click-remove')"
      v-show="isRemoveTopics"
      class="svg-icon svg-icon--remove svg-icon--small"
    )
</template>
<script>
  export default {
    props: ['title', 'isRemoveTopics'],
    data: () => ({
    }),
    methods: {
    }
  }
</script>
<style lang="scss">
</style>
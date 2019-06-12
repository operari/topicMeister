<template lang="pug">
  textarea(
    v-on:input="$emit('input', $event.target.value)"
    v-on:keyup.ctrl.enter="$emit('keyup-ctrl-enter')"
    :value="value"
    :class="mix"
  )
</template>
<script>
  export default {
    props: ['value', 'mix'],
    data: () => ({
    }),
    methods: {
    }
  }
</script>
<style lang="scss">
</style>
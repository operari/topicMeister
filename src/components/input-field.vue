<template lang="pug">
  input(
    v-on:keyup.enter="$emit('keyup-enter')"
    v-on:input="$emit('input', $event.target.value)"
    :value="value"
    :class="mix"
    ref="input"
  )
</template>
<script>
  export default {
    props: ['value', 'mix'],
    data: () => ({
    }),
    methods: {
      focus () {
        this.$refs.input.focus()
      }
    }
  }
</script>
<style lang="scss">
</style>
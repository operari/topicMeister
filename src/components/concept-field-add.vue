<template lang="pug">
  div(class="concepts__concept concepts__concept--add")
    .concepts__title
      input-field(
        v-on:input="$emit('input-title', $event)"
        :value="newConcept.title"
        :mix="'concepts__input'"
        ref="input"
      )
    .concepts__content
      textarea-field(
        v-on:input="$emit('input-content', $event)"
        :value="newConcept.content"
        :mix="'concepts__textarea'"
      )
    button-add-box(
      @click="$emit('click')"
      :mix="'concepts__apply'"
    )
</template>
<script>
  import buttonAddBox from './button-add-box'
  import inputField from './input-field'
  import textareaField from './textarea'

  export default {
    props: ['newConcept'],
    data: () => ({
    }),
    components: {
      buttonAddBox,
      inputField,
      textareaField
    },
    methods: {
      focus () {
        this.$refs.input.focus()
      }
    }
  }
</script>
<style lang="scss">
  .concepts {
    &__concept.concepts__concept {
      &--add {
        min-height: 88px;
        height: auto;
      }
    }
    &__input {
      width: 100%;
      color: #4A4646;
      border: 0;
    }
    &__textarea {
      min-width: 260px;
      max-width: 260px;
      height: 100%;
      color: #1C1C1C;
      border: 0;
    }
  }
</style>
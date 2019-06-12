<template lang="pug">
  div(class="concepts__concept concepts__concept--add")
    .concepts__title
      input-field(
        v-model="newConceptTitle"
        :mix="'concepts__input'"
        ref="input"
      )
    .concepts__content
      textarea-field(
        v-model="newConceptContent"
        :mix="'concepts__textarea'"
      )
    button-act(
      @click="pushConcept()"
      :mix="'concepts__apply'"
      :modifier="'add-box'"
      :isSmall="true"
    )
</template>
<script>
  import buttonAct from './button-act'
  import inputField from './input-field'
  import textareaField from './textarea'

  export default {
    props: [],
    data: () => ({
    }),
    components: {
      buttonAct,
      inputField,
      textareaField
    },
    computed: {
      newConceptTitle: {
        get () {
          return this.$store.getters.newConcept.title
        },
        set (value) {
          this.$store.commit('updateNewConceptTitle', value)
        }
      },
      newConceptContent: {
        get () {
          return this.$store.getters.newConcept.content
        },
        set (value) {
          this.$store.commit('updateNewConceptContent', value)
        }
      }
    },
    methods: {
      focus () {
        this.$refs.input.focus()
      },
      pushConcept () {
        this.$store.commit({
          type: 'pushDropdown',
          ref: 'ddConcept',
          actions: {
            'change-concept': ['Change concept', 'Cancel'],
            'remove-concept': ['Remove concept', 'Cancel']
          }
        })
        const pickedConcept = this.$store.getters.concepts[this.$store.getters.pickedTopic.name]
        this.$store.commit('pushConcept', pickedConcept)
        this.$store.commit('restoreNewConcept')
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
      .concepts__concept--change & {
        min-height: 100px;
      }
    }
  }
</style>
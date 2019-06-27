<template lang="pug">
  div(:class="[{ 'concepts__concept--full': toggleConcept }, { 'concepts__concept--change' : isChangeConcept }, 'concepts__concept']")
    .concepts__controls
      button-act(
        :mix="'concepts__control'"
        :modifier="'play'"
        :isSmall="true"
      )
      button-act(
        v-show="false"
        :mix="'concepts__control'"
        :modifier="'stop'"
        :isSmall="true"
      )
      button-act(
        :mix="'concepts__control concepts__count'"
        :modifier="'eye'"
        :isSmall="true"
      )
      dropdown(
        v-on:change-concept="changeConcept()"
        v-on:remove-concept="removeConcept()"
        :mix="'dropdown--concept'"
        :mixMore="'concepts__control svg-icon--small'"
        :reference="'ddConcept'"
        :id="concept.id"
      )
    div(v-if="!isChangeConcept" class="concepts__title") {{ concept.title }}
    div(v-else class="concepts__title")
      input-field(
        v-on:keyup-ctrl-enter="updateConcept()"
        v-model="titleChange"
        :mix="'concepts__input'"
        ref="input"
      )
    div(v-if="!isChangeConcept" class="concepts__content") {{ concept.content }}
    div(v-else class="concepts__content")
      textarea-field(
        v-on:keyup-ctrl-enter="updateConcept()"
        v-model="contentChange"
        :mix="'concepts__textarea'"
      )
    div(v-if="!isChangeConcept")
      button-act(
        v-show="!toggleConcept"
        v-on:click="toggle()"
        :modifier="'full'"
        :mix="'concepts__full'")
      button-act(
        v-show="toggleConcept"
        v-on:click="toggle()"
        :modifier="'full-exit'"
        :mix="'concepts__full'"
      )
    div(v-else)
      button-act(
        @click="updateConcept()"
        :mix="'concepts__done'"
        :modifier="'done'"
        :isSmall="true"
      )
</template>
<script>
  import buttonAct from './button-act'
  import dropdown from './dropdown'
  import inputField from './input-field'
  import textareaField from './textarea'

  export default {
    props: ['concept'],
    data: () => ({
      toggleConcept: false,
      isChangeConcept: false
    }),
    components: {
      buttonAct,
      dropdown,
      inputField,
      textareaField
    },
    computed: {
      titleChange: {
        get () {
          return this.concept.titleChange
        },
        set (value) {
          this.$store.commit({
            type: 'updateConceptTitleChange',
            value: value,
            id: this.concept.id
          })
        }
      },
      contentChange: {
        get () {
          return this.concept.contentChange
        },
        set (value) {
          this.$store.commit({
            type: 'updateConceptContentChange',
            value: value,
            id: this.concept.id
          })
        }
      }
    },
    beforeCreate () {
      this.$store.commit({
        type: 'pushDropdown',
        ref: 'ddConcept',
        actions: {
          'change-concept': ['Change concept', 'Cancel'],
          'remove-concept': ['Remove concept', 'Cancel']
        }
      })
    },
    methods: {
      toggle () {
        this.toggleConcept = !this.toggleConcept
      },
      focus () {
        this.$refs.input.focus()
      },
      changeConcept () {
        this.isChangeConcept = !this.isChangeConcept
        if (this.isChangeConcept) {
          this.$nextTick(() => {
            this.focus()
          })
        }
      },
      updateConcept () {
        this.$store.commit({
          type: 'updateConcept',
          id: this.concept.id
        })
        this.$store.commit({
          type: 'reverseActionText',
          ref: 'ddConcept',
          id: this.concept.id,
          prop: 'change-concept'
        })
        this.changeConcept()
      },
      removeConcept () {
        this.$store.commit('setDialogTexts', 'dialog-remove-concept')
        this.$store.commit('toggleDialog')
        this.$store.commit({
          type: 'reverseActionText',
          ref: 'ddConcept',
          id: this.concept.id,
          prop: 'remove-concept'
        })
        if (this.concept.id > 1) {
          this.$store.commit('isRemoveConcept')
          this.$store.commit('setWillRemoveConcept', this.concept.id)
        }
      }
    }
  }
  </script>
<style lang="scss">
  .concepts {
    min-width: 280px;
    &__concept {
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      width: 100%;
      height: 140px;
      margin-bottom: 12px;
      padding: 12px;
      border-radius: 3px;
      background: #ffffff;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
      &--full {
        height: auto;
      }
      &--change {
        height: auto;
        min-height: 140px;
      }
      // &--add {
      //   min-height: 88px;
      //   height: auto;
      // }
      &::after {
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 1px;
        width: 100%;
        height: 33px;
        content: '';
        border-radius: 0 0 3px 3px;
        background-image: linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, .9));
      }
    }
    &__title {
      font-size: 12px;
      line-height: 16px;
      width: 100%;
      margin-bottom: 6px;
      color: #4a4646;
      border-bottom: 1px solid #e2e2e2;
    }
    &__content {
      font-size: 13px;
      line-height: 17px;
      padding-bottom: 25px;
      color: #1c1c1c;
    }
    &__controls {
      position: absolute;
      z-index: 3;
      top: 7px;
      right: 10px;
      display: flex;
      align-items: center;
    }
    &__control {
      margin: 0 4px;
      &:last-child {
        margin-right: 0;
      }
    }
    &__done,
    &__full {
      position: absolute;
      z-index: 2;
      right: 10px;
      bottom: 10px;
    }
    &__apply {
      position: absolute;
      z-index: 2;
      right: 10px;
      bottom: 10px;
    }
    &__count {
      cursor: default;
    }
  }
</style>
<template lang="pug">
  div(:class="[{ 'concepts__concept--full': toggleConcept }, 'concepts__concept']")
    .concepts__controls
      button-play(:mix="'concepts__control svg-icon--small'")
      button-stop(v-show="false" :mix="'concepts__control svg-icon--small'")
      button-eye(:mix="'concepts__control concepts__count svg-icon--small'")
      button-more(
        @click="$emit('click-more', 'ddConcept')"
        :mix="'concepts__control svg-icon--small'"
      )
    dropdown(
      v-on:change-concept="changeConcept()"
      v-on:remove-concept="$emit('remove-concept')"
      :mix="'dropdown--concept'"
      :reference="'ddConcept'"
      :id="id"
    )
    div(v-if="!isChangeConcept" class="concepts__title") {{ concept.title }}
    div(v-else class="concepts__title")
      input-field(
        v-on:input="$emit('input-title', $event)"
        :value="''"
        :mix="'concepts__input'"
        ref="input"
      )
    div(v-if="!isChangeConcept" class="concepts__content") {{ concept.content }}
    div(v-else class="concepts__content")
      textarea-field(
        v-on:input="$emit('input-content', $event)"
        :value="''"
        :mix="'concepts__textarea'"
      )
    div(v-if="!isChangeConcept")
      button-full(
        v-show="!toggleConcept"
        v-on:click="toggle()"
        :mix="'concepts__full'")
      button-full-exit(
        v-show="toggleConcept"
        v-on:click="toggle()"
        :mix="'concepts__full'"
      )
    div(v-else)
      //- Todo
        - make component
        - think about component architecture
      button(
        @click="$emit('click-apply'); isChangeConcept = !isChangeConcept"
        type="button"
        class="concepts__done svg-icon svg-icon--done svg-icon--small"
      )
</template>
<script>
  import buttonMore from './button-more'
  import buttonEye from './button-eye'
  import buttonPlay from './button-play'
  import buttonStop from './button-stop'
  import buttonFull from './button-full'
  import buttonFullExit from './button-full-exit'
  import dropdown from './dropdown'
  import inputField from './input-field'
  import textareaField from './textarea'

  export default {
    props: ['concept', 'id'],
    data: () => ({
      toggleConcept: false,
      isChangeConcept: false
    }),
    components: {
      buttonMore,
      buttonEye,
      buttonPlay,
      buttonStop,
      buttonFull,
      buttonFullExit,
      dropdown,
      inputField,
      textareaField
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
        height: 17px;
        content: '';
        border-radius: 0 0 3px 3px;
        background-color: #ffffff;
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
      z-index: 1;
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
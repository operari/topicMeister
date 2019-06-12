<template lang="pug">
  div(:class="['dialog', { 'dialog--hidden': isHidden }]")
    .dialog__title {{ getTexts.title }}
    .dialog__content {{ getTexts.content }}
    .dialog__actions
      el-button(
        v-on:click="decline(); toggle()"
        :mix="'dialog__button'"
        :title="'Decline'"
      )
      el-button(
        v-on:click="accept(); toggle()"
        :mix="'dialog__button'"
        :title="'Accept'"
      )
    div(
      @click.stop="decline(); toggle()"
      class="dialog__close svg-icon svg-icon--close"
    )
</template>
<script>
  import elButton from './el-button'

  export default {
    props: [],
    data: () => ({
    }),
    components: {
      elButton
    },
    computed: {
      isHidden () {
        return this.$store.getters.isHiddenDialog
      },
      getTexts () {
        return this.$store.state.a.texts
      }
    },
    methods: {
      toggle () {
        this.$store.commit('toggleDialog')
      },
      decline () {
        this.$store.dispatch('dialogDeclineAsync').then(() => {
          if (this.$store.getters.isRemoveConcept) {
            this.$store.commit('isRemoveConcept')
            this.$store.commit('unsetWillRemoveConcept')
          }
        })
      },
      accept () {
        this.$store.dispatch('dialogAcceptAsync').then(() => {
          if (this.$store.getters.isRemoveTopics) {
            this.$store.commit('removeTopic')
          }
          if (this.$store.getters.isRemoveConcept) {
            this.$store.commit('removeConcept')
            this.$store.commit('isRemoveConcept')
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .dialog {
    position: absolute;
    z-index: 5;
    top: calc(50% - 172px / 2);
    left: calc(50% - 254px / 2);
    box-sizing: border-box;
    width: 254px;
    height: 172px;
    padding: 15px;
    border-radius: 2px;
    background-color: #fafafa;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.22);
    &--hidden {
      visibility: hidden;
      opacity: 0;
    }
    &__title {
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
      margin-bottom: 20px;
      color: rgba(0, 0, 0, .87);
    }
    &__content {
      font-size: 14px;
      color: #585858;
    }
    &__close {
      position: absolute;
      z-index: 1;
      top: 15px;
      right: 15px;
    }
    &__actions {
      position: absolute;
      z-index: 1;
      right: 15px;
      bottom: 15px;
      margin: 0 -4px;
    }
  }
</style>
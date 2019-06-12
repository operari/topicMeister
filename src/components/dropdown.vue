<template lang="pug">
  div
    button-act(
      @click="toggle()"
      type="button"
      :mix="mixMore"
      :modifier="'more'"
    )
    div(
      v-show="!$store.getters.isHiddenDropdown(reference, id)"
      :class="[mix, 'dropdown']")
      button(
        @click.stop="$emit(name); reverseActionText(name); toggle()"
        v-for="(value, name) in $store.getters.getMenuActions(reference, id)"
        :key="value.id"
        class="dropdown__act"
        type="button"
      ) {{ value[0] }}
</template>
<script>
  import buttonAct from './button-act'

  export default {
    props: ['reference', 'id', 'mix', 'mixMore'],
    data: () => ({
    }),
    components: {
      buttonAct
    },
    created () {
    },
    methods: {
      toggle () {
        this.$store.commit({
          type: 'toggleDropdown',
          ref: this.reference,
          id: this.id
        })
      },
      reverseActionText (prop) {
        this.$store.commit({
          type: 'reverseActionText',
          ref: this.reference,
          id: this.id,
          prop: prop
        })
      }
    }
  }
</script>
<style lang="scss">
  .dropdown {
    position: absolute;
    z-index: 3;
    width: 135px;
    padding: 10px 0;
    margin-left: -110px;
    border-radius: 2px;
    background: #ffffff;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    &--concept {
      top: 20px;
      right: 0;
    }
    &__act {
      font-size: 13px;
      display: block;
      width: 100%;
      height: 40px;
      padding: 0;
      text-align: left;
      text-indent: 12px;
      color: #585858;
      border: 0;
      background-color: transparent;
      &:hover{
        background-color: #eeeeee;
      }
    }
  }
</style>

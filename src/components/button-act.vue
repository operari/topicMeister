<template lang="pug">
  button(
    @click.stop="$emit('click')"
    :class="[mix, 'svg-icon', 'svg-icon--' + modifier, small]"
    type="button"
  )
</template>
<script>
  export default {
    props: ['mix', 'modifier', 'isSmall'],
    data: () => ({
    }),
    computed: {
      small () {
        return {
          'svg-icon--small': this.isSmall
        }
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss">
  .svg-icon {
    position: relative;
    z-index: 1;
    display: block;
    width: 24px;
    height: 24px;
    padding: 0;
    cursor: pointer;
    border: 0;
    background-color: transparent;
    &--small {
      width: 18px;
      height: 18px;
    }
    &--arrow {
      background-image: url('/arrow.svg');
    }
    &--arrow-left {
      background-image: url('/arrow-left.svg');
    }
    &--remove {
      margin-right: 5px;
      background-image: url('/remove.svg');
    }
    &--more {
      background-image: url('/more.svg');
      &.svg-icon--small {
        background-image: url('/more-small.svg');
      }
    }
    &--done {
      position: absolute;
      background-image: url('/done.svg');
    }
    &--add-box {
      position: absolute;
      background-image: url('/add-box.svg');
    }
    &--close {
      background-image: url('/close.svg');
    }
    &--add-concept {
      background-image: url('/add-comment.svg');
    }
    &--filter {
      background-image: url('/filter.svg');
    }
    &--stop {
      background-image: url('/stop.svg');
    }
    &--play {
      background-image: url('/play.svg');
    }
    &--eye {
      background-image: url('/eye.svg');
    }
    &--full {
      background-image: url('/full.svg');
    }
    &--full-exit {
      background-image: url('/full-exit.svg');
    }
  }
</style>
<template lang="pug">
  div
    input-field(
      v-on:keyup-enter="pushTopic()"
      v-model="newTopicName"
      :mix="'topics__topic'"
      ref="input"
    )
    button-act(
      v-on:click="pushTopic()"
      :mix="'topics__add-topic-btn'"
      :modifier="'add-box'"
      :isSmall="true"
    )
</template>
<script>
  import inputField from './input-field'
  import buttonAct from './button-act'

  export default {
    props: [],
    data: () => ({
    }),
    components: {
      inputField,
      buttonAct
    },
    computed: {
      newTopicName: {
        get () {
          return this.$store.getters.newTopic.name
        },
        set (value) {
          this.$store.commit('updateNewTopicName', value)
        }
      }
    },
    methods: {
      focus () {
        this.$refs.input.focus()
      },
      pushTopic () {
        const newTopic = Object.assign({}, this.$store.getters.newTopic)
        const value = newTopic.name && newTopic.name.trim()
        if (value) {
          const topics = this.$store.getters.topics
          if (topics.length) {
            newTopic.id = topics[topics.length - 1].id + 1
          }
          newTopic.prepared = true
          newTopic.change = newTopic.name
          this.$store.commit('pushTopic', newTopic)
          this.$store.commit('restoreNewTopic')
          this.prepareTopicConcept()
        }
      },
      prepareTopicConcept () {
        this.$store.commit('prepareConcept')
        this.$store.commit('resetPreparedTopic')
      }
    }
  }
</script>
<style lang="scss">
  .topics {
    &__topic {
      font-size: 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 40px;
      margin-bottom: 8px;
      padding: 0 4px 0 0;
      text-align: left;
      text-indent: 11px;
      color: #585858;
      border: 0;
      border-radius: 1px;
      background-color: #ffffff;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
    }
    &__topic-change {
      font-size: 16px;
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 40px;
      margin-bottom: 8px;
      text-indent: 11px;
      color: #585858;
      border: 0;
      border-radius: 1px;
      background-color: #ffffff;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
    }
    &__change-topic,
    &__add-topic {
      position: relative;
    }
    &__add-topic-btn {
      position: absolute;
      top: calc(50% - 18px / 2);
      right: 7px;
    }
  }
</style>
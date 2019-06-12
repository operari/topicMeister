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
          newTopic.id = topics[topics.length - 1].id + 1
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
</style>
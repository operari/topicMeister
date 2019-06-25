<template lang="pug">
  div
    button(
      v-if="!topic.isChange"
      @click="$emit('click-concept')"
      class="topics__topic"
      type="button")
      span {{ topic.name }}
      span(
        v-show="!$store.getters.isRemoveTopics"
        class="svg-icon svg-icon--arrow"
      )
      span(
        @click.stop="removeTopic()"
        v-show="$store.getters.isRemoveTopics"
        class="svg-icon svg-icon--remove svg-icon--small"
      )
    div(
      v-if="topic.isChange"
      class="topics__change-topic")
      input-field(
        v-on:keyup-enter="changeTopic('ddMenu', 1, 'change-topics')"
        v-model="changeTopicName"
        :mix="'topics__topic-change'"
      )
      button-act(
        @click="changeTopic('ddMenu', 1, 'change-topics')"
        :mix="'topics__add-topic-btn'"
        :modifier="'done'"
        :isSmall="true"
      )
</template>
<script>
  import inputField from './input-field'
  import buttonAct from './button-act'

  export default {
    props: ['title', 'topic'],
    data: () => ({
    }),
    components: {
      inputField,
      buttonAct
    },
    computed: {
      changeTopicName: {
        get () {
          return this.topic.change
        },
        set (value) {
          this.$store.commit({
            type: 'updateChangeTopicName',
            value: value,
            id: this.topic.id
          })
        }
      }
    },
    methods: {
      changeTopic (ddRef, ddId, ddProp) {
        this.$store.commit('changeTopic', this.topic.id)
        this.$store.commit({
          type: 'reverseActionText',
          ref: ddRef,
          id: ddId,
          prop: ddProp
        })
      },
      removeTopic () {
        this.$store.commit('setDialogTexts', 'dialog-remove-topic')
        this.$store.commit('toggleDialog')
        this.$store.commit('setWillRemoveTopic', this.topic.id)
      }
    }
  }
</script>
<style lang="scss">
</style>
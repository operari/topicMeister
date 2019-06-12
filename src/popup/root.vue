<template lang="pug">
    div(@click="closeDropdown(['ddMenu', 'ddConcept']); closeDialog()" class="container")
      header.header
        .header__left
          button-act(
            v-on:click="showTopics()"
            v-if="isShowConcepts"
            :mix="'header__button-back'"
            :modifier="'arrow-left'"
            :isSmall="true"
          )
          h1(class="title") {{ title }}
        .header__right
          dropdown(
            v-show="isShowTopics"
            v-on:add-topic="addTopic()"
            v-on:change-topics="$store.commit('changeTopics')"
            v-on:remove-topics="$store.commit('removeTopics')"
            class="header__menu"
            :reference="'ddMenu'"
            :id="1"
          )
          button-add(
            v-show="isShowTopics"
            :mix="'header__add'"
            v-on:click="addTopic(); reverseActionText('ddMenu', 1, 'add-topic')"
          )
          button-act(
            v-show="isShowConcepts"
            v-on:click="playAllConcepts()"
            :mix="'header__concepts-controls'"
            :modifier="'play'"
            :isSmall="true"
          )
          button-act(
            v-show="isShowConcepts && false"
            v-on:click="stopAllConcepts()"
            :mix="'header__concepts-controls'"
            :modifier="'stop'"
            :isSmall="true"
          )
          button-act(
            v-show="isShowConcepts"
            v-on:click="filterConcepts()"
            :mix="'header__concepts-controls'"
            :modifier="'filter'"
            :isSmall="true"
          )
          button-act(
            v-show="isShowConcepts"
            v-on:click="addConcept('add-concept')"
            :mix="'header__concepts-controls'"
            :modifier="'add-concept'"
            :isSmall="true"
          )
      section
        div(v-if="isShowTopics" class="topics")
          topic-field-add(
            v-show="isAddNewTopic"
            class="topics__add-topic"
            ref="addTopic"
          )
          topic-field(
            v-for="topic in reversedTopics"
            v-on:click-concept="showConcepts(topic.id)"
            :key="topic.id"
            :topic="topic"
          )
          el-dialog(
            ref="dialog"
          )
        div(v-if="isShowConcepts" class="concepts")
          concept-field-add(
            v-show="isAddNewConcept"
            ref="addConcept"
          )
          concept-field(
            v-for="(concept, index) in pickedTopic"
            v-on:click-more="toggleDropdown($event, index + 1)"
            :key="concept.id"
            :concept="concept"
          )
          el-dialog(
            ref="dialog"
          )
</template>
<script>
  import topicField from '../components/topic-field'
  import topicFieldAdd from '../components/topic-field-add'
  import conceptField from '../components/concept-field'
  import conceptFieldAdd from '../components/concept-field-add'
  import buttonAdd from '../components/button-add'
  import buttonAct from '../components/button-act'
  import inputField from '../components/input-field'
  import dropdown from '../components/dropdown'
  import elDialog from '../components/el-dialog'

  export default {
    data: () => ({
      titles: ['TopicMeister', ''],
      isShowTopics: true,
      isShowConcepts: false,
      isRemoveConcept: false,
      isAddNewTopic: false,
      isAddNewConcept: false
    }),
    components: {
      dropdown,
      buttonAct,
      buttonAdd,
      inputField,
      elDialog,
      topicField,
      topicFieldAdd,
      conceptField,
      conceptFieldAdd
    },
    computed: {
      title: {
        get () {
          return this.titles[0]
        },
        set (newTitle) {
          this.titles[1] = newTitle
        }
      },
      reversedTopics () {
        return this.$store.getters.topics.slice().reverse()
      },
      pickedTopic () {
        return this.$store.getters.concepts[this.$store.getters.pickedTopic.name].slice().reverse()
      }
    },
    created () { },
    mounted () { },
    methods: {
      setFocus (ref) {
        this.$nextTick(() => {
          this.$refs[ref].focus()
        })
      },
      closeDropdown (refs) {
        refs.forEach(ref => {
          this.$store.commit('closeDropdown', ref)
        })
      },
      closeDialog (ref) {
        if (!this.$store.state.a.isHidden) {
          this.$store.commit('closeDialog')
          this.$store.commit('isRemoveConcept')
          this.$store.commit('unsetWillRemoveConcept')
        }
      },
      toggleDropdown (ref, id) {
        this.$store.commit({
          type: 'toggleDropdown',
          ref: ref,
          id: id
        })
      },
      reverseActionText (ref, id, prop) {
        this.$store.commit({
          type: 'reverseActionText',
          ref: ref,
          id: id,
          prop: prop
        })
      },
      addTopic () {
        this.isAddNewTopic = !this.isAddNewTopic
        if (this.isAddNewTopic) {
          this.setFocus('addTopic')
        }
      },
      showConcepts (id) {
        if (this.$store.getters.isRemoveTopics) {
          return
        }
        this.isAddNewTopic = false
        this.isShowTopics = false
        this.isShowConcepts = true
        this.$store.commit('pickedTopic', id)
        this.title = this.$store.getters.topics.find(o => o.id === id).name
        this.titles.reverse()
      },
      showTopics () {
        this.isShowConcepts = false
        this.isShowTopics = true
        this.isAddNewConcept = false
        this.titles.reverse()
      },
      addConcept () {
        this.isAddNewConcept = !this.isAddNewConcept
        if (this.isAddNewConcept) {
          this.setFocus('addConcept')
        }
      },
      filterConcepts () {
        console.log('filter concepts')
      },
      stopAllConcepts () {
        console.log('stop all concepts')
      },
      playAllConcepts () {
        console.log('play all concepts')
      }
    }
  }
</script>
<style lang="scss">
  body {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
  }
  button {
    font-family: 'Segoe UI', sans-serif;
    cursor: pointer;
    &:focus {
      outline: 0;
    }
  }
  textarea,
  input {
    font-family: 'Segoe UI', sans-serif;
    &:focus {
      outline: 0;
    }
  }
  .container {
    overflow: auto;
    box-sizing: border-box;
    width: 340px;
    height: 420px;
    padding: 33px 30px;
    background-color: #f2f2f2;
  }
  .title {
    font-size: 18px;
    font-weight: normal;
    line-height: 24px;
    display: inline-block;
    margin: 0 0 11px 0;
    vertical-align: middle;
  }
  .header {
    display: flex;
    justify-content: space-between;
    min-width: 280px;
    &__menu {
      margin: 0 4px;
    }
    &__add {
      margin-left: 4px;
    }
    &__left {}
    &__right {
      display: flex;
    }
    &__concepts-controls {
      margin: 4px 4px 0;
      &:last-child {
        margin-right: 0;
      }
    }
    &__button-back.svg-icon {
      display: inline-block;
      margin-right: 4px;
    }
  }
</style>
<template lang="pug">
    div(@click="closeDropdown(['ddMenu', 'ddConcept'])" class="container")
      header.header
        .header__left
          button-back(
            v-on:click="showTopics()"
            v-if="isShowConcepts")
          h1(class="title") {{ title }}
        .header__right
          div(v-show="isShowTopics" class="header__menu")
            button-more(
              v-on:click="toggleDropdown('ddMenu', 1)"
            )
            dropdown(
              v-on:add-topic="addTopic()"
              v-on:change-topics="changeTopics()"
              v-on:remove-topics="removeTopics()"
              :reference="'ddMenu'"
              :id="1"
            )
          button-add-topic(
            v-show="isShowTopics"
            :mix="'header__add'"
            v-on:click="addTopic(); reverseActionText('ddMenu', 1, 'add-topic')"
          )
          button-play(
            v-show="isShowConcepts"
            :mix="'header__concepts-controls'"
            v-on:click="playAllConcepts()"
          )
          button-stop(
            v-show="isShowConcepts && false"
            :mix="'header__concepts-controls'"
            v-on:click="stopAllConcepts()"
          )
          button-filter(
            v-show="isShowConcepts"
            :mix="'header__concepts-controls'"
            v-on:click="filterConcepts()"
          )
          button-add-concept(
            v-show="isShowConcepts"
            :mix="'header__concepts-controls'"
            v-on:click="addConcept('add-concept')"
          )
      section
        div(v-if="isShowTopics" class="topics")
          div(v-show="isAddNewTopic" class="topics__add-topic")
            input-field(
              v-on:keyup-enter="pushTopic()"
              v-model="newTopic.name"
              :mix="'topics__topic'"
              ref="addTopic"
            )
            button-add-box(
              v-on:click="pushTopic()"
              :mix="'topics__add-topic-btn'"
            )
          div(
            v-for="(topic, index) in topics" :key="topic.id"
          )
            button-topic(
              v-if="!isChangeTopics"
              v-on:click-concept="showConcepts(index)"
              v-on:click-remove="setDialogTexts('dialog-remove'); toggleDialog(); setWillRemoveTopicIndex(index)"
              :isRemoveTopics="isRemoveTopics"
              :title="topic.name"
            )
            div(
              v-if="isChangeTopics"
              class="topics__change-topic")
              //- Todo
                - make component
              input(
                v-model="topic.change"
                class="topics__topic-change")
              //- Todo
                - make component
              button(
                @click="changeTopic(index, 'ddMenu', 1, 'change-topics')"
                type="button"
                class="topics__add-topic-btn svg-icon svg-icon--done svg-icon--small"
              )
        div(v-if="isShowConcepts" class="concepts")
          concept-field-add(
            v-on:click="pushConcept()"
            v-show="isAddNewConcept"
            v-on:input-title="newConcept.title = $event"
            v-on:input-content="newConcept.content = $event"
            :newConcept="newConcept"
            ref="addConcept"
          )
          concept-field(
            v-on:click-apply="changeConcept(concept, 'ddConcept', index + 1, 'change-concept')"
            v-on:input-title="concept.titleChange = $event"
            v-on:input-content="concept.contentChange = $event"
            v-on:click-more="toggleDropdown($event, index + 1)"
            v-for="(concept, index) in concepts[pickedTopic.name]" :key="concept.id"
            :concept="concept"
            :id="index + 1"
          )
      section
        el-dialog(
          v-on:click-accept="dialogAccept"
          ref="dialog")
</template>
<script>
  import dropdown from '../components/dropdown'
  import buttonMore from '../components/button-more'
  import buttonAddTopic from '../components/button-add-topic'
  import inputField from '../components/input-field'
  import buttonAddBox from '../components/button-add-box'
  import buttonTopic from '../components/button-topic'
  import buttonBack from '../components/button-back'
  import elDialog from '../components/el-dialog'
  import buttonAddConcept from '../components/button-add-concept'
  import buttonFilter from '../components/button-filter'
  import buttonStop from '../components/button-stop'
  import buttonPlay from '../components/button-play'
  import conceptField from '../components/concept-field'
  import conceptFieldAdd from '../components/concept-field-add'

  export default {
    data: () => ({
      titles: ['TopicMeister', ''],
      topics: [
        { id: 1, name: 'Angular', change: '', picked: true, prepared: false },
        { id: 2, name: 'React', change: '', picked: false, prepared: false }
      ],
      newTopic: { id: 1, name: '', change: '', picked: false, prepared: false },
      concepts: {
        'Angular': [
          { id: 1,
            title: 'Что такое Angular',
            content: 'Angular представляет фреймворк от компании Google для создания клиентских приложений. Прежде всего он нацелен на разработку SPA-решений (Single Page Application), то есть одностраничных приложений. Angular предоставляет такую функциональность, как двустороннее связывание, позволяющее динамически изменять данные в одном месте интерфейса при изменении данных модели в другом, шаблоны, маршрутизация и так далее.',
            titleChange: '',
            contentChange: '' },
          { id: 2,
            title: 'Компоненты',
            content: 'Компоненты представляют основные строительные блоки приложения Angular. Компонент управляет отображением представления на экране.',
            titleChange: '',
            contentChange: '' }
        ],
        'React': [
          { id: 1,
            title: 'Что такое React',
            content: 'React это реактивная либа' }
        ]
      },
      newConcept: { id: 1, title: 'Type title here...', content: 'Type content here...' },
      isShowTopics: true,
      isShowConcepts: false,
      isRemoveTopics: false,
      isChangeTopics: false,
      isRemoveConcept: false,
      isAddNewTopic: false,
      isAddNewConcept: false
    }),
    components: {
      dropdown,
      buttonMore,
      buttonAddTopic,
      inputField,
      buttonAddBox,
      buttonTopic,
      buttonBack,
      elDialog,
      buttonAddConcept,
      buttonFilter,
      buttonStop,
      buttonPlay,
      conceptField,
      conceptFieldAdd
    },
    computed: {
      pickedTopic: {
        get () {
          return this.topics.find(o => o.picked)
        },
        set (index) {
          const prevPicked = this.topics.find((o, i) => o.picked && i !== index)
          if (prevPicked) {
            prevPicked.picked = false
          }
          this.topics[index].picked = true
          console.log('Picked topic:', this.topics[index].name)
        }
      },
      title: {
        get () {
          return this.titles[0]
        },
        set (newTitle) {
          this.titles[1] = newTitle
        }
      },
      preparedTopic () {
        return this.topics.find(o => o.prepared)
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
      pushTopic () {
        const value = this.newTopic.name && this.newTopic.name.trim()
        if (value) {
          this.newTopic.id = this.topics[this.topics.length - 1].id + 1
          this.newTopic.prepared = true
          this.topics.push(Object.assign({}, this.newTopic))
          this.prepareTopicConcept()
        }
        this.newTopic.name = ''
        this.newTopic.id = 1
        this.newTopic.prepared = false
      },
      prepareTopicConcept () {
        this.concepts[this.preparedTopic.name] = [Object.assign({}, this.newConcept)]
        this.preparedTopic.prepared = false
      },
      pushConcept () {
        const pickedConcepts = this.concepts[this.pickedTopic]
        this.newConcept.id = pickedConcepts[pickedConcepts.length - 1].id + 1
        pickedConcepts.unshift(Object.assign({}, this.newConcept))
        this.newConcept.title = ''
        this.newConcept.content = ''
      },
      closeDropdown (refs) {
        refs.forEach(ref => {
          this.$store.commit('closeDropdown', ref)
        })
      },
      toggleDropdown (ref, id) {
        this.$store.commit({
          type: 'toggleDropdown',
          ref: ref,
          id: id
        })
      },
      setDialogTexts (category) {
        this.$store.commit('setDialogTexts', category)
      },
      reverseActionText (ref, id, prop) {
        this.$store.commit({
          type: 'reverseActionText',
          ref: ref,
          id: id,
          prop: prop
        })
      },
      toggleDialog () {
        this.$store.commit('toggleDialog')
      },
      dialogAccept () {
        this.$store.dispatch('dialogAcceptAsync').then(() => {
          this.removeTopic(this.$store.getters.indexRemoveTopic)
        })
      },
      addTopic () {
        this.isAddNewTopic = !this.isAddNewTopic
        if (this.isAddNewTopic) {
          this.setFocus('addTopic')
        }
      },
      changeTopic (index, ref, id, prop) {
        const topic = this.topics[index]
        topic.name = topic.change
        topic.change = ''
        this.reverseActionText(ref, id, prop)
        this.isChangeTopics = !this.isChangeTopics
      },
      setWillRemoveTopicIndex (index) {
        this.$store.commit('setWillRemoveTopicIndex', index)
      },
      removeTopic (index) {
        this.topics.splice(index, 1)
      },
      changeTopics () {
        if (!this.isRemoveTopics) {
          this.isChangeTopics = !this.isChangeTopics
        }
      },
      removeTopics () {
        if (!this.isChangeTopics) {
          this.isRemoveTopics = !this.isRemoveTopics
        }
      },
      showConcepts (index) {
        if (this.isRemoveTopics) {
          return
        }
        this.isAddNewTopic = false
        this.isShowTopics = false
        this.isShowConcepts = true
        this.pickedTopic = index
        this.title = this.topics[index].name
        this.titles.reverse()
      },
      showTopics () {
        this.isShowConcepts = false
        this.isShowTopics = true
        this.titles.reverse()
      },
      addConcept () {
        this.isAddNewConcept = !this.isAddNewConcept
        if (this.isAddNewConcept) {
          this.setFocus('addConcept')
        }
      },
      changeConcept (concept, ref, id, prop) {
        concept.title = concept.titleChange
        concept.content = concept.contentChange
        concept.titleChange = ''
        concept.contentChange = ''
        this.reverseActionText(ref, id, prop)
      },
      removeConcept () {
        console.log('remove concept')
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
  }
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
    &--add-comment {
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
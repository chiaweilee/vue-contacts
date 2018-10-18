import './base.scss'
import './vant.scss'

const browser = typeof window !== 'undefined'
const getCap = function (str) {
  return str.toString().substring(0, 1).toUpperCase()
}

export default {
  name: 'Contacts',
  template: `<div data-v-contacts>
              <div class="wrapper" ref="root">
                <div ref="top"/>
                <slot name="header"/>
                <!--search-->
                <div class="contacts-search">
                  <div class="search-field">
                    <div class="search-value">
                    <div class="search-body">
                    <input type="search" v-model="filter" :placeholder="placeHolder" class="search-input">
                    </div></div></div>
                    <div class="search-action" v-if="filter.length"><div @click="filter = ''" v-text="cancelText"></div>
                  </div>
                </div>
                <!--no result-->
                <div v-if="!Object.keys(filteredContacts).length">no result</div>
                <!--contacts-->
                <div
                  v-for="char in character"
                  v-if="filteredContacts && filteredContacts[char]"
                  :key="char"
                  :ref="char"
                >
                  <div
                    class="character-title"
                    v-text="char"
                  ></div>
                  <div
                    class="contacts-list"
                  >
                    <div
                      class="contact-panel"
                      v-for="(contact, key) in filteredContacts[char]"
                      :key="key"
                      @click="emit(contact)"
                    >
                      <span v-if="contact.iconClass" :class="contact.iconClass">
                        <img v-if="contact.icon" :src="contact.icon">
                      </span>
                      <span class="contact-name" v-text="contact.name"/>
                      <span v-if="contact.rightText" class="contact-right-text" v-text="contact.rightText"/>
                      <span v-if="contact.remark" class="contact-remark" v-text="contact.remark"/>
                    </div>
                  </div>
                </div>
                <slot name="footer"/>
              </div>
              <!--characters-->
              <div class="character-list">
                <ol>
                  <li @click="goTop()">↑</li>
                  <li
                    v-for="char in character"
                    v-if="filteredContacts && filteredContacts[char]"
                    :class="{'active': char === current}"
                    :key="char"
                    v-text="char"
                    @click="go(char)"
                    ></li>
                </ol>
              </div>
             </div>`,
  props: {
    contacts: {
      type: Array,
      validator: function (contacts) {
        return contacts.every(function (contact) {
          if (typeof contact === 'object' && contact.hasOwnProperty('name')) {
            return true
          }
          console.warn(`'contacts' props should be like this: [{name: 'Jack'}, {name: 'Tom'}].`)
          return false
        })
      },
      required: true
    },
    placeHolder: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    }
  },
  computed: {
    filteredContacts: function () {
      const vm = this
      const result = {}
      const filter = this.filter.length > 0 ? this.filter.toLowerCase() : false
      this.contacts.forEach(function (c) {
        if (filter) {
          if (c.name.toLowerCase().indexOf(filter) === -1 && (!c.remark || c.remark.toLowerCase().indexOf(filter) === -1)) {
            return
          }
        }
        const char = getCap(c.name)
        if (vm.character.indexOf(char) > -1) {
          if (!result[char]) {
            result[char] = []
          }
          result[char].push(c)
        } else {
          if (!result['#']) {
            result['#'] = []
          }
          result['#'].push(c)
        }
      })
      return result
    }
  },
  watch: {
    filter: function (to) {
      if (!to.length) return
      this.current = Object.keys(this.filteredContacts)[0]
    }
  },
  data: function () {
    const character = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    return {
      current: character[0],
      character: character,
      filter: ''
    }
  },
  beforeDestroy: function () {
    if (browser) this.$refs.root.removeEventListener('scroll', this.ev, false)
  },
  mounted: function () {
    this.ev()
    if (browser) this.$refs.root.addEventListener('scroll', this.ev, false)
  },
  methods: {
    ev: function () {
      const vm = this
      const root = this.$refs.root.getBoundingClientRect()
      this.character.every(function (char) {
        if (!vm.$refs[char] || !vm.$refs[char][0]) return true
        const rect = vm.$refs[char][0].getBoundingClientRect()
        const inview = rect.top >= root.top && rect.bottom < root.bottom
        if (inview) {
          vm.current = char
        }
        return !inview
      })
    },
    go: function (char) {
      this.current = char
      this.$refs[char][0].scrollIntoView()
    },
    goTop: function () {
      this.$refs.top.scrollIntoView()
    },
    emit: function (to) {
      this.$emit('contact', to)
    }
  }
}

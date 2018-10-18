import './base.css';
import './vant.css';
var browser = typeof window !== 'undefined';

var getCap = function getCap(str) {
  return str.toString().substring(0, 1).toUpperCase();
};

export default {
  name: 'Contacts',
  template: "<div data-v-contacts>\n              <div class=\"wrapper\" ref=\"root\">\n                <div ref=\"top\"/>\n                <slot name=\"header\"/>\n                <!--search-->\n                <div class=\"contacts-search\">\n                  <div class=\"search-field\">\n                    <div class=\"search-value\">\n                    <div class=\"search-body\">\n                    <input type=\"search\" v-model=\"filter\" :placeholder=\"placeHolder\" class=\"search-input\">\n                    </div></div></div>\n                    <div class=\"search-action\" v-if=\"filter.length\"><div @click=\"filter = ''\" v-text=\"cancelText\"></div>\n                  </div>\n                </div>\n                <!--no result-->\n                <div v-if=\"!Object.keys(filteredContacts).length\">no result</div>\n                <!--contacts-->\n                <div\n                  v-for=\"char in character\"\n                  v-if=\"filteredContacts && filteredContacts[char]\"\n                  :key=\"char\"\n                >\n                  <div\n                    class=\"character-title\"\n                    v-text=\"char\"\n                    :ref=\"char\"\n                  ></div>\n                  <div\n                    class=\"contacts-list\"\n                  >\n                    <div\n                      class=\"contact-panel\"\n                      v-for=\"(contact, key) in filteredContacts[char]\"\n                      :key=\"key\"\n                      @click=\"emit(contact)\"\n                    >\n                      <span>\n                        <img :class=\"contact.iconClass\" :src=\"contact.icon || defaultIcon\">\n                      </span>\n                      <span class=\"contact-name\" v-text=\"contact.name\"/>\n                      <span v-if=\"contact.rightText\" class=\"contact-right-text\" v-text=\"contact.rightText\"/>\n                      <span v-if=\"contact.remark\" class=\"contact-remark\" v-text=\"contact.remark\"/>\n                    </div>\n                  </div>\n                </div>\n                <slot name=\"footer\"/>\n              </div>\n              <!--characters-->\n              <div class=\"character-list\">\n                <ol>\n                  <li @click=\"goTop()\">\u2191</li>\n                  <li\n                    v-for=\"char in character\"\n                    v-if=\"filteredContacts && filteredContacts[char]\"\n                    :class=\"{'active': char === current}\"\n                    :key=\"char\"\n                    v-text=\"char\"\n                    @click=\"go(char)\"\n                    ></li>\n                </ol>\n              </div>\n             </div>",
  props: {
    contacts: {
      type: Array,
      validator: function validator(contacts) {
        return contacts.every(function (contact) {
          if (typeof(contact) === 'object' && contact.hasOwnProperty('name')) {
            return true;
          }

          console.warn("'contacts' props should be like this: [{name: 'Jack'}, {name: 'Tom'}].");
          return false;
        });
      },
      required: true
    },
    defaultIcon: {
      type: String,
      default: 'data:image/gif;base64,R0lGODlhEAAQAKEAAEKF9NPi/AAAAAAAACH5BAEAAAIALAAAAAAQABAAAAIkFI6Zpu0YYnxnAvtC0hTzzH3UJY6kSUqdiCltu7GjBKMKgwoFADs='
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
    filteredContacts: function filteredContacts() {
      var vm = this;
      var result = {};
      var filter = this.filter.length > 0 ? this.filter.toLowerCase() : false;
      this.contacts.forEach(function (c) {
        if (filter) {
          if (c.name.toLowerCase().indexOf(filter) === -1 && (!c.remark || c.remark.toLowerCase().indexOf(filter) === -1)) {
            return;
          }
        }

        var char = getCap(c.name);

        if (vm.character.indexOf(char) > -1) {
          if (!result[char]) {
            result[char] = [];
          }

          result[char].push(c);
        } else {
          if (!result['#']) {
            result['#'] = [];
          }

          result['#'].push(c);
        }
      });
      return result;
    }
  },
  watch: {
    filter: function filter(to) {
      if (!to.length) return;
      this.current = Object.keys(this.filteredContacts)[0];
    }
  },
  data: function data() {
    var character = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    return {
      current: character[0],
      character: character,
      filter: ''
    };
  },
  beforeDestroy: function beforeDestroy() {
    if (browser) this.$refs.root.removeEventListener('scroll', this.ev, false);
  },
  mounted: function mounted() {
    this.ev();
    if (browser) this.$refs.root.addEventListener('scroll', this.ev, false);
  },
  methods: {
    ev: function ev() {
      var vm = this;
      var root = this.$refs.root.getBoundingClientRect();
      this.character.every(function (char) {
        if (!vm.$refs[char] || !vm.$refs[char][0]) return true;
        var rect = vm.$refs[char][0].getBoundingClientRect();
        var inview = rect.top >= root.top && rect.bottom < root.bottom;

        if (inview) {
          vm.current = char;
        }

        return !inview;
      });
    },
    go: function go(char) {
      this.current = char;
      this.$refs[char][0].scrollIntoView();
    },
    goTop: function goTop() {
      this.$refs.top.scrollIntoView();
    },
    emit: function emit(to) {
      this.$emit('contact', to);
    }
  }
};

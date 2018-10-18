import contacts from './es'

export {
  contacts
}

export default {
  install: function (Vue) {
    Vue.component('contacts', contacts)
  }
}

import contacts from './es/contacts';
export default {
  install: function install(Vue) {
    Vue.component('contacts', contacts);
  }
};
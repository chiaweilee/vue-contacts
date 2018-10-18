import contacts from './es';
export { contacts };
export default {
  install: function install(Vue) {
    Vue.component('contacts', contacts);
  }
};
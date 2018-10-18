# vue-contacts
Mobile contacts component for Vue

<a href="https://npmcharts.com/compare/vue-contacts?minimal=true"><img src="https://img.shields.io/npm/dm/vue-contacts.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-contacts"><img src="https://img.shields.io/npm/v/vue-contacts.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-contacts"><img src="https://img.shields.io/npm/l/vue-contacts.svg" alt="License"></a>

### Install
```cmd
npm install vue-contacts
```

### Preview
<img src="https://github.com/chiaweilee/vue-contacts/blob/0.1.x/preview/screenshot1.png" alt="License">
<img src="https://github.com/chiaweilee/vue-contacts/blob/0.1.x/preview/screenshot2.png" alt="License">

### Global import
```js
import Vue from 'vue'
import contacts from 'vue-contacts'
// You can also write css yourself 😊
import 'vue-contacts/base.css'
import 'vue-contacts/vant.css'
Vue.use(contacts)
```

##### direct import in component

```vue.js
import { contacts } from 'vue-contacts'
export default {
  components: {
    contacts
  }
}
```

### Usage

```html
<template>
  <contacts
    :contacts="contacts"
    @contact="getContact"
    style="height: 300px"
    :place-holder="'Please enter name or remark to search'"
    :cancel-text="'Cancel search'"
  >
</template>
```

```vue.js
<script>
export default {
  data () {
    return {
      contacts: [
        {
          name: '+v',
          remark: 'Chiawei Lee',
          icon: 'https://avatars0.githubusercontent.com/u/29817353?s=40&v=4',
          rightText: 'Github'
        },
        {
          name: '岳云鹏',
          remark: 'Yue yunpeng',
          icon: 'data:image/gif;base64,R0lGODlhEAAQAMIAAAQEBJeXl+MmKvzr7ICAgO10dvGUAAAAACH5BAEAAAcALAAAAAAQABAAAANHeLrc/tCZaaB4lYl91Tyfwm0HCZ7lqC4VVwxwwWnCOwQEPMhdCgNAgG5WehEAOEBuQKzdCAFgYGcSGaXU3mJT6PK0kbB4kQAAOw=='
        },
        {
          name: 'David Bowie',
          remark: 'David Robert Haywood Jones',
          icon: 'data:image/gif;base64,R0lGODlhEAAQAIAAAGWoJQAAACH5BAEAAAEALAAAAAAQABAAAAIjjG+ggJ2rHIJRHmgDpW3v6WFRSJbmcp3pOTLqWnEwo2FgjBYAOw==',
          rightText: 'Star'
        },
        {
          name: 'Michael Jackson'
        },
        {
          name: 'Michael Jordan'
        },
        {
          name: 'Michael Schumacher'
        },
        {
          name: 'Michael Phelps'
        },
        {
          name: 'Michael James Owen',
          remark: 'Owen'
        },
        {
          name: 'Sir Michael Caine',
          remark: 'Michael Caine'
        },
        {
          name: 'Mike Tyson'
        },
        {
          name: 'Anne Hathaway',
          icon: '',
          iconClass: 'fa fa-icon'
        },
        {
          name: 'Cate Blanchett',
        },
        {
          name: 'H.O.T',
          remark: 'Tony An, Kang Ta'
        }
      ]
    }
  },
  methods: {
    getContact: function (to) {
      console.log(`You click ${to.name}`)
    }
  }
}
</script>
```

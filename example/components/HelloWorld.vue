<template>
  <contacts
    :contacts="contacts"
    @contact="getContact"
    style="height: 300px"
    :place-holder="'Please enter name or remark to search'"
    :cancel-text="'Cancel search'"
  >
    <div slot="header">Vue contacts demo</div>
    <div
      slot="footer"
      v-text="contacts.length + ' contacts'"
    />
  </contacts>
</template>

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
          name: 'Cate Blanchett'
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

<style>
  body {
    overflow: hidden;
  }
</style>

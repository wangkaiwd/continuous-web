<template>
  <div class="button-box">
    <g-button @click="showToast1">上</g-button>
    <g-button @click="showToast2">中</g-button>
    <g-button @click="showToast3">下</g-button>
  </div>
</template>
<script>
  // import GButton from './'
  export default {
    name: 'App',
    data () {
      return {
        loading1: false,
        msg: 'hi',
        selected: ['3'],
        selected1: ['1'],
        options: [
          {
            name: '设计原则',
            children: [
              {
                name: '一致',
                children: [
                  {name: '哈哈'},
                  {name: '呵呵'},
                ]
              },
              {
                name: '反馈'
              },
              {
                name: '效率'
              },
              {
                name: '可控'
              },
            ]
          },
          {
            name: '导航',
            children: [
              {
                name: '侧向导航'
              },
              {
                name: '顶部导航'
              }
            ]
          },
          {name: '测试'}
        ]
      }
    },
    mounted () {
    },
    methods: {
      inputChange (e) {
        console.log('e', e.target.value)
      },
      showToast1 () {this.showToast('top')},
      showToast2 () {this.showToast('middle')},
      showToast3 () {this.showToast('bottom')},
      showToast (position) {
        this.$toast({
          message: '服务器出小差了',
          closeButton: {
            text: '关闭',
            onCancel () {
              console.log('toast测试')
            }
          },
          position,
        })
      },
      clickEvent (data) {
        console.log('click', data)
        // this.selected = data
        console.log('data', this.selected)
        this.selected = data
      },
      handleClick () {
        console.log('yyy')
      },
      xxxx () {
        console.log('xxx')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .col,
  .col-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-top: 10px;
    background-color: rgba(0, 160, 233, 0.7);
  }

  .col-right {
    background-color: rgba(0, 0, 0, .1);
  }
</style>
<template>
  <div class="index">
    <g-cascader :options="options">
      <!--<g-button>触发器</g-button>-->
    </g-cascader>
    2341214
  </div>
</template>
<script>
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

</style>
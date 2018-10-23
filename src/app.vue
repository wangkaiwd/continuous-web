<template>
  <div class="grid">
    <g-row class="row">
      <h2>基础栅格</h2>
      <g-col class="col">1</g-col>
      <g-col class="col" span="14">2</g-col>
      <g-col class="col-right" span="10">3</g-col>
      <g-col class="col" span="12">4</g-col>
      <g-col class="col-right" span="12">5</g-col>
    </g-row>
    <g-row class="row" gutter="12">
      <h2>区块间隔</h2>
      <g-col>
        <div class="col">
          1
        </div>
      </g-col>
      <g-col span="3">
        <div class="col">2</div>
      </g-col>
      <g-col span="5">
        <div class="col">3</div>
      </g-col>
      <g-col span="6">
        <div class="col-right">4</div>
      </g-col>
      <g-col span="6">
        <div class="col">5</div>
      </g-col>
      <g-col span="4">
        <div class="col">6</div>
      </g-col>
    </g-row>
    <g-row class="row">
      <h2>左右偏移</h2>
      <g-col class="col">1</g-col>
      <g-col class="col" span="6">2</g-col>
      <g-col class="col-right" span="4" offset="4">3</g-col>
      <g-col class="col" span="5" offset="2">4</g-col>
      <g-col class="col-right" span="6" offset="2">5</g-col>
      <g-col class="col" span="6" offset="6">6</g-col>
    </g-row>
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
<template>
  <div class="wd-uploader">
    <div class="trigger" ref="trigger" @click="onClickTrigger">
      <slot></slot>
    </div>
    <input ref="uploadInput" class="upload-input" type="file" :accept="accept">
    <div class="file-list">
      <div class="file-list-wrapper" v-for="(file,i) in fileList">
        <div class="img-wrapper">
          <img :src="file.url" :key="i" alt=""><span class="img-name">{{file.name}}</span>
        </div>
        <div class="delete-icon" onClick="onDeleteFile">
          <g-icon name="delete"></g-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*
  * fileList item描述
  * */
  import GIcon from '../icon';

  export default {
    name: 'WdUploader',
    components: { GIcon },
    props: {
      name: {
        type: String,
        default: 'file'
      },
      action: {
        type: String,
        required: true
      },
      accept: {
        type: String,
        required: false
      },
      method: {
        type: String,
        default: 'POST'
      },
      fileList: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {};
    },
    mounted () {
      this.$refs.uploadInput.addEventListener('change', this.listenToUpload);
    },
    methods: {
      onClickTrigger () {
        // 触发input点击事件
        // 1. 执行一个element的一个HTMLElement.click()方法
        // this.$refs.uploadInput.click();

        // 2. 通过定义事件，然后使用EventTarget.dispatchEvent()将其派发到一个指定的目标

        // 手动触发onchange事件:https://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually
        // 手动触发onclick事件：https://stackoverflow.com/questions/2381572/how-can-i-trigger-a-javascript-event-click
        // 创建一个MouseEvent实例，然后通过实例的dispatchEvent方法来派发click事件
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        this.$refs.uploadInput.dispatchEvent(clickEvent);
      },
      listenToUpload (e) {
        const file = e.target.files[0];
        //  将文件信息上传到服务器
        const formData = new FormData();
        formData.append(this.name, file);
        console.log(file);
        const xhr = new XMLHttpRequest();
        xhr.open(this.method.toUpperCase(), this.action);
        xhr.send(formData);
        // 只要readyState属性发生变化，就会调用相应的处理函数
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            this.$emit('update:fileList', [...this.fileList, { url: res.url, name: file.name }]);
          }
        };
      },
      onDeleteFile () {
        
      }
    },
    beforeDestroy () {
      this.$refs.uploadInput.removeEventListener('change', this.listenToUpload);
    }
  };
</script>

<style lang="scss" scoped>
  .wd-uploader {
    .trigger {
      display: inline-block;
    }
    .upload-input {
      display: none;
    }
    .file-list-wrapper {
      border: 2px solid red;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      /*&:not(:first-child) {
      }*/
      .img-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .img-name {
        margin-left: 4px;
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
    .delete-icon {
      cursor: pointer;
    }
  }
</style>

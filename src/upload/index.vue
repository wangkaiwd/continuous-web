<template>
  <div class="wd-uploader">
    <div class="trigger" ref="trigger" @click="onClickTrigger">
      <slot></slot>
    </div>
    <input ref="uploadInput" multiple class="upload-input" type="file" :accept="accept">
    <div class="file-list">
      <div class="file-list-wrapper" :title="fileListWrapperTitle(file)" :class="fileListWrapperClass(file)"
           v-for="file in fileList">
        <div class="img-wrapper">
          <g-icon v-if="file.status==='uploading'" class="img-loading" name="loading"></g-icon>
          <img :src="file.url" :key="file.uid" alt="">
          <span class="img-name">{{file.name}}</span>
        </div>
        <div class="delete-icon" @click="onDeleteFile(file.uid)">
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
  import defaultImg from './default.jpg';

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
    computed: {},
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
      generateId () {
        const last = this.fileList.slice(-1)[0];
        return last ? last.uid + 1 : 0;
      },
      beforeUpload (file) {
        const { type, name, size } = file;
        const uid = this.generateId();
        this.$emit('update:fileList', [...this.fileList, {
          name,
          type,
          size,
          uid,
          status: 'uploading',
          url: defaultImg
        }]);
        return uid;
      },
      // 监听onchange事件出现问题：https://stackoverflow.com/questions/19643265/second-use-of-input-file-doesnt-trigger-onchange-anymore
      //   相同文件名的图片第二次上传不会触发change事件
      listenToUpload (e) {
        const file = e.target.files[0];
        // 参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications
        // const objectURL = window.URL.createObjectURL(file);
        // 上传完成后将文件信息清空，否则相同文件无法重复上传
        // value: 表示选择文件的路径。清空之后，相当于没有选择文件
        // 文档参考： https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file
        e.target.value = '';
        const uid = this.beforeUpload(file);
        //  将文件信息上传到服务器
        const formData = new FormData();
        formData.append(this.name, file);
        const xhr = new XMLHttpRequest();
        xhr.open(this.method.toUpperCase(), this.action);
        xhr.send(formData);
        // 只要readyState属性发生变化，就会调用相应的处理函数
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            return this.uploadSuccess(JSON.parse(xhr.response), uid);
          }
          this.uploadFailed(uid);
        };
      },
      uploadSuccess (response, uid) {
        const copyFileList = [...this.fileList];
        const target = copyFileList.find(item => item.uid === uid);
        target.status = 'success';
        target.url = response.url;
        this.$emit('update:fileList', copyFileList);
      },
      uploadFailed (uid) {
        const copyFileList = [...this.fileList];
        const target = copyFileList.find(item => item.uid === uid);
        target.status = 'error';
        this.$emit('update:fileList', copyFileList);
      },
      onDeleteFile (uid) {
        const newFileList = this.fileList.filter(item => item.uid !== uid);
        this.$emit('update:fileList', newFileList);
      },
      fileListWrapperClass (file) {
        return {
          success: file.status === 'success',
          error: file.status === 'error'
        };
      },
      fileListWrapperTitle (file) {
        const RESULT_CFG = {
          'error': '上传失败',
          'success': '上传成功'
        };
        return RESULT_CFG[file.status];
      }
    },
    beforeDestroy () {
      this.$refs.uploadInput.removeEventListener('change', this.listenToUpload);
    }
  };
</script>

<style lang="scss" scoped>
  @import '../var';
  .wd-uploader {
    .trigger {
      display: inline-block;
    }
    .upload-input {
      display: none;
    }
    .file-list-wrapper {
      border: 2px solid black;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      &.success {border: 2px solid green;}
      &.error {border: 2px solid red;}
      .img-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .img-name {
        margin-left: 4px;
      }
      .img-loading {
        padding: 0 2px;
        font-size: 24px;
        @include loading;
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

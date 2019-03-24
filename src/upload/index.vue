<template>
  <div class="wd-uploader">
    <div class="trigger" ref="trigger" @click="onClickTrigger">
      <slot></slot>
    </div>
    <input ref="uploadInput" :multiple="multiple" class="upload-input" type="file" :accept="accept">
    <div class="file-list">
      <div class="file-list-wrapper" :title="fileListWrapperTitle(file)" :class="{[file.status]:file.status}"
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
  *   {
  *     uid,
  *     name,
  *     type,
  *     url
  *   }
  *
  *  ui异步渲染遇到的问题：
  *   https://codesandbox.io/embed/50njxo10np
  *   对比react的this.setState()通关传入函数进行更新的情况
  * */
  import GIcon from '../icon';
  import defaultImg from './default.jpg';

  export default {
    name: 'WdUploader',
    components: { GIcon },
    props: {
      name: { type: String, default: 'file' },
      action: { type: String, required: true },
      accept: { type: String, required: false },
      method: { type: String, default: 'POST' },
      multiple: { type: Boolean, default: false },
      fileList: { type: Array, default: () => [] },
      beforeUpload: {
        type: Function,
        default: () => true
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
      doBeforeUpload (file, uid) {
        const { type, name, size } = file;
        this.$emit('update:fileList', [...this.fileList, {
          name,
          type,
          size,
          uid,
          status: 'uploading',
          url: defaultImg
        }]);
        // 遇到的问题： 连续更新父组件传来的props时，只有最后一次更新会生效
        // 页面渲染是异步的
        // 解决方法：将需要连续更新的操作先统一处理，处理完成后再进行更新
        // const tempArray = [];
        // for (let i = 0; i < files.length; i++) {
        //   const file = files[i], uid = uids[i];
        //   const { type, size, name } = file;
        //   tempArray.push({ type, size, name, uid, status: 'uploading' });
        // }
        // this.$emit('update:fileList', [...this.fileList, ...tempArray]);
        return true;
      },
      // 监听onchange事件出现问题：https://stackoverflow.com/questions/19643265/second-use-of-input-file-doesnt-trigger-onchange-anymore
      //   相同文件名的图片第二次上传不会触发change事件
      listenToUpload (e) {
        const file = e.target.files[0];
        // // 参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications
        // const objectURL = window.URL.createObjectURL(file);
        // 上传完成后将文件信息清空，否则相同文件无法重复上传
        // value: 表示选择文件的路径。清空之后，相当于没有选择文件
        // 文档参考： https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file
        e.target.value = '';
        const uid = this.generateId();
        const bool = this.doBeforeUpload(file, uid);
        // 如果doBeforeUpload返回false,则阻止上传
        if (!bool) return;
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
        // const files = [...e.target.files];
        // e.target.value = '';
        // // 如果doBeforeUpload返回false,则阻止上传
        // for (let i = 0; i < files.length; i++) {
        //   const file = files[i];
        //   //  将文件信息上传到服务器
        //   const uid = this.generateId();
        //   this.doBeforeUpload(file, uid);
        //   const formData = new FormData();
        //   formData.append(this.name, file);
        //   const xhr = new XMLHttpRequest();
        //   xhr.open(this.method.toUpperCase(), this.action);
        //   xhr.send(formData);
        //   // 只要readyState属性发生变化，就会调用相应的处理函数
        //   xhr.onreadystatechange = () => {
        //     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //       return this.uploadSuccess(JSON.parse(xhr.response), uid);
        //     }
        //     this.uploadFailed(uid);
        //   };
        // }
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
      width: 200px;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      &.success {
        border: 2px solid green;
        .img-name {color: green;}
      }
      &.error {
        border: 2px solid red;
        .img-name {color: red;}
      }
      .img-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .img-name {
        display: inline-block;
        max-width: 120px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
      margin-right: 4px;
      cursor: pointer;
    }
  }
</style>

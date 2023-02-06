<template>
  <div class="app-container">
    <div style="text-align: center">
    <el-button type="primary" @click="prev()">Previous Step</el-button>
    <el-button :disabled="publishBtnDisable" type="primary" @click="publish()">Publish</el-button>

    </div>
  </div>
</template>
  
  <script>
export default {
  methods:{
    prev(){
      this.$parent.active=1;
    },
    publish(){
      this.$parent.active=3;
    }
  }
};
</script>
  
  <style>
</style>
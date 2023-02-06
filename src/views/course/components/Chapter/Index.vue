<template>
  <div class="app-container">
    <div style="text-align: center">
    <el-button type="primary" @click="prev()">Previous Step</el-button>
    <el-button type="primary" @click="next()">Next Step</el-button>

    </div>
  </div>
</template>
  
  <script>
export default {
  methods:{
    prev(){
      this.$parent.active=0;
    },
    next(){
      this.$parent.active=2
    }
  }
};
</script>
  
  <style>
</style>
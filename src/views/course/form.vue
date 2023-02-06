<template>
    <div class="app-container">
  
      <h2 style="text-align: center;">发布新课程</h2>
      <el-steps :active="active" finish-status="success" simple style="margin-bottom: 40px">
        <el-step title="填写课程基本信息" />
        <el-step title="创建课程大纲" />
        <el-step title="发布课程" />
      </el-steps>

    
      <Info v-if="active==0" />
      <Chapter v-if="active==1"/>
      <Publish v-if="active==2"/>

    </div>
  </template>

<script>
import Info  from '@/views/course/components/Info'
import Chapter from '@/views/course/components/Chapter'//寻找chapter文件夹下的index.vue
import Publish from '@/views/course/components/Publish'



export default {
    components:{Info,Chapter,Publish},
  data() {
    return {
      active: 0,
      courseId: null
    }
  },
  methods:{
    //上一步

  }
}
</script>
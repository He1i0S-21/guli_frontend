<template>
  <div class="app-container">
    <el-form lable-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

        <!-- 课程讲师  -->
        <el-form-item label="课程讲师">
          <el-select v-model="courseInfo.teacherId">
            <el-option 
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name" 
            :value="teacher.id"
            />
          </el-select>
        </el-form-item>

        <!-- 所属分类  -->
        <el-form-item label="所属分类">
          <el-select v-model="courseInfo.subjectParentId"
          placeholder="请输入"
          @change="subjectChanged"
          >
            <el-option 
            v-for="subject in subjectList"
            :key="subject.id"
            :label="subject.title" 
            :value="subject.id"
            />
          </el-select>
        
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
             v-for="subject in subjectLevelTwoList"
             :key="subject.id"
             :label="subject.title"
             :value="subject.id"/>
          </el-select>
</el-form-item>
    <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
    </el-form-item>

    <!-- 课程简介 TODO -->

    <!-- 课程封面 TODO -->
    <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
    </el-form-item>

    </el-form>

    <div style="text-align: center">
      <el-button
        :disabled="saveAndDisable"
        type="primary"
        @click="saveAndNext()"
        >Svae And Next</el-button
      >
    </div>
  </div>
</template>

<script>
import courseApi from "@/api/course"
import teacherApi from "@/api/teacher"
import subjectApi from "@/api/subject"

export default {
  data() {
    return {
      saveAndDisable: false, //button disabled or not
      courseInfo:{}, 
      teacherList:[],
      subjectList:[],
      subjectLevelTwoList:[],
    };
  },
  created(){
    this.initTeacherList();
    this.initSubjectList();
  },
  methods: {
    initTeacherList(){
      teacherApi.list().then(response=>{
        console.log()
        this.teacherList = response.data.items
      })
    },
    initSubjectList(){
      subjectApi.getNestedTreeList().then(response=>{
          this.subjectList=response.data.items
      })
    },
    
    saveAndNext() {
      this.saveAndDisable = true;
      this.saveData()
    },
    saveData(){
      courseApi.saveCourseInfo(this.courseInfo).then(response=>{
        this.$message.success(response.message);
        this.$parent.courseId=response.data.courseId;
        this.$parent.active = 1; //access the properties "active" of parent component
      })
    },
    updataData(){},
    subjectChanged(value){
      this.subjectList.forEach(subject => {
            if(subject.id===value){
              this.courseInfo.subjectId = ""
              this.subjectLevelTwoList=subject.children
            }        
      });
    }
  },
};
</script>

<style>
</style>
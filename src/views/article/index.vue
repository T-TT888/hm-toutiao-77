<!--  -->
<template>
  <div class="container">
    <el-card>
      <div slot="header" >
         <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>内容管理</el-breadcrumb-item>
         </el-breadcrumb>
      </div>
       <el-form label-width="80px" size="small">
         <el-form-item label="状态">
            <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
         </el-form-item>
         <el-form-item label="频道" >
            <el-select v-model="reqParams.channel_id" placeholder="请选择">
                <el-option
                   v-for="item in channelOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="日期">
           <el-date-picker
              v-model="dataArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
           </el-date-picker>
         </el-form-item>
         <el-form-item>
           <el-button type="primary">筛选</el-button>
         </el-form-item>
       </el-form>
    </el-card>
    <!-- <el-card>
      <div slot="header">
          根据数据筛选条件共查询到0条结果
      </div>
      <el-table :data="articles">
        <el-table-column label="封面" prop='img'></el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-card> -->
   <my-test>content</my-test>
  </div>
</template>

<script>
import MyTest from '@/components/my-test'
export default {
  components: { MyTest },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null
      },
      channelOptions: [{ value: 1, label: 'json' }],
      dataArr: []
      // articles: [{ img: '真好' }]
    }
  }
}
</script>

<style scoped lang='less'>
.el-card{
  margin-bottom: 20px;
}
</style>

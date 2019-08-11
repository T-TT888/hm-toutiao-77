<!--  -->
<template>
  <div class="container">
    <el-card>
      <div slot="header" >
         <my-bread>内容管理</my-bread>
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
           <my-channel v-model="reqParams.channel_id"></my-channel>
         </el-form-item>
         <el-form-item label="日期">
           <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeData"
              value-format="yyyy-MM-dd"
              >
           </el-date-picker>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="search()">筛选</el-button>
         </el-form-item>
       </el-form>
    </el-card>
    <el-card>
      <div slot="header">
          根据数据筛选条件共查询到{{total}}条结果
      </div>
      <el-table :data="articles">
        <el-table-column label="封面" prop='img'>
        <template slot-scope="scope">
           <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px;">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:120px;height:80px;" alt="">
              </div>
            </el-image>
        </template>
        </el-table-column>
        <el-table-column label="标题" prop='title'></el-table-column>
        <el-table-column label="状态" prop='img'></el-table-column>
        <el-table-column label="发布时间" prop='pubdate'></el-table-column>
        <el-table-column label="操作" prop='img' width="120px">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          background
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [],
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    },
    changeData (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card{
  margin-bottom: 20px;
}
</style>

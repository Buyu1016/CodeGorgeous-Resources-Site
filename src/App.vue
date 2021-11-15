<template>
  <el-row
    :gutter="24"
    class="app-container"
    :style="{
        background: 'url(http://qiniu.codegorgeous.top/login.webp)'
    }"
  >
    <el-col :span="4" class="side-container">
      <el-menu
        active-text-color="#ffd04b"
        class="side-menu"
        :default-active="history"
        text-color="#fff"
      >
        <el-sub-menu class="group-menu" v-for="(item, index) in data" :key="index" :index="index + ''">
          <template #title>
            <span>{{item.type}}</span>
          </template>
          <el-menu-item
            v-for="(childrenItem, key) in item.ResourcesTypes"
            :key="key"
            :index="`${childrenItem.id}`"
            @click="handleClick"
          >
            <span>{{childrenItem.resourcesName}}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col
      :span="20"
      class="main-container"
    >
        <a
          v-for="item in message"
          :key="item.id"
          class="card-container"
          :href="item.url"
          target="_blank"
        >
          <el-card
            shadow="hover"
            class="card"
          >
            <div
              class="card-left-img"
            >
              <el-image
                style="width:100%; height: 100%;"
                :src="item.image"
                fit="cover"
              />
            </div>
            <div
              class="card-right-container"
            >
              <p class="card-title">{{item.name}}</p>
              <p class="card-tags">
                <el-tag
                  class="card-tag"
                  v-for="(tag, index) in item.tags"
                  :key="index"
                  :style="{
                    background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
                    color: `#fff`
                  }"
                  size="mini"
                >{{tag}}</el-tag>
              </p>
              <p class="card-text">{{item.introduce}}</p>
            </div>
          </el-card>
        </a>
    </el-col>
  </el-row>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue'
  import { getResource, getType } from './api/index'
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    setup (props, context) {
      const data: any = ref([])

      // 初始化加载资源分类目录
      getType().then((resp: any) => {
        if (resp.state !== 'success') return ElMessage.error('获取目录失败, 请刷新重新获取!')
        data.value = resp.data
      })

      const history = ref('1')

      const message: any = ref([])

      const handleClick = (key: any) => {
        history.value = key.index
      }

      watchEffect(() => {
        getResource(+history.value).then((resp: any) => {
          if (resp.state !== 'success') return ElMessage.error('获取资源失败, 请刷新重新获取!')
          message.value = resp.data.map((item: any) => {
            return {
              ...item,
              tags: item.tags.split('|')
            }
          })
        })
      })

      const getRgbaColor = () => {
        return Math.floor(Math.random() * 255)
      }

      return {
        history,
        data,
        handleClick,
        message,
        getRgbaColor
      }
    }
  })
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-wrap: nowrap;
  margin: 0 !important;
}

.side-container {
  width: 100%;
  height: 100%;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.side-menu {
  border: none;
  background: none;
}

.group-menu {
  background-color: none;
}

.main-container {
  height: 100%;
  padding: 10px 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

.card-container {
  width: 500px;
  margin: 10px 10px;
  display: inline-block;
  cursor: pointer;
}

.card {
  display: flex;
  flex-wrap: nowrap;
  background-color: #FFFFFF63;
  border: none;
}

.card-left-img {
  width: 150px;
  height: 150px;
  display: inline-block;
}

.card-right-container {
  width: 300px;
  height: 100%;
  margin-left: 10px;
  display: inline-block;
  vertical-align: top;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.card-tags {
  margin: 8px 0;
}

.card-tag {
  margin-right: 5px;
  border: none;
}

.card-text {
  display:-webkit-box;/**对象作为伸缩盒子模型展示**/
  -webkit-box-orient:vertical;/**设置或检索伸缩盒子对象的子元素的排列方式**/
  -webkit-line-clamp:3;/**显示的行数**/
  overflow:hidden;
  margin: 8px 0;
}

</style>
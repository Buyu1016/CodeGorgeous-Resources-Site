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
            <span>{{item.valueName}}</span>
          </template>
          <el-menu-item
            v-for="(childrenItem, key) in item.children"
             :key="key"
            :index="`${index}-${key}`"
            @click="handleClick"
          >
            <span>{{childrenItem.valueName}}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col
      :span="20"
      class="main-container"
    >
        <div
          v-for="(item ,index) in message"
          :key="item.id"
          class="card-container"
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
                :fit="cover"
              />
            </div>
            <div
              class="card-right-container"
            >
              <p class="card-title">{{item.title}}</p>
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
        </div>
    </el-col>
  </el-row>
</template>

<script>
  import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
  import * as icons from '@element-plus/icons'

  export default defineComponent({
    components: {
      ...icons
    },
    props: {},
    setup (props, context) {
      
      const history = ref('0-0')

      const data = ref([{
        valueName: '前端',
        children: [{
            valueName: 'Vue'
          }, {
            valueName: 'react'
          }]
      }, {
        valueName: '后端',
        children: [{
          valueName: 'NodeJs',
        }, {
          valueName: 'Java'
        }]
      }, {
        valueName: '其他'
      }])

      const message = ref([{
        id: 1,
        url: '#',
        title: '网站1',
        introduce: '这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍这是一个介绍',
        image: 'https://img0.baidu.com/it/u=810160506,373635054&fm=26&fmt=auto',
        tags: ['标签1', '标签2']
      }, {
        id: 2,
        url: '#',
        title: '网站2',
        introduce: '这是一个介绍',
        image: 'https://img0.baidu.com/it/u=810160506,373635054&fm=26&fmt=auto',
        tags: ['标签1', '标签2']
      }, {
        id: 3,
        url: '#',
        title: '网站3',
        introduce: '这是一个介绍',
        image: 'https://img0.baidu.com/it/u=810160506,373635054&fm=26&fmt=auto',
        tags: ['标签1', '标签2']
      }, {
        id: 4,
        url: '#',
        title: '网站4',
        introduce: '这是一个介绍',
        image: 'https://img0.baidu.com/it/u=810160506,373635054&fm=26&fmt=auto',
        tags: ['标签1', '标签2']
      }, {
        id: 5,
        url: '#',
        title: '网站5',
        introduce: '这是一个介绍',
        image: 'https://img0.baidu.com/it/u=810160506,373635054&fm=26&fmt=auto',
        tags: ['标签1', '标签2']
      }])

      const handleClick = (key, keyPath) => {
        history.value = key.index
      }

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
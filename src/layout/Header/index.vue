<template>
  <div class="m-layout-header">
    <div class="header">
      <div class="left"></div>
      <div class="tool-bar-right">
        <div class="m-info">
          <el-popover width="200px" placement="bottom">
            <template #reference>
              <el-badge :value="1" class="item-info-pop">
                <el-icon class="bell" style="font-size: 20px"><Bell /></el-icon>
              </el-badge>
            </template>
            <div class="right-item-menu">
              <el-tabs
                v-model="activeName"
                class="demo-tabs"
                @tab-click="handleClick"
              >
                <el-tab-pane label="通知" name="first">
                  <div class="item-child">
                    GitHub开源地址：<el-button
                      type="primary"
                      link
                      @click="
                        toGitHub(
                          'https://github.com/zouzhibin/vue-admin-perfect'
                        )
                      "
                      >点我</el-button
                    >
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-popover>
        </div>
        <el-dropdown @command="commandAction">
          <span class="el-dropdown-link">
            <el-avatar :size="30" class="avatar" :src="AvatarLogo" />
            admin
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="2">
                <el-icon><Edit /></el-icon>修改密码</el-dropdown-item
              >
              <el-dropdown-item :command="1" divided>
                <el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TabsPaneContext, ElMessageBox, ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import router from '@/router';

import AvatarLogo from '@/assets/image/avatar.png';

const userStore = useUserStore();

const activeName = ref('first');
const toGitHub = (link) => {
  window.open(link);
};

const logOut = async () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await userStore.logout();
      await router.push({ path: '/login' });
      //TagsViewStore.clearVisitedView();
      ElMessage({
        type: 'success',
        message: '退出登录成功！',
      });
    })
    .catch(() => {});
};
const commandAction = (key: number) => {
  switch (key) {
    case 1:
      logOut();
      break;
  }
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped>
.avatar {
  margin-right: 6px;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.mobile {
  .m-layout-header {
    left: 0 !important;
    width: 100% !important;
  }
}
.header {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 10px 0 0;
  box-sizing: border-box;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .tool-bar-right {
    display: flex;
    align-items: center;
    .right-item-menu {
      margin-right: 22px;
    }
  }
}
.zb-fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
}
.zb-no-fixed-header {
  width: 100% !important;
}

.m-layout-header {
  width: 100%;
  background: white;
  transition: width 0.28s;
  flex-shrink: 0;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.fixed-header-collapse {
  width: calc(100% - 60px);
}
.fixed-header-no-collapse {
  width: calc(100% - 210px);
}
.el-dropdown {
  display: flex;
  height: 100%;
  align-items: center;
}

.transverseMenu {
  display: flex;
  .el-menu {
    overflow: hidden;
  }
  .tool-bar-right {
    display: flex;
    justify-content: flex-end;
    min-width: 300px;
    flex-shrink: 0;
  }
}
.m-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  .item-info-pop {
    display: flex;
    align-items: center;
  }
  .bell {
    color: black;
  }
  .item-child {
    display: flex;
    align-items: center;
    font-size: 13px;
  }
}
::v-deep(.el-divider--horizontal) {
  margin-bottom: 10px;
  margin-top: 10px;
}
.transverseMenu {
  .bell {
    color: white;
  }
}
</style>

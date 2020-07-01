<!-- Layout -->
<template>
  <div class='layout'>
    <div class='layout-header'>
      <div class='logoPart'>
        <img :src="logo" alt="">
      </div>
      <div class="topMemuPart">
        <el-menu class='topMenu' mode="horizontal">
          <el-menu-item index='1.1' @click="onChangePage(true,'/app1/#/app1-home')">
            <svg-icon iconClass='qq'></svg-icon> <span>app1-home</span>
          </el-menu-item>
          <el-menu-item index='1.2' @click="onChangePage(true,'/app1/#/app1-about')">
            <svg-icon iconClass='search'></svg-icon> <span>app1-about</span>
          </el-menu-item>
          <el-menu-item index='1.3' @click="onChangePage(true,'/app2/#/app2-home')">
            <svg-icon iconClass='star'></svg-icon> <span>app2-home</span>
          </el-menu-item>
          <el-menu-item index='1.4' @click="onChangePage(true,'/app2/#/app2-about')">
            <svg-icon iconClass='component'></svg-icon> <span>app2-about</span>
          </el-menu-item>
          <el-menu-item index='1.5' @click="onChangePage(false,'/#/master-index')">
            <svg-icon iconClass='component'></svg-icon> <span>master-index</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class='layout-content'>
      <div class='content-sideBar' :style="isCollapse?'width:64px':'width:200px'">
        <!-- <el-button @click="goUrl(true,'/app1/#/index')">Subapp-index</el-button>
        <el-button @click="goUrl(false,'/#/index')">Main-index</el-button>
        <el-button @click="goUrl(false,'/#/login')">MainLogin</el-button> -->
        <el-menu :unique-opened="true" class='sidebarMenu' :collapse="isCollapse">
          <el-submenu index='1'>
            <template slot="title">
              <svg-icon iconClass='component'></svg-icon>
              <!-- <i class='el-icon-eleme'></i> -->
              <span>导航一</span>
            </template>
            <el-menu-item index='1.1'>
              <svg-icon iconClass='qq'></svg-icon> <span>导航1-1</span>
            </el-menu-item>
            <el-menu-item index='1.2'>
              <svg-icon iconClass='search'></svg-icon> <span>导航1-2</span>
            </el-menu-item>
            <el-menu-item index='1.3'>
              <svg-icon iconClass='star'></svg-icon> <span>导航1-3</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index='2'>
            <svg-icon iconClass='component'></svg-icon> <span>导航二</span>
          </el-menu-item>
        </el-menu>

        <div class='fold'><i @click='changeCollapse' :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i></div>
      </div>
      <happy-scroll color='red' :style="isCollapse?'width:calc(100% - 64px)':'width:calc(100% - 200px)'">
        <div class='content-viewer'>
          <slot></slot>
        </div>
      </happy-scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FrameWork from "@/components/framework";
export default {
  data() {
    return {
      isSubapp: false,
      isCollapse: false,
      foldName: "fold",
      logo: require("@/assets/image/vbi.png")
    };
  },
  mounted() {},
  components: {
    FrameWork
  },

  computed: {},

  methods: {
    onChangePage(isSubapp, url) {
      this.isSubapp = isSubapp;
      this.routerGo(url);
    },
    routerGo(href = "/", title = null, stateObj = {}) {
      window.history.pushState(stateObj, title, href);
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang='less' scoped>
@sidebarClolr: #415578;
@sidebarActiveBG: #538af1;
@sidebarHoverBG: #d3dff4;
.layout {
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;
  .layout-header {
    width: 100%;
    height: 64px;
    line-height: 64px;
    padding: 0 15px;
    background: url("~@/assets/image/header-bg.png") 100% 100% no-repeat;
    .logoPart {
      width: 180px;
      float: left;
      img {
        width: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .topMemuPart {
      float: left;
      margin-left: 15px;
      .topMenu {
        height: 64px;
        background: transparent;
        border-bottom: 0;
        overflow: hidden;
        .el-menu-item {
          height: 64px;
          color: #fff;
          border: none;
          &.is-active {
            background: #1968e2;
          }
          &:hover {
            background: transparent;
          }
        }
      }
    }
  }
  .layout-content {
    width: 100%;
    height: calc(100% - 64px);
    .content-sideBar {
      width: 200px;
      float: left;
      height: 100%;
      position: relative;
      transition: width 0.4s;
      .el-menu.sidebarMenu {
        height: 100%;
        padding-bottom: 50px;
        .el-menu-item {
          color: @sidebarClolr;
          font-weight: 700;
          font-size: 15px;
          &.is-active {
            color: #fff;
            background-color: @sidebarActiveBG;
          }
          &:hover:not(.is-active) {
            background-color: @sidebarHoverBG;
          }
        }
        .el-submenu {
          /deep/ .el-submenu__title {
            svg {
              margin-right: 5px;
            }
            color: @sidebarClolr;
            font-weight: 700;
            font-size: 15px;
          }
        }
        &:not(.el-menu--collapse) {
          width: 200px;
          min-height: 100%;
        }
      }
      .fold {
        position: absolute;
        height: 50px;
        line-height: 55px;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 15px;
        text-align: center;
        i {
          font-size: 28px;
          color: #9faabd;
          cursor: pointer;
        }
      }
    }
    .happy-scroll {
      transition: width 0.4s;
      /deep/ .happy-scroll-container {
        height: 100% !important;
        width: 100% !important;
        .happy-scroll-content {
          width: 100%;
          height: 100%;
          .content-viewer {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
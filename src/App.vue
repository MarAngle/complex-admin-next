
<style lang="less">
@import "~@main/style/index.less";
#app {
  width: 100%;
  height: 100%;
}

.local-color-primary {
  color: @PrimaryColor !important;
}
.local-color-success {
  color: @SuccessColor !important;
}
.local-color-warn {
  color: @WarnColor !important;
}
.local-color-danger {
  color: @DangerColor !important;
}
.local-color-disabled {
  color: @DisabledColor !important;
}

.local-text-color {
  color: @TextColor !important;
}
.local-text-color-head {
  color: @TextHeadColor !important;
}
.local-text-color-secondary {
  color: @TextSecondaryColor !important;
}

.local-border-color {
  color: @BorderColor !important;
}

.local-disabled {
  cursor: not-allowed;
}

</style>

<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>
<script>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  dayjs.locale('zh-cn');

  export default {
    data() {
      return {
        locale: zhCN,
      };
    },
  };
</script>

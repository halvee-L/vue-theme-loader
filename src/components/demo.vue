<template>
  <div class="theme-demo">
    <div class="btn__operate">
      <button class="btn__default" @click="change('default')">默认主题</button>
      <button class="btn__red" @click="change('red')">红色主题</button>
      <button class="btn__black" @click="change('black')">黑色主题</button>
    </div>
    <div class="panel">
      我是面板1,通过样式属性控制主题
    </div>
    <div class="panel2">
      我是面板2,通过class类名控制主题
    </div>
    <div class="panel3">
      我是锁定主题的面板，一般用于样式块或者调试【属性样式】
      <br />
      本案例不生效，需要修改vue-loader。。。暂时没找到其它入口
    </div>
    <div class="panel4">
      我是锁定主题的面板，一般用于样式块或者调试【类名样式】
      <br />
      本案例不生效，需要修改vue-loader。。。暂时没找到其它入口
    </div>
    <div class="panel5">
      我是锁定主题的面板，但申明拥有其它主题样式【锁定无效】
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "defalut"
    };
  },
  watch: {
    theme(n) {
      document.body.className = n;
    }
  },
  methods: {
    change(theme) {
      this.theme = theme;
    }
  }
};
</script>

<style lang="scss">
.btn__operate {
}
.btn__default {
  border: 1px solid #498dff;
  color: #498dff;
}
.btn__red {
  border: 1px solid red !important;
  color: red !important;
}

.btn__black {
  border: 1px solid black !important;
  color: black !important;
}

.panel__base {
  margin-top: 20px;
  width: 500px;
  height: 50px;
  text-align: center;
  padding: 20px;
  border-radius: 20px;
  margin: 50px auto;
}
.panel {
  border: 1px solid #498dff;
  --red--border-color: red;
  --black--border-color: black;
  color: #498dff;
  --red--color: red;
  --black--color: black;
  @extend .panel__base;
}
.panel2 {
  @extend .panel__base;
  background-color: #498dff;
  color: white;
}
.--red--panel2 {
  background-color: red;
}
.--black--panel2 {
  background-color: black;
}

.panel3 {
  @extend .panel__base;
  border: 1px solid #498dff;
  color: #498dff;
}
.panel4 {
  @extend .panel__base;
  background-color: #498dff;
  color: white;
  --red--color: red;
  --default--color: #498dff;
  --black--color: black;
}
.panel5 {
  @extend .panel__base;
  border: 1px solid #498dff;
  color: #498dff;
}
</style>

<style lang="scss" theme="black">
// theme 可以锁定当块样式块生效的样式   但不建议全局使用  只做调试使用
// 通过postcssrc配置 无法锁定样式   建议通过dom追加class调试
.panel3 {
  border: 1px solid #498dff;
  --red--border-color: red;
  --black--border-color: black;
  color: #498dff;
  --red--color: red;
  --black--color: black;
}
.--black--panel4 {
  background-color: black;
}
.--red--panel5 {
  border-color: red;
  color: red;
}
</style>

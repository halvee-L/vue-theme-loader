# vue-theme-loader

```

<style lang="scss">

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
```

```

<style lang="scss" theme="black">
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
```

### 打包后

```
file:///app.red.css

.panel5,
.red .panel,
.red .panel3 {
  border-color: red;
  color: red;
}
.panel2 {
  background-color: red;
}
.red .panel4 {
  color: red;
}

```

```
file:///app.black.css

.black .panel3 {
  border-color: #000;
  color: #000;
}
.panel4 {
  background-color: #000;
}
.black .panel {
  border-color: #000;
  color: #000;
}
.panel2 {
  background-color: #000;
}
.black .panel4 {
  color: #000;
}


```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

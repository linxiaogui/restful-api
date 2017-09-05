<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
#app {
	position: relative;
	width: 100%;
	height: 100%;
}

</style>

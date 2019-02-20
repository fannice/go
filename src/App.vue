<template>
  <div id="app">
  
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 10rem; height: auto;margin: 0 auto;min-width: 320px;max-width:750px;
  background-color: #f0f0ff
}
@media screen and (min-width: 320px) {
     #app{font-size: 14px}
}
@media screen and (min-width: 375px) {
     #app{font-size: 16px}
}
@media screen and (min-width: 640px) {
     #app{font-size: 24px}

}


</style>

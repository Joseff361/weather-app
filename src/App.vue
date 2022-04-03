<template>
  <main class="main">
    <HomeView />
  </main>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    HomeView: defineAsyncComponent(() => import('@/views/HomeView.vue')),
  },
});
</script>
<style lang="scss" scoped>
.main {
  height: 100vh;
}
</style>

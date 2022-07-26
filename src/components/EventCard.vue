<template>
  <div class="event">
    <div class="item">
      <router-link :to="{ name: event.name }">
        <h2>{{ event.title }}</h2>
        <img :src="event.src" class="image" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: ['event'],
}
</script>

<style scoped>

</style>
<template>
  <div class="event">
    <div class="tile is-12">
      <router-link :to="{ name: event.name }">
        <div class="details">
          <img :src="event.src" class="image" />
          <h2>{{ event.title }}</h2>
        </div>
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

<style scoped src="bulma/css/bulma.min.css"></style>

<style scoped>
  .event {
    text-align: center;
  }
</style>
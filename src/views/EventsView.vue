<template>
  <main class="eventsView">
    <section class="events">
      <EventCard 
        v-for="event in events"
        :key="event.title"
        :event="event"
      />
    </section>
  </main>
</template>

<script>
import EventCard from '../components/EventCard.vue';

  export default {
    name: 'EventsView',
    components: {
      EventCard
    },
    data() {
      return {
        events: [
          {
            title: 'Long Jump',
            src: require('../assets/long-jump-w.png'),
            name: 'longjump',
          },
          {
            title: 'Sprint',
            src: require('../assets/long-jump-w.png'),
            name: 'settings',
          },
          {
            title: 'Shotput',
            src: require('../assets/long-jump-w.png')
          }
        ],
      }
    },
  }
</script>

<style scoped>

</style>
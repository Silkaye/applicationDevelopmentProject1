<template>
  <main class="eventsView">
    <section class="events">
      <div class="tileholder">
        <div class="tile is-ancestor">
          <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
              <EventCard :event="events[0]" />
            </div>
            <div class="tile is-child box">
              <EventCard :event="events[1]" />
            </div>
          </div>
          <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
              <EventCard :event="events[0]" />
            </div>
            <div class="tile is-child box">
              <EventCard :event="events[1]" />
            </div>
          </div>
          <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
              <EventCard :event="events[0]" />
            </div>
            <div class="tile is-child box">
              <EventCard :event="events[1]" />
            </div>
          </div>
        </div>
      </div>
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
            src: require('../assets/long-jump.png'),
            name: 'longjump',
          },
          {
            title: 'Sprint',
            src: require('../assets/long-jump.png'),
            name: 'settings',
          },
          {
            title: 'Shotput',
            src: require('../assets/long-jump.png')
          }
        ],
        eventSelected: false
      }
    },
  }
</script>

<style scoped src="bulma/css/bulma.min.css"></style>

<style scoped>
  .tileholder {
    max-width: 1000px;
  }

  .events {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box {
    background-color: var(--dark);
    transition: 0.2s ease-in-out;
  }

  .box:hover {
    background-color: var(--dark-alt);
    transition: 0.2s ease-in-out;
  }
</style>
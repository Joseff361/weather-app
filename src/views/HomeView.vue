<template>
  <section :class="['content', { '--warm': isWarm }]">
    <div class="content__degree">
      <h1 class="content__title">The WeatherApp</h1>
      <div class="content__search-box">
        <input
          class="content__search-input"
          type="text"
          placeholder="Search..."
          v-model="city"
          @keypress.enter="fecthWeather"
        />
      </div>
      <div v-if="weather" class="content__weather-wrap">
        <div class="content__location-box">
          <div class="content__location">{{ location }}</div>
          <div class="content__date">{{ date }}</div>
        </div>

        <div class="content__weather-box">
          <div class="content__temp">{{ temperature }}°C</div>
          <div class="content__weather">{{ climate }}</div>
        </div>
      </div>
      <div v-else class="content__weather-wrap --empty">
        <img src="@/assets/empty.png" alt="empty image" />
        <div class="content__empty-msg">
          Enter the city name to start the search!
        </div>
        <a
          href="https://en.wikipedia.org/wiki/Lists_of_cities_by_country"
          target="_blank"
        >
          Look for available city names
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import weatherApi from '@/api/weatherApi';
import Weather from '@/shared/interfaces';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const city = ref('');
    const weather = ref<Weather>();

    const fecthWeather = async () => {
      try {
        const { data } = await weatherApi.get<Weather>('', {
          params: {
            q: city.value,
          },
        });

        weather.value = data;
      } catch (e) {
        console.log('error', e);
      }
    };

    return {
      city,
      weather,
      fecthWeather,
      location: computed(
        (): string => `${weather.value?.name}, ${weather.value?.sys.country}`
      ),
      temperature: computed((): number =>
        Math.round(weather.value?.main.temp as number)
      ),
      date: computed((): string =>
        new Date((weather.value?.dt as number) * 1000).toDateString()
      ),
      climate: computed((): string => weather.value?.weather[0].main as string),
      isWarm: computed(
        (): boolean => (weather.value?.main.temp as number) > 16
      ),
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  min-height: 100vh;
  background-size: cover;
  transition: 0.4s;
  background-image: url('@/assets/cold-bg.jpg');

  &.--warm {
    background-image: url('@/assets/warm-bg.jpg');
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
  }

  &__degree {
    position: relative;
    color: #fff;
  }

  &__title {
    text-align: center;
    padding-top: 40px;
    font-size: 60px;
  }

  &__search-box {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }

  &__search-input {
    appearance: none;
    border: none;
    outline: none;
    background: none;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);

    color: #313131;
    width: 500px;
    padding: 15px;
    font-family: inherit;
    transition: 0.4s;
    font-size: 20px;

    &:focus {
      background-color: rgba(255, 255, 255, 0.75);
      border-radius: 16px 0px 16px 0px;
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    }
  }

  &__weather-wrap {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 40px;
    color: #fff;
    text-align: center;
  }

  &__location {
    font-size: 32px;
    font-weight: 500;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }

  &__date {
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
  }

  &__weather-box {
    margin-top: 40px;
  }

  &__temp {
    display: inline-block;
    padding: 10px 25px;
    font-size: 102px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    box-shadow: 3px 6px rgba(0, 0, 0, 0.15);
  }

  &__weather {
    padding-top: 30px;
    font-size: 48px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  &__empty-msg {
    margin-top: 20px;
    font-weight: 800;
  }

  img {
    max-width: 100%;
  }

  a {
    display: block;
    padding-top: 20px;
    color: #fff;
    font-style: italic;
  }
}

@media (max-width: 576px) {
  .content {
    &__title {
      font-size: 30px;
    }

    &__weather-wrap {
      width: 100%;

      &.--empty {
        font-size: 12px;
      }
    }

    &__search-input {
      width: 80%;
      font-size: 14px;
    }

    &__temp {
      font-size: 50px;
    }

    img {
      max-width: 50%;
    }
  }
}
</style>

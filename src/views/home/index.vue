<template>
  <div style="margin: 20px"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { request } from '@/utils/request';
import type * as Index from './types/index';

function getWeatherInfoApi() {
  return request<Index.WeatherResponseData>({
    url: 'api/weather/city/101030100',
    method: 'get',
  });
}

onMounted(async () => {
  const data3 = await getWeatherInfoApi();

  console.log(data3);

  console.log('温度：' + data3.data.wendu);
});
</script>

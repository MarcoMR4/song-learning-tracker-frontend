<template>
	<q-card class="q-pa-md q-mb-md">
		<q-card-section>
			<VueApexChart
				v-if="series.length > 0"
				type="donut"
				height="350"
				:options="chartOptions"
				:series="series"
			/>
			<div v-else class="q-mt-md text-grey text-center">No song tracking data available.</div>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: "auth",
  layout: "system",
});

import VueApexChart from 'vue3-apexcharts'

import { useSongTrackingCrud } from '@/composables/useSongTrackingCrud'

const { songTrackings, fetchSongTrackings } = useSongTrackingCrud()

onMounted(() => {
	fetchSongTrackings()
})

const instrumentCounts = computed(() => {
  const counts: Record<string, { name: string, count: number }> = {}
  for (const t of songTrackings.value) {
    const inst = t.instrument?.name || 'Unknown'
    if (!counts[inst]) counts[inst] = { name: inst, count: 0 }
    counts[inst].count++
  }
  return Object.values(counts)
})

const sortedInstruments = computed(() => {
	return [...instrumentCounts.value].sort((a, b) => b.count - a.count)
})

const chartData = computed(() => {
	if (sortedInstruments.value.length <= 15) {
		return sortedInstruments.value
	} else {
		const top = sortedInstruments.value.slice(0, 14)
		const othersCount = sortedInstruments.value.slice(14).reduce((sum, i) => sum + i.count, 0)
		return [...top, { name: 'Others', count: othersCount }]             
	}
})

const series = computed(() => chartData.value.map(i => i.count))

const chartOptions = computed(() => ({
	labels: chartData.value.map(i => i.name),
	legend: { position: 'bottom' as const },
	title: { text: 'Song Trackings by Instrument', align: 'center' as const },
	plotOptions: {
		pie: {
			donut: {
				labels: {
					show: true,
					total: {
						show: true,
						label: 'Total of trackings',
						fontSize: '15px',
						color: '#333',
						formatter: () => series.value.reduce((a, b) => a + b, 0).toString()
					}
				}
			}
		}
	},
	responsive: [{ breakpoint: 600, options: { legend: { position: 'bottom' as const } } }]
}))

</script>
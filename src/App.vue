<template>
	<v-app>
		<v-app-bar
			app
			color="indigo"
			dark
		>
		<h1 class="pl-5">AGENCE</h1>
			<v-spacer></v-spacer>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
				/>

				<v-img
					alt="Vuetify Name"
					class="shrink mt-1 hidden-sm-and-down mr-5"
					contain
					min-width="100"
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
					width="100"
				/>
			</div>

			

		</v-app-bar>

		<v-content>
			<v-row dense>
				<v-col cols="12" sm="5">
					<Consultores></Consultores>
				</v-col>
				<v-col cols="12" sm="7">
					<Relatorio v-if="activarRelatorio"></Relatorio>
					<Grafico v-if="activarGrafico"></Grafico>
					<Pizza v-if="activarPizza"></Pizza>  
				</v-col>
			</v-row>
			<v-row>
				
			</v-row>
		</v-content>
	</v-app>
</template>

<script>
import Consultores from '@/components/Consultores.vue'
import Relatorio from '@/components/Relatorio.vue'
import Grafico from '@/components/Grafico.vue'
import Pizza from '@/components/Pizza.vue'
import { mapState } from 'vuex'

export default {
	name: 'App',

	components: {
		Consultores,
		Relatorio,
		Grafico,
		Pizza
	},
	data: () => ({
	}),
	computed: {
		...mapState(["activarRelatorio", "activarPizza", "activarGrafico"])
	}
};
</script>

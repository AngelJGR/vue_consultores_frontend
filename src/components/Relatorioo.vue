<template>
	<v-container>
		<v-card class="mx-auto my-12">
			<v-app-bar
				dark
				color="secondary"
			>
				<v-card-title>{{item.no_usuario}}</v-card-title>
			</v-app-bar>
		</v-card>

				
	</v-container>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		data (){

		},
		computed: {
			...mapState(["relatorio", "meses"])
		}
	}
</script>	
<template>
<v-container>
	<Pie
      v-if="loaded"
      :chartdata="objeto"
      :options="opciones"/>
</v-container>
</template>
<script>
	import { mapState } from 'vuex'
	import Pie from './Pie.vue'
	export default {
		name: "Grafico",
		components: { Pie },
		data () {
			return {
				loaded: false,
				objeto: {},
				opciones: {
					maintainAspectRatio: false,
					cutoutPercentage: 0
				}
			}
		},
		computed: {
			...mapState(["relatorio"])
		},
		methods: {
			renderizar(){

				var chartColors = [
					'rgb(255, 205, 86)',
					'rgb(255, 99, 132)',
					'rgb(201, 203, 207)',
					'rgb(255, 159, 64)',
					'rgb(54, 162, 235)',
					'rgb(75, 192, 192)',
					'rgb(153, 102, 255)'
				];

				var obj = {
					datasets: [{
						data: [],
						backgroundColor: chartColors
					}], 
					labels: []
				};

				const consultores = this.relatorio.map(e => {
					return {co_usuario: e.co_usuario, no_usuario: e.no_usuario}
				}).filter((value, index, self) => self.findIndex(i => i.co_usuario === value.co_usuario) === index);

				const total = this.relatorio.reduce((a, b) => a + b.receita_liquida, 0);

				consultores.forEach((value, index, array) => {
					let totalConsultor = this.relatorio.filter(e => e.co_usuario === value.co_usuario).map(i => i.receita_liquida).reduce((a,v) => a+v);
					
					let porcentaje = (100 * totalConsultor) / total;
					/*obj.datasets[index].data.push( {
						y: porcentaje,
						labels: 
					});*/
					obj.datasets[0].data.push(porcentaje.toFixed(2));
					obj.labels.push(value.no_usuario);
				});
				console.log(obj);
				return obj;
				
			}

		},
		mounted(){
			this.loaded = false;
			this.objeto = this.renderizar();
			this.loaded = true;
		}

	}
</script>
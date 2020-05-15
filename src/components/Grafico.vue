<template>
<v-container>
	<Chart
      v-if="loaded"
      :chartdata="objeto"
      :options="opciones"/>
</v-container>
</template>
<script>
	import Chart from './Chart.vue'
	import { mapState } from 'vuex'

	export default {
		name: "Grafico",
		components: { Chart },
		data (){
			return {
				loaded: false,
				objeto: {},
				opciones: {

					maintainAspectRatio: false,
					scales: {
						xAxes: [{
							type: 'time',
							distribution: 'spread',
							time: {
								unit: 'month'
							},
						}]
					}
				}
			}
				
		},
		computed: {
			...mapState(["relatorio"])
		},
		methods: {


			getPromedioGrafico (grafico) {
				let custo_fixo = grafico.map(e => e.custo_fixo).reduce((accum, current) => accum + current);
				return custo_fixo / grafico.length;
			},
			
			renderizar(){
				//Para estilizar las barras
				var obj = {
					datasets: []
				};
				var chartColors = [
					'rgb(255, 205, 86)',
					'rgb(255, 99, 132)',
					'rgb(201, 203, 207)',
					'rgb(255, 159, 64)',
					'rgb(54, 162, 235)',
					'rgb(75, 192, 192)',
					'rgb(153, 102, 255)'
				];


				var cont = 0;
				const periodo = this.relatorio.map(e => {
					return {anio: e.anio, mes: e.mes}
				//}).filter((value, index, self) => console.log(index));
			}).filter((value, index, self) => self.findIndex(i => i.anio === value.anio && i.mes === value.mes) === index);

				
				console.log(periodo) ;
				new Date(periodo[0].anio, periodo[0].mes, 1)
				this.opciones.scales.xAxes.push({ticks: {
					min: new Date(periodo[0].anio, periodo[0].mes, 1), 
					max: new Date(periodo[periodo.length-1].anio, periodo[periodo.length-1].mes, 30)
				} })

				const custo_fixo_promedio = this.getPromedioGrafico(this.relatorio);

				//PARA LLENAR LA DATA DEL PROMEDIO
				obj.datasets.push({
					type: "line",
					fill: false,
					label: "Promedio",
					backgroundColor: "blue",
					data: []
				});

				for(let item of periodo) {
					//LLenado de la linea
					obj.datasets[0].data.push( {
						x: new Date(item.anio, item.mes-1),
						//x: mes_anio[1],
						y: custo_fixo_promedio
					});
				};

				//PARA LLENAR LAS BARRAS DE LOS CONSULTORES
				const consultores = this.relatorio.map(e => {
					return {co_usuario: e.co_usuario, no_usuario: e.no_usuario}
				}).filter((value, index, self) => self.findIndex(i => i.co_usuario === value.co_usuario) === index);

				consultores.forEach((value, index, array) => {
					obj.datasets.push({
						label: value.no_usuario,
						backgroundColor: chartColors[index+1],
						fill: false,
						data: []
					});
					const consultorActual = this.relatorio.filter(e => e.co_usuario === value.co_usuario);
					for(let item of consultorActual) {
						//Llenado de las barras
						obj.datasets[index+1].data.push( {
							x: new Date(item.anio, item.mes-1),
							//x: item.mes,
							y: item.receita_liquida
						});
					}
				});
				return obj;
			}
		},

		watch: {
			
		},
		mounted() {
			this.loaded = false;
			this.objeto = this.renderizar();
			this.loaded = true;
		}
		
	}
</script>
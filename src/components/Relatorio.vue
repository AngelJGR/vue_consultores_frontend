<template>
	<v-container>
		<div v-for="(item, index) in relatorio" v-bind:key="index"> <!-- FOR -->
			<div v-if="index === 0 || item.co_usuario !== relatorio[index-1].co_usuario">
				<v-card class="mx-auto my-12">
					<v-app-bar
						dark
						color="indigo"
					>
						<v-card-title>{{item.no_usuario}}</v-card-title>
					</v-app-bar>
					

					<v-data-table
						:headers="headers"
						:items="listarConsultores(item.co_usuario)"
						class="elevation-1"
						disable-pagination
						hide-default-footer
					>
					</v-data-table>
					<v-simple-table>
						<template slot="default">
							<tr class="grey lighten-2">
								<td class="text-end"></td>
								<td class="text-start"><strong>TOTAL:</strong></td>
								<td class="text-start">
									{{ relatorio | filtrar(item, "receita_liquida") }}
								</td>
								<td class="text-start">{{ relatorio | filtrar(item, "custo_fixo") }}</td>
								<td class="text-start">{{ relatorio | filtrar(item, "comissao") }}</td>
								<td class="text-start">{{ relatorio | filtrar(item, "lucro") }}</td>
							</tr>
						</template>
					</v-simple-table>
				</v-card>
			</div>

		</div><!-- FIN FOR -->
		
	</v-container>
</template>
<script>


	import { mapState } from 'vuex'
	export default {
		data () {
			return {
				consultor: [],
				headers: [
					{
						align: 'end',
						sortable: false,
						value: 'name'
					},
					{text: "Periodo", value: "periodo"},
					{text: "Receita Liquida", value: "receita_liquida_f"},
					{text: "Custo Fixo", value: "custo_fixo_f"},
					{text: "Comissao", value: "comissao_f"},
					{text: "Lucro", value: "lucro_f"}
				],
				data: {},

			}
		},
		computed: {
			...mapState(["relatorio", "meses"])
		},
		methods: {
			listarConsultores(co_usuario) {
				var options = { style: 'currency', currency: 'USD' };
				var formatNumber = Intl.NumberFormat('en-US', options);
				var total_receita = 0;
				var total_custo = 0;
				var total_comissao = 0;
				var total_lucro = 0;
				var items = this.relatorio.filter(element => element.co_usuario === co_usuario);
				//Dando formatos a los elementos a mostrar y acumulando el total
				items.forEach(element => {
					element.periodo = this.getPeriodo(element.mes, element.anio, this.meses);
					element.receita_liquida_f = formatNumber.format(element.receita_liquida);
					total_receita = total_receita + element.receita_liquida;
					element.custo_fixo_f = formatNumber.format(element.custo_fixo);
					total_custo = total_custo + element.custo_fixo;
					element.comissao_f = formatNumber.format(element.comissao);
					total_comissao = total_comissao + element.comissao;
					element.lucro = element.receita_liquida - (element.custo_fixo + element.comissao);
					element.lucro_f = formatNumber.format(element.lucro);
					total_lucro = total_lucro + element.lucro;
				});
				return items;
			},
			getPeriodo (mes, anio, objetoMes) {
				var { nombre } = objetoMes.find(m => m.mes == mes);
				return nombre + " de " + anio;
			},
			sumarTotal(item){
				console.log(item)
			}
		},
		filters: {
			filtrar(value, item, op){
				var options = { style: 'currency', currency: 'USD' };
				var formatNumber = Intl.NumberFormat('en-US', options);
				const total = value.filter(e => e.co_usuario === item.co_usuario)
					.map(i => {
						switch(op){
							case "receita_liquida":
								return i.receita_liquida;
								break;
							case "custo_fixo":
								return i.custo_fixo;
								break;
							case "comissao":
								return i.comissao;
								break;
							case "lucro":
								return i.lucro;
								break;
							default:
								return "error";
						}
					})
					.reduce((acum, current) => acum + current);
				return formatNumber.format(total);
			},
			filtrarConsultores(value) {
				console.log(value);
			}
		}
	}
</script>
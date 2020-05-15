<template>
	<v-container>

		<v-card>

			<v-toolbar
				color="indigo"
				dark
			>
				<v-toolbar-title class="pl-5">Seleccione</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-toolbar>
		
		<v-row>
			<v-col cols="6" sm="4" class="mx-auto">
				<v-menu
					ref="menu1"
					v-model="menu1"
					:close-on-content-click="false"
					:return-value.sync="dateMin"
					transition="scale-transition"
					offset-y
					max-width="290px"
					min-width="290px"
				>
					<template v-slot:activator="{ on }">
						<v-text-field
							v-model="dateMin"
							label="Fecha desde"
							prepend-icon="mdi-calendar"
							readonly
							v-on="on"
							color="blue"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="dateMin"
						type="month"
						no-title
						scrollable
						:min="fecha_minima"
						:max="fecha_maxima"
					>
						<v-spacer></v-spacer>
						<v-btn text	color="secondary" @click="menu1 = false">Cancel</v-btn>
						<v-btn text color="secondary" @click="$refs.menu1.save(dateMin)">OK</v-btn>
					</v-date-picker>
				</v-menu>
			</v-col>

			<v-col cols="6" sm="4" class="mx-auto">
				<v-menu
					ref="menu2"
					v-model="menu2"
					:close-on-content-click="false"
					:return-value.sync="dateMax"
					transition="scale-transition"
					offset-y
					max-width="290px"
					min-width="290px"
				>
					<template v-slot:activator="{ on }">
						<v-text-field
							v-model="dateMax"
							label="Fecha hasta"
							prepend-icon="mdi-calendar"
							readonly
							v-on="on"
							color="blue"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="dateMax"
						type="month"
						no-title
						scrollable
						:min="fecha_minima"
						:max="fecha_maxima"
					>
						<v-spacer></v-spacer>
						<v-btn text color="secondary" @click="menu2 = false">Cancel</v-btn>
						<v-btn text color="secondary" @click="$refs.menu2.save(dateMax)">OK</v-btn>
					</v-date-picker>
				</v-menu>
			</v-col>

		</v-row>

		<v-row>
			<v-col cols="12" sm="10" class="mx-auto">
				<v-select
					v-model="seleccionados"
					:items="consultores"
					item-value = "co_usuario"
					item-text= "no_usuario"
					label="Select"
					multiple
					chips
					small-chips
					deletable-chips
					
					clearable
					item-color="secondary"
					solo
					prepend-icon="mdi-account"
				></v-select>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" class="d-flex justify-center mb-3">
				<v-btn class="ma-1" color="indigo" dark elevation=5 @click="relatorio()">Relatorio</v-btn>
				<v-btn class="ma-1" color="light-blue" dark elevation=5 @click="grafico()">Grafico</v-btn>
				<v-btn class="ma-1" color="teal darken-3" dark elevation=5 @click="pizza()">Pizza</v-btn>
			</v-col>
		</v-row>


		</v-card>
		<v-snackbar
			v-model="snackbar"
			:timeout="timeout"
			color="error"
		>
			{{ alertMessage }}
			<v-btn
				text
				@click="snackbar = false"
				icon
				dark
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-snackbar>
	</v-container>
</template>


<script>
import { mapMutations } from 'vuex'

	export default {
		name: "Consultores",
		data () {
			return {
				seleccionados: [],
				consultores: [],
				snackbar: false,
				alertMessage: "",
				timeout: 2000,
				dateMin: "",
				dateMax: "",
				menu1: false,
				menu2: false,
				fecha_minima: "",
				fecha_maxima: ""
			}
		},
		methods: {
			...mapMutations(["llenarRelatorio", "cambiarComponentes"]),
			cargarConsultores(){
				this.axios.get("/")
					.then(res => {
						this.consultores = res.data.consultores;
						this.fecha_minima = res.data.rango_fechas[0].fecha_minima.substr(0, 7);
						this.fecha_maxima = res.data.rango_fechas[0].fecha_maxima.substr(0, 7);
						this.dateMin = this.fecha_minima;
						this.dateMax = this.fecha_maxima;
					})
					.catch(e => console.log(e));
			},
			relatorio(){
				this.consultar();
				this.cambiarComponentes([true, false, false]);
			},
			grafico(){
				this.cambiarComponentes([false, false, false]);
				this.consultar().then(res => {
					this.cambiarComponentes([false, true, false]);
				});
			},
			pizza(){
				this.cambiarComponentes([false, false, false]);
				this.consultar().then(res => {
					this.cambiarComponentes([false, false, true]);
				});
			},
			consultar(){
				return new Promise((resolve, reject) => {
					if (this.seleccionados.length > 0){
						this.error = false;
						this.axios.post("/", {
							seleccionados: this.seleccionados,
							dateMin: this.dateMin, 
							dateMax: this.dateMax
						})
							.then(res => {
								this.llenarRelatorio(res.data);
								resolve();
							})
							.catch(function (e) {
								console.log(e);
								reject();
							});
					}
					else{
						this.cambiarComponentes([false, false, false]);
						this.snackbar = true;
						this.alertMessage = "Debe seleccionar uno o mas consultores";
					}
				});
			}
		},
		watch: {
			
		},
		mounted(){
			this.cargarConsultores();
		}
	}
</script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	relatorio: [],
  	meses: [],
    activarRelatorio: false,
    activarGrafico: false,
    activarPizza: false
  },
  mutations: {
  	llenarRelatorio(state, data){
  		state.relatorio = data.resultado;
  		state.meses = data.meses;
  	},
    cambiarComponentes(state, data){
      state.activarRelatorio = data[0];
      state.activarGrafico = data[1];
      state.activarPizza = data[2];
    }
  },
  actions: {
  },
  modules: {
  }
})

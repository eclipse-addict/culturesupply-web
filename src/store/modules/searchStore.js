import axios from 'axios'
import router from '../../router';
let baseUrl = process?.env.VUE_APP_DEV === '_ENV_DEVELOPMENT' ? 'http://localhost:8000/' : 'https://www.kickin.co.kr/'
const searchStore ={
  namespaced: true,

  getters: {
    GET_SEARCH_RESULTS(state){
      return state.search_results
    }
  },
  mutations: {
    SET_SEARCH_RESULTS(state, payload){
      state.search_results = payload
    },
    RESET_SEARCH_RESULTS(state){
      state.search_results = []
    }
  },
  actions: {
    BANNER_SEARCH_PRODUCTS({commit, context}, payload){
      console.log('searchStore: ',context, payload, commit) // error prevent code
      let currentDate = new Date();

      // 현재 날짜에서 2주를 뺀 날짜 계산
      let twoWeeksAgo = new Date(1900, 0, 1);

      // 현재 날짜에서 2주를 더한 날짜 계산
      let twoWeeksLater = new Date(
        currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
      );

      // 각 날짜를 원하는 포맷에 맞게 변환
      let twoWeeksAgoFormatted = twoWeeksAgo.toISOString().substring(0, 10);
      let twoWeeksLaterFormatted = twoWeeksLater
        .toISOString()
        .substring(0, 10);

      // 두 날짜를 하나의 문자열로 합침
      let release_date = twoWeeksAgoFormatted + "," + twoWeeksLaterFormatted;
      let search = payload;

      let params = {
        search,
        release_date
      };
      console.log(params);
      axios({
        method: "GET",
        url: this.state.prod_url + "kicks/sneaker/list/",
        params: params,
      })
        .then((res) => {
          if (res) {
            console.log('vuex search res: ', res)
            commit('SET_SEARCH_RESULTS', res.data)
            router.push({
              name: "sneakers",
            });
          } 
        })
        .catch((err) => {
          console.log('vuex search err: ',err);
        });
        
    },
    SET_SEARCH_RESULT({commit}, payload){  
      console.log("SET_SEARCH_RESULTS", payload)
      commit('SET_SEARCH_RESULTS', payload)
    },
    RESET_RESULT({commit}){  
      commit('RESET_SEARCH_RESULTS')
    }
},
state: {
  prod_url : baseUrl,
  keyword: '',
  brand: ["ALL"],
  category: ["All"],
  dates: [],
  serach_results: [],  
},

}


export default searchStore
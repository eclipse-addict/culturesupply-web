import axios from "axios";
import router from "../../router";
let baseUrl =
  process?.env.VUE_APP_DEV === "_ENV_DEVELOPMENT"
    ? "http://localhost:8000/"
    : "https://www.kickin.co.kr/";
const searchStore = {
  namespaced: true,
  state: {
    prod_url: baseUrl,
    keyword: "",
    brand: ["ALL"],
    category: ["All"],
    dates: [],
    search_result: {
      next: null,
      previous: null,
      results: [],
    },
  },
  getters: {
    GET_SEARCH_RESULTS(state) {
      return state.search_result.results;
    },
    GET_NEXT_PAGE_URL(state) {
      return state.search_result.next;
    },
  },
  mutations: {
    SET_SEARCH_RESULTS(state, payload) {
      console.log("SET_SEARCH_RESULTS", payload);
      state.search_result.next = payload.next;
      state.search_result.previous = payload.previous;

      if (state.search_result.results.length === 0) {
        state.search_result.results = payload.results;
      } else {
        state.search_result.results = state.search_result.results.concat(
          payload.results
        );
      }
    },
    RESET_SEARCH_RESULTS(state) {
      console.log("RESET_SEARCH_RESULTS");
      state.search_result = {
        next: null,
        previous: null,
        results: [],
      };
    },
  },
  actions: {
    banner_search_product({ commit, context }, payload) {
      commit("RESET_SEARCH_RESULTS"); // 우선 결과 초기화. (이전에 검색한 내역이 남아있을 수 있음.)
      console.log("searchStore: ", context, payload, commit); // error prevent code
      let currentDate = new Date();

      // 현재 날짜에서 2주를 뺀 날짜 계산
      let twoWeeksAgo = new Date(1900, 0, 1);

      // 현재 날짜에서 2주를 더한 날짜 계산
      let twoWeeksLater = new Date(
        currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
      );

      // 각 날짜를 원하는 포맷에 맞게 변환
      let twoWeeksAgoFormatted = twoWeeksAgo.toISOString().substring(0, 10);
      let twoWeeksLaterFormatted = twoWeeksLater.toISOString().substring(0, 10);

      // 두 날짜를 하나의 문자열로 합침
      let release_date = twoWeeksAgoFormatted + "," + twoWeeksLaterFormatted;
      let search = payload;

      let params = {
        search,
        release_date,
      };
      console.log(params);
      axios({
        method: "GET",
        url: this.state.prod_url + "kicks/sneaker/list/",
        params: params,
      })
        .then((res) => {
          if (res) {
            console.log("vuex search res: ", res);
            commit("SET_SEARCH_RESULTS", res.data);
            router.push({
              name: "sneakers",
            });
          }
        })
        .catch((err) => {
          console.log("vuex search err: ", err);
        });
    },
    saveSearchResult({ commit }, payload) {
      // console.log("SET_SEARCH_RESULTS", payload);
      commit("SET_SEARCH_RESULTS", payload);
    },
    reset_result({ commit }) {
      console.log("reset_result");
      commit("RESET_SEARCH_RESULTS");
    },
  },
};

export default searchStore;

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
    recent_view: [],
  },
  getters: {
    GET_SEARCH_RESULTS(state) {
      return state.search_result.results;
    },
    GET_NEXT_PAGE_URL(state) {
      return state.search_result.next;
    },
    GET_RECENT_VIEWS(state) {
      return state.recent_view;
    },
  },
  mutations: {
    ADDLIKE_OR_REMOVE(state, payload) {
      if (payload.action === "added") {
        state.search_result.results[payload.index].like_users.push(
          payload.user_id
        );
      } else if (payload.action === "removed") {
        const user_idx = state.search_result.results[
          payload.index
        ].like_users.findIndex((item) => item === payload.user_id);
        state.search_result.results[payload.index].like_users.splice(
          user_idx,
          1
        );
      }
    },

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
    ADD_TO_RECENT_VIEW(state, payload) {
      console.log("ADD_TO_RECENT_VIEW");
      if (state.recent_view.length > 0) {
        let idx = state.recent_view.findIndex((item) => item.id === payload.id);
        console.log("idx: ", idx);
        if (idx === -1) {
          console.log("idx === -1");
          if (state.recent_view.length >= 10) state.recent_view.shift();
          state.recent_view.push(payload);
        }
      } else {
        state.recent_view.push(payload);
      }
    },
  },
  actions: {
    mainPageSearch({ commit }, payload) {
      console.log("mainPageSearch", payload);
      commit("RESET_SEARCH_RESULTS"); // 우선 결과 초기화. (이전에 검색한 내역이 남아있을 수 있음.)
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
      let info_registrequired = [];
      if (payload === "info_need") {
        info_registrequired = [
          "brand",
          "date",
          "category",
          "price",
          "image",
        ].join();
      }
      let ordering = payload;

      let params = {
        info_registrequired,
        ordering,
        release_date,
      };
      axios({
        method: "GET",
        url: this.state.prod_url + "kicks/sneaker/list/",
        params: params,
      })
        .then((res) => {
          if (res) {
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

    banner_search_product({ commit }, payload) {
      commit("RESET_SEARCH_RESULTS"); // 우선 결과 초기화. (이전에 검색한 내역이 남아있을 수 있음.)
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
        ordering: "all",
        search,
        release_date,
      };
      axios({
        method: "GET",
        url: this.state.prod_url + "kicks/sneaker/list/",
        params: params,
      })
        .then((res) => {
          if (res) {
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
    addTorecentView({ commit }, payload) {
      console.log("addTorecentView", payload);
      commit("ADD_TO_RECENT_VIEW", payload);
    },
    likeOrUnlike({ commit }, payload) {
      if (payload.action == "added") {
        commit("ADDLIKE_OR_REMOVE", payload);
      } else if (payload.action == "removed") {
        commit("ADDLIKE_OR_REMOVE", payload);
      }
    },
  },
};

export default searchStore;

/* eslint-disable no-unused-vars */
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

let baseUrl =
  process?.env.VUE_APP_DEV === "_ENV_DEVELOPMENT"
    ? "http://localhost:8000/"
    : "https://www.kickin.co.kr/";

import searchStore from "@/store/modules/searchStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  getters: {
    // getLoadingState(state) {
    //   return state.isLoading
    // }
    getUserPk(state) {
      return state.user_data.pk;
    },
    getProdUrl(state) {
      return state.prod_url;
    },
    get_user_data(state) {
      return state.user_data;
    },
    get_env_url(state) {
      return state.prod_url;
    },
  },
  mutations: {
    SET_USER_TOKEN(state, payload) {
      state.user_data.access_token = payload.access_token;
      state.user_data.refresh_token = payload.refresh_token;
      state.user_data.email = payload.user.email;
      state.user_data.pk = payload.user.pk;
      const user = JSON.stringify(state.user_data);

      window.localStorage.setItem("user", user);
    },

    SET_USER_INFO(state, payload) {
      console.log("SET_USER_INFOSET_USER_INFOSET_USER_INFOSET_USER_INFO");
      state.user_data.first_name = payload.first_name;
      state.user_data.last_name = payload.last_name;
      state.user_data.gender = payload.gender;
      state.user_data.nick_name = payload.nick_name;
      state.user_data.profile_img = payload.profile_img
        ? baseUrl + payload.profile_img
        : null;

      state.user_data.shoeSize = payload.shoeSize;
      state.user_data.topSize = payload.topSize;
      state.user_data.bottomSize = payload.bottomSize;
      state.user_data.zipCode = payload.zipCode;
      state.user_data.address = payload.address;
      state.user_data.address_detail = payload.address_detail;
      state.user_data.current_points = payload.points.current_points;
      state.user_data.used_points = payload.points.used_points;
      const user = JSON.stringify(state.user_data);
      window.localStorage.setItem("user", user);
    },
    DELETE_USER_TOKEN(state) {
      state.user_data.access_token = null;
      state.user_data.refresh_token = null;
      state.user_data.email = null;
      state.user_data.pk = null;

      window.localStorage.removeItem("user");
    },
    SET_REFRESH_TOKEN(state, payload) {
      state.user_data.access_token = payload.access;

      window.localStorage.removeItem("user");

      const user = JSON.stringify(state.user_data);
      window.localStorage.setItem("user", user);
    },

    SET_LOADING_STATE(state, payload) {
      console.log("SET_LOADING_STATE CALLED, payload: ", payload);
      state.isLoading = payload;
    },
  },

  actions: {
    signinRequest(context, payload) {
      // form component 에서 로그인 요청 후,
      //결과에 따라서 세션 저장하러 vuex action 호출
      // 로그인 실패까지도 vuex 에서 모두 처리할 필요 없다고 판단.
      context.commit("SET_USER_TOKEN", payload);
    },
    setUserInfo(context, payload) {
      context.commit("SET_USER_INFO", payload);
    },
    signupRequest(context, payload) {
      axios({
        method: "POST",
        url: baseUrl + "user/dj-rest-auth/registration/",
        data: {
          email: payload.email,
          password1: payload.password,
          password2: payload.password,
        },
      })
        .then((res) => {
          context.commit("SET_USER_TOKEN", res.data);
          console.log("signup res", res);
        })
        .catch((err) => {
          console.log("signup err", err);
        });
    },
    signoutRequest(context) {
      axios({
        method: "POST",
        url: baseUrl + "user/dj-rest-auth/logout/",
        headers: {
          Authorization: "Bearer " + this.state.user_data.access_token,
        },
      })
        .then((res) => {
          console.log("logout request response: ", res);
          context.commit("DELETE_USER_TOKEN");
        })
        .catch((error) => {
          console.log("access_token expired", error.response.status);
          if (error.response.status == 401) {
            context.commit("DELETE_USER_TOKEN");
          }
        });
    },
    refresh_token_request(context, dispatch) {
      axios({
        method: "POST",
        url: baseUrl + "api/token/refresh/",
        headers: { "Content-Type": "application/json" },
        data: {
          refresh: this.state.user_data.refresh_token,
        },
      })
        .then((res) => {
          console.log("refresh_token");
          context.commit("SET_REFRESH_TOKEN", res.data);
        })
        .catch(() => {
          dispatch("signoutRequest").then(() => {
            this.$router.push({ name: "login" });
          });
        });
    },
    setLoading(context, payload) {
      console.log("setLoading Called");
      context.commit("SET_LOADING_STATE", payload);
    },
  },
  state: {
    prod_url: baseUrl,
    isLoading: true,
    brandGroup: [
      "Nike",
      "adidas",
      "New Balance",
      "Vans",
      "Air Jordan",
      "Supreme",
      "Puma",
      "Converse",
      "Reebok",
      "ASICS",
      "Palace",
      "Kith",
      "off white",
      "Stussy",
      "Under Armour",
      "Gucci",
      "BAPE",
      "Balenciaga",
      "Billionaire Boys Club",
      "Saucony",
      "Palm Angels",
      "Amiri",
      "Fear Of God Essentials",
      "Pleasures",
      "Stone Island",
      "Versace",
      "Icecream",
      "MCQ",
      "Saint Laurent",
      "Rhude",
      "Brain Dead",
      "Diadora",
      "Bottega Veneta",
      "Givenchy",
      "Carhartt WIP",
      "Heron Preston",
      "Loewe",
      "comme des garcons play",
      "Air Jordan",
      "Vetements",
      "Anti Social Social Club",
      "Burberry",
      "Casablanca",
      "Dior",
      "Undercover",
      "OFF-WHITE",
      "Under Armour",
      "Jacquemus",
      "Rick Owens",
      "Raf Simons",
      "cactus jack by travis scott",
      "Honor The Gift",
      "Marni",
      "Moncler",
      "Chinatown Market",
      "MM6 Maison Margiela",
      "Market",
      "Neighborhood",
      "Maison Margiela",
      "acne studios",
      "1017 alyx 9sm",
      "GANNI",
      "Alexander McQueen",
      "Moncler Genius",
      "Ambush",
      "Kapital",
      "Marine Serre",
      "Ami",
      "Ksubi",
      "Needles",
      "Aries",
      "Fear Of God",
      "Balmain",
      "a cold wall",
      "Karhu",
      "Vlone",
      "",
      "Dime",
      "Human Made",
      "Fendi",
      "Thisisneverthat",
      "Visvim",
      "Saint Laurent",
      "Lemaire",
      "Helmut Lang",
      "Martine Rose",
      "Saint Michael",
      "Common Projects",
      "Cav Empt",
      "Polo Ralph Lauren",
      "Jil Sander",
      "y 3",
      "032c",
      "KidSuper",
      "The North Face",
      "Crocs",
      "Ader Error",
      "Wacko Maria",
      "Prada",
      "courreges",
      "Sacai",
      "Nahmias",
      "apc",
      "Who Decides War",
      "comme des garcons shirt",
      "Cactus Plant Flea Market",
      "Paco Rabanne",
      "Mizuno",
      "Louis Vuitton",
      "Liberaiders",
      "Yohji Yamamoto Pour Homme",
      "Rick Owens DRKSHDW",
      "Awake NY",
      "Reese Cooper",
      "Engineered Garments",
      "Junya Watanabe",
      "Les Tien",
      "Yeezy Gap",
      "comme des garcons",
      "Valentino",
      "Advisory Board Crystals",
      "New Balance",
      "Fila",
      "JW Anderson",
      "Music",
      "Saintwoods",
      "Just Don",
      "Khaite",
      "comme des garcons wallet",
      "Real Bad Man",
      "Lanvin",
      "We11done",
      "museum of peace quiet",
      "C2H4",
      "Timberland",
      "Born X Raised",
      "GOLF WANG",
      "Hatton Labs",
      "Curry Brand",
      "Yeezy",
      "Gentle Monster",
      "Mykita",
      "Acronym",
      "Bode",
      "Clarks",
      "Martine Ali",
      "Kanye West",
      "Chanel",
      "yproject",
      "CELINE",
      "Parra",
      "comme des garcons homme plus",
      "Mastermind World",
      "Mastermind",
      "Nanamica",
      "li ning",
      "Alexander McQueen",
      "Stone Island Shadow Project",
      "CLOT",
      "ERL",
      "Fred Perry",
      "redone",
      "bricks wood",
      "Ewing",
      "Wales Bonner",
      "READYMADE",
      "Dries Van Noten",
      "Flight Club",
      "paris saint germain",
      "Eckhaus Latta",
      "Sp5der",
      "Kiko Kostadinov",
      "Simone Rocha",
      "girls dont cry",
      "Louis Vuitton",
      "OAMC",
      "Afield Out",
      "And Wander",
      "Skim Milk",
      "Song For The Mute",
      "Agolde",
      "MISBHV",
      "WHOLE",
      "Hoka One One",
      "Hood By Air",
      "Noah",
      "KangaROOS",
      "Kenzo",
      "Online Ceramics",
      "Pleats Please Issey Miyake",
      "Polo By Ralph Lauren",
      "Iise",
      "Li-Ning",
      "Other",
      "Yeezy Gap Engineered By Balenciaga",
      "SUPER By RetroSuperFuture",
      "Yohji Yamamoto",
      "mr saturday",
      "BLUEMARBLE",
      "Flatlist",
      "VTMNTS",
      "dr martens",
      "424",
      "levis",
      "John Geiger",
      "Salomon",
      "Midnight Studios",
      "ON",
      "Students",
      "Bao Bao Issey Miyake",
      "Norse Projects",
      "Patta",
      "2 moncler",
      "Brooks",
      "Champion",
      "Moncler Grenoble",
      "Junya Watanabe MAN",
      "K Swiss",
      "Chemist Creations",
      "Craig Green",
      "Dutch Tulip Financial",
      "Issey Miyake",
      "Big Baller Brand",
      "Children Of The Discordance",
      "Ian Charms",
      "Rassvet",
      "SLVRLAKE",
      "Entire Studios",
      "Psychworld",
      "Hyein Seo",
      "Maison Mihara Yasuhiro",
      "Total Luxury Spa",
      "Camp High",
      "Onitsuka Tiger",
      "Yamborghini",
      "bianca chandon",
      "3paradis",
      "Harley Davidson",
      "Little Africa",
      "VEERT",
      "Anta",
      "CLOTTEE",
      "Drew House",
      "Kids Of Immigrants",
      "Le Coq Sportif",
      "New Era",
      "One Of These Days",
      "CDG",
      "Chrome Hearts",
      "Miu Miu",
      "RetroSuperFuture",
      "Vintage",
      "ernest w baker",
      "porter yoshida co",
      "tao comme des garcons",
      "AI Studios",
      "Casey Casey",
      "Denim Tears",
      "Keiser Clark",
      "Sandal Boyz",
      "Veneda Carter",
      "Birkenstock",
      "Ottolinger",
      "Sandy Liang",
      "Andersson Bell",
      "Dc",
      "Filling Pieces",
      "Mister Green",
      "Supra",
      "dolce gabbana",
      "Etudes",
      "Jack Eller",
      "Sky High Farm",
      "Soulland",
      "comme des garcons homme",
      "number nine",
      "5 moncler",
      "Golden Goose",
      "I Know Nigo",
      "IDEA",
      "MSCHF",
      "Movies",
      "Suicoke",
      "Anonymous Club",
      "Books",
      "Cecilie Bahnsen",
      "Dior Homme",
      "Edward Cuming",
      "Greg Lauren",
      "Jean Paul Gaultier",
      "Know Wave",
      "Mowalola",
      "Polite Worldwide",
      "T By Alexander Wang",
      "Ubiq",
      "ADYAR",
      "Christian Louboutin",
      "Eric Emanuel",
      "Hidden NY",
      "MediCom Toy",
      "Tommy Hilfiger",
      "Travis Scott",
      "tricot comme des garcons",
      "AND1",
      "Borsalino",
      "Buscemi",
      "DC Comics",
      "Haider Ackermann",
      "Hender Scheme",
      "Marc Jacobs",
      "Marcelo Burlon",
      "Merrell",
      "Mugler",
      "Paperboy",
      "Sinclair",
      "Umbro",
      "mercedes benz",
      "361 degrees",
      "66 north",
      "90s anxiety",
      "AREA",
      "Alexander Wang",
      "Angel Chen",
      "Ari",
      "Art",
      "Baracuta",
      "Boris Bidjan Saberi",
      "Brandon Maxwell",
      "Calvin Klein",
      "Cartier",
      "Charles Jeffrey Loverboy",
      "Coperni",
      "Ellesse",
      "Etonic",
      "Ferrari",
      "GR10K",
      "Hummel Hive",
      "Hussein Chalayan",
      "KARA",
      "KAWS",
      "Lotto",
      "Molly Goddard",
      "Nowhere",
      "OVO",
      "PF Flyers",
      "Peter Do",
      "Pierre Hardy",
      "Poche",
      "Quiet Golf",
      "Siberia Hills",
      "Sies Marjan",
      "Sony",
      "Sophie Bille Brahe",
      "Stand Studio",
      "Sulvam",
      "Taiga Takahashi",
      "The Hundreds",
      "The Source",
      "Tier",
      "Tom Sachs",
      "Used Future",
      "Vivienne Westwood",
      "mitchell ness",
      "pam",
      "ys",
    ],
    categoryGroup: ["shoes", "accessories", "apparel", "bags", "jewelry"],
    genderGroup: [
      "All",
      "Youth",
      "Men",
      "Women",
      "Infant",
      "Toddler",
      "Child",
      "Unisex",
      "Preschool",
    ],
    user_data: {
      first_name: null,
      last_name: null,
      email: null,
      gender: null,
      pk: null,
      access_token: null,
      refresh_token: null,
      nick_name: null,
      profile_img: null,
      topSize: null,
      bottomSize: null,
      shoeSize: null,

      zipCode: null,
      address: null,
      address_detail: null,

      current_points: null,
      used_points: null,
    },
  },
  modules: {
    searchStore: searchStore,
  },
});

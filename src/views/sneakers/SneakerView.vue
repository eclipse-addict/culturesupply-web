<template>
  <v-app id="inspire">
    <v-main class="sneaker-main" style="padding-left: 0px; padding-top: 0px">
      <v-container v-if="this.$store.state.isLoading">
        <loadingImg />
      </v-container>

      <v-container id="top" fluid ma-0 pa-0 fill-height v-else>
        <!-- <SneakersCarousel/> -->
        <sneakersGallery :url="url" ref="sneakersGallery" />

        <v-btn
          style="margin-right: 8px; margin-bottom: 75px"
          fab
          fixed
          dark
          bottom
          right
          small
          v-show="isScrollDown"
          @click="goTop"
        >
          <v-icon>mdi-menu-up</v-icon>
        </v-btn>
        <v-btn
          style="margin-right: 8px; margin-bottom: 135px"
          fixed
          bottom
          icon
          fab
          right
          elevation="9"
          color="black"
          small
          v-show="isScrollDown"
          @click="reset_sneakers"
        >
          <span class="material-symbols-outlined">refresh</span>
        </v-btn>
      </v-container>
    </v-main>
    <v-main> </v-main>
  </v-app>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelopeOpenText);
</script>

<script>
// @ is an alias to /src
import sneakersGallery from "@/components/sneakers/SneakersGallery.vue";
export default {
  name: "HomeView",
  data() {
    return {
      isLoading: false,
      scroll: 0,
      scrollTarget: null,

      isLoading: false, // it chages every time user types into the input field
      outOfRange: false,
      keyword: "",
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
      brand: ["All"],
      dates: [],
      url: this.$store.state.prod_url + "kicks/sneaker/",
      isScrollDown: false,
      scrollTop: 0,
    };
  },
  mounted() {
    // goTop을 위해 mount 시 element 설정
    console.log("mount");
    // console.log(process.env)
    // this.scrollTarget = document.getElementById('top');
    document.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    sneakersGallery,
  },
  methods: {
    search() {
      this.$router.push({
        name: "sneakers",
        query: {
          search: this.keyword,
          brand: this.brand.join(),
          release: this.dates.join(),
        },
      });
      this.keyword = "";
      this.goTop();
      location.reload();
    },
    reset_sneakers() {
      location.reload();
      this.goTop();
    },
    onScroll(e) {
      // 스크롤 움직일 때 마다 호출됨
      this.scroll = 1;
    },
    handleScroll(e) {
      // console.log("target", e.target);
      // console.log("e :", e);
      // console.log("scroll", e.target.documentElement.scrollTop);
      this.scrollTop = e.target.documentElement.scrollTop;
      if (this.scrollTop > 1) {
        this.isScrollDown = true;
      } else {
        this.isScrollDown = false;
      }
    },
    goTop() {
      window.scrollTo(0, 0);
    },
  },
  watch: {
    keyword() {
      this.isLoading = true;
      setTimeout(() => (this.isLoading = false), 2000);
    },
    brand() {
      if (this.brand.length > 1 && this.brand.indexOf("All") == 0) {
        this.brand.shift();
      } else if (this.brand.length == 0) {
        this.brand = ["All"];
      }
    },
    dates() {
      let stDate = this.dates[0].replaceAll("-", "");
      let endDate = this.dates[1].replaceAll("-", "");
      console.log("stDate", stDate);
      console.log("endDate", endDate);
      let diff = Math.abs(stDate - endDate);
      console.log("diff", diff);
      if (diff > 30) {
        this.dates = [];
        this.outOfRange = true;
      } else {
        this.outOfRange = false;
      }
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>
<style scoped>
/*.sneaker-main {
   background-color: rgb(239, 239, 239); 
}*/
</style>
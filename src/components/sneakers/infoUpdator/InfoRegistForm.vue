<template>
  <div>
    <h5>- 제품 정보 등록 -</h5>
    <h4 class="h4 font-weight-bold border-bottom pb-3 mb-6">
      {{ kick?.name }}
    </h4>
    <v-row>
      <v-col cols="12">
        <v-file-input
          v-model="img_upload"
          @change="
            Preview_image('img_preview');
            info_added('right_img', img_preview);
          "
          :rules="[(v) => !!v || 'Item is required']"
          accept="image/png, image/jpeg, image/bmp"
          placeholder=""
          prepend-icon="mdi-camera"
          label="제품 이미지"
          :disabled="img_preview_exist"
        ></v-file-input>
        <v-img :src="img_preview" aspect-ratio="1.5"></v-img>
      </v-col>

      <v-col sm="12" md="6" lg="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :disabled="releaseData_exist"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-combobox
              @change="info_added('date', date)"
              :disabled="releaseData_exist"
              v-model="date"
              chips
              clearable
              clear-icon="mdi-close-circle-outline"
              small-chips
              label="발매일을 입력해주세요."
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-combobox>
          </template>
          <v-date-picker
            @change="info_added('date', date)"
            :disabled="releaseData_exist"
            v-model="date"
            multiple
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col sm="12" md="6" lg="6">
        <v-select
          @change="info_added('brand', brand_select)"
          v-model="brand_select"
          :items="brandGroup"
          :rules="[(v) => !!v || 'Item is required']"
          label="브랜드"
          required
          chips
          clearable
          clear-icon=" mdi-close-circle-outline"
          dense
          :disabled="brand_exist"
        ></v-select>
      </v-col>
      <v-col sm="12" md="6" lg="6">
        <v-combobox
          @change="info_added('colorway', color_select)"
          v-model="color_select"
          :rules="[(v) => !!v || 'Item is required']"
          label="컬러웨이"
          required
          chips
          clearable
          multiple
          clear-icon=" mdi-close-circle-outline"
          dense
          :disabled="colorway_exist"
        ></v-combobox>
      </v-col>
      <v-col sm="12" md="6" lg="6">
        <v-text-field
          @change="
            price_formatter();
            info_added('retailPrice', retail);
          "
          @click="price_reset"
          v-model="retail"
          label="발매가"
          :rules="[(v) => !!v || 'Item is required']"
          :disabled="retialPrice_exist"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6" lg="6">
        <v-select
          @change="info_added('category', category_select)"
          v-model="category_select"
          :items="categories"
          :rules="[(v) => !!v || 'Item is required']"
          label="카테고리"
          required
          chips
          clearable
          clear-icon=" mdi-close-circle-outline"
          dense
          :disabled="category_exist"
        ></v-select>
      </v-col>
      <v-col sm="12" md="6"> </v-col>
      <hr />
    </v-row>
    <div class="d-flex justify-content-center">
      <v-btn elevation="4" class="mt-3 mr-1" @click="regist_infos">
        등록
      </v-btn>
      <v-btn elevation="4" class="mt-3 ml-1" @click="regist_infos">
        취소
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InfoUpdateForm",
  data() {
    return {
      brand_select: null,
      color_select: null,
      category_select: null,
      retail: null,
      kick: null,
      product_id: null,
      date: null,
      menu: false,
      env_url: this.$store.state.prod_url,
      img_upload: null,
      img_preview: null,

      updatated_infos: [], // 데이터 불러올 때, 유저가 입력할 수 있는 데이터 종류를 담아둘 리스트

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
      categories: [
        "shoes",
        "apparel",
        "accessories",
        "bags",
        "jewelry",
        "miscellaneous",
        "collectibles",
      ],
    };
  },
  methods: {
    // Preview_image(type) {
    //   switch (type) {
    //     case "left":
    //       if (this.left_url == null) {
    //         this.left_url = URL.createObjectURL(this.left_img);
    //       }
    //       break;
    //     case "right":
    //       if (this.right_url == null) {
    //         this.right_url = URL.createObjectURL(this.right_img);
    //       }
    //       break;
    //     case "top":
    //       if (this.top_url == null) {
    //         this.top_url = URL.createObjectURL(this.top_img);
    //       }
    //       break;
    //     case "back":
    //       if (this.back_url == null) {
    //         this.back_url = URL.createObjectURL(this.back_img);
    //       }
    //       break;
    //     case "add":
    //       if (this.add_url == null) {
    //         this.add_url = URL.createObjectURL(this.add_img);
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    //   // this.url= URL.createObjectURL(this.image)
    // },
    check_existing_datas(res) {
      if (res.data.brand != null) {
        this.brand_select = res.data.brand;
      }
      if (res.data.colorway != null) {
        this.color_select = res.data.colorway.split("/");
      }
      if (res.data.releaseDate != null) {
        this.date = res.data.releaseDate;
      }
      if (res.data.retailPrice != null && res.data.retailPrice != 0) {
        this.retail = res.data.retailPrice;
      }
      if (res.data.category != null && res.data.category != "") {
        this.category_select = res.data.category;
      }
    },
    price_formatter() {
      if (this.retail != null && this.retail != 0) {
        this.retail = this.retail
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    price_reset() {
      if (this.retail == 0) {
        this.retail = null;
      }
    },
    regist_infos() {
      console.log("regist_infos: ", this.updatated_infos);

      const formData = new FormData();

      formData.append("product_id", this.product_id);
      formData.append("user", this.$store.state.user_data.pk);

      let updated_info_list = this.updatated_infos;
      for (let i = 0; i < updated_info_list.length; i++) {
        formData.append(updated_info_list[i], this[updated_info_list[i]]);
      }
      console.log("regist_infos formData: ", formData);
      //TODO: BE 구성 후 axios로 데이터 전송 구성
      axios({
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.$store.state.user_data.access_token,
        },
        url: "https://www.kickin.co.kr/info/create/updator/",
        data: formData,
      })
        .then((res) => {
          console.log("regist_infos res: ", res);
        })
        .catch((err) => {
          console.log("regist_infos err :", err);
        });
    },
    info_added(info, value) {
      console.log("info_added: ", info, value);
      // let info_dict = {}
      this.updatated_infos.push(info);
      console.log("updatated_infos: ", this.updatated_infos);
    },
  }, // methods end
  created() {
    const product_id = this.$route.params.id;
    axios({
      method: "GET",
      url: this.$store.state.prod_url + "kicks/sneaker/" + product_id,
    })
      .then((res) => {
        console.log("updator res: ", res);
        this.kick = res.data;
        this.img_preview = this.env_url + res.data.local_imageUrl;
        console.log("res.data.local_imageUrl: ", res.data.local_imageUrl);
        this.product_id = res.data.id;

        // 이미 존재하는 데이터가 있으면 불러와서 data에 넣어줌.
        this.check_existing_datas(res);
      })
      .catch((err) => {
        console.log("updator err :", err);
        // this.$router.push("/404");
      });
  },
  computed: {
    brand_exist() {
      if (this.kick?.brand != null) {
        return true;
      } else {
        return false;
      }
    },
    colorway_exist() {
      if (this.kick?.colorway != null) {
        return true;
      } else {
        return false;
      }
    },
    releaseData_exist() {
      if (this.kick?.releaseDate != null) {
        return true;
      } else {
        return false;
      }
    },
    retialPrice_exist() {
      if (this.kick?.retailPrice != null && this.kick.retailPrice != 0) {
        return true;
      } else {
        return false;
      }
    },
    category_exist() {
      if (this.kick?.category != "") {
        return true;
      } else {
        return false;
      }
    },
    img_preview_exist() {
      if (
        this.img_preview !=
        this.$store.state.prod_url + "media/images/defaultImg.png"
      ) {
        console.log("img_preview: ", this.img_preview);
        return true;
      } else {
        return false; // 이미 제품 사진이 등록되어있을 때
      }
    },
  },
};
</script>

<style>
</style>
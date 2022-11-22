<template>
  <div class="px-5">
    <h1 class="policyTitle pt-4 ">Welcome to Culture Supply</h1>
  <h3 class="policyTitle">terms and conditions</h3>
   <div class="justify-content-between">
    <img src="" alt="" class="img-fluid center-block" >
  </div>
  <div >
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat aperiam aut quod. Optio sint doloremque similique accusantium culpa dolor nihil inventore saepe iure itaque fuga facere minus maxime dolore voluptatem, voluptas, debitis, dignissimos voluptatibus nisi fugiat voluptate ex laboriosam natus? Nulla cum natus quisquam dolore odio voluptatibus nisi pariatur tempore voluptas voluptatem nobis provident, tenetur ipsa, quae cumque et, sapiente doloremque tempora recusandae eaque iste minus at quis sequi! Qui explicabo commodi facere dolore reiciendis reprehenderit! Nesciunt est fugit minus! Quis vel ea fugiat praesentium quisquam cupiditate, officiis eius quibusdam deserunt voluptates beatae sapiente, distinctio ex voluptate corrupti reiciendis dolores est iusto! Doloribus possimus laborum voluptate a porro? Ducimus qui maiores laborum recusandae? Natus in expedita, inventore corporis amet recusandae omnis sapiente laborum et non earum? Maiores corporis molestiae molestias quibusdam? In architecto similique nostrum repudiandae facere, odio iure! Aut iste saepe, earum placeat architecto atque eaque pariatur tempore porro inventore neque repudiandae sit velit eligendi assumenda ipsam ipsa vel nam iusto odio cumque quae cupiditate iure? Consequuntur nesciunt eaque eius facilis ad, sit quae iure! Sequi tenetur quia voluptates modi vitae quae, iusto sapiente amet unde similique ullam aperiam cupiditate alias odit quasi voluptatum cum, impedit soluta aut voluptate voluptas aliquam ratione fuga praesentium. Nostrum, debitis reiciendis iure eligendi quia quisquam? Autem maiores modi, odio repellendus esse aperiam vero sed tenetur quibusdam, quos ratione ad facere incidunt aliquam! Incidunt, illum ratione fugit blanditiis sapiente rem distinctio itaque porro suscipit a obcaecati laboriosam mollitia eaque asperiores et. Quis sint dicta omnis ab ipsum vero odio unde quia possimus sequi illo ducimus eum repellat architecto magnam culpa ratione, delectus eius expedita quos repudiandae est repellendus nostrum? Tempore necessitatibus quibusdam deleniti nihil facere porro suscipit ullam totam quos eveniet est unde fugit iure soluta iste, placeat quasi modi autem ad. Asperiores excepturi distinctio in delectus ducimus veniam, obcaecati alias tempore sequi quis at ea? Placeat delectus corporis voluptatem odit sed reiciendis possimus, perspiciatis culpa doloremque asperiores inventore quas ea qui fugit quos aspernatur alias sapiente! Incidunt atque temporibus iure eum quas cum nobis aut exercitationem doloremque! Corrupti obcaecati soluta ducimus ex, eligendi necessitatibus commodi totam, ipsa est voluptatem omnis, veritatis porro quae voluptates repellendus cumque sunt assumenda corporis sed. Dolor, pariatur. Repudiandae illum deleniti dicta magni magnam, voluptate officia dolore corporis reiciendis voluptates tenetur velit maxime consequatur adipisci hic reprehenderit facere! Quis minus autem, sunt commodi magnam nulla voluptatem exercitationem deleniti odio placeat repudiandae esse odit, quam dolore totam distinctio. Qui, labore illum. Aspernatur quaerat ullam id, quos aliquam temporibus pariatur repudiandae sint! Ducimus deleniti soluta vero libero excepturi repudiandae dolores veniam similique omnis quibusdam et obcaecati est, expedita reiciendis in harum ab, blanditiis commodi fugiat? Ipsam et ullam quidem? Perferendis optio, corrupti, quod minus quisquam sequi ipsum consequuntur qui dolorem vitae similique animi? Cupiditate dolorem ex quasi a odit expedita distinctio sed aspernatur quam tempora facere omnis sint, minima sunt quaerat voluptate nisi esse quos. Ad recusandae sed nam nobis nesciunt incidunt inventore odit officia nulla voluptas excepturi, ullam hic provident!
  </div>
  <br>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="flexSwitchCheckReverse" v-model="agreed">
    <label class="form-check-label" for="flexSwitchCheckReverse">I have read the terms of  Agreement and Accept the terms and conditions</label>
  </div>
  <br>
  <div class="d-flex justify-content-center">
    <button class="btn btn-primary" id="registerBtn" :disabled=isAgreed @click="goRegist" style="margin-bottom: 100px;">
      Register
    </button>
  </div> 
  </div>
</template>

<script>
export default {
  name: 'userAgreementComp',
data () {
  return {
    agreed : false,
  }
},
methods: {
 goRegist(){
  this.$router.push({'name': 'regist'})
 },
},
computed : {
  isAgreed () {
    if(!this.agreed){
      return true
    }else {
      return false
    }
  }
}
}
</script>

<style scoped>
</style>
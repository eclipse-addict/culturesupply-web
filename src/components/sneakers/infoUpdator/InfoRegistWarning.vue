<template>
  <div class="text-center">
    <h5 class="border-bottom">- 사전 안내 -</h5>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit explicabo ea voluptatem facilis quasi, voluptate distinctio ut eveniet provident optio voluptates, odio illo cupiditate! Necessitatibus mollitia iusto totam, assumenda saepe tempora sit! Soluta, qui? Atque laudantium vero neque, obcaecati perferendis deserunt impedit doloremque ea laborum facilis tempore modi perspiciatis et vitae quidem error sunt quae, totam deleniti fugit. Porro accusamus mollitia consequatur saepe quos assumenda animi est dignissimos laboriosam cum inventore, maiores, nihil libero quod officiis facilis. Vel maiores quaerat beatae, delectus ipsam voluptates cumque unde deleniti deserunt quia repellendus illum amet enim ex officiis quidem voluptatem quisquam nam nihil?
    </p>
    <p class="m-auto pt-5 border-top">
      <v-checkbox v-model="checkbox">
        <template v-slot:label >
          <div class="text-center">
            I agree that is awesome
          </div>
        </template>
      </v-checkbox>
    </p>
  </div>
</template>

<script>
export default {
  name: "InfoRegistWarning",
  data() {
    return {
      checkbox: false,
    }
  }
}
</script>

<style>

</style>
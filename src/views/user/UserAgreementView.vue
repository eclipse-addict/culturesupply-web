<template>
  <div>
    <!-- <div class="fixed-top" style="margin-top: 15rem;"> -->
      <div>
      <v-stepper alt-labels>
        <v-stepper-header>
          <v-stepper-step step="1" :complete='agreed' >
            개인정보처리방침
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2" :complete='agreed' >
            회원정보 입력
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" :complete='completed'>
            완료
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
  </div>
    <agreement v-if="current_step == 'agreement'" @userAgreed="user_agreed"></agreement>
    <registration v-else-if="current_step == 'registration'" @toAgreement="toAgreement" @toFinalStep="toFinalStep" ></registration>
    <registrationConfirm v-else-if="current_step == 'confirmation'" ></registrationConfirm>
  </div>
</template>

<script>
import agreement from '@/components/user/UserAgreement.vue'
import registration from '@/components/user/UserRegistration.vue'
import registrationConfirm from '@/components/user/RegistrationConfirm.vue'
export default {
  name: 'UserAgreement',
  components: {
    agreement,
    registration,
    registrationConfirm,
  },
  data(){
    return {
      agreed: false,
      completed: false,
      current_step: 'agreement',
    }
  },
  methods: {
    user_agreed(){
      this.agreed = true;
      this.current_step = 'registration';
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    },
    toAgreement(){
      this.current_step = 'agreement'
      this.agreed = false;
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    },
    toRegistration(){
      this.current_step = 'registration';
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    },
    toFinalStep(){
      console.log('toFinalStep')
      this.current_step = 'confirmation';
      this.completed = true; 
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    },

  },
}
</script>

<style>

</style>
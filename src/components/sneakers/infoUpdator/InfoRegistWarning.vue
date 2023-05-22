<template>
  <div>
    <p>
      <span class="font-weight-bold h4">1.등록 가능한 세부 정보</span>
      <v-divider></v-divider>
      <v-simple-table class="mt-3">
        <thead>
          <tr>
            <th class="text-left">항목</th>
            <th class="text-left">세부 내용</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in updatable_items" :key="idx">
            <td>
              <span class="font-weight-bold">{{ item.name }}</span>
            </td>
            <td>
              <span class="text-subtitle-2">{{ item.description }}</span>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </p>
    <p>
      <span class="font-weight-bold h4"> 2. 주의 사항 </span>
      <v-divider></v-divider>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">항목</th>
            <th class="text-left">세부 내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="">정보 등록의 반려</span>
            </td>
            <td>
              <ol class="my-auto">
                <li>
                  등록하신 정보에 오류가 있는 경우 해당 정보의 등록 처리가
                  반려될 수 있습니다.
                  <ul>
                    <li>
                      위 조항이 적용되는 항목 이하
                      <ul v-for="(item, idx) in updatable_items" :key="idx">
                        <li v-if="item.name != '제품 이미지'">
                          {{ item.name }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  제품 이미지
                  <ul>
                    <li class="fw-bolder">
                      등록된 사진의 인식이 어려운 경우 해당 정보의 등록 처리가
                      반려될 수 있습니다.
                      <ul>
                        <li>등록 이미지의 최소 크기 : 가로 세로 500PX 이상</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>
            </td>
          </tr>
          <tr>
            <td>정보의 승인</td>
            <td>
              <ul>
                <li class="fw-bolder">
                  등록된 정보가 승인, 반려되기까지 최대 24시간 소요됩니다.
                </li>
              </ul>
              <ol>
                <li>
                  전체 승인
                  <ul>
                    <li>
                      추가 등록된 상세 정보에 이상이 없으면 등록하신 정보가 일괄
                      <strong>승인</strong>됩니다.
                    </li>
                  </ul>
                </li>
                <li>
                  부분 승인
                  <ul>
                    <li>
                      추가 등록된 상세 정보 중 일부 이상이 발견되면 등록하신
                      정보 중 이상이 없는 정보가 <strong>부분</strong>승인
                      됩니다.
                    </li>
                  </ul>
                </li>
              </ol>
            </td>
          </tr>
          <tr>
            <td>포인트 지급</td>
            <td>
              <ul>
                <li>포인트 지급은 정보의 승인 처리와 동시에 적립됩니다.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>지급 포인트</td>
            <td>
              <ul>
                <li>등록한 세부 정보 항목에 따라 포인트가 차등 지급됩니다.</li>
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>항목</th>
                      <th>지급 포인트</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in updatable_items" :key="idx">
                      <td>{{ item.name }}</td>
                      <td>{{ item.point }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </ul>
            </td>
          </tr>
          <tr>
            <td>부정 수급에 대한 제재</td>
            <td>
              <ul>
                <li>
                  부정 수급이 의심되는 경우 해당 정보의 등록 처리가 반려되거나,
                  등록된 정보가 삭제될 수 있습니다.
                </li>
                <li>
                  반복적으로 부정 수급 또는 아래 항목에 해당하는 행위가 발견된
                  경우 서비스 사용에 제재가 생길 수 있습니다.
                </li>
                <ol>
                  <li>봇 사용이 의심되는 경우</li>
                  <li>다중 계정의 이용이 의심되는 경우</li>
                  <li>지속해서 틀린 정보를 고의 기재하는 경우</li>
                  <li>고의로 등록 후 취소를 반복하는 행위</li>
                  <li>기타 부정행위</li>
                </ol>
              </ul>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </p>
    <p class="m-auto pt-5 border-top">
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <div class="text-center">서비스 이용 약관에 동의합니다.</div>
        </template>
      </v-checkbox>
    </p>
    <p>
      <v-btn
        :disabled="!checkbox"
        class="mt-5 mr-2"
        color="primary"
        @click="goToEdit"
      >
        정보 등록하기
      </v-btn>
      <v-btn class="mt-5" color="error">취소하기</v-btn>
    </p>
  </div>
</template>

<script>
export default {
  name: "InfoRegistWarning",
  data() {
    return {
      checkbox: false,
      updatable_items: [
        {
          id: 1,
          name: "제품명",
          description: "제품명(한,영문)이 오기입 또는 누락 되어있는 경우",
          point: "100",
        },
        {
          name: "브랜드",
          description: "브랜드(영문명)이 오기입 또는 누락 되어있는 경우",
          point: "100",
        },
        {
          name: "발매일",
          description:
            "제품의 발매일이 누락 되어있는 경우 발매일은 국제 발매일 기준으로 작성됩니다.",
          point: "200",
        },
        {
          name: "가격",
          description: "제품의 발매 가격이 오기입 또는 누락 되어있는 경우",
          point: "200",
        },
        {
          name: "컬러웨이",
          description: "제품의 색상 정보가 오기입 또는 누락 되어있는 경우",
          point: "200",
        },
        {
          name: "제품 이미지",
          description: "제품의 이미지가 누락 되어있는 경우",
          point: "500",
        },
      ],
    };
  },
  watch: {
    checkbox() {
      this.$emit("checkboxValueChanged", this.checkbox);
    },
  },

  methods: {
    goDown() {
      window.scrollTo(0, document.body.scrollHeight, "smooth");
    },
    goToEdit() {
      this.$emit("goToEdit");
    },
  },
  computed: {},
};
</script>

<style scoped></style>

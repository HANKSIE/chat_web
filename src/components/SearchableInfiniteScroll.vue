<template>
  <template v-if="loadAfterSearch && !hasSearchAtLeastOnce">
    <div class="q-mt-md text-h6 text-weight-bold row justify-center">
      開始搜尋
    </div>
  </template>
  <template v-else>
    <template v-if="loaded && modelValue.length === 0">
      <div class="q-mt-md text-h6 text-weight-bold row justify-center">
        沒有搜尋結果
      </div>
    </template>
    <template v-else>
      <q-scroll-area style="height: 70vh" class="q-mt-sm">
        <q-infinite-scroll ref="qInfiniteScroll" @load="load" :offset="10">
          <slot></slot>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-scroll-area>
    </template>
  </template>
</template>
<script lang="ts">
import { ref, toRef } from "@vue/reactivity";
import { QInfiniteScroll } from "quasar";
import { PropType } from "@vue/runtime-core";
import { nextTick } from "vue";
export default {
  props: {
    modelValue: {
      type: Object as PropType<unknown[]>,
      required: true,
    },
    search: {
      type: Function as PropType<() => Promise<boolean>>,
      required: true,
    },
    next: {
      type: Function as PropType<() => Promise<boolean>>,
      required: true,
    },
    loadAfterSearch: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const modelValue = toRef(props, "modelValue"),
      loadAfterSearch = toRef(props, "loadAfterSearch");
    const qInfiniteScroll = ref<QInfiniteScroll | null>(null);
    const hasSearchAtLeastOnce = ref(false);
    const loaded = ref(false);

    const load = async (_: number, done: (val: boolean) => void) => {
      const isDone = await (modelValue.value.length === 0
        ? props.search()
        : props.next());

      done(isDone);
      loaded.value = true;
    };

    const search = async () => {
      loaded.value = false;
      hasSearchAtLeastOnce.value = true;
      emit("update:modelValue", []);
      nextTick(() => qInfiniteScroll.value?.resume()); // need to wait modelValue be empty
    };

    if (!loadAfterSearch.value) search();

    return {
      load,
      qInfiniteScroll,
      hasSearchAtLeastOnce,
      search,
      loaded,
    };
  },
};
</script>

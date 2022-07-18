<template>
  <template v-if="hasLoaded && modelValue.length === 0">
    <div class="q-mt-md text-h6 text-weight-bold row justify-center">
      沒有搜尋結果
    </div>
  </template>
  <template v-else>
    <q-scroll-area style="height: 70vh" class="q-mt-sm">
      <q-infinite-scroll ref="qInfiniteScroll" @load="load" :offset="50">
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
<script lang="ts">
import { ref, toRef } from "@vue/reactivity";
import { QInfiniteScroll } from "quasar";
import SimplePaginate from "@/utils/simplePaginate";
import { PropType } from "@vue/runtime-core";

export default {
  props: {
    simplePaginate: {
      type: Object as PropType<SimplePaginate<unknown>>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<unknown[]>,
      required: true,
    },
    searchArgs: {
      type: Object as PropType<any[]>,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const simplePaginate = toRef(props, "simplePaginate");
    const modelValue = toRef(props, "modelValue");
    const searchArgs = toRef(props, "searchArgs");
    const qInfiniteScroll = ref<QInfiniteScroll | null>(null);
    const hasLoaded = ref(false);
    const load = async (_: number, done: (val: boolean) => void) => {
      const data = await (modelValue.value.length === 0
        ? simplePaginate.value.search(...searchArgs.value)
        : simplePaginate.value.next());
      emit("update:modelValue", [...modelValue.value, ...data]);
      done(data.length === 0);
      hasLoaded.value = true;
    };

    return {
      load,
      qInfiniteScroll,
      hasLoaded,
      setHasLoaded: (val: boolean) => (hasLoaded.value = val),
      resume: () => qInfiniteScroll.value?.resume(),
    };
  },
};
</script>

<template>
  <search-input v-model="keyword" @search="search" />
  <q-separator />
  <template v-if="loadAfterSearch && !hasSearchAtLeastOnce">
    <div class="q-mt-md text-h6 text-weight-bold row justify-center">
      開始搜尋
    </div>
  </template>
  <template v-else>
    <infinite-scroll
      ref="infiniteScroll"
      :searchArgs="[...searchArgs, keyword]"
      :simplePaginate="simplePaginate"
      :modelValue="modelValue"
      @update:modelValue="(val) => $emit('update:modelValue', val)"
    >
      <slot></slot>
    </infinite-scroll>
  </template>
</template>
<script lang="ts">
import { ref, toRef } from "@vue/reactivity";
import SearchInput from "./SearchInput.vue";
import InfiniteScroll from "./InfiniteScroll.vue";
import { nextTick, PropType } from "@vue/runtime-core";
import SimplePaginate from "@/utils/simplePaginate";

export default {
  components: { SearchInput, InfiniteScroll },
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
    loadAfterSearch: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const infiniteScroll = ref<{
      resume: () => void;
      setHasLoaded: (val: boolean) => void;
    } | null>(null);
    const keyword = ref("");
    const modelValue = toRef(props, "modelValue");
    const hasSearchAtLeastOnce = ref(false);
    const loadAfterSearch = toRef(props, "loadAfterSearch");
    const search = () => {
      hasSearchAtLeastOnce.value = true;
      emit("update:modelValue", []);
      infiniteScroll.value?.setHasLoaded(false);
      nextTick(() => infiniteScroll.value?.resume());
    };

    if (!loadAfterSearch.value && modelValue.value.length === 0) search();

    return {
      keyword,
      search,
      infiniteScroll,
      hasSearchAtLeastOnce,
    };
  },
};
</script>

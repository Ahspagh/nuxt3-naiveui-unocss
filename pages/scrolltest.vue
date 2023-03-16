<script setup lang="ts">
// import { useScroll } from '@vueuse/core'
const el = ref<HTMLElement | null>(null)
const smooth = ref(false)
const behavior = computed(() => smooth.value ? 'smooth' : 'auto')
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, { behavior })
const { left, right, top, bottom } = toRefs(arrivedState)
const { left: toLeft, right: toRight, top: toTop, bottom: toBottom } = toRefs(directions)
// Format the numbers with toFixed() to make them
// nicer to display
const displayX = computed({
    get() {
        return x.value.toFixed(1)
    },
    set(val) {
        x.value = parseFloat(val)
    },
})
const displayY = computed({
    get() {
        return y.value.toFixed(1)
    },
    set(val) {
        y.value = parseFloat(val)
    },
})
</script>

<template>
    <div class="flex">
        <div ref="el" class="w-80 h-80 m-auto overflow-scroll bg-gray-500/5 rounded">
            <div class="w-96 h-96 relative">
                <div class="absolute left-0 top-0" bg="gray-500/5" p="x-2 y-1">
                    TopLeft
                </div>
                <div class="absolute left-0 bottom-0" bg="gray-500/5" p="x-2 y-1">
                    BottomLeft
                </div>
                <div class="absolute right-0 top-0" position="absolute right-0 top-0" bg="gray-500/5" p="x-2 y-1">
                    TopRight
                </div>
                <div class="absolute right-0 bottom-0" bg="gray-500/5" p="x-2 y-1">
                    BottomRight
                </div>
                <div class="absolute left-1/3 top-1/3" bg="gray-500/5" p="x-2 y-1">
                    Scroll Me
                </div>
            </div>
        </div>
        <div class="m-auto w-96  pl-4">
            <div class="px-6 py-4 rounded grid grid-cols-[120px_auto] gap-2 bg-gray-500/5">
                <span text="right" opacity="75" class="py-4">X Position</span>
                <div class="text-primary">
                    <div>
                        <input v-model="displayX" type="number" min="0" max="200" step="10" class="w-full !min-w-0">
                    </div>
                </div>
                <span text="right" opacity="75" class="py-4">Y Position</span>
                <div class="text-primary">
                    <div>
                        <input v-model="displayY" type="number" min="0" max="100" step="10" class="w-full !min-w-0">
                    </div>
                </div>
                <label for="smooth-scrolling-option" text="right" opacity="75">Smooth scrolling</label>
                <span><input id="smooth-scrolling-option" v-model="smooth" type="checkbox"></span>
                <span text="right" opacity="75">isScrolling</span>
                <!-- <BooleanDisplay :value="isScrolling" /> -->
                {{ isScrolling }}
                <div text="right" opacity="75">
                    Top Arrived
                </div>
                <!-- <BooleanDisplay :value="top" /> -->
                {{ top }}
                <div text="right" opacity="75">
                    Right Arrived
                </div>
                <!-- <BooleanDisplay :value="right" /> -->
                {{ right }}
                <div text="right" opacity="75">
                    Bottom Arrived
                </div>
                <!-- <BooleanDisplay :value="bottom" /> -->
                {{ bottom }}
                <div text="right" opacity="75">
                    Left Arrived
                </div>
                <!-- <BooleanDisplay :value="left" /> -->
                {{ left }}

                <div text="right" opacity="75">
                    Scrolling Up
                </div>
                <!-- <BooleanDisplay :value="toTop" /> -->
                {{ toTop }}

                <div text="right" opacity="75">
                    Scrolling Right
                </div>
                <!-- <BooleanDisplay :value="toRight" /> -->
                {{ toRight }}

                <div text="right" opacity="75">
                    Scrolling Down
                </div>
                <!-- <BooleanDisplay :value="toBottom" /> -->
                {{ toBottom }}

                <div text="right" opacity="75">
                    Scrolling Left
                </div>
                <!-- <BooleanDisplay :value="toLeft" /> -->
                {{ toLeft }}

            </div>
        </div>
    </div>
</template>
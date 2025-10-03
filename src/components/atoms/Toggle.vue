<template>
  <div>
    <button class="menu-toggle" @click="toggleMenu">
      <IconByName
        name="Menu"
        color="simple"
        className="header-icon"
        v-if="!isMenuOpen"
      />
    </button>
    <button class="menu-toggle" @click="toggleMenu" v-if="isMenuOpen">
      <IconByName name="X" color="simple" className="header-icon" />
    </button>
    <Transition name="slide-fade">
      <ul v-if="isMenuOpen" class="items-dropdown">
        <slot />
      </ul>
    </Transition>
  </div>
</template>

<script>
import IconByName from "@/components/atoms/IconByName.vue";

export default {
  components: {
    IconByName,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.$emit("menuToggled", this.isMenuOpen);
    },
  },
};
</script>

<style>
.items-dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 1px;
  align-items: left;
  gap: 20px;
  padding: 1rem 1rem 0px 1rem;
  width: 100%;
  z-index: 100;
  background-color: var(--darkBackground) !important;
}

.items-dropdown li {
  display: flex;
  list-style-type: none;
  border: none;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

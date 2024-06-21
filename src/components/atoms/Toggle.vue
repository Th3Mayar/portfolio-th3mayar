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
    <ul v-if="isMenuOpen" class="items-dropdown">
     <slot />
    </ul>
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
      this.$emit('menuToggled', this.isMenuOpen);
    },
  },
};
</script>

<style>
.items-dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  right: 25px;
  align-items: left;
  gap: 20px;
  padding: 1rem 1rem 0px 1rem;
  width: 92%;
  /* the items appear above what is there */
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

/* Media Queries Optimized */
@media (max-width: 926px) {
  .items-dropdown {
    width: 94.7%;
  }
}
@media (max-width: 894px) {
  .items-dropdown {
    width: 94.5%;
  }
}
@media (max-width: 826px) {
  .items-dropdown {
    width: 93.9%;
  }
}
@media (max-width: 760px) {
  .items-dropdown {
    width: 93.5%;
  }
}
@media (max-width: 666px) {
  .items-dropdown {
    width: 92.8%;
  }
}
@media (max-width: 590px) {
  .items-dropdown {
    width: 91.8%;
  }
}
@media (max-width: 532px) {
  .items-dropdown {
    width: 91%;
  }
}
@media (max-width: 464px) {
  .items-dropdown {
    width: 89.6%;
  }
}
@media (max-width: 416px) {
  .items-dropdown {
    width: 88.5%;
  }
}
@media (max-width: 376px) {
  .items-dropdown {
    width: 87.5%;
  }
}
@media (max-width: 310px) {
  .items-dropdown {
    width: 85%;
  }
}
@media (max-width: 290px) {
  .items-dropdown {
    width: 83%;
  }
}
</style>

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
    
    <ul v-if="isMenuOpen" class="items">
      <Item href="" title={TComponents.name} class="item-name link-card" />
      <Item href="" title={TComponents.hello} class="item-hello link-card item" />
      <Item href="" title={TComponents.aboutMe} class="item-about link-card item" />
      <Item href="" title={TComponents.projects} class="item-projects link-card item" />
      <li class="item-hidden"></li>
      <Item href="" title={TComponents.contactMe} class="item-contact link-card item" />
    </ul>
  </div>
</template>

<script>
import IconByName from "../../components/atoms/IconByName.vue";

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

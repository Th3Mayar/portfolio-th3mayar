<template>
  <div v-if="isMobile" class="mobile-overlay">
    <div class="overlay-content">
      <div class="construction-icon">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <Typography
        variant="FiraCode"
        as="h1"
        color="light"
        className="text-3xl md:text-4xl font-bold mb-4 text-center flex justify-center items-center"
      >
        <div class="flex justify-center items-center gap-4 mb-5">
          <IconByName
            name="Construction"
            color="orange"
            className="w-8 h-8 inline mr-2"
          />
          Under Construction
          <IconByName
            name="Construction"
            color="orange"
            className="w-8 h-8 inline ml-2"
          />
        </div>
      </Typography>

      <Typography
        variant="FiraCode"
        as="p"
        color="light"
        className="text-lg md:text-xl mb-6 text-center opacity-90 max-w-md"
      >
        This portfolio is currently optimized for desktop viewing. Mobile version coming
        soon!
      </Typography>

      <div class="features-list">
        <Typography
          variant="FiraCode"
          as="h3"
          color="orange"
          className="text-xl font-semibold mb-3 text-center"
        >
          What's Coming:
        </Typography>

        <div class="grid grid-cols-1 gap-3 max-w-sm mx-auto">
          <div class="feature-item space-x-2">
            <IconByName name="Zap" color="orange" className="w-4 h-4 mr-2" />
            <Typography variant="FiraCode" as="span" color="light" className="text-sm">
              Fully responsive design
            </Typography>
          </div>
          <div class="feature-item space-x-2">
            <IconByName name="Smartphone" color="orange" className="w-4 h-4 mr-2" />
            <Typography variant="FiraCode" as="span" color="light" className="text-sm">
              Touch-optimized interactions
            </Typography>
          </div>
          <div class="feature-item space-x-2">
            <IconByName name="Palette" color="orange" className="w-4 h-4 mr-2" />
            <Typography variant="FiraCode" as="span" color="light" className="text-sm">
              Mobile-first animations
            </Typography>
          </div>
          <div class="feature-item space-x-2">
            <IconByName name="Wrench" color="orange" className="w-4 h-4 mr-2" />
            <Typography variant="FiraCode" as="span" color="light" className="text-sm">
              Enhanced mobile UX
            </Typography>
          </div>
        </div>
      </div>

      <div class="contact-info mt-8 gap-2 space-y-2">
        <Typography
          variant="FiraCode"
          as="p"
          color="light"
          className="text-sm opacity-75 text-center mb-2"
        >
          For best experience, visit on desktop
        </Typography>
        <Typography
          variant="FiraCode"
          as="p"
          color="orange"
          className="text-sm text-center font-semibold flex justify-center items-center gap-3"
        >
          <div class="flex gap-4 text-orange justify-center items-center">
            <IconByName name="Mail" color="orange" className="w-4 h-4 inline mr-1" />
            josehenriquez.02.26@gmail.com
          </div>
        </Typography>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Typography from "@/components/atoms/Typography.vue";
import IconByName from "@/components/atoms/IconByName.vue";
import { useDevice } from "@/composables/useDevice";

const { isMobile } = useDevice();
</script>

<style scoped>
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.overlay-content {
  text-align: center;
  max-width: 600px;
  width: 100%;
  animation: fadeIn 0.8s ease-out;
}

.construction-icon {
  color: #ff6b35;
  margin-bottom: 2rem;
  animation: bounce 2s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.features-list {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 2rem 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 53, 0.2);
}

.feature-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-item:last-child {
  border-bottom: none;
}

.contact-info {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .mobile-overlay {
    padding: 1rem;
  }

  .overlay-content {
    padding: 1rem;
  }

  .construction-icon svg {
    width: 60px;
    height: 60px;
  }
}

/* Hide scrollbar but keep functionality */
.mobile-overlay::-webkit-scrollbar {
  display: none;
}

.mobile-overlay {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

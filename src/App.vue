<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SplashScreen from '@/components/SplashScreen.vue';
import Navbar from '@/components/Navbar.vue';
import HeroSection from '@/components/HeroSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import TimelineSection from '@/components/TimelineSection.vue';
import CertificateSection from '@/components/CertificateSection.vue';
import GithubProjectSection from '@/components/GithubProjectSection.vue';
import LiveWebSection from '@/components/LiveWebSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import AiAssistant from '@/components/AiAssistant.vue';

const isSplashActive = ref(true);

// Custom lightweight scroll reveal mechanism
const runScrollReveal = () => {
  const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
  const triggerBottom = (window.innerHeight / 5) * 4.2;

  elementsToReveal.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('active-show');
    }
  });
};

const handleSplashLoaded = () => {
  isSplashActive.value = false;
  // Trigger initial scroll reveal check
  setTimeout(() => {
    runScrollReveal();
  }, 100);
};

onMounted(() => {
  window.addEventListener('scroll', runScrollReveal);
});

onUnmounted(() => {
  window.removeEventListener('scroll', runScrollReveal);
});
</script>

<template>
  <div>
    <!-- SplashScreen with smooth transition -->
    <Transition name="splash">
      <SplashScreen v-if="isSplashActive" @loaded="handleSplashLoaded" />
    </Transition>

    <div v-if="!isSplashActive" class="app-layout">
      <!-- 1. Sticky Navbar -->
      <Navbar />

      <!-- 2. Hero Section (Typing Animation inside) -->
      <HeroSection />

      <!-- 3. About Section (Skills overview inside) -->
      <div class="reveal-on-scroll">
        <AboutSection />
      </div>

      <!-- 4. Timeline Section -->
      <div class="reveal-on-scroll">
        <TimelineSection />
      </div>

      <!-- 5. Certificate Section with preview modal -->
      <div class="reveal-on-scroll">
        <CertificateSection />
      </div>

      <!-- 6. GitHub Projects Section with filtering -->
      <div class="reveal-on-scroll">
        <GithubProjectSection />
      </div>

      <!-- 7. Live Web Showcase Panel -->
      <div class="reveal-on-scroll">
        <LiveWebSection />
      </div>

      <!-- 8. Contact Form Panel with status response -->
      <div class="reveal-on-scroll">
        <ContactSection />
      </div>

      <!-- 9. Sticky / Standard Footer details -->
      <FooterSection />

      <AiAssistant />
    </div>
  </div>
</template>

<style>
/* SplashScreen vue animation properties */
.splash-leave-active {
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.splash-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

/* CSS Scroll entrance effects used in App layout wrapper */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(45px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.reveal-on-scroll.active-show {
  opacity: 1;
  transform: translateY(0);
}

.app-layout {
  display: flex;
  flex-direction: column;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X, Code, Terminal } from 'lucide-vue-next';

const activeSection = ref('home');
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'history', label: 'History' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'projects', label: 'Projects' },
  { id: 'live-web', label: 'Live' },
  { id: 'contact', label: 'Contact' },
];

const checkActiveSection = () => {
  const scrollPosition = window.scrollY + 200; // Offset for accuracy
  
  for (const section of sections) {
    const el = document.getElementById(section.id);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = section.id;
      }
    }
  }

  isScrolled.value = window.scrollY > 50;
};

const handleScrollTo = (id) => {
  isMobileMenuOpen.value = false;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkActiveSection);
  checkActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkActiveSection);
});
</script>

<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Title/Brand with Logo Glow -->
      <a href="#home" class="nav-brand" @click.prevent="handleScrollTo('home')">
        <Terminal class="brand-icon" />
        <span class="brand-logo-txt">xdalil<span class="accent">.a</span></span>
        <span class="brand-aka">/ lelxzyy</span>
      </a>

      <!-- Desktop Links -->
      <div class="nav-links">
        <a 
          v-for="section in sections" 
          :key="section.id" 
          :href="`#${section.id}`" 
          class="nav-link"
          :class="{ 'active': activeSection === section.id }"
          @click.prevent="handleScrollTo(section.id)"
        >
          {{ section.label }}
        </a>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle Menu">
        <Menu v-if="!isMobileMenuOpen" class="toggle-icon" />
        <X v-else class="toggle-icon" />
      </button>
    </div>

    <!-- Mobile Drawer Links -->
    <div class="mobile-drawer" :class="{ 'drawer-open': isMobileMenuOpen }">
      <div class="drawer-header">
        <span class="brand-logo-txt">xdalil<span class="accent">.a</span></span>
        <button class="mobile-toggle" @click="isMobileMenuOpen = false">
          <X class="toggle-icon" />
        </button>
      </div>
      <div class="drawer-links">
        <a 
          v-for="section in sections" 
          :key="section.id" 
          :href="`#${section.id}`" 
          class="drawer-link"
          :class="{ 'active': activeSection === section.id }"
          @click.prevent="handleScrollTo(section.id)"
        >
          {{ section.label }}
        </a>
      </div>
    </div>
    <!-- Drawer Overlay -->
    <div v-if="isMobileMenuOpen" class="drawer-overlay" @click="isMobileMenuOpen = false"></div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  z-index: 1000;
  transition: var(--transition-smooth);
  border-bottom: 1px solid transparent;
}

.navbar-scrolled {
  height: 70px;
  background: rgba(0, 25, 49, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

.nav-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.5px;
  color: var(--text-white);
  transition: var(--transition-fast);
}

.brand-icon {
  width: 22px;
  height: 22px;
  color: var(--color-accent-blue);
  filter: drop-shadow(0 0 4px var(--color-accent-blue));
}

.brand-logo-txt .accent {
  color: var(--color-accent-blue);
}

.brand-aka {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-teal-glow);
  font-weight: 400;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 18px;
  border-radius: var(--radius-lg);
  transition: var(--transition-smooth);
}

.nav-link:hover {
  color: var(--text-white);
  background: rgba(123, 189, 232, 0.08);
}

.nav-link.active {
  color: var(--text-white);
  background: var(--glass-bg-hover);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glow-shadow);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-white);
}

.toggle-icon {
  width: 24px;
  height: 24px;
}

/* Mobile Drawer styles */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  height: 100vh;
  background: #001224;
  border-left: 1px solid var(--glass-border);
  box-shadow: -10px 0 30px rgba(0,0,0,0.5);
  z-index: 1001;
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.mobile-drawer.drawer-open {
  right: 0;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.drawer-link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 18px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: var(--radius-lg);
  transition: var(--transition-smooth);
  border: 1px solid transparent;
}

.drawer-link:hover, .drawer-link.active {
  color: var(--text-white);
  background: var(--glass-bg-hover);
  border-color: var(--glass-border);
  box-shadow: var(--glow-shadow);
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
}

@media (max-width: 992px) {
  .nav-links {
    display: none;
  }
  .mobile-toggle {
    display: block;
  }
}
</style>

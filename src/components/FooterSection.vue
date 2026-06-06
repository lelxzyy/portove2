<script setup>
import { Github, Mail, ArrowUp, Cpu, Heart, Code } from 'lucide-vue-next';

const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <footer class="footer-section">
    <div class="container footer-inner">
      <div class="footer-top">
        <!-- Brand log -->
        <div class="footer-brand">
          <span class="brand-log-txt">xdalil<span class="accent">.a</span></span>
          <span class="brand-desc">Siswa Pengembang Web & IoT Enthusiast</span>
        </div>

        <div class="footer-socials">
          <a href="https://github.com/dalilaminudin" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Github">
            <Github class="s-icon" />
          </a>
          <a href="mailto:dalilaminudin@gmail.com" class="social-btn" aria-label="Email">
            <Mail class="s-icon" />
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright-txt">
          &copy; 2026. Designed & Developed with 
          <Heart class="love-icon" /> 
          by <span class="aka-txt">lelxzyy</span>
        </p>

        <!-- Back to Top btn -->
        <button class="back-to-top" @click="handleScrollTop" aria-label="Back to Top">
          <span>Ke Atas</span>
          <ArrowUp class="up-icon" />
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  background: #001021;
  border-top: 1px solid var(--glass-border);
  padding: 40px 0;
  margin-top: 80px;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-log-txt {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-white);
}

.brand-log-txt .accent {
  color: var(--color-accent-blue);
}

.brand-desc {
  font-size: 13px;
  color: var(--color-cyan-mute);
}

.footer-socials {
  display: flex;
  gap: 12px;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.social-btn:hover {
  background: var(--glass-bg-hover);
  border-color: var(--color-accent-blue);
  color: var(--text-white);
  box-shadow: var(--glow-shadow);
  transform: translateY(-3px);
}

.s-icon {
  width: 18px;
  height: 18px;
}

/* Bottom elements bar */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.copyright-txt {
  font-size: 13.5px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.love-icon {
  width: 13px;
  height: 13px;
  color: #ff5f56;
  fill: #ff5f56;
  animation: beat 1.2s infinite alternate;
}

.aka-txt {
  font-weight: 700;
  color: var(--color-accent-blue);
}

.back-to-top {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 6px 16px;
  color: var(--color-light-blue);
  font-family: var(--font-family);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.back-to-top:hover {
  background: var(--glass-bg-hover);
  border-color: var(--color-accent-blue);
  color: var(--text-white);
  box-shadow: var(--glow-shadow);
}

.up-icon {
  width: 14px;
  height: 14px;
}

@keyframes beat {
  0% { transform: scale(1); }
  100% { transform: scale(1.2); }
}

@media (max-width: 576px) {
  .footer-top, .footer-bottom {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}
</style>

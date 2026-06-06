<script setup>
import { ref, onMounted } from 'vue';
import { Terminal, Cpu, ShieldCheck } from 'lucide-vue-next';

const emit = defineEmits(['loaded']);

const progress = ref(0);
const statusText = ref('Initializing lelxzyy systems...');
const logs = ref([
  'System startup initiated...',
  'Connecting local sensors...',
  'Compiling reactive dependencies...'
]);

const currentLog = ref('');
const logIndex = ref(0);

const simulateLoading = () => {
  const steps = [
    { text: 'Loading core variables...', delay: 400 },
    { text: 'Establishing secure port handshake...', delay: 800 },
    { text: 'Optimizing web telemetry interface...', delay: 1200 },
    { text: 'System ready: Welcome to xdalil.a portofolio!', delay: 1800 }
  ];

  // Update status messages smoothly
  steps.forEach((step) => {
    setTimeout(() => {
      statusText.value = step.text;
    }, step.delay);
  });

  // Smooth progress count up
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 1;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        emit('loaded');
      }, 300);
    }
  }, 18);
};

onMounted(() => {
  simulateLoading();
});
</script>

<template>
  <div class="splash-container">
    <div class="splash-glow"></div>
    <div class="splash-card">
      <!-- Icon/Logo area with rotating/pulsing ring -->
      <div class="logo-box">
        <div class="pulse-ring"></div>
        <div class="pulse-ring animation-delayed"></div>
        <div class="logo-circle">
          <Terminal class="icon-terminal" />
        </div>
      </div>

      <!-- Identity naming -->
      <div class="splash-brand">
        <h1 class="brand-title">xdalil<span class="dot">.a</span></h1>
        <p class="brand-tagline">Student • Web Developer • IoT Enthusiast</p>
      </div>

      <!-- Loading and bar container -->
      <div class="loading-wrapper">
        <div class="loading-info">
          <span class="status-message">{{ statusText }}</span>
          <span class="percentage-txt font-mono">{{ progress }}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>

      <!-- Tech decoration log -->
      <div class="terminal-logs-window font-mono">
        <div class="term-head">
          <span class="term-title">bootstrap_logs.sh</span>
        </div>
        <div class="term-body">
          <p class="term-line"><span class="usr">lelxzyy@framework</span>:~$ npm run start-portfolio</p>
          <p class="term-line success">✔ Loaded Vue 3 Composition API</p>
          <p class="term-line success">✔ Connected with IoT simulated hardware sockets</p>
          <p class="term-line info" v-if="progress >= 40">⚡ Mounting portfolio components...</p>
          <p class="term-line info" v-if="progress >= 80">⚡ Activating scroll reveal anchors...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.splash-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-dark-deep);
  background-image: 
    radial-gradient(circle at 50% 50%, var(--bg-dark-glow) 0%, var(--bg-dark-deep) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.splash-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(123, 189, 232, 0.15) 0%, transparent 65%);
  pointer-events: none;
}

.splash-card {
  width: 100%;
  max-width: 440px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
}

/* Elegant logo system */
.logo-box {
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--glow-shadow);
  z-index: 5;
}

.icon-terminal {
  width: 26px;
  height: 26px;
  color: var(--color-accent-blue);
  filter: drop-shadow(0 0 4px var(--color-accent-blue));
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid rgba(123, 189, 232, 0.25);
  animation: ripple 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.animation-delayed {
  animation-delay: 0.8s;
}

/* Naming details */
.brand-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-white);
  letter-spacing: -1px;
}

.brand-title .dot {
  color: var(--color-accent-blue);
}

.brand-tagline {
  font-size: 13px;
  color: var(--color-teal-glow);
  margin-top: 4px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Loading details */
.loading-wrapper {
  width: 100%;
  margin: 32px 0 24px 0;
}

.loading-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12.5px;
}

.status-message {
  color: var(--text-muted);
  font-weight: 500;
  /* Prevent text jumping */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
}

.percentage-txt {
  color: var(--color-accent-blue);
  font-weight: bold;
}

.progress-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.02);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent-blue));
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(123, 189, 232, 0.5);
  transition: width 0.1s linear;
}

/* Simulated terminal logs */
.terminal-logs-window {
  width: 100%;
  background: rgba(0, 10, 25, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-align: left;
}

.term-head {
  background: rgba(10, 65, 116, 0.2);
  padding: 6px 12px;
  border-bottom: 1px solid var(--glass-border);
}

.term-title {
  font-size: 10px;
  color: var(--color-teal-glow);
}

.term-body {
  padding: 12px;
  font-size: 11px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 110px;
  overflow-y: auto;
}

.term-line {
  color: rgba(255,255,255,0.5);
}

.term-line .usr {
  color: var(--color-accent-blue);
}

.term-line.success {
  color: #27c93f;
}

.term-line.info {
  color: var(--color-light-blue);
}

@keyframes ripple {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

@media (max-width: 480px) {
  .splash-card {
    padding: 20px;
  }
  .brand-title {
    font-size: 26px;
  }
}
</style>

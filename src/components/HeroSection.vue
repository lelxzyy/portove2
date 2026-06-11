<script setup>
import { ref, onMounted } from 'vue';
import { ArrowRight, Github, ExternalLink, Cpu, Code2, Sparkles } from 'lucide-vue-next';

const roles = ['Student', 'Web Developer', 'IoT Enthusiast'];
const currentRoleText = ref('');
const roleIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);

const typeRole = () => {
  const currentRole = roles[roleIndex.value];
  
  if (isDeleting.value) {
    // Delete character
    currentRoleText.value = currentRole.substring(0, charIndex.value - 1);
    charIndex.value--;
  } else {
    // Add character
    currentRoleText.value = currentRole.substring(0, charIndex.value + 1);
    charIndex.value++;
  }

  let typingSpeed = isDeleting.value ? 50 : 100;

  if (!isDeleting.value && charIndex.value === currentRole.length) {
    // Pause at the end of word
    typingSpeed = 1800;
    isDeleting.value = true;
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false;
    roleIndex.value = (roleIndex.value + 1) % roles.length;
    typingSpeed = 500;
  }

  setTimeout(typeRole, typingSpeed);
};

const handleScrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  setTimeout(typeRole, 1000);
});
</script>

<template>
  <section id="home" class="hero-section">
    <div class="container hero-content">
      <div class="hero-text-container">
        <!-- Floating badge -->
        <div class="welcome-badge">
          <Sparkles class="badge-icon" />
          <span>Selamat Datang di Portofolio Saya</span>
        </div>

        <h1 class="hero-title">
          Halo, Saya <span class="gradient-text">Lelxzyy</span> 
        </h1>
        <div class="typing-container">
          Saya seorang <span class="typing-role">{{ currentRoleText }}</span><span class="typing-cursor">|</span>
        </div>

        <p class="hero-description">
          Siswa yang berfokus mengembangkan aplikasi web modern interaktif dan mengintegrasikannya dengan hardware IoT cerdas. Senang mengeksplorasi teknologi baru dan membangun solusi digital yang bernilai.
        </p>

        <div class="hero-ctas">
          <button class="btn btn-primary" @click="handleScrollTo('projects')">
            Lihat Project <ArrowRight class="btn-icon" />
          </button>
          <button class="btn btn-secondary" @click="handleScrollTo('contact')">
            Hubungi Saya
          </button>
        </div>

        <!-- Mini stats/specs bar -->
        <div class="mini-spec-row">
          <div class="spec-col">
            <span class="spec-num">10+</span>
            <span class="spec-lbl">Sertifikat</span>
          </div>
          <div class="spec-col-divider"></div>
          <div class="spec-col">
            <span class="spec-num">15+</span>
            <span class="spec-lbl">GitHub Repo</span>
          </div>
          <div class="spec-col-divider"></div>
          <div class="spec-col">
            <span class="spec-num">5+</span>
            <span class="spec-lbl">Hardware IoT Project</span>
          </div>
        </div>
      </div>

      <!-- Hero Visual Glass Card -->
      <div class="hero-visual-container">
        <div class="glass-avatar-card glass-card">
          <div class="avatar-glow"></div>
          <div class="avatar-header">
            <div class="avatar-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="avatar-file">lelxzyy.js</span>
          </div>
          <div class="avatar-body">
            <pre class="code-editor">
<code><span class="line-syntax"><span class="keyword">const</span> <span class="variable">developer</span> = {</span>
<span class="line-syntax">  name: <span class="string">'xdalil.a_'</span>,</span>
<span class="line-syntax">  aka: <span class="string">'lelxzyy'</span>,</span>
<span class="line-syntax">  learning: <span class="string">'Web & IoT'</span>,</span>
<span class="line-syntax">  passion: <span class="string">'Creating high-quality UIs'</span>,</span>
<span class="line-syntax">  status: <span class="string">'Ready to collaborate'</span></span>
<span class="line-syntax">};</span>

<span class="line-syntax"><span class="comment">// Connecting Web and Physical World</span></span>
<span class="line-syntax"><span class="keyword">function</span> <span class="function">init</span>() {</span>
<span class="line-syntax">  console.log(<span class="string">'Let\'s build something awesome!'</span>);</span>
<span class="line-syntax">}</span>
<span class="line-syntax">init();</span></code>
            </pre>
          </div>
          <!-- Integrated Tech floating icons -->
          <div class="floating-tech-badge badge-web">
            <Code2 class="badge-icon-tech" />
            <span>Web Dev</span>
          </div>
          <div class="floating-tech-badge badge-iot">
            <Cpu class="badge-icon-tech" />
            <span>IoT Eng</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  padding-top: calc(80px + 60px);
}

.hero-content {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 60px;
}

.hero-text-container {
  display: flex;
  flex-direction: column;
}

.welcome-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(123, 189, 232, 0.1);
  border: 1px solid rgba(123, 189, 232, 0.2);
  padding: 8px 16px;
  border-radius: 40px;
  align-self: flex-start;
  margin-bottom: 24px;
}

.welcome-badge span {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-light-blue);
}

.badge-icon {
  width: 14px;
  height: 14px;
  color: var(--color-accent-blue);
}

.hero-title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1.5px;
  margin-bottom: 12px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-blue) 0%, var(--color-teal-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(123, 189, 232, 0.15));
}

.typing-container {
  font-size: 30px;
  font-weight: 700;
  color: var(--color-accent-blue);
  min-height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.typing-role {
  text-shadow: 0 0 12px rgba(123, 189, 232, 0.4);
}

.typing-cursor {
  animation: blink 0.8s infinite;
  color: var(--color-accent-blue);
  margin-left: 4px;
}

.hero-description {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 36px;
}

.hero-ctas {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-icon {
  transform: translateX(4px);
}

.mini-spec-row {
  display: flex;
  align-items: center;
  gap: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--glass-border);
}

.spec-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-num {
  font-family: var(--font-mono);
  font-size: 26px;
  font-weight: 800;
  color: var(--color-accent-blue);
}

.spec-lbl {
  font-size: 13px;
  color: var(--text-muted);
}

.spec-col-divider {
  width: 1px;
  height: 40px;
  background: var(--glass-border);
}

/* Hero Visual Box with code editor mock */
.hero-visual-container {
  display: flex;
  justify-content: center;
  position: relative;
}

.glass-avatar-card {
  width: 100%;
  max-width: 440px;
  aspect-ratio: 4 / 3.8;
  display: flex;
  flex-direction: column;
  overflow: visible; /* to allow floating elements to pop over */
  position: relative;
}

.avatar-glow {
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  background: radial-gradient(circle, rgba(123, 189, 232, 0.15) 0%, transparent 70%);
  z-index: -1;
  pointer-events: none;
}

.avatar-header {
  height: 44px;
  background: rgba(0, 20, 40, 0.4);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-top-left-radius: var(--radius-xl);
  border-top-right-radius: var(--radius-xl);
}

.avatar-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.avatar-file {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-teal-glow);
  margin-left: 20px;
}

.avatar-body {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  border-bottom-left-radius: var(--radius-xl);
  border-bottom-right-radius: var(--radius-xl);
}

.code-editor {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.6;
  color: #c9d1d9;
  text-align: left;
}

.line-syntax {
  display: block;
}

.keyword { color: #ff7b72; }
.variable { color: #79c0ff; }
.string { color: #a5d6ff; }
.comment { color: #8b949e; font-style: italic; }
.function { color: #d2a8ff; }

/* Floating floating badging */
.floating-tech-badge {
  position: absolute;
  background: rgba(10, 40, 75, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--glass-shadow);
  transition: var(--transition-smooth);
}

.floating-tech-badge span {
  font-weight: 600;
  font-size: 14px;
}

.badge-icon-tech {
  width: 18px;
  height: 18px;
  color: var(--color-accent-blue);
  filter: drop-shadow(0 0 3px var(--color-accent-blue));
}

.badge-web {
  top: 15%;
  left: -40px;
  animation: float-slow 4s ease-in-out infinite alternate;
}

.badge-iot {
  bottom: 12%;
  right: -30px;
  animation: float-slow 4s ease-in-out infinite alternate-reverse;
  animation-delay: 1s;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes float-slow {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-12px) rotate(2deg); }
}

@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }
  
  .welcome-badge {
    align-self: center;
  }
  
  .hero-ctas {
    justify-content: center;
  }
  
  .mini-spec-row {
    justify-content: center;
  }
  
  .badge-web {
    left: -10px;
  }
  .badge-iot {
    right: -10px;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 38px;
  }
  .typing-container {
    font-size: 22px;
  }
  .hero-ctas {
    flex-direction: column;
    width: 100%;
  }
  .hero-ctas button {
    width: 100%;
  }
}
</style>

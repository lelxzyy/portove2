<script setup>
import { Check, Mail, Award, BookOpen, Layers } from 'lucide-vue-next';

const focusAreas = [
  {
    icon: BookOpen,
    title: 'Siswa & Pembelajar',
    description: 'Aktif mempelajari rekayasa perangkat lunak dan sistem tertanam hardware secara mendalam.'
  },
  {
    icon: Layers,
    title: 'Web Developer',
    description: 'Menguasai pembuatan website modern dengan antarmuka dinamis, cepat, dan responsif.'
  },
  {
    icon: Award,
    title: 'IoT Enthusiast',
    description: 'Menyambungkan dunia nyata ke internet lewat mikrokontroler (ESP32/Arduino) dengan integrasi API.'
  }
];

const technicalSkills = [
  { name: 'Vue 3 / React', pct: 90 },
  { name: 'JavaScript / Node.js', pct: 85 },
  { name: 'C++ (IoT Arduino/ESP32)', pct: 80 },
  { name: 'HTML5 & CSS3', pct: 95 },
  { name: 'Vite & Frontend Build Tools', pct: 85 },
  { name: 'IoT Prototypes & Hardware integration', pct: 75 }
];
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Mengenal Lebih Dekat</span>
        <h2 class="section-title">About Me</h2>
      </div>

      <div class="about-grid">
        <!-- Self Intro Glass Card -->
        <div class="about-col about-bio-card glass-card">
          <div class="bio-inner">
            <h3 class="bio-title">Hello World!</h3>
            <p class="bio-p">
              Saya <strong>xdalil.a</strong> (juga dikenal sebagai <strong>lelxzyy</strong>). Saya adalah seorang siswa pengembang web dan penggiat device pintar (IoT enthusiast). Memiliki ketertarikan tinggi pada integrasi sistem software dengan hardware.
            </p>
            <p class="bio-p">
              Fokus saya adalah menciptakan pengalaman digital yang mulus dan interaktif. Mulai dari merancang antarmuka pixel-perfect menggunakan CSS modular, mengatur state management yang efisien, hingga memprogram ESP32 untuk mendeteksi kondisi fisik sekitar dan menampilkannya di dashboard web secara real-time.
            </p>
            
            <div class="personal-info">
              <div class="info-item">
                <span class="info-label">Nama Lengkap:</span>
                <span class="info-value">xdalil.a (Aminudin Dalil)</span>
              </div>
              <div class="info-item">
                <span class="info-label">Nama Panggilan:</span>
                <span class="info-value">lelxzyy</span>
              </div>
              <div class="info-item">
                <span class="info-label">Peran Utama:</span>
                <span class="info-value">Web Developer & IoT Architect</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Progress Card -->
        <div class="about-col skills-card glass-card">
          <h3 class="skills-title">Keahlian Teknis</h3>
          <p class="skills-desc">Berikut estimasi pemahaman saya di beberapa bidang teknologi:</p>

          <div class="skills-list">
            <div v-for="skill in technicalSkills" :key="skill.name" class="skill-item">
              <div class="skill-meta">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percentage">{{ skill.pct }}%</span>
              </div>
              <div class="skill-progress-bg">
                <div class="skill-progress-fill" :style="{ width: `${skill.pct}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Specialized Cards -->
      <div class="focus-grid">
        <div v-for="focus in focusAreas" :key="focus.title" class="focus-card glass-card">
          <div class="focus-icon-wrapper">
            <component :is="focus.icon" class="focus-icon" />
          </div>
          <h4 class="focus-title">{{ focus.title }}</h4>
          <p class="focus-desc">{{ focus.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 30px;
  margin-bottom: 50px;
}

.about-bio-card, .skills-card {
  padding: 40px;
}

.about-bio-card:hover, .skills-card:hover {
  transform: translateY(-2px);
}

.bio-title, .skills-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 20px;
  position: relative;
}

.bio-title::after, .skills-title::after {
  content: '';
  display: block;
  width: 35px;
  height: 3px;
  background: var(--color-accent-blue);
  margin-top: 8px;
  border-radius: 2px;
}

.bio-p {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 18px;
}

.personal-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--glass-border);
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.info-label {
  color: var(--color-teal-glow);
  font-weight: 500;
}

.info-value {
  font-weight: 600;
  color: var(--text-white);
}

.skills-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13.5px;
  font-weight: 600;
}

.skill-name {
  color: var(--text-white);
}

.skill-percentage {
  font-family: var(--font-mono);
  color: var(--color-accent-blue);
}

.skill-progress-bg {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.skill-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent-blue));
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(123, 189, 232, 0.4);
}

/* Focus Grid below */
.focus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.focus-card {
  padding: 30px;
  text-align: center;
  transition: var(--transition-smooth);
}

.focus-icon-wrapper {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px auto;
  border-radius: var(--radius-lg);
  background: rgba(123, 189, 232, 0.1);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
}

.focus-card:hover .focus-icon-wrapper {
  background: rgba(123, 189, 232, 0.2);
  border-color: var(--color-accent-blue);
  box-shadow: var(--glow-shadow);
  transform: scale(1.05);
}

.focus-icon {
  width: 26px;
  height: 26px;
  color: var(--color-accent-blue);
}

.focus-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 12px;
}

.focus-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 992px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  .focus-grid {
    grid-template-columns: 1fr;
  }
}
</style>

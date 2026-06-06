<script setup>
import { ref, computed } from 'vue';
import { Github, Star, GitFork, ExternalLink, Filter, Folder, Cpu, Code2 } from 'lucide-vue-next';

const categories = ['All', 'Web App', 'IoT Hardware', 'Tools'];
const selectedCategory = ref('All');

const repos = [
  {
    name: 'soil-monitor-iot',
    owner: 'lelxzyy',
    category: 'IoT Hardware',
    desc: 'Sistem monitoring kelembaban tanah cerdas berbasis ESP32. Mengirim data telemetry tanah ke dashboard web via WebSocket secara berkala.',
    stars: 12,
    forks: 4,
    lang: 'C++',
    techs: ['ESP32', 'WebSocket', 'Capacitive Soil Sensor', 'Node.js'],
    link: 'https://github.com/dalilaminudin'
  },
  {
    name: 'smart-home-vue',
    owner: 'lelxzyy',
    category: 'Web App',
    desc: 'Aplikasi web panel kontrol piranti rumah (lampu, suhu AC, tirai hias). Menampilkan konsumsi energi bulanan dalam bentuk grafik interaktif.',
    stars: 28,
    forks: 8,
    lang: 'Vue 3',
    techs: ['Vue 3 Composition', 'Pinia State', 'CSS Grid', 'Vite'],
    link: 'https://github.com/dalilaminudin'
  },
  {
    name: 'express-sensor-api',
    owner: 'lelxzyy',
    category: 'Tools',
    desc: 'REST API backend kokoh untuk menerima data pembacaan sensor IoT dari ribuan perangkat klien secara paralel. Dilengkapi rate limiting.',
    stars: 15,
    forks: 3,
    lang: 'JavaScript',
    techs: ['Express', 'NodeJS', 'SQLite', 'JWT Auth'],
    link: 'https://github.com/dalilaminudin'
  },
  {
    name: 'water-leak-alarm',
    owner: 'lelxzyy',
    category: 'IoT Hardware',
    desc: 'Prototype nirkabel pendeteksi kebocoran pipa berbasis GSM SIM800L. Mengirim notifikasi SMS dan alarm buzzer ketika ada genangan air.',
    stars: 8,
    forks: 2,
    lang: 'C++',
    techs: ['Arduino', 'GSM Module', 'Water Flow Sensor', 'Buzzer'],
    link: 'https://github.com/dalilaminudin'
  },
  {
    name: 'portfolio-website',
    owner: 'lelxzyy',
    category: 'Web App',
    desc: 'Repositori source-code dari website portofolio interaktif ini. Didesain secara manual dengan CSS murni dan Glassmorphism visual.',
    stars: 34,
    forks: 6,
    lang: 'Vue 3',
    techs: ['Vue CSS Variables', 'Composition API', 'Lucide Icons'],
    link: 'https://github.com/dalilaminudin'
  }
];

const filteredRepos = computed(() => {
  if (selectedCategory.value === 'All') return repos;
  return repos.filter(repo => repo.category === selectedCategory.value);
});
</script>

<template>
  <section id="projects" class="github-projects-section">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Koleksi Terbuka</span>
        <h2 class="section-title">GitHub Portfolio</h2>
      </div>

      <!-- Filter Controls -->
      <div class="filter-wrapper">
        <div class="filter-header-text">
          <Filter class="filter-icon" />
          <span>Saring Kategori Project:</span>
        </div>
        <div class="filter-buttons">
          <button 
            v-for="cat in categories" 
            :key="cat" 
            class="filter-btn"
            :class="{ 'active': selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <div 
          v-for="repo in filteredRepos" 
          :key="repo.name" 
          class="project-card glass-card"
        >
          <!-- Top Row info -->
          <div class="card-p-header">
            <div class="folder-wrap">
              <Folder class="folder-icon" />
              <span class="repo-owner">{{ repo.owner }} /</span>
            </div>
            
            <a :href="repo.link" target="_blank" rel="noopener noreferrer" class="link-circle-btn" aria-label="Open Repository">
              <Github class="icon-git-link" />
            </a>
          </div>

          <!-- Title and Description -->
          <div class="repo-meta-info">
            <h3 class="repo-name-text">{{ repo.name }}</h3>
            <span class="category-pill">{{ repo.category }}</span>
          </div>

          <p class="repo-desc">{{ repo.desc }}</p>

          <!-- Tech Badges -->
          <div class="repo-tech-stack">
            <span v-for="tech in repo.techs" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>

          <!-- Bottom Row Metrics -->
          <div class="card-p-footer">
            <div class="primary-lang-indicator">
              <span class="lang-color-dot" :class="repo.lang.toLowerCase().replace(' ', '-').replace('+','-')"></span>
              <span class="lang-text-label">{{ repo.lang }}</span>
            </div>

            <div class="repo-stats-row">
              <div class="stat-icon-group">
                <Star class="stat-icon" />
                <span>{{ repo.stars }}</span>
              </div>
              <div class="stat-icon-group">
                <GitFork class="stat-icon" />
                <span>{{ repo.forks }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 44px;
}

.filter-header-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-light-blue);
  font-family: var(--font-mono);
}

.filter-icon {
  width: 14px;
  height: 14px;
  color: var(--color-accent-blue);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.filter-btn {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 10px 22px;
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.filter-btn:hover {
  background: rgba(123, 189, 232, 0.1);
  border-color: var(--color-accent-blue);
  color: var(--text-white);
}

.filter-btn.active {
  background: var(--color-accent-blue);
  border-color: var(--color-accent-blue);
  color: var(--bg-dark-deep);
  box-shadow: var(--glow-shadow);
}

/* Projects grid area */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: 340px;
  transition: var(--transition-smooth);
}

.project-card:hover {
  transform: translateY(-8px);
}

.card-p-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.folder-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.folder-icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent-blue);
}

.repo-owner {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-cyan-mute);
}

.link-circle-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-muted);
  transition: var(--transition-fast);
}

.link-circle-btn:hover {
  border-color: var(--color-accent-blue);
  background: var(--glass-bg-hover);
  color: var(--text-white);
  box-shadow: var(--glow-shadow);
}

.icon-git-link {
  width: 18px;
  height: 18px;
}

.repo-meta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.repo-name-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-white);
}

.category-pill {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-teal-glow);
  background: rgba(110, 162, 179, 0.12);
  border: 1px solid rgba(110, 162, 179, 0.25);
  padding: 2px 10px;
  border-radius: 12px;
}

.repo-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.repo-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 24px;
}

.tech-tag {
  font-size: 11px;
  color: #a4cde8;
  background: rgba(123, 189, 232, 0.06);
  border: 1px solid rgba(123, 189, 232, 0.12);
  padding: 2px 8px;
  border-radius: 6px;
}

.card-p-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--glass-border);
}

.primary-lang-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.lang-color-dot.c-- { background: #f34b7d; }
.lang-color-dot.vue-3 { background: #41b883; }
.lang-color-dot.javascript { background: #f1e05a; }

.lang-text-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.repo-stats-row {
  display: flex;
  gap: 12px;
}

.stat-icon-group {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-cyan-mute);
  font-size: 12px;
  font-family: var(--font-mono);
}

.stat-icon {
  width: 13px;
  height: 13px;
}

@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

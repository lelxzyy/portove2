<script setup>
import { Calendar, Briefcase, GraduationCap, Cpu, Rocket } from 'lucide-vue-next';

const keyMilestones = [
  {
    id: 1,
    year: '2025 - Sekarang',
    title: 'IoT Dashboard & Fullstack Integration',
    category: 'iot',
    icon: Cpu,
    organization: 'Independent Projects / Freelance',
    description: 'Fokus mengintegrasikan mikrokontroler hardware dengan backend API web. Membangun sistem monitoring real-time berbasis WebSockets dan visualisasi grafis interaktif.'
  },
  {
    id: 2,
    year: '2024 - 2025',
    title: 'Eksplorasi Hardware & Smart Devices',
    category: 'iot',
    icon: Rocket,
    organization: 'Self Exploration & Community',
    description: 'Mulai mendalami sensor modular, motor servo, Bluetooth Low Energy (BLE), dan Wi-Fi modem ESP32. Berhasil merakit purwarupa Smart Home Automation dan sistem deteksi bencana banjir.'
  },
  {
    id: 3,
    year: '2023 - 2024',
    title: 'Spesialisasi Web Frontend & Vue 3',
    category: 'web',
    icon: Briefcase,
    organization: 'Code Bootcamp & Projects',
    description: 'Mendalami JavaScript modern, Vue 3 Composition API, Vite, state management Pinia, dan interaksi REST API. Fokus pada antarmuka modern yang ramah pengguna.'
  },
  {
    id: 4,
    year: '2022 - Sekarang',
    title: 'Pendidikan Kejuruan Teknologi',
    category: 'edu',
    icon: GraduationCap,
    organization: 'Sekolah Menengah Kejuruan (SMK)',
    description: 'Mempelajari dasar-dasar Computer Science, logika pemrograman, administrasi jaringan komputer, arsitektural database, dan troubleshooting perangkat keras.'
  }
];
</script>

<template>
  <section id="history" class="timeline-section">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Perjalanan Pengalaman</span>
        <h2 class="section-title">My Journey History</h2>
      </div>

      <!-- Timeline structure -->
      <div class="timeline-container">
        <!-- Main Line -->
        <div class="timeline-line"></div>

        <!-- Cards loop -->
        <div 
          v-for="(item, idx) in keyMilestones" 
          :key="item.id" 
          class="timeline-item"
          :class="idx % 2 === 0 ? 'item-left' : 'item-right'"
        >
          <!-- Bullet node -->
          <div class="timeline-badge">
            <component :is="item.icon" class="badge-icon-inner" />
          </div>

          <!-- Card Content -->
          <div class="timeline-content glass-card">
            <div class="item-meta">
              <span class="item-year-badge">{{ item.year }}</span>
              <span class="item-org">{{ item.organization }}</span>
            </div>
            
            <h3 class="item-title">{{ item.title }}</h3>
            
            <p class="item-desc">{{ item.description }}</p>

            <div class="item-category-tag">
              <span v-if="item.category === 'iot'" class="tag-milestone iot">Internet of Things</span>
              <span v-else-if="item.category === 'web'" class="tag-milestone web">Web Development</span>
              <span v-else class="tag-milestone edu">Education</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  position: relative;
}

.timeline-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 0;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: linear-gradient(180deg, 
    rgba(123, 189, 232, 0) 0%, 
    rgba(123, 189, 232, 0.4) 15%, 
    rgba(123, 189, 232, 0.4) 85%, 
    rgba(123, 189, 232, 0) 100%
  );
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  width: 50%;
  margin-bottom: 50px;
  display: flex;
}

.item-left {
  left: 0;
  padding-right: 48px;
  justify-content: flex-end;
}

.item-right {
  left: 50%;
  padding-left: 48px;
  justify-content: flex-start;
}

/* Bullets */
.timeline-badge {
  position: absolute;
  top: 15px;
  width: 44px;
  height: 44px;
  background: #001e38;
  border: 2px solid var(--color-accent-blue);
  box-shadow: 0 0 15px rgba(123, 189, 232, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: var(--transition-smooth);
}

.timeline-item:hover .timeline-badge {
  transform: scale(1.15);
  box-shadow: var(--glow-shadow-strong);
  border-color: var(--color-teal-glow);
}

.item-left .timeline-badge {
  right: -22px;
}

.item-right .timeline-badge {
  left: -22px;
}

.badge-icon-inner {
  width: 18px;
  height: 18px;
  color: var(--color-accent-blue);
}

.timeline-item:hover .badge-icon-inner {
  color: var(--color-light-blue);
}

/* Content Panel */
.timeline-content {
  width: 100%;
  max-width: 430px;
  padding: 30px;
  text-align: left;
}

.item-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.item-year-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  background: var(--color-primary);
  border: 1px solid var(--glass-border);
  color: var(--color-light-blue);
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

.item-org {
  font-size: 13px;
  color: var(--color-cyan-mute);
  font-weight: 500;
}

.item-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 12px;
  line-height: 1.4;
}

.item-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 20px;
}

.tag-milestone {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
}

.tag-milestone.iot {
  background: rgba(110, 162, 179, 0.15);
  color: var(--color-teal-glow);
  border: 1px solid rgba(110, 162, 179, 0.25);
}

.tag-milestone.web {
  background: rgba(123, 189, 232, 0.15);
  color: var(--color-accent-blue);
  border: 1px solid rgba(123, 189, 232, 0.25);
}

.tag-milestone.edu {
  background: rgba(189, 216, 233, 0.1);
  color: var(--color-light-blue);
  border: 1px solid rgba(189, 216, 233, 0.2);
}

@media (max-width: 768px) {
  .timeline-line {
    left: 24px;
  }
  
  .timeline-item {
    width: 100%;
    margin-bottom: 40px;
    padding-left: 60px;
    padding-right: 0;
    justify-content: flex-start;
  }
  
  .item-left, .item-right {
    left: 0;
  }
  
  .item-left .timeline-badge, 
  .item-right .timeline-badge {
    left: 2px;
  }
  
  .timeline-content {
    max-width: 100%;
  }
}
</style>

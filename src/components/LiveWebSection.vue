<script setup>
import { ref } from 'vue';
import { ExternalLink, Layers, Globe, Monitor, Smartphone, Check, Sparkles } from 'lucide-vue-next';

const liveWebsites = [
  {
    name: 'IoT Weather Station Dashboard',
    desc: 'Dashboard interaktif real-time yang memvisualisasikan data suhu udara, kelembaban tanah, kecepatan angin, dan status curah hujan dari mikrokontroler fisik ESP32.',
    url: 'https://weather.lelxzyy.dev',
    techs: ['Vue 3', 'WebSockets', 'ChartJS', 'Sass'],
    accentType: 'weather'
  },
  {
    name: 'Smart Greenhouse Controller',
    desc: 'Sistem otomasi hidroponik tanaman pangan dalam ruangan. Pengguna bisa mengatur waktu pompa, kipas blower, dan menyalakan lampu pengganti matahari (grow-light) langsung dari web.',
    url: 'https://greenhouse.lelxzyy.dev',
    techs: ['React', 'Tailwind', 'Firebase', 'ESP32'],
    accentType: 'greenhouse'
  }
];

const selectedDevice = ref('desktop');
</script>

<template>
  <section id="live-web" class="live-web-section">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Koleksi Demo Online</span>
        <h2 class="section-title">Live Web Showcase</h2>
      </div>

      <!-- Live Web Show grid wrapper -->
      <div class="showcase-grid">
        <div 
          v-for="site in liveWebsites" 
          :key="site.name" 
          class="showcase-card glass-card"
        >
          <!-- Elegant Digital Browser Mockup Container -->
          <div class="browser-mockup" :class="site.accentType">
            <!-- Browser Header -->
            <div class="bm-header">
              <div class="bm-circles">
                <span class="bm-circle r"></span>
                <span class="bm-circle y"></span>
                <span class="bm-circle g"></span>
              </div>
              <div class="bm-url-bar">
                <Globe class="glob-icon" />
                <span class="url-text">{{ site.url }}</span>
              </div>
            </div>

            <!-- Browser content simulated with beautiful visual graphic UI -->
            <div class="bm-viewport">
              <div class="mock-website-ui">
                <div class="mock-nav">
                  <div class="mock-b-logo"></div>
                  <div class="mock-nav-links">
                    <span class="mn-link"></span>
                    <span class="mn-link"></span>
                  </div>
                </div>

                <!-- Simulated Dashboards / Charts -->
                <div v-if="site.accentType === 'weather'" class="mock-weather-dash">
                  <div class="m-card main-temp">
                    <span class="m-title">SUHU RUANG</span>
                    <span class="m-value glow">28.4°C</span>
                    <span class="m-stat">● Normal</span>
                  </div>
                  <div class="m-card secondary-val">
                    <span class="m-title">KELEMBABAN</span>
                    <span class="m-value">62%</span>
                    <span class="m-bar-chart">
                      <span class="m-chart-fill" style="width: 62%"></span>
                    </span>
                  </div>
                  <div class="m-card secondary-val">
                    <span class="m-title">Cahaya</span>
                    <span class="m-value">450 Lux</span>
                    <span class="m-bar-chart">
                      <span class="m-chart-fill" style="width: 45%"></span>
                    </span>
                  </div>
                </div>

                <div v-else class="mock-greenhouse-dash">
                  <div class="m-card green-header">
                    <span class="m-title">GREENHOUSE STATUS</span>
                    <span class="g-pulse-dot"></span>
                    <span class="m-lbl">SISTEM AKTIF</span>
                  </div>
                  <div class="m-controls-grid">
                    <div class="m-control-item active">
                      <span class="m-cnt-lbl">Pompa Air</span>
                      <span class="m-cnt-status-pill">ON</span>
                    </div>
                    <div class="m-control-item">
                      <span class="m-cnt-lbl">Grow Lights</span>
                      <span class="m-cnt-status-pill off">OFF</span>
                    </div>
                  </div>
                  <div class="m-progress-radial">
                    <div class="rad-circle">85%</div>
                    <span class="rad-lbl">Debit Air Reservoir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Site Descriptions & Details -->
          <div class="site-info-box">
            <div class="site-header-row">
              <h3 class="site-title-txt">{{ site.name }}</h3>
              <div class="spark-badge">
                <Sparkles class="spark-icon" />
                <span>Internet / Cloud Connected</span>
              </div>
            </div>

            <p class="site-desc-txt">{{ site.desc }}</p>

            <div class="site-techs">
              <span v-for="tech in site.techs" :key="tech" class="tag">{{ tech }}</span>
            </div>

            <!-- Redirect action simulation buttons -->
            <div class="site-actions-row">
              <a 
                :href="site.url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn btn-primary btn-sm-show"
                @click.prevent
              >
                <span>Kunjungi Website Demo</span>
                <ExternalLink class="btn-sm-icon" />
              </a>
              <div class="sim-notice">* Demo simulasi UI terintegrasi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.showcase-card {
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  overflow: hidden;
  border-radius: var(--radius-2xl);
}

.showcase-card:hover {
  transform: translateY(-8px);
}

/* Simulated digital browser mockup styling */
.browser-mockup {
  background: #001224;
  height: 320px;
  border-right: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  position: relative;
}

.bm-header {
  height: 40px;
  background: rgba(0, 10, 25, 0.6);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
}

.bm-circles {
  display: flex;
  gap: 6px;
}

.bm-circle {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.bm-circle.r { background: #ff5f56; }
.bm-circle.y { background: #ffbd2e; }
.bm-circle.g { background: #27c93f; }

.bm-url-bar {
  flex-grow: 1;
  max-width: 400px;
  height: 24px;
  background: rgba(0, 20, 40, 0.5);
  border: 1px solid var(--glass-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 8px;
}

.glob-icon {
  width: 12px;
  height: 12px;
  color: var(--color-cyan-mute);
}

.url-text {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-light-blue);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bm-viewport {
  flex-grow: 1;
  padding: 24px;
  background: #020e1a;
  overflow: hidden;
}

/* Beautiful custom simulated web app dashboard */
.mock-website-ui {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.05);
  background: #001d36;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.mock-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 10px;
}

.mock-b-logo {
  width: 32px;
  height: 8px;
  background: var(--color-accent-blue);
  border-radius: 4px;
}

.mock-nav-links {
  display: flex;
  gap: 8px;
}

.mn-link {
  width: 18px;
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}

/* Weather Dash Mock Content */
.mock-weather-dash {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  height: calc(100% - 30px);
}

.m-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-temp {
  grid-row: span 2;
  border-color: rgba(123, 189, 232, 0.2);
  background: rgba(10, 65, 116, 0.15);
}

.m-title {
  font-family: var(--font-mono);
  font-size: 8px;
  color: var(--color-teal-glow);
  letter-spacing: 1px;
}

.m-value {
  font-size: 22px;
  font-weight: 800;
  color: var(--text-white);
  line-height: 1.2;
}

.m-value.glow {
  color: var(--color-light-blue);
  text-shadow: 0 0 10px rgba(123, 189, 232, 0.4);
}

.m-stat {
  font-size: 8px;
  color: #27c93f;
  margin-top: 4px;
}

.secondary-val {
  gap: 4px;
}

.m-bar-chart {
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  display: block;
  overflow: hidden;
}

.m-chart-fill {
  background: var(--color-accent-blue);
  height: 100%;
  display: block;
}

/* Greenhouse Dash Mock Content */
.mock-greenhouse-dash {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 12px;
  height: calc(100% - 30px);
}

.green-header {
  grid-column: span 2;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px 12px;
}

.g-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #27c93f;
  box-shadow: 0 0 8px #27c93f;
  animation: pulse-slow 2s infinite;
}

.m-lbl {
  font-size: 8px;
  font-weight: 600;
  color: #27c93f;
}

.m-controls-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.m-control-item {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 6px;
  padding: 6px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.m-control-item.active {
  background: rgba(123, 189, 232, 0.08);
  border-color: rgba(123, 189, 232, 0.15);
}

.m-cnt-lbl {
  font-size: 9px;
  font-weight: 500;
}

.m-cnt-status-pill {
  font-size: 8px;
  font-weight: 700;
  background: #27c93f;
  color: #001224;
  padding: 1px 5px;
  border-radius: 4px;
}

.m-cnt-status-pill.off {
  background: rgba(255,255,255,0.1);
  color: var(--text-muted);
}

.m-progress-radial {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.rad-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3.5px solid var(--color-accent-blue);
  border-left-color: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  font-family: var(--font-mono);
}

.rad-lbl {
  font-size: 7.5px;
  color: var(--text-muted);
}

/* Site Details Side Card styling */
.site-info-box {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.site-header-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.site-title-txt {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-white);
  line-height: 1.3;
}

.spark-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(110, 162, 179, 0.15);
  border: 1px solid rgba(110, 162, 179, 0.25);
  padding: 4px 10px;
  border-radius: 30px;
  align-self: flex-start;
}

.spark-badge span {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-teal-glow);
}

.spark-icon {
  width: 11px;
  height: 11px;
  color: var(--color-teal-glow);
}

.site-desc-txt {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.site-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;
}

.site-actions-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-sm-show {
  padding: 10px 20px;
  font-size: 13.5px;
}

.btn-sm-icon {
  width: 14px;
  height: 14px;
}

.sim-notice {
  font-size: 11.5px;
  color: var(--color-cyan-mute);
  font-style: italic;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@media (max-width: 992px) {
  .showcase-card {
    grid-template-columns: 1fr;
  }
  .browser-mockup {
    border-right: none;
    border-bottom: 1px solid var(--glass-border);
  }
}
</style>

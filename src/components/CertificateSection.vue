<script setup>
import { ref } from 'vue';
import { Award, ExternalLink, X, Calendar, Landmark, CheckCircle } from 'lucide-vue-next';

const certificates = [
  {
    id: 1,
    title: 'JUARA 2 UIUX AMICTA COMPETITION 2025',
    issuer: 'AMIKOM Yogyakarta',
    date: 'Mei 2025',
    credId: 'IND-9812A292-VX',
    category: 'web',
    imageText: 'AMICTA UI/UX Award',
    detail: 'Menyelesaikan kurikulum pembelajaran pembuatan aplikasi web modern menggunakan Vue.js, Vue Router, reactive state, dan deployment.'
  },
  {
    id: 2,
    title: 'Pengenalan Praktis Internet of Things (IoT)',
    issuer: 'IoT Academy & Microcontrollers Ind.',
    date: 'Oktober 2024',
    credId: 'IOT-8201-MC99',
    category: 'iot',
    imageText: 'IoT Fundamentals',
    detail: 'Mempelajari arsitektur mikro, pemrograman firmware C++ ESP32/esp8266, sensor analog, aktuator, kalibrasi ADC, dan pengiriman MQTT telemetry.'
  },
  {
    id: 3,
    title: 'Responsive Web Design Certification',
    issuer: 'freeCodeCamp.org',
    date: 'Maret 2024',
    credId: 'FCC-8839-RWD',
    category: 'web',
    imageText: 'HTML/CSS Certificate',
    detail: 'Menyelesaikan 300+ jam pelatihan rekayasa HTML, CSS grid & flexbox, keselarasan warna, tipografi beradaptasi, dan pengujian aksesibilitas WCAG.'
  },
  {
    id: 4,
    title: 'Belajar Membuat Aplikasi Back-End Pemula',
    issuer: 'Dicoding Indonesia',
    date: 'Juli 2025',
    credId: 'IND-4341B201-BE',
    category: 'web',
    imageText: 'Back-End Certificate',
    detail: 'Mempelajari cara membangun RESTful API menggunakan Node.js, routing Express, penanganan middleware, CORS hobi, serta validasi skema database.'
  }
];

const selectedCert = ref(null);

const openModal = (cert) => {
  selectedCert.value = cert;
  document.body.style.overflow = 'hidden'; // Lock scrolling
};

const closeModal = () => {
  selectedCert.value = null;
  document.body.style.overflow = ''; // Unlock scrolling
};
</script>

<template>
  <section id="certificates" class="certificates-section">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Kredensial & Validasi</span>
        <h2 class="section-title">Diplomas & Certificates</h2>
      </div>

      <!-- Cert Cards Grid -->
      <div class="certs-grid">
        <div 
          v-for="cert in certificates" 
          :key="cert.id" 
          class="cert-card glass-card"
          @click="openModal(cert)"
        >
          <!-- Certificate Badge icon -->
          <div class="cert-icon-box">
            <Award class="cert-primary-icon" />
          </div>

          <div class="cert-body">
            <div class="cert-meta">
              <span class="issuer-badge">
                <Landmark class="meta-subicon" />
                {{ cert.issuer }}
              </span>
              <span class="cert-date">{{ cert.date }}</span>
            </div>

            <h3 class="cert-title">{{ cert.title }}</h3>
            
            <p class="cert-id">ID: <code>{{ cert.credId }}</code></p>
            
            <div class="cert-btn-preview">
              <span>Klik untuk Preview</span>
              <ExternalLink class="p-icon" />
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Preview Backdrop -->
      <Transition name="fade">
        <div v-if="selectedCert" class="cert-modal-overlay" @click.self="closeModal">
          <div class="cert-modal-content glass-card">
            <!-- Close btn -->
            <button class="cert-modal-close" @click="closeModal" aria-label="Close">
              <X class="close-icon" />
            </button>

            <!-- Certificate Visual Mockup -->
            <div class="cert-mockup-frame">
              <div class="cert-glares"></div>
              <div class="cert-mockup-inner">
                <!-- Watermark -->
                <div class="modal-watermark">
                  <Award class="watermark-symbol" />
                </div>
                
                <div class="cert-v-header">
                  <div class="seal-logo">
                    <Award class="seal-gold-icon" />
                    <span>CERTIFIED</span>
                  </div>
                  <span class="cert-no">Credential ID: {{ selectedCert.credId }}</span>
                </div>

                <div class="cert-v-body">
                  <span class="cert-badge-type">CERTIFICATE OF RECOGNITION</span>
                  <div class="presented-to">Diberikan Kepada :</div>
                  <div class="recipient-name">xdalil.a / lelxzyy</div>
                  <div class="cert-statement">
                    Atas penyelesaian yang luar biasa dan dinyatakan lulus pada program pelatihan:
                  </div>
                  <div class="cert-program-title">"{{ selectedCert.title }}"</div>
                  <div class="issued-by">Diselenggarakan oleh {{ selectedCert.issuer }}</div>
                </div>

                <div class="cert-v-footer">
                  <div class="sign-block">
                    <div class="sig-line"></div>
                    <span class="sig-name">Board of Directors</span>
                    <span class="sig-title">{{ selectedCert.issuer }}</span>
                  </div>
                  <div class="date-block">
                    <span class="lbl-block">Dikeluarkan pada:</span>
                    <span class="val-block">{{ selectedCert.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cert description beneath -->
            <div class="cert-modal-details">
              <div class="detail-h-row">
                <CheckCircle class="checked-icon" />
                <h4>Detail Kompetensi</h4>
              </div>
              <p class="detail-description">{{ selectedCert.detail }}</p>
              
              <div class="cert-info-footer">
                <div class="badge-item">
                  <span>Penerbit:</span> <strong>{{ selectedCert.issuer }}</strong>
                </div>
                <div class="badge-item">
                  <span>Kategori:</span> <span class="tag">{{ selectedCert.category === 'web' ? 'UIUX' : 'IoT Hardware' }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.certs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.cert-card {
  display: flex;
  gap: 20px;
  padding: 30px;
  cursor: pointer;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.cert-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--color-accent-blue);
  opacity: 0.7;
}

.cert-icon-box {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-lg);
  background: rgba(123, 189, 232, 0.1);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition-smooth);
}

.cert-card:hover .cert-icon-box {
  background: var(--color-primary);
  border-color: var(--color-accent-blue);
  transform: rotate(10deg);
}

.cert-primary-icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent-blue);
}

.cert-card:hover .cert-primary-icon {
  color: var(--text-white);
}

.cert-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cert-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.issuer-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-teal-glow);
}

.meta-subicon {
  width: 12px;
  height: 12px;
}

.cert-date {
  font-size: 12px;
  color: var(--color-cyan-mute);
}

.cert-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 8px;
  line-height: 1.4;
}

.cert-id {
  font-size: 12.5px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.cert-id code {
  color: var(--color-accent-blue);
}

.cert-btn-preview {
  display:inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent-blue);
}

/* Modal CSS */
.cert-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 15, 30, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.cert-modal-content {
  width: 100%;
  max-width: 720px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-2xl);
  outline: none;
}

.cert-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: rgba(0, 20, 40, 0.4);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-white);
  cursor: pointer;
  z-index: 50;
  transition: var(--transition-smooth);
}

.cert-modal-close:hover {
  background: rgba(220, 50, 50, 0.2);
  border-color: #ff5f56;
  color: #ff5f56;
  transform: rotate(90deg);
}

.close-icon {
  width: 20px;
  height: 20px;
}

/* Certificate Vector Mockup representation */
.cert-mockup-frame {
  background: linear-gradient(135deg, #0e2942, #041423);
  padding: 40px;
  border-bottom: 1px solid var(--glass-border);
  position: relative;
  overflow: hidden;
}

.cert-glares {
  position: absolute;
  top:-20%; left:-20%; right:-20%; bottom:-20%;
  background: radial-gradient(circle, rgba(123, 189, 232, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.cert-mockup-inner {
  background: #020f1b;
  border: 3px double var(--glass-border);
  border-radius: 12px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.04;
  pointer-events: none;
}

.watermark-symbol {
  width: 200px;
  height: 200px;
  color: var(--color-accent-blue);
}

.cert-v-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.seal-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.seal-gold-icon {
  width: 22px;
  height: 22px;
  color: var(--color-accent-blue);
}

.seal-logo span {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 700;
  color: var(--color-accent-blue);
}

.cert-no {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-cyan-mute);
}

.cert-v-body {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 24px;
}

.cert-badge-type {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-teal-glow);
  letter-spacing: 4px;
  display: block;
  margin-bottom: 12px;
}

.presented-to {
  font-size: 12px;
  color: var(--text-muted);
}

.recipient-name {
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, var(--color-light-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 8px 0 16px 0;
  text-shadow: 0 0 15px rgba(123, 189, 232, 0.4);
}

.cert-statement {
  font-size: 13px;
  color: var(--text-muted);
}

.cert-program-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-accent-blue);
  margin: 12px 0;
  line-height: 1.4;
}

.issued-by {
  font-size: 12px;
  color: var(--color-cyan-mute);
}

.cert-v-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 12px;
}

.sign-block {
  display: flex;
  flex-direction: column;
  width: 140px;
}

.sig-line {
  height: 1px;
  background: var(--glass-border);
  margin-bottom: 8px;
}

.sig-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-white);
}

.sig-title {
  font-size: 9px;
  color: var(--color-cyan-mute);
}

.date-block {
  text-align: right;
}

.lbl-block {
  display: block;
  font-size: 9px;
  color: var(--color-cyan-mute);
}

.val-block {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-white);
}

.cert-modal-details {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #021121;
}

.detail-h-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checked-icon {
  width: 18px;
  height: 18px;
  color: var(--color-accent-blue);
}

.detail-h-row h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-white);
}

.detail-description {
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.6;
}

.cert-info-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--glass-border);
}

.badge-item {
  font-size: 12px;
  color: var(--text-muted);
}

.badge-item strong {
  color: var(--text-white);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 992px) {
  .certs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .cert-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
  }
  .cert-mockup-frame {
    padding: 20px;
  }
  .cert-mockup-inner {
    padding: 16px;
  }
  .recipient-name {
    font-size: 18px;
  }
  .cert-program-title {
    font-size: 14px;
  }
}
</style>

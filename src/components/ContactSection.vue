<script setup>
import { ref } from 'vue';
import { Mail, Send, CheckCircle, Github, MapPin, Phone, AlertCircle, Sparkles } from 'lucide-vue-next';

const name = ref('');
const email = ref('');
const message = ref('');

const isSubmitting = ref(false);
const showSuccess = ref(false);
const errorMsg = ref('');

const handleSubmit = () => {
  errorMsg.value = '';
  
  if (!name.value || !email.value || !message.value) {
    errorMsg.value = 'Mohon lengkapi semua baris input!';
    return;
  }

  isSubmitting.value = true;

  // Simulate server sending
  setTimeout(() => {
    isSubmitting.value = false;
    showSuccess.value = true;
    name.value = '';
    email.value = '';
    message.value = '';

    // Reset success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  }, 1500);
};
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Mari Berkolaborasi</span>
        <h2 class="section-title">Get in Touch</h2>
      </div>

      <div class="contact-grid">
        <!-- Details Card -->
        <div class="contact-methods card-anim">
          <div class="info-card glass-card">
            <h3 class="method-title">Info Kontak</h3>
            <p class="method-intro">Jangan ragu menghubungi saya untuk diskusi project IoT, kolaborasi web frontend, maupun kesempatan magang/kerja.</p>

            <div class="method-list">
              <div class="method-item">
                <div class="method-icon-box">
                  <Mail class="method-icon" />
                </div>
                <div class="method-details">
                  <span class="m-label">Email Saya</span>
                  <a href="mailto:dalilaminudin@gmail.com" class="m-link">dalilaminudin@gmail.com</a>
                </div>
              </div>

              <div class="method-item">
                <div class="method-icon-box">
                  <Github class="method-icon" />
                </div>
                <div class="method-details">
                  <span class="m-label">GitHub</span>
                  <a href="https://github.com/dalilaminudin" target="_blank" rel="noopener noreferrer" class="m-link">github.com/dalilaminudin</a>
                </div>
              </div>

              <div class="method-item">
                <div class="method-icon-box">
                  <MapPin class="method-icon" />
                </div>
                <div class="method-details">
                  <span class="m-label">Lokasi</span>
                  <p class="m-text">Cirebon, Jawa Barat, Indonesia</p>
                </div>
              </div>
            </div>

            <div class="social-promo-box">
              <Sparkles class="promo-icon" />
              <span>Aktif bereksplorasi setiap hari! Hubungi lewat email untuk respon cepat di hari kerja.</span>
            </div>
          </div>
        </div>

        <!-- Form Glass Card -->
        <div class="form-wrapper card-anim">
          <div class="contact-form-card glass-card">
            <h3 class="form-title">Kirim Pesan</h3>

            <form @submit.prevent="handleSubmit" class="main-form">
              <div class="form-group">
                <label for="frm-name">Nama Anda</label>
                <input 
                  type="text" 
                  id="frm-name" 
                  v-model="name"
                  placeholder="Masukkan nama lengkap" 
                  :disabled="isSubmitting"
                />
              </div>

              <div class="form-group">
                <label for="frm-email">Alamat Email</label>
                <input 
                  type="email" 
                  id="frm-email" 
                  v-model="email"
                  placeholder="Masukkan email aktif" 
                  :disabled="isSubmitting"
                />
              </div>

              <div class="form-group">
                <label for="frm-message">Isi Pesan</label>
                <textarea 
                  id="frm-message" 
                  v-model="message"
                  rows="5" 
                  placeholder="Tulis pesan Anda disini..." 
                  :disabled="isSubmitting"
                ></textarea>
              </div>

              <!-- Alert messages -->
              <div v-if="errorMsg" class="form-alert error">
                <AlertCircle class="alert-icon" />
                <span>{{ errorMsg }}</span>
              </div>

              <div v-if="showSuccess" class="form-alert success">
                <CheckCircle class="alert-icon" />
                <span>Terima kasih! Pesan Anda telah sukses dikirim.</span>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary submit-btn"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">Kirim Sekarang</span>
                <span v-else>Memproses...</span>
                <Send class="send-icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 30px;
}

.info-card, .contact-form-card {
  padding: 40px;
  height: 100%;
}

.method-title, .form-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 16px;
  position: relative;
}

.method-title::after, .form-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--color-accent-blue);
  margin-top: 8px;
  border-radius: 2px;
}

.method-intro {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 28px;
}

.method-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.method-item {
  display: flex;
  gap: 16px;
  align-items: center;
}

.method-icon-box {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-lg);
  background: rgba(123, 189, 232, 0.08);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.method-icon {
  width: 18px;
  height: 18px;
  color: var(--color-accent-blue);
}

.method-details {
  display: flex;
  flex-direction: column;
}

.m-label {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-teal-glow);
  text-transform: uppercase;
}

.m-link, .m-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-white);
  text-decoration: none;
  transition: var(--transition-fast);
}

.m-link:hover {
  color: var(--color-accent-blue);
}

.social-promo-box {
  margin-top: 36px;
  padding: 16px;
  background: rgba(110, 162, 179, 0.08);
  border: 1px solid rgba(110, 162, 179, 0.15);
  border-radius: var(--radius-lg);
  font-size: 12.5px;
  color: #a4cde8;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.5;
}

.promo-icon {
  width: 16px;
  height: 16px;
  color: var(--color-teal-glow);
  flex-shrink: 0;
}

/* Form block */
.main-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-light-blue);
}

.form-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: var(--radius-lg);
  font-size: 13.5px;
}

.form-alert.error {
  background: rgba(255, 95, 86, 0.1);
  border: 1px solid rgba(255, 95, 86, 0.2);
  color: #ff5f56;
}

.form-alert.success {
  background: rgba(39, 201, 63, 0.1);
  border: 1px solid rgba(39, 201, 63, 0.2);
  color: #27c93f;
}

.alert-icon {
  width: 16px;
  height: 16px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
}

.send-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>

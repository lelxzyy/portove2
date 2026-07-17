<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { Bot, Eraser, LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-vue-next';

const isOpen = ref(false);
const input = ref('');
const isLoading = ref(false);
const error = ref('');
const messagesEl = ref(null);
const inputEl = ref(null);
const messages = ref([
  {
    role: 'assistant',
    content: 'Halo! Saya asisten AI Dalil. Mau bertanya tentang project, skill, atau peluang kolaborasi?',
  },
]);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
};

const toggleChat = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await scrollToBottom();
    inputEl.value?.focus();
  }
};

const resetChat = () => {
  messages.value = [{ role: 'assistant', content: 'Percakapan direset. Ada yang bisa saya bantu?' }];
  error.value = '';
};

const sendMessage = async () => {
  const content = input.value.trim();
  if (!content || isLoading.value) return;

  messages.value.push({ role: 'user', content: content.slice(0, 2000) });
  input.value = '';
  error.value = '';
  isLoading.value = true;
  await scrollToBottom();

  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.value.slice(-10) }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'AI gagal merespons');
    messages.value.push({ role: 'assistant', content: data.message });
  } catch (requestError) {
    error.value = requestError.message || 'Koneksi ke AI bermasalah.';
  } finally {
    isLoading.value = false;
    await scrollToBottom();
    inputEl.value?.focus();
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isOpen.value) isOpen.value = false;
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <div class="ai-assistant">
    <Transition name="chat-pop">
      <aside v-if="isOpen" class="chat-panel" role="dialog" aria-modal="false" aria-label="AI Assistant">
        <header class="chat-header">
          <div class="assistant-identity">
            <span class="assistant-avatar"><Bot /></span>
            <div>
              <strong>Dalil AI</strong>
              <span><i></i> Powered by Groq</span>
            </div>
          </div>
          <div class="header-actions">
            <button type="button" title="Reset percakapan" aria-label="Reset percakapan" @click="resetChat"><Eraser /></button>
            <button type="button" title="Tutup" aria-label="Tutup AI Assistant" @click="toggleChat"><X /></button>
          </div>
        </header>

        <div ref="messagesEl" class="chat-messages" aria-live="polite">
          <div v-for="(message, index) in messages" :key="index" class="message-row" :class="message.role">
            <span v-if="message.role === 'assistant'" class="message-avatar"><Sparkles /></span>
            <p>{{ message.content }}</p>
          </div>
          <div v-if="isLoading" class="message-row assistant typing">
            <span class="message-avatar"><Sparkles /></span>
            <p><span></span><span></span><span></span></p>
          </div>
        </div>

        <p v-if="error" class="chat-error">{{ error }}</p>

        <form class="chat-form" @submit.prevent="sendMessage">
          <textarea
            ref="inputEl"
            v-model="input"
            rows="1"
            maxlength="2000"
            placeholder="Tanyakan sesuatu..."
            aria-label="Pesan untuk AI Assistant"
            :disabled="isLoading"
            @keydown.enter.exact.prevent="sendMessage"
          ></textarea>
          <button type="submit" :disabled="!input.trim() || isLoading" aria-label="Kirim pesan">
            <LoaderCircle v-if="isLoading" class="spin" />
            <Send v-else />
          </button>
        </form>
        <small class="chat-disclaimer">AI dapat membuat kesalahan. Verifikasi informasi penting.</small>
      </aside>
    </Transition>

    <button class="chat-trigger" type="button" :aria-expanded="isOpen" aria-label="Buka AI Assistant" @click="toggleChat">
      <X v-if="isOpen" />
      <MessageCircle v-else />
      <span v-if="!isOpen" class="trigger-label">Tanya AI</span>
    </button>
  </div>
</template>

<style scoped>
.ai-assistant { position: fixed; right: 24px; bottom: 24px; z-index: 1500; }
.chat-trigger { min-width: 58px; height: 58px; padding: 0 18px; border: 1px solid rgba(189,216,233,.55); border-radius: 30px; color: #fff; background: linear-gradient(135deg,#0a4174,#49769f); box-shadow: 0 12px 35px rgba(0,0,0,.42),0 0 25px rgba(123,189,232,.28); display:flex; align-items:center; justify-content:center; gap:9px; cursor:pointer; font:700 14px var(--font-family); transition:var(--transition-fast); margin-left:auto; }
.chat-trigger:hover { transform:translateY(-3px); box-shadow:0 14px 38px rgba(0,0,0,.48),var(--glow-shadow-strong); }
.chat-trigger svg { width:22px; }
.chat-panel { width:min(390px,calc(100vw - 32px)); height:min(590px,calc(100vh - 115px)); margin-bottom:14px; display:flex; flex-direction:column; overflow:hidden; border:1px solid var(--glass-border-hover); border-radius:24px; background:rgba(0,25,49,.96); box-shadow:0 25px 70px rgba(0,0,0,.55),var(--glow-shadow); backdrop-filter:blur(22px); }
.chat-header { flex:none; display:flex; align-items:center; justify-content:space-between; padding:15px 16px; border-bottom:1px solid var(--glass-border); background:linear-gradient(135deg,rgba(10,65,116,.65),rgba(73,118,159,.25)); }
.assistant-identity { display:flex; align-items:center; gap:11px; }
.assistant-avatar { width:39px; height:39px; border-radius:13px; display:grid; place-items:center; background:rgba(123,189,232,.16); border:1px solid rgba(123,189,232,.38); color:var(--color-accent-blue); }
.assistant-avatar svg { width:21px; }
.assistant-identity strong { display:block; font-size:15px; }
.assistant-identity div>span { display:flex; align-items:center; gap:6px; color:var(--text-muted); font:10px var(--font-mono); }
.assistant-identity i { width:7px; height:7px; border-radius:50%; background:#62d99b; box-shadow:0 0 8px #62d99b; }
.header-actions { display:flex; gap:5px; }
.header-actions button { width:34px; height:34px; display:grid; place-items:center; border:0; border-radius:10px; color:var(--text-muted); background:transparent; cursor:pointer; }
.header-actions button:hover { color:#fff; background:rgba(255,255,255,.09); }
.header-actions svg { width:17px; }
.chat-messages { flex:1; overflow-y:auto; padding:19px 15px; display:flex; flex-direction:column; gap:14px; scrollbar-width:thin; }
.message-row { display:flex; gap:8px; align-items:flex-end; }
.message-row.user { justify-content:flex-end; }
.message-row p { max-width:82%; padding:11px 13px; border-radius:16px 16px 16px 5px; background:rgba(73,118,159,.17); border:1px solid var(--glass-border); color:#eaf6ff; font-size:13px; line-height:1.55; white-space:pre-wrap; overflow-wrap:anywhere; }
.message-row.user p { border-radius:16px 16px 5px 16px; background:linear-gradient(135deg,#0a4174,#356d9e); border-color:rgba(123,189,232,.4); }
.message-avatar { flex:0 0 27px; height:27px; border-radius:9px; display:grid; place-items:center; color:var(--color-accent-blue); background:rgba(123,189,232,.13); }
.message-avatar svg { width:14px; }
.typing p { display:flex; gap:4px; padding:15px; }
.typing p span { width:5px; height:5px; border-radius:50%; background:var(--color-accent-blue); animation:bounce 1.1s infinite; }
.typing p span:nth-child(2) { animation-delay:.15s; }.typing p span:nth-child(3) { animation-delay:.3s; }
.chat-error { margin:0 15px 8px; padding:8px 10px; border-radius:10px; color:#ffc1c1; background:rgba(190,45,45,.14); border:1px solid rgba(255,100,100,.2); font-size:11px; }
.chat-form { flex:none; display:flex; align-items:flex-end; gap:8px; margin:0 13px; padding:7px 7px 7px 13px; background:rgba(0,20,40,.7); border:1px solid var(--glass-border); border-radius:17px; }
.chat-form:focus-within { border-color:var(--color-accent-blue); box-shadow:0 0 16px rgba(123,189,232,.18); }
.chat-form textarea { min-height:39px; max-height:90px; padding:9px 3px; resize:none; border:0; border-radius:0; background:transparent; box-shadow:none; font-size:13px; line-height:20px; }
.chat-form button { flex:0 0 39px; height:39px; border:0; border-radius:12px; display:grid; place-items:center; color:#fff; background:linear-gradient(135deg,#0a4174,#49769f); cursor:pointer; }
.chat-form button:disabled { opacity:.45; cursor:not-allowed; }.chat-form button svg { width:17px; }
.chat-disclaimer { padding:7px 10px 10px; text-align:center; color:rgba(189,216,233,.55); font-size:9px; }
.chat-pop-enter-active,.chat-pop-leave-active { transition:opacity .2s ease,transform .25s cubic-bezier(.16,1,.3,1); transform-origin:bottom right; }
.chat-pop-enter-from,.chat-pop-leave-to { opacity:0; transform:translateY(15px) scale(.95); }
.spin { animation:spin .8s linear infinite; } @keyframes spin { to { transform:rotate(360deg); } }
@keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-4px);opacity:1} }
@media(max-width:600px){.ai-assistant{right:16px;bottom:16px}.chat-panel{height:calc(100dvh - 105px);width:calc(100vw - 32px)}.trigger-label{display:none}.chat-trigger{padding:0;width:56px}.message-row p{max-width:86%}}
</style>

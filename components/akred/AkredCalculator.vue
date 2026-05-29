<template>
  <div class="akred-calculator bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 transition-all duration-300">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <UIcon name="i-heroicons-calculator" class="w-7 h-7 text-emerald-500" />
          Kalkulator Skor Akreditasi & ILP
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Self-Assessment kesiapan akreditasi berbasis 5 Klaster Integrasi Layanan Primer (ILP) Puskesmas Pajang.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button 
          @click="resetAll" 
          class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-white border border-rose-200 hover:border-rose-600 hover:bg-rose-600 rounded-lg transition-all duration-200"
        >
          <UIcon name="i-heroicons-trash" class="w-4 h-4" />
          Reset Nilai
        </button>
      </div>
    </div>

    <!-- Global Progress Summary -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Progress Circle/Card -->
      <div class="col-span-1 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 border border-emerald-100 dark:border-emerald-950 rounded-xl p-5 flex flex-col justify-center items-center text-center">
        <span class="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Skor Kesiapan Global</span>
        <div class="relative flex items-center justify-center my-4">
          <svg class="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="54" stroke="currentColor" class="text-slate-100 dark:text-slate-800" stroke-width="8" fill="transparent" />
            <circle cx="64" cy="64" r="54" stroke="currentColor" class="text-emerald-500 transition-all duration-1000 ease-out" stroke-width="8" fill="transparent"
              :stroke-dasharray="2 * Math.PI * 54"
              :stroke-dashoffset="((100 - globalPercentage) / 100) * (2 * Math.PI * 54)" />
          </svg>
          <span class="absolute text-3xl font-extrabold text-slate-800 dark:text-slate-100">{{ Math.round(globalPercentage) }}%</span>
        </div>
        <div class="mt-2">
          <span :class="statusBadgeClass" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            {{ globalStatusText }}
          </span>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl p-5 flex flex-col justify-between">
          <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Skor Tercapai</span>
          <div class="mt-2">
            <span class="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{{ totalScore }}</span>
            <span class="text-slate-400 dark:text-slate-500 font-medium"> / {{ maxTotalScore }}</span>
          </div>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Dihitung dari akumulasi skor 24 indikator utama klaster ILP.</p>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl p-5 flex flex-col justify-between">
          <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Indikator Terpenuhi</span>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ indicatorsMet }}</span>
            <span class="text-slate-400 dark:text-slate-500 font-medium">Fully Met (10)</span>
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-lg font-bold text-amber-500">{{ indicatorsPartial }}</span>
            <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Partially Met (5)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cluster Breakdown Accordions -->
    <div class="space-y-4">
      <div 
        v-for="cluster in clusters" 
        :key="cluster.id" 
        class="border rounded-xl transition-all duration-350"
        :class="[
          openCluster === cluster.id 
            ? 'border-emerald-300 dark:border-emerald-800 shadow-md ring-1 ring-emerald-300/30' 
            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        ]"
      >
        <!-- Accordion Header -->
        <div 
          @click="toggleCluster(cluster.id)" 
          class="flex items-center justify-between p-4 cursor-pointer select-none bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all duration-200"
        >
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div :class="cluster.colorClass" class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
              <UIcon :name="cluster.icon" class="w-6 h-6 text-white" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-bold text-slate-800 dark:text-slate-100 truncate text-sm sm:text-base">{{ cluster.name }}</h3>
              <p class="text-xs text-slate-400 dark:text-slate-500 truncate">{{ cluster.description }}</p>
            </div>
          </div>

          <div class="flex items-center gap-4 ml-2">
            <div class="hidden sm:flex flex-col items-end">
              <span class="text-sm font-extrabold text-slate-800 dark:text-slate-100">{{ getClusterScore(cluster.id) }} / {{ cluster.maxScore }}</span>
              <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{{ Math.round(getClusterPercentage(cluster.id)) }}% Terpenuhi</span>
            </div>
            <div class="w-20 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden shrink-0 hidden md:block">
              <div 
                class="bg-emerald-500 h-full transition-all duration-500" 
                :style="{ width: `${getClusterPercentage(cluster.id)}%` }"
              ></div>
            </div>
            <UIcon 
              name="i-heroicons-chevron-down" 
              class="w-5 h-5 text-slate-400 transition-transform duration-300"
              :class="{ 'rotate-180 text-emerald-500': openCluster === cluster.id }" 
            />
          </div>
        </div>

        <!-- Accordion Body -->
        <div v-show="openCluster === cluster.id" class="border-t border-slate-150 dark:border-slate-850 p-4 space-y-4">
          <!-- Small screens score summary -->
          <div class="sm:hidden flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-850 mb-2">
            <span class="text-xs font-semibold text-slate-500">Skor Klaster:</span>
            <span class="text-sm font-extrabold text-slate-800 dark:text-slate-100">{{ getClusterScore(cluster.id) }} / {{ cluster.maxScore }} ({{ Math.round(getClusterPercentage(cluster.id)) }}%)</span>
          </div>

          <!-- Indicator list -->
          <div 
            v-for="indicator in getClusterIndicators(cluster.id)" 
            :key="indicator.id" 
            class="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-slate-50/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-900/60 border border-slate-100 dark:border-slate-850 gap-4 transition-all duration-200"
          >
            <div class="max-w-2xl flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-bold text-slate-400 dark:text-slate-500">No. {{ indicator.order }}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                  {{ indicator.type }}
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  {{ indicator.epCode }}
                </span>
              </div>
              <h4 class="font-bold text-slate-700 dark:text-slate-350 text-sm mt-1.5">{{ indicator.title }}</h4>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">{{ indicator.description }}</p>
            </div>

            <!-- Radio Score Buttons -->
            <div class="flex items-center gap-2 shrink-0 justify-end mt-2 md:mt-0">
              <label 
                v-for="val in [10, 5, 0]" 
                :key="val"
                :class="[
                  'cursor-pointer flex items-center justify-center w-12 h-10 rounded-lg text-xs font-bold border transition-all duration-250 select-none',
                  scores[indicator.id] === val 
                    ? getScoreBtnActiveClasses(val) 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-900/60 text-slate-600 dark:text-slate-400'
                ]"
              >
                <input 
                  type="radio" 
                  :name="`indicator-${indicator.id}`" 
                  :value="val" 
                  v-model="scores[indicator.id]" 
                  class="sr-only" 
                />
                {{ val }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const openCluster = ref('klaster1')

// Scores model structure: key = indicator_id, value = score (10, 5, 0)
const scores = ref({
  // Klaster 1: Manajemen
  m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0,
  // Klaster 2: Ibu & Anak
  ia1: 0, ia2: 0, ia3: 0, ia4: 0, ia5: 0,
  // Klaster 3: Dewasa & Lansia
  dl1: 0, dl2: 0, dl3: 0, dl4: 0,
  // Klaster 4: PPM & Kesling
  pm1: 0, pm2: 0, pm3: 0,
  // Lintas Klaster: Penunjang
  lk1: 0, lk2: 0, lk3: 0, lk4: 0, lk5: 0
})

// Initialize from Local Storage if exists
onMounted(() => {
  const savedScores = localStorage.getItem('pajang_akred_calculator_scores')
  if (savedScores) {
    try {
      const parsed = JSON.parse(savedScores)
      // Only merge valid keys to prevent breaking if schema changes
      Object.keys(scores.value).forEach(key => {
        if (parsed[key] !== undefined) {
          scores.value[key] = Number(parsed[key])
        }
      })
    } catch (e) {
      console.error('Failed parsing saved scores from localStorage:', e)
    }
  }
})

// Save to Local Storage automatically when values change
watch(scores, (newVal) => {
  localStorage.setItem('pajang_akred_calculator_scores', JSON.stringify(newVal))
}, { deep: true })

const toggleCluster = (id) => {
  openCluster.value = openCluster.value === id ? null : id
}

const resetAll = () => {
  if (confirm('Apakah Anda yakin ingin me-reset semua nilai skor menjadi 0?')) {
    Object.keys(scores.value).forEach(key => {
      scores.value[key] = 0
    })
  }
}

// Active button styling helper
const getScoreBtnActiveClasses = (val) => {
  if (val === 10) {
    return 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/25 ring-2 ring-emerald-500/20'
  } else if (val === 5) {
    return 'bg-amber-500 border-amber-500 text-white shadow-sm shadow-amber-500/25 ring-2 ring-amber-500/20'
  } else {
    return 'bg-rose-500 border-rose-500 text-white shadow-sm shadow-rose-500/25 ring-2 ring-rose-500/20'
  }
}

// Total Stats
const totalScore = computed(() => {
  return Object.values(scores.value).reduce((sum, score) => sum + (score || 0), 0)
})

const maxTotalScore = computed(() => {
  return indicators.length * 10
})

const globalPercentage = computed(() => {
  if (maxTotalScore.value === 0) return 0
  return (totalScore.value / maxTotalScore.value) * 100
})

const indicatorsMet = computed(() => {
  return Object.values(scores.value).filter(val => val === 10).length
})

const indicatorsPartial = computed(() => {
  return Object.values(scores.value).filter(val => val === 5).length
})

// Global Status Text and Badge styling
const globalStatusText = computed(() => {
  const pct = globalPercentage.value
  if (pct >= 80) return 'Siap Akreditasi (Paripurna)'
  if (pct >= 60) return 'Kesiapan Sedang (Madya/Utama)'
  return 'Kurang Kesiapan (Perlu Tindak Lanjut)'
})

const statusBadgeClass = computed(() => {
  const pct = globalPercentage.value
  if (pct >= 80) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
  if (pct >= 60) return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
  return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
})

// Cluster Calculations
const getClusterScore = (clusterId) => {
  const clusterIndicators = indicators.filter(ind => ind.cluster === clusterId)
  return clusterIndicators.reduce((sum, ind) => sum + (scores.value[ind.id] || 0), 0)
}

const getClusterPercentage = (clusterId) => {
  const clusterIndicators = indicators.filter(ind => ind.cluster === clusterId)
  const maxScore = clusterIndicators.length * 10
  if (maxScore === 0) return 0
  return (getClusterScore(clusterId) / maxScore) * 100
}

const getClusterIndicators = (clusterId) => {
  return indicators.filter(ind => ind.cluster === clusterId)
}

// Cluster Definitions
const clusters = [
  {
    id: 'klaster1',
    name: 'Klaster 1: Manajemen',
    description: 'Tata kelola, perencanaan, SDM, sarana prasarana, keuangan, mutu, dan pengawasan internal.',
    maxScore: 70,
    icon: 'i-heroicons-briefcase',
    colorClass: 'bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-sky-500/20'
  },
  {
    id: 'klaster2',
    name: 'Klaster 2: Ibu dan Anak',
    description: 'Pelayanan terintegrasi siklus hidup bagi ibu hamil, bersalin, nifas, bayi, balita, anak, dan remaja.',
    maxScore: 50,
    icon: 'i-heroicons-heart',
    colorClass: 'bg-gradient-to-tr from-rose-400 to-pink-600 shadow-rose-500/20'
  },
  {
    id: 'klaster3',
    name: 'Klaster 3: Usia Dewasa dan Lansia',
    description: 'Skrining kesehatan usia produktif, pencegahan penyakit tidak menular (PTM), dan pelayanan geriatri.',
    maxScore: 40,
    icon: 'i-heroicons-user-group',
    colorClass: 'bg-gradient-to-tr from-purple-500 to-fuchsia-600 shadow-purple-500/20'
  },
  {
    id: 'klaster4',
    name: 'Klaster 4: Penularan Penyakit & Kesling',
    description: 'Sistem Kewaspadaan Dini dan Respon (SKDR), penanggulangan KLB, surveilans, dan kesehatan lingkungan.',
    maxScore: 30,
    icon: 'i-heroicons-shield-exclamation',
    colorClass: 'bg-gradient-to-tr from-orange-400 to-red-600 shadow-orange-500/20'
  },
  {
    id: 'lintas_klaster',
    name: 'Lintas Klaster: Pelayanan Penunjang',
    description: 'IGD/Gawat darurat, Rekam Medis (RME), Laboratorium, Kefarmasian, dan kalibrasi alat.',
    maxScore: 50,
    icon: 'i-heroicons-wrench-screwdriver',
    colorClass: 'bg-gradient-to-tr from-emerald-400 to-teal-600 shadow-emerald-500/20'
  }
]

// 24 Indicators representing key requirements from Bab 1-5 akreditasi mapped to ILP
const indicators = [
  // KLASTER 1
  {
    id: 'm1',
    cluster: 'klaster1',
    order: 1.1,
    type: 'Perencanaan',
    epCode: '1.1.1',
    title: 'Penyusunan Perencanaan Puskesmas (Renlita, RUK, RPK)',
    description: 'Dokumen perencanaan tahunan (RUK & RPK) disusun secara terintegrasi lintas program/sektor berdasarkan Rencana Lima Tahunan (Renlita), data kinerja, dan profil wilayah kerja.'
  },
  {
    id: 'm2',
    cluster: 'klaster1',
    order: 1.2,
    type: 'Organisasi',
    epCode: '1.2.1',
    title: 'Tata Kelola Organisasi & Struktur Puskesmas',
    description: 'Ditetapkan uraian tugas, penanggung jawab klaster ILP, koordinasi kerja, dan pemenuhan pelaporan administrasi sesuai ketentuan.'
  },
  {
    id: 'm3',
    cluster: 'klaster1',
    order: 1.3,
    type: 'SDM',
    epCode: '1.3.1',
    title: 'Manajemen Sumber Daya Manusia (SDM)',
    description: 'Analisis jabatan (Anjab), peta ketenagaan, surat izin kerja (SIP/STR) tenaga medis & kesehatan aktif 100%, serta program pengembangan staf.'
  },
  {
    id: 'm4',
    cluster: 'klaster1',
    order: 1.4,
    type: 'Fasilitas & K3',
    epCode: '1.4.1',
    title: 'Manajemen Fasilitas dan Keselamatan (MFK)',
    description: 'Tersusun program K3, sistem proteksi kebakaran, pemeliharaan bangunan & utilitas, mitigasi bencana, serta pengelolaan limbah medis/B3.'
  },
  {
    id: 'm5',
    cluster: 'klaster1',
    order: 1.5,
    type: 'Keuangan',
    epCode: '1.5.1',
    title: 'Manajemen Keuangan dan Aset',
    description: 'Pengelolaan anggaran daerah/Kapitasi JKN dilakukan secara transparan dan tertib pelaporannya, serta pencatatan aset inventaris BMD yang rutin.'
  },
  {
    id: 'm6',
    cluster: 'klaster1',
    order: 1.6,
    type: 'Kinerja',
    epCode: '1.6.1',
    title: 'Pengawasan, Pengendalian, dan Penilaian Kinerja',
    description: 'Pelaksanaan lokakarya mini (Lokmin) bulanan & tribulanan lintas sektor sebagai evaluasi capaian kinerja dan tindak lanjut umpan balik.'
  },
  {
    id: 'm7',
    cluster: 'klaster1',
    order: 1.7,
    type: 'Mutu',
    epCode: '5.1.1',
    title: 'Manajemen Peningkatan Mutu Puskesmas',
    description: 'Terbentuk Tim Mutu Terintegrasi, pengukuran Indikator Nasional Mutu (INM) & Indikator Sasaran Keselamatan Pasien, serta Audit Internal dan Rapat Tinjauan Manajemen (RTM).'
  },

  // KLASTER 2
  {
    id: 'ia1',
    cluster: 'klaster2',
    order: 2.1,
    type: 'Ibu Hamil',
    epCode: '3.2.1',
    title: 'ANC Terpadu & Asuhan Ibu Hamil',
    description: 'Pelaksanaan standar asuhan pemeriksaan kehamilan terpadu (K1-K6), termasuk deteksi dini faktor risiko penyulit dan skrining preeklampsia.'
  },
  {
    id: 'ia2',
    cluster: 'klaster2',
    order: 2.2,
    type: 'Persalinan',
    epCode: '4.5.1',
    title: 'Pelayanan Persalinan & Nifas Terintegrasi (PONED)',
    description: 'Pelayanan persalinan aman 24 jam di Puskesmas PONED, inisiasi menyusu dini (IMD), pemberian KIE Laktasi, serta Kunjungan Nifas (KF1-KF4) lengkap.'
  },
  {
    id: 'ia3',
    cluster: 'klaster2',
    order: 2.3,
    type: 'Bayi & Balita',
    epCode: '4.5.1',
    title: 'Tumbuh Kembang & Imunisasi Dasar Lengkap (IDL)',
    description: 'Skrining dan intervensi dini tumbuh kembang balita (timbangan, lingkar kepala, vitamin A), penanggulangan stunting, dan capaian target imunisasi dasar.'
  },
  {
    id: 'ia4',
    cluster: 'klaster2',
    order: 2.4,
    type: 'Anak & Remaja',
    epCode: '3.2.1',
    title: 'Pelayanan Kesehatan Anak Sekolah & Remaja',
    description: 'Skrining kesehatan berkala (indera, gizi, gigi) di sekolah (UKS) serta konseling kesehatan remaja (PKHS / Pelayanan Kesehatan Peduli Remaja).'
  },
  {
    id: 'ia5',
    cluster: 'klaster2',
    order: 2.5,
    type: 'Surveilans',
    epCode: '2.6.5',
    title: 'Pemantauan Wilayah Setempat (PWS) Ibu & Anak',
    description: 'Analisis PWS bulanan untuk memantau tren kesehatan ibu-anak di setiap wilayah kelurahan/Posyandu di bawah Puskesmas Pajang.'
  },

  // KLASTER 3
  {
    id: 'dl1',
    cluster: 'klaster3',
    order: 3.1,
    type: 'Produktif',
    epCode: '3.2.1',
    title: 'Skrining Kesehatan Usia Dewasa Produktif',
    description: 'Pemeriksaan faktor risiko Penyakit Tidak Menular (PTM) secara massal/di dalam gedung meliputi tensi darah, gula darah sewaktu, dan indeks massa tubuh (IMT).'
  },
  {
    id: 'dl2',
    cluster: 'klaster3',
    order: 3.2,
    type: 'Skrining Khusus',
    epCode: '3.2.1',
    title: 'Skrining Kesehatan Jiwa, Indera Penglihatan & Pendengaran',
    description: 'Pelaksanaan deteksi dini masalah kesehatan jiwa (instrumen SRQ-20) serta pemeriksaan ketajaman visual dan fungsi pendengaran.'
  },
  {
    id: 'dl3',
    cluster: 'klaster3',
    order: 3.3,
    type: 'Lansia',
    epCode: '3.2.1',
    title: 'Pelayanan Kesehatan Lanjut Usia (Geriatri)',
    description: 'Asesmen paripurna lansia meliputi skrining tingkat kemandirian (ADL Barthel), status kognitif, dan risiko jatuh baik di dalam gedung maupun Posyandu Lansia.'
  },
  {
    id: 'dl4',
    cluster: 'klaster3',
    order: 3.4,
    type: 'PWS',
    epCode: '1.6.3',
    title: 'PWS & Tindak Lanjut Layanan Dewasa-Lansia',
    description: 'Pemantauan capaian deteksi dini PTM dan kesehatan lansia per kelurahan, diikuti rujukan terencana dan asuhan terpadu.'
  },

  // KLASTER 4
  {
    id: 'pm1',
    cluster: 'klaster4',
    order: 4.1,
    type: 'Surveilans',
    epCode: '1.2.4',
    title: 'Surveilans & Pelaporan SKDR',
    description: 'Pencatatan data penyakit menular potensial wabah secara mingguan ke dalam sistem SKDR (Sistem Kewaspadaan Dini dan Respon) tanpa keterlambatan.'
  },
  {
    id: 'pm2',
    cluster: 'klaster4',
    order: 4.2,
    type: 'KLB & Respon',
    epCode: '4.3.1',
    title: 'Respon Cepat KLB & Investigasi TBC/Penyakit Menular',
    description: 'Penatalaksanaan investigasi kontak erat TBC, penyelidikan epidemiologi kasus DBD/campak < 24 jam, serta kesiapan logistik dan tim respon KLB.'
  },
  {
    id: 'pm3',
    cluster: 'klaster4',
    order: 4.3,
    type: 'Kesling',
    epCode: '2.6.5',
    title: 'Inspeksi Kesehatan Lingkungan (IKL)',
    description: 'Inspeksi rutin sarana air bersih, sanitasi perumahan, sekolah, pasar, serta inspeksi Tempat Pengolahan Makanan (TPM) di wilayah kerja Puskesmas Pajang.'
  },

  // LINTAS KLASTER
  {
    id: 'lk1',
    cluster: 'lintas_klaster',
    order: 5.1,
    type: 'Pelayanan RM',
    epCode: '3.1.1',
    title: 'Pelayanan Pendaftaran & Rekam Medis Elektronik (RME)',
    description: 'Penerapan identifikasi pasien dengan benar, penyediaan informasi hak/kewajiban pasien, general consent, serta implementasi RME terintegrasi.'
  },
  {
    id: 'lk2',
    cluster: 'lintas_klaster',
    order: 5.2,
    type: 'Gawat Darurat',
    epCode: '3.3.1',
    title: 'Pelayanan Gawat Darurat & Asuhan Pasien',
    description: 'Penerapan SOP Triase berbasis kegawatdaruratan, proses stabilisasi pasien gawat darurat sebelum dirujuk, dan asuhan keperawatan gawat darurat.'
  },
  {
    id: 'lk3',
    cluster: 'lintas_klaster',
    order: 5.3,
    type: 'Laboratorium',
    epCode: '3.9.1',
    title: 'Pelayanan Laboratorium Puskesmas',
    description: 'Ketersediaan reagensia esensial, penetapan rentang nilai normal & kritis, pemantauan mutu eksternal/internal lab, serta keamanan penanganan spesimen.'
  },
  {
    id: 'lk4',
    cluster: 'lintas_klaster',
    order: 5.4,
    type: 'Kefarmasian',
    epCode: '3.10.1',
    title: 'Pelayanan Kefarmasian & Manajemen Obat',
    description: 'Penyusunan Formularium obat Puskesmas Pajang, SOP telaah resep & pemberian obat (5 Benar), penyimpanan High Alert, serta pemberian KIE konseling obat.'
  },
  {
    id: 'lk5',
    cluster: 'lintas_klaster',
    order: 5.5,
    type: 'Alat Kesehatan',
    epCode: '1.4.6',
    title: 'Pemeliharaan & Kalibrasi Peralatan Medis',
    description: 'Peralatan medis dipelihara rutin sesuai jadwal, dibersihkan/disterilkan pasca pakai, serta kalibrasi tahunan terakreditasi 100% untuk instrumen kritis.'
  }
]
</script>

<style scoped>
.akred-calculator {
  backdrop-filter: blur(16px);
}
/* Smooth expand/collapse animation for accordion */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

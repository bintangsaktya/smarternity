import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Umum/Login.vue'
import Register from '../views/Umum/Register.vue'
import OnBoarding from '../views/Pasiens/OnBoarding.vue'
import Dashboard from '../views/Pasiens/Dashboard.vue'
import Riwayat from '../views/Pasiens/Riwayat.vue'
import Profile from '../views/Pasiens/Profile.vue'
import Chating from '../views/Umum/Chating.vue'
import TherapyLowBackPain from '../views/Pasiens/TherapyLowBackPain.vue'
import KuesionerNyeri from '../views/Pasiens/KuesionerNyeri.vue'
import PanduanOlahraga from '../views/Pasiens/PanduanOlahraga.vue'
import TerapiTens from '../views/Dokter/TerapiTens.vue'
import HasilKuisioner from '../views/Dokter/HasilKuisioner.vue'
import PregnancyMonitoring from '../views/Dokter/PregnancyMonitoring.vue'
import HitungDenyutDanGerak from '../views/Dokter/HitungDenyutDanGerak.vue'
import StatistikGerakDanJantung from '../views/Dokter/StatistikGerakDanJantung.vue'
import Logout from '../views/Umum/Logout.vue'
import TentangDanPanduan from '../views/Umum/TentangDanPanduan.vue'

/* test firebas */
import testFb from '../views/testFb.vue'


const routes: Array<RouteRecordRaw> =  [
  { path: '/', name: 'Home', component: Login  },
  { path: '/Login', name: 'Login', component: Login  },
  { path: '/Register', name: 'Register', component: Register  },
  { path: '/OnBoarding', name: 'OnBoarding', component: OnBoarding  },
  { path: '/Dashboard', name: 'Dashboard', component: Dashboard  },
  { path: '/Riwayat', name: 'Riwayat', component: Riwayat  },
  { path: '/Profile', name: 'Profile', component: Profile  },
  { path: '/Chating', name: 'Chating', component: Chating  },
  { path: '/TherapyLowBackPain', name: 'Therapy Low Back Pain', component: TherapyLowBackPain  },
  { path: '/KuesionerNyeri', name: 'Kuesioner Skala Nyeri', component: KuesionerNyeri  },
  { path: '/PanduanOlahraga', name: 'Panduan Olahraga', component: PanduanOlahraga  },
  { path: '/TerapiTens/:param', name: 'Terapi Tens', component: TerapiTens  },
  { path: '/HasilKuisioner', name: 'Hasil Kuisioner', component: HasilKuisioner  },
  { path: '/PregnancyMonitoring', name: 'Pregnancy Monitoring', component: PregnancyMonitoring  },
  { path: '/HitungDenyutDanGerak/:param', name: 'Hitung Denyut Dan Gerak', component: HitungDenyutDanGerak  },
  { path: '/StatistikGerakDanJantung/:param', name: 'Statistik Gerak Dan Jantung', component: StatistikGerakDanJantung  },
  { path: '/Logout', name: 'Logout', component: Logout  },
  { path: '/TentangDanPanduan', name: 'Tentang Dan Panduan', component: TentangDanPanduan  },
  
  /* test firebase */
  { path: '/testFb', name: 'test Fb', component: testFb  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

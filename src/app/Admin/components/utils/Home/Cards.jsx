import React from 'react'

const Cards = () => {
  return <>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="stat-card rounded-2xl p-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-400 text-sm">إجمالي الحجوزات</p>
                        <p class="text-4xl font-bold text-white mt-2">1,284</p>
                        <p class="text-green-400 text-xs mt-2"><i class="fas fa-arrow-up"></i> +12% عن الشهر الماضي</p>
                    </div>
                    <div class="icon-glow bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-2xl">
                        <i class="fas fa-calendar-check text-2xl text-purple-400 float-slow"></i>
                    </div>
                </div>
                <div class="progress-bar h-1 w-full rounded-full mt-4"></div>
            </div>
            
            <div class="stat-card rounded-2xl p-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-400 text-sm">إجمالي الأرباح</p>
                        <p class="text-4xl font-bold text-white mt-2">348.5k$</p>
                        <p class="text-green-400 text-xs mt-2"><i class="fas fa-arrow-up"></i> +8% عن الشهر الماضي</p>
                    </div>
                    <div class="icon-glow bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-2xl">
                        <i class="fas fa-dollar-sign text-2xl text-green-400 float-slow" style="animation-delay: 0.3s;"></i>
                    </div>
                </div>
                <div class="progress-bar h-1 w-3/4 rounded-full mt-4"></div>
            </div>
            
            <div class="stat-card rounded-2xl p-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-400 text-sm">العملاء B2C</p>
                        <p class="text-4xl font-bold text-white mt-2">892</p>
                        <p class="text-green-400 text-xs mt-2"><i class="fas fa-user-plus"></i> +45 جديد</p>
                    </div>
                    <div class="icon-glow bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-2xl">
                        <i class="fas fa-user-friends text-2xl text-blue-400 float-slow" style="animation-delay: 0.6s;"></i>
                    </div>
                </div>
                <div class="progress-bar h-1 w-2/3 rounded-full mt-4"></div>
            </div>
            
            <div class="stat-card rounded-2xl p-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="400">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-400 text-sm">الوكلاء B2B</p>
                        <p class="text-4xl font-bold text-white mt-2">47</p>
                        <p class="text-green-400 text-xs mt-2"><i class="fas fa-building"></i> +6 وكلاء جدد</p>
                    </div>
                    <div class="icon-glow bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-3 rounded-2xl">
                        <i class="fas fa-handshake text-2xl text-yellow-400 float-slow" style="animation-delay: 0.9s;"></i>
                    </div>
                </div>
                <div class="progress-bar h-1 w-1/2 rounded-full mt-4"></div>
            </div>
        </div>
  
  </>
}

export default Cards

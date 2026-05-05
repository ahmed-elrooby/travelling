import React from 'react'

const Cards = () => {
  return <>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card rounded-2xl p-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                <div class="flex justify-between items-center">
                    <div><p class="text-gray-400 text-sm">إجمالي حجوزات الفنادق</p><p class="text-3xl font-bold text-white mt-1">3</p></div>
                    <div class="icon-glow bg-pink-500/20 p-3 rounded-xl"><i class="fas fa-hotel text-pink-400 text-xl"></i></div>
                </div>
            </div>
            <div class="stat-card rounded-2xl p-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                <div class="flex justify-between items-center">
                    <div><p class="text-gray-400 text-sm">ليالي الحجز القادمة</p><p class="text-3xl font-bold text-green-400 mt-1">11</p></div>
                    <div class="icon-glow bg-green-500/20 p-3 rounded-xl"><i class="fas fa-calendar-week text-green-400 text-xl"></i></div>
                </div>
            </div>
            <div class="stat-card rounded-2xl p-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                <div class="flex justify-between items-center">
                    <div><p class="text-gray-400 text-sm">إجمالي الإنفاق</p><p class="text-3xl font-bold text-white mt-1">3,610$</p></div>
                    <div class="icon-glow bg-yellow-500/20 p-3 rounded-xl"><i class="fas fa-dollar-sign text-yellow-400 text-xl"></i></div>
                </div>
            </div>
            <div class="stat-card rounded-2xl p-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="400">
                <div class="flex justify-between items-center">
                    <div><p class="text-gray-400 text-sm">خيارات الإلغاء المجاني</p><p class="text-3xl font-bold text-blue-400 mt-1">2</p></div>
                    <div class="icon-glow bg-blue-500/20 p-3 rounded-xl"><i class="fas fa-shield-alt text-blue-400 text-xl"></i></div>
                </div>
            </div>
        </div>
  </>
}

export default Cards

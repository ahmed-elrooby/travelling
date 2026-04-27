import React from 'react'
import { FaPlane } from 'react-icons/fa'
import { FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi'

const Cards = () => {
  return<>
  <div className="grid grid-cols-1 gap-6 mt-6 mb-8 md:grid-cols-4">
            <div className="p-5   bg-gradient-to-br from-purple-500/10 to-pink-500/5
  backdrop-blur-md
  border border-purple-500/30
  transition-all duration-300
  ease-[cubic-bezier(0.175,0.885,0.32,1.275)] rounded-2xl aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400">إجمالي حجوزات الطيران</p>
                        <p className="mt-1 text-3xl font-bold text-white">1,284</p>
                    </div>
                    <div className="p-3 icon-glow bg-purple-500/20 rounded-xl"><FaPlane className="text-xl text-purple-400" /></div>
                </div>
            </div>
            <div className="p-5   bg-gradient-to-br from-purple-500/10 to-pink-500/5
  backdrop-blur-md
  border border-purple-500/30
  transition-all duration-300
  ease-[cubic-bezier(0.175,0.885,0.32,1.275)] rounded-2xl aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400">إيرادات الطيران</p>
                        <p className="mt-1 text-3xl font-bold text-white">482k$</p>
                    </div>
                    <div className="p-3 icon-glow bg-green-500/20 rounded-xl"><FiDollarSign className="text-xl text-green-400" /></div>
                </div>
            </div>
            <div className="p-5   bg-gradient-to-br from-purple-500/10 to-pink-500/5
  backdrop-blur-md
  border border-purple-500/30
  transition-all duration-300
  ease-[cubic-bezier(0.175,0.885,0.32,1.275)] rounded-2xl aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400">معدل الإشغال</p>
                        <p className="mt-1 text-3xl font-bold text-white">86%</p>
                    </div>
                    <div className="p-3 icon-glow bg-yellow-500/20 rounded-xl"><FiTrendingUp className="text-xl text-yellow-400" /></div>
                </div>
            </div>
            <div className="p-5   bg-gradient-to-br from-purple-500/10 to-pink-500/5
  backdrop-blur-md
  border border-purple-500/30
  transition-all duration-300
  ease-[cubic-bezier(0.175,0.885,0.32,1.275)] rounded-2xl aos-init aos-animate" data-aos="fade-up" data-aos-delay="400">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400">شركاء الطيران</p>
                        <p className="mt-1 text-3xl font-bold text-white">12</p>
                    </div>
                    <div className="p-3 icon-glow bg-pink-500/20 rounded-xl"><FiUsers className="text-xl text-pink-400" /></div>
                </div>
            </div>
        </div>
  </>
}

export default Cards

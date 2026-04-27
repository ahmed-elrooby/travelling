"use client";

import {
  FaCarSide,
  FaDollarSign,
  FaCalendarWeek,
  FaBuilding,
} from "react-icons/fa";

export default function CarRentalStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      {/* Card 1 */}
      <div
        className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">إجمالي حجوزات السيارات</p>
            <p className="text-3xl font-bold text-white mt-1">156</p>
          </div>

          <div className="bg-blue-500/20 p-3 rounded-xl">
            <FaCarSide className="text-blue-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">إيرادات التأجير</p>
            <p className="text-3xl font-bold text-white mt-1">87.5k$</p>
          </div>

          <div className="bg-green-500/20 p-3 rounded-xl">
            <FaDollarSign className="text-green-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div
        className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">متوسط مدة الإيجار</p>
            <p className="text-3xl font-bold text-white mt-1">4.2 يوم</p>
          </div>

          <div className="bg-yellow-500/20 p-3 rounded-xl">
            <FaCalendarWeek className="text-yellow-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div
        className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">شركات التأجير</p>
            <p className="text-3xl font-bold text-white mt-1">23</p>
          </div>

          <div className="bg-purple-500/20 p-3 rounded-xl">
            <FaBuilding className="text-purple-400 text-xl" />
          </div>
        </div>
      </div>

    </div>
  );
}
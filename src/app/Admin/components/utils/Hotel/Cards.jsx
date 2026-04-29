"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext } from "react";
import {
  FaHotel,
  FaDollarSign,
  FaChartLine,
  FaBuilding,
} from "react-icons/fa";

export default function HotelStats() {
  const { Hotel } = useContext(Admin);

  const kpis = Hotel?.data?.kpis;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      
      {/* Card 1 */}
      <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">إجمالي حجوزات الفنادق</p>
            <p className="text-3xl font-bold text-white mt-1">
              {kpis?.totalHotelBookings ?? 0}
            </p>
          </div>

          <div className="bg-pink-500/20 p-3 rounded-xl">
            <FaHotel className="text-pink-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">إيرادات الفنادق</p>
            <p className="text-3xl font-bold text-white mt-1">
              {kpis?.hotelRevenue ?? 0}$
            </p>
          </div>

          <div className="bg-green-500/20 p-3 rounded-xl">
            <FaDollarSign className="text-green-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">متوسط الإشغال</p>
            <p className="text-3xl font-bold text-white mt-1">
              {kpis?.avgOccupancy ?? 0}%
            </p>
          </div>

          <div className="bg-yellow-500/20 p-3 rounded-xl">
            <FaChartLine className="text-yellow-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">شركاء الفنادق</p>
            <p className="text-3xl font-bold text-white mt-1">
              {kpis?.hotelPartners ?? 0}
            </p>
          </div>

          <div className="bg-purple-500/20 p-3 rounded-xl">
            <FaBuilding className="text-purple-400 text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
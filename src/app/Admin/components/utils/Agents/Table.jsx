"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import React, { useContext, useEffect, useState } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaSearch,
  FaList,
  FaThLarge,
  FaChevronRight,
  FaChevronLeft,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function AgentsTable() {
  const { B2B } = useContext(Admin);

  const data = B2B?.data;
  const kpis = data?.kpis;

  const [view, setView] = useState("cards");
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // ✅ ربط الداتا
  useEffect(() => {
    if (data?.topAgencies) {
      setAgents(data.topAgencies);
    }
  }, [data]);

  // ✅ فلترة
  const filteredAgents = agents.filter((agent) =>
    (agent.name || agent.agencyName || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ✅ pagination
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ stats من API
  const stats = {
    totalAgents: kpis?.totalAgencies ?? 0,
    totalRevenue: kpis?.totalRevenue ?? 0,
    totalCommission: kpis?.totalCommission ?? 0,
    avgCommissionRate: kpis?.avgCommissionRate ?? 0,
  };

  // ✅ status
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs text-green-400 rounded-full bg-green-500/20">
            <FaCheckCircle className="inline mr-1" /> نشط
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs text-gray-400 rounded-full bg-gray-500/20">
            <FaTimesCircle className="inline mr-1" /> غير نشط
          </span>
        );
    }
  };

  // ✅ loading
  if (!data) {
    return (
      <div className="text-center text-white p-10">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f0c29] via-[#1a1638] to-[#0a081c]">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">الوكلاء B2B</h1>
          <p className="text-gray-400">إدارة الوكلاء</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
          <FaPlus /> إضافة
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-gray-400">إجمالي الوكلاء</p>
          <p className="text-white text-2xl font-bold">
            {stats.totalAgents}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-gray-400">الإيرادات</p>
          <p className="text-green-400 text-2xl font-bold">
            {stats.totalRevenue}$
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-gray-400">العمولات</p>
          <p className="text-yellow-400 text-2xl font-bold">
            {stats.totalCommission}$
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-gray-400">متوسط العمولة</p>
          <p className="text-purple-400 text-2xl font-bold">
            {stats.avgCommissionRate}%
          </p>
        </div>
      </div>

      {/* Search + View */}
      <div className="flex gap-4 mb-6">
        <div className="relative w-full">
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="بحث..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 pr-10 text-white bg-white/5 rounded-xl"
          />
        </div>

        <button onClick={() => setView("cards")}>
          <FaThLarge />
        </button>

        <button onClick={() => setView("table")}>
          <FaList />
        </button>
      </div>

      {/* Cards */}
      {view === "cards" ? (
        <div className="grid md:grid-cols-3 gap-5">
          {paginatedAgents.map((agent, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="text-white font-bold text-lg">
                {agent.name || agent.agencyName}
              </h3>

              <p className="text-gray-400 text-sm">
                <FaEnvelope className="inline mr-1" />
                {agent.email || "-"}
              </p>

              <p className="text-gray-400 text-sm">
                <FaPhone className="inline mr-1" />
                {agent.phone || "-"}
              </p>

              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-gray-400 text-xs">الإيراد</p>
                  <p className="text-white font-bold">
                    {(agent.revenue || 0).toLocaleString()}$
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">العمولة</p>
                  <p className="text-green-400 font-bold">
                    {agent.commissionRate || 0}%
                  </p>
                </div>
              </div>

              <div className="mt-3">
                {getStatusBadge(agent.status)}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-purple-500/20 p-2 rounded">
                  <FaEye />
                </button>
                <button className="bg-green-500/20 p-2 rounded">
                  <FaEdit />
                </button>
                <button className="bg-red-500/20 p-2 rounded">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white/5 rounded-xl">
          <table className="w-full text-right">
            <thead>
              <tr className="text-gray-400">
                <th className="p-3">الاسم</th>
                <th>الإيراد</th>
                <th>العمولة</th>
                <th>الحالة</th>
              </tr>
            </thead>

            <tbody>
              {paginatedAgents.map((agent, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="p-3 text-white">
                    {agent.name || agent.agencyName}
                  </td>
                  <td className="text-white">
                    {(agent.revenue || 0).toLocaleString()}$
                  </td>
                  <td className="text-green-400">
                    {agent.commissionRate || 0}%
                  </td>
                  <td>{getStatusBadge(agent.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
          >
            <FaChevronRight />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
          >
            <FaChevronLeft />
          </button>
        </div>
      )}
    </div>
  );
}
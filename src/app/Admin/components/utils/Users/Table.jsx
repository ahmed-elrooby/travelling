"use client";

import { Admin } from "@/app/Providers/AdminContext/AdminProvider";
import { useContext, useState, useMemo } from "react";
import { FaEdit, FaEllipsisV, FaEye, FaSearch, FaToggleOn, FaTrash, FaUndoAlt } from "react-icons/fa";
import Details from "./Details";
import UpdateUser from "./UpdateUser";

export default function UsersFilter() {
  const [user, setUser] = useState(null);  
  const [details, setDetails] = useState(false);  
  const [openMenu, setOpenMenu] = useState(null);
  const { Users, User,deleteUserFun,openUpdateUser,setOpenUpdateUser,handleChangeStatus } = useContext(Admin);
  console.log(User)
  
  // Users is the array from the response: Users.data.data
  const usersData = User?.data .filter(user => user.role !== "admin")|| [];

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [activeChip, setActiveChip] = useState("all");

  // Filter users based on search, role, status, and chip
  const filteredUsers = useMemo(() => {
    let filtered = usersData;

    // Filter by chip selection
    if (activeChip !== "all") {
      if (activeChip === "new") {
        // Filter users created in the current month
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        filtered = filtered.filter(user => {
          const createdAt = new Date(user.createdAt);
          return createdAt.getMonth() === currentMonth && 
                 createdAt.getFullYear() === currentYear;
        });
      } else if (activeChip === "active") {
        filtered = filtered.filter(user => user.status === "active");
      } else {
        // Filter by role (admin, b2b, b2c)
        filtered = filtered.filter(user => user.role === activeChip);
      }
    }

    // Filter by role dropdown (if not already filtered by chip)
    if (role !== "all" && activeChip !== role) {
      filtered = filtered.filter(user => user.role === role);
    }

    // Filter by status dropdown
    if (status !== "all") {
      filtered = filtered.filter(user => user.status === status);
    }

    // Filter by search (name or email)
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [usersData, search, role, status, activeChip]);

  // Get counts for chips
  const getChipCount = (chipValue) => {
    if (chipValue === "all") return usersData.length;
    
    if (chipValue === "new") {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      return usersData.filter(user => {
        const createdAt = new Date(user.createdAt);
        return createdAt.getMonth() === currentMonth && 
               createdAt.getFullYear() === currentYear;
      }).length;
    }
    
    if (chipValue === "active") {
      return usersData.filter(user => user.status === "active").length;
    }
    
    return usersData.filter(user => user.role === chipValue).length;
  };

  const resetFilters = () => {
    setSearch("");
    setRole("all");
    setStatus("all");
    setActiveChip("all");
  };

  const chips = [
    { label: "جميع المستخدمين", value: "all" },
    { label: "الوكلاء B2B", value: "b2b" },
    { label: "العملاء B2C", value: "b2c" },
    { label: "نشطون", value: "active" },
    { label: "جدد (هذا الشهر)", value: "new" },
  ];

  return (
    <div>
      {details && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"> 
      <Details user={user} setDetails={setDetails}/>
      </div>

      }
     {
      openUpdateUser && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"> 
      <UpdateUser user={user} openUpdateUser={openUpdateUser} setOpenUpdateUser={setOpenUpdateUser}/>
      </div>
     }
      <div
        data-aos="fade-up"
        className="p-4 mb-8 border rounded-2xl sm:p-6 bg-white/5 backdrop-blur-md border-white/10"
      >
        {/* ===== Filters ===== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Search */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              بحث
            </label>

            <div className="relative">
              <FaSearch className="absolute text-sm text-purple-400 right-3 top-3" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="الاسم أو البريد الإلكتروني..."
                className="
                  w-full bg-white/5
                  border border-purple-500/30
                  rounded-xl px-10 py-2.5
                  text-white
                  focus:outline-none focus:ring-1 focus:ring-purple-500
                "
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              نوع المستخدم
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="
                w-full bg-white/5
                border border-purple-500/30
                rounded-xl px-4 py-2.5
               
                focus:outline-none
              "
            >
              <option value="all">جميع الأنواع</option>
              <option value="b2b">وكيل B2B</option>
              <option value="b2c">عميل B2C</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              الحالة
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
                w-full bg-white/5
                border border-purple-500/30
                rounded-xl px-4 py-2.5
                
                focus:outline-none
              "
            >
              <option value="all">الجميع</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>

          {/* Reset */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="
                w-full bg-white/10
                hover:bg-white/20
                text-white
                py-2.5 rounded-xl
                flex items-center justify-center gap-2
                transition
              "
            >
              <FaUndoAlt />
              إعادة تعيين
            </button>
          </div>
        </div>

        {/* ===== Chips ===== */}
        <div className="flex flex-wrap gap-2 pt-4 mt-5 border-t border-purple-500/20">
          {chips.map((chip) => (
            <span
              key={chip.value}
              onClick={() => setActiveChip(chip.value)}
              className={`
                px-3 py-1 rounded-full text-sm cursor-pointer transition
                ${
                  activeChip === chip.value
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }
              `}
            >
              {chip.label}
              <span className="mr-1 text-xs opacity-75">
                ({getChipCount(chip.value)})
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== Results Summary ===== */}
      <div className="mb-4 text-sm text-gray-400">
        عرض {filteredUsers.length} من {usersData.length} مستخدم
        {search && ` - بحث: "${search}"`}
        {role !== "all" && ` - النوع: ${role}`}
        {status !== "all" && ` - الحالة: ${status === "active" ? "نشط" : "غير نشط"}`}
      </div>

      {/* ===== Users Table ===== */}
      <div className="overflow-x-auto border rounded-xl border-white/10 bg-white/5 backdrop-blur-md">
        <table className="w-full text-right">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-gray-300">الاسم</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-300">البريد الإلكتروني</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-300">النوع</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-300">الحالة</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-300">تاريخ الإنشاء</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-300">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="transition border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 text-white">{user.name}</td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${user.role === "admin" ? "bg-red-500/20 text-red-300" : ""}
                    ${user.role === "b2b" ? "bg-blue-500/20 text-blue-300" : ""}
                    ${user.role === "b2c" ? "bg-green-500/20 text-green-300" : ""}
                  `}>
                    {user.role === "admin" ? "مدير" : user.role === "b2b" ? "وكيل B2B" : "عميل B2C"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${user.status === "active" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"}
                  `}>
                    {user.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                </td>
                <td className="relative px-6 py-4">
  <button
    onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
    className="text-gray-300 hover:text-white"
  >
    <FaEllipsisV/>
  </button>

  {openMenu === user.id && (
    <div className="absolute left-6 mt-2 w-40 bg-[#1f1f2e] border border-white/10 rounded-xl shadow-lg z-50">
      
      {/* تفاصيل */}
      <button
        onClick={() => {
          setUser(user);
          setDetails(true);
          setOpenMenu(null);
        }}
        className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
      >
        <FaEye/> عرض
      </button>

      {/* تعديل */}
      <button
        onClick={() => {
          setUser(user)
          setOpenUpdateUser(true)
          setOpenMenu(null);
        }}
        className="flex items-center w-full gap-2 px-4 py-2 text-sm text-blue-300 hover:bg-white/10"
      >
        <FaEdit /> تعديل
      </button>

    

      {/* حذف */}
      <button
        onClick={()=> {deleteUserFun(user.id)
          setOpenMenu(null);
          
        }}
        className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20"
      >
        <FaTrash /> حذف
      </button>
    </div>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            لا توجد نتائج مطابقة للبحث
          </div>
        )}
      </div>
    </div>
  );
}
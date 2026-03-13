"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  LogOut,
  Settings,
  MessageSquare,
  Briefcase,
  Users,
  Layout,
  Home,
  Info,
  ShieldCheck,
  Activity,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Globe,
  FileText,
} from "lucide-react";
import ImageUpload from "../../components/admin/ImageUpload";

export default function PowerAdminDashboard() {
  const [data, setData] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [saveStatus, setSaveStatus] = useState({ message: "", type: "" });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [inquiriesPage, setInquiriesPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem("elite_admin_auth");
    if (!auth) {
      router.push("/admin/login");
      return;
    }
    fetchData();
    fetchOperationalData();
  }, [router]);

  const fetchOperationalData = async () => {
    try {
      const auth = sessionStorage.getItem("elite_admin_auth");
      console.log(
        "Fetching operational data with token:",
        auth ? "Token exists" : "No token",
      );

      if (!auth) {
        console.log("No auth token, redirecting to login");
        router.push("/admin/login");
        return;
      }

      const headers = { Authorization: `Bearer ${auth}` };

      const req1 = fetch("/api/admin/inquiries", { headers });
      const req2 = fetch("/api/admin/careers", { headers });

      const [res1, res2] = await Promise.all([req1, req2]);

      console.log("Inquiries response status:", res1.status);
      console.log("Careers response status:", res2.status);

      if (res1.ok) setInquiries(await res1.json());
      if (res2.ok) setApplications(await res2.json());

      if (!res1.ok || !res2.ok) {
        console.log("API calls failed, redirecting to login");
        sessionStorage.removeItem("elite_admin_auth");
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Failed to load operational data", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("Failed to fetch site content");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Dashboard Data Fetch Error:", error);
      setSaveStatus({ message: "Error loading system data.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaveStatus({ message: "Syncing with Server...", type: "info" });
    try {
      const auth = sessionStorage.getItem("elite_admin_auth");
      if (!auth) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSaveStatus({
          message: "System Updated Successfully!",
          type: "success",
        });
        setTimeout(() => setSaveStatus({ message: "", type: "" }), 4000);
      } else if (res.status === 401) {
        // Unauthorized - clear token and redirect to login
        sessionStorage.removeItem("elite_admin_auth");
        router.push("/admin/login");
      } else {
        setSaveStatus({ message: "Synchronization Failed.", type: "error" });
      }
    } catch (error) {
      setSaveStatus({ message: "Network Error.", type: "error" });
    }
  };

  const handleLogout = async () => {
    try {
      // Clear sessionStorage
      sessionStorage.removeItem("elite_admin_auth");

      // Call logout API (optional since we're using sessionStorage)
      await fetch("/api/admin/login", {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    router.push("/admin/login");
    router.refresh();
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050C1A] flex flex-col items-center justify-center text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full mb-6"
        />
        <h2 className="text-xl font-black tracking-widest uppercase opacity-50">
          Initializing Power Dashboard
        </h2>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-[#050C1A] flex flex-col items-center justify-center text-white">
        <h2 className="text-xl font-black tracking-widest uppercase text-red-500 mb-4">
          Failed to initialize data
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-accent-green text-primary-navy font-bold rounded-xl"
        >
          Retry Connection
        </button>
      </div>
    );

  const updateNested = (path, value) => {
    const newData = { ...data };
    const keys = path.split(".");
    let last = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      last = last[keys[i]];
    }
    last[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const updateListItem = (category, id, field, value) => {
    const newData = { ...data };
    const index = newData[category].findIndex((item) => item.id === id);
    if (index > -1) {
      newData[category][index][field] = value;
      setData(newData);
    }
  };

  const addListItem = (category, template) => {
    const newData = { ...data };
    const id = Math.max(...newData[category].map((i) => i.id || 0)) + 1;
    newData[category].push({ ...template, id });
    setData(newData);
  };

  const removeListItem = (category, id) => {
    const newData = { ...data };
    newData[category] = newData[category].filter((item) => item.id !== id);
    setData(newData);
  };

  return (
    <div className="min-h-screen bg-[#050C1A] text-white flex">
      {/* Sidebar */}
      <aside className="w-[320px] bg-[#0A1425] border-r border-white/5 flex flex-col fixed h-full z-50 overflow-y-auto scrollbar-hide">
        <div className="p-10 border-b border-white/5 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-accent-green rounded-xl flex items-center justify-center text-primary-navy">
              <Activity size={22} />
            </div>
            <h1 className="text-xl font-black tracking-tight">
              Elite{" "}
              <span className="text-accent-green uppercase">Dashboard</span>
            </h1>
          </div>
          <p className="text-xs text-white/30 font-bold uppercase tracking-widest">
            Enterprise Command Center
          </p>
        </div>

        <nav className="flex-1 px-6 space-y-2 mb-8">
          <SidebarItem
            active={activeTab === "overview"}
            icon={<Layout size={20} />}
            label="Overview"
            onClick={() => setActiveTab("overview")}
          />
          <div className="pt-6 pb-2 px-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">
            Core Media
          </div>
          <SidebarItem
            active={activeTab === "hero"}
            icon={<Home size={20} />}
            label="Hero Hub"
            onClick={() => setActiveTab("hero")}
          />
          <SidebarItem
            active={activeTab === "about"}
            icon={<Info size={20} />}
            label="About Elite"
            onClick={() => setActiveTab("about")}
          />
          <SidebarItem
            active={activeTab === "leadership"}
            icon={<Users size={20} />}
            label="Leadership"
            onClick={() => setActiveTab("leadership")}
          />

          <div className="pt-6 pb-2 px-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">
            Content Layers
          </div>
          <SidebarItem
            active={activeTab === "exec"}
            icon={<FileText size={20} />}
            label="Executive Summary"
            onClick={() => setActiveTab("exec")}
          />
          <SidebarItem
            active={activeTab === "services"}
            icon={<Briefcase size={20} />}
            label="Active Services"
            onClick={() => setActiveTab("services")}
          />
          <SidebarItem
            active={activeTab === "equipment"}
            icon={<Settings size={20} />}
            label="Equipment Gallery"
            onClick={() => setActiveTab("equipment")}
          />
          <SidebarItem
            active={activeTab === "qhse"}
            icon={<ShieldCheck size={20} />}
            label="Quality & Safety"
            onClick={() => setActiveTab("qhse")}
          />

          <div className="pt-6 pb-2 px-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">
            Extended Network
          </div>
          <SidebarItem
            active={activeTab === "reviews"}
            icon={<MessageSquare size={20} />}
            label="Testimonials"
            onClick={() => setActiveTab("reviews")}
          />
          <SidebarItem
            active={activeTab === "partners"}
            icon={<Users size={20} />}
            label="Corporate Partners"
            onClick={() => setActiveTab("partners")}
          />
          <SidebarItem
            active={activeTab === "sectors"}
            icon={<Globe size={20} />}
            label="Industry Sectors"
            onClick={() => setActiveTab("sectors")}
          />

          <div className="pt-6 pb-2 px-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">
            Operational Data
          </div>
          <SidebarItem
            active={activeTab === "inquiries"}
            icon={<MessageSquare size={20} />}
            label="Service Inquiries"
            onClick={() => setActiveTab("inquiries")}
          />
          <SidebarItem
            active={activeTab === "careers"}
            icon={<Briefcase size={20} />}
            label="HR / Applications"
            onClick={() => setActiveTab("careers")}
          />
          <div className="pt-6 pb-2 px-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">
            System
          </div>
          <SidebarItem
            active={activeTab === "settings"}
            icon={<Settings size={20} />}
            label="Visibility Controller"
            onClick={() => setActiveTab("settings")}
          />
        </nav>

        <div className="p-8 border-t border-white/5 space-y-4">
          <Link
            href="/"
            className="w-full flex items-center justify-between p-4 bg-accent-green/5 hover:bg-accent-green/10 text-accent-green rounded-2xl transition-all border border-accent-green/10 group"
          >
            <span className="font-bold">Return to Website</span>
            <Home
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-2xl transition-all border border-red-500/10 group"
          >
            <span className="font-bold">End Session</span>
            <LogOut
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[320px] p-16 pb-32 relative">
        <div className="flex justify-between items-center mb-16">
          <div>
            <div className="flex items-center gap-2 text-white/40 mb-2 font-bold text-xs uppercase tracking-widest">
              Command Center <ChevronRight size={14} />{" "}
              <span className="text-accent-green">{activeTab}</span>
            </div>
            <h2 className="text-5xl font-black capitalize tracking-tight">
              {activeTab} Editor
            </h2>
          </div>
        </div>

        <div className="max-w-[1000px] pb-24">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-3 gap-8 mb-12">
                  <StatCard
                    icon={<Activity />}
                    value={data.softServices.length + data.hardServices.length}
                    label="Services Active"
                    color="accent-green"
                  />
                  <StatCard
                    icon={<Users />}
                    value={data.partners.length}
                    label="Global Partners"
                    color="blue-400"
                  />
                  <StatCard
                    icon={<Layout />}
                    value={Object.values(data.settings).filter((v) => v).length}
                    label="Live Modules"
                    color="purple-400"
                  />
                </div>
                <div className="p-12 bg-white/5 rounded-[48px] border border-white/10">
                  <h3 className="text-2xl font-black mb-8 border-b border-white/5 pb-6 text-white/80 uppercase tracking-widest">
                    Global Integrity Status
                  </h3>
                  <div className="space-y-6">
                    <HealthRow label="API Response Latency" status="Optimal" />
                    <HealthRow label="Data Sync Integrity" status="Atomic" />
                    <HealthRow label="Visual Asset Cache" status="Verified" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "leadership" && (
              <motion.div
                key="leadership"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {data.leadership.map((person, idx) => (
                  <FormCard
                    key={person.id}
                    title={`Leader Profile #${idx + 1}`}
                  >
                    <div className="grid grid-cols-2 gap-8">
                      <Field
                        label="Honorific Prefix"
                        value={person.prefix}
                        onChange={(v) =>
                          updateListItem("leadership", person.id, "prefix", v)
                        }
                      />
                      <Field
                        label="Full Name"
                        value={person.name}
                        onChange={(v) =>
                          updateListItem("leadership", person.id, "name", v)
                        }
                      />
                    </div>
                    <Field
                      label="Official Title / Role"
                      value={person.role}
                      onChange={(v) =>
                        updateListItem("leadership", person.id, "role", v)
                      }
                    />
                    <ImageUpload
                      value={person.image}
                      onChange={(v) =>
                        updateListItem("leadership", person.id, "image", v)
                      }
                      recommendedSize="600x800"
                    />
                  </FormCard>
                ))}
              </motion.div>
            )}

            {activeTab === "exec" && (
              <motion.div
                key="exec"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <FormCard title="Core Narrative">
                  <Field
                    label="Module Title"
                    value={data.executiveSummary.title}
                    onChange={(v) => updateNested("executiveSummary.title", v)}
                  />
                  {data.executiveSummary.paragraphs.map((p, i) => (
                    <Field
                      key={i}
                      label={`Paragraph ${i + 1}`}
                      type="textarea"
                      rows={4}
                      value={p}
                      onChange={(v) => {
                        const newP = [...data.executiveSummary.paragraphs];
                        newP[i] = v;
                        updateNested("executiveSummary.paragraphs", newP);
                      }}
                    />
                  ))}
                </FormCard>
              </motion.div>
            )}

            {activeTab === "hero" && (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <FormCard title="High-Impact Branding">
                  <div className="grid grid-cols-2 gap-8">
                    <Field
                      label="Primary Header"
                      value={data.hero.title1}
                      onChange={(v) => updateNested("hero.title1", v)}
                    />
                    <Field
                      label="Accent Header"
                      value={data.hero.title2}
                      onChange={(v) => updateNested("hero.title2", v)}
                    />
                  </div>
                  <Field
                    label="Mission Tagline"
                    value={data.hero.subtitle}
                    onChange={(v) => updateNested("hero.subtitle", v)}
                  />
                  <Field
                    label="Main Call to Intent"
                    type="textarea"
                    rows={3}
                    value={data.hero.description}
                    onChange={(v) => updateNested("hero.description", v)}
                  />
                </FormCard>
              </motion.div>
            )}

            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <FormCard title="Corporate Identity">
                  <Field
                    label="Identity Title"
                    value={data.about.title}
                    onChange={(v) => updateNested("about.title", v)}
                  />
                  <Field
                    label="Identity Overview"
                    type="textarea"
                    rows={3}
                    value={data.about.description}
                    onChange={(v) => updateNested("about.description", v)}
                  />
                </FormCard>
                <FormCard title="Strategic Roadmap">
                  <Field
                    label="Mission Philosophy"
                    type="textarea"
                    rows={5}
                    value={data.about.mission}
                    onChange={(v) => updateNested("about.mission", v)}
                  />
                </FormCard>
              </motion.div>
            )}

            {activeTab === "equipment" && (
              <motion.div
                key="equipment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <FormCard title="Equipment Gallery Management">
                  <div className="space-y-8">
                    {data.equipment?.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-8 bg-white/5 rounded-3xl border border-white/5 relative group"
                      >
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <Field
                            label="Equipment Title"
                            value={item.title}
                            onChange={(v) =>
                              updateListItem("equipment", item.id, "title", v)
                            }
                          />
                          <div className="flex items-end">
                            <button
                              onClick={() =>
                                removeListItem("equipment", item.id)
                              }
                              className="px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
                            >
                              <Trash2 size={18} className="inline mr-2" />{" "}
                              Remove Equipment
                            </button>
                          </div>
                        </div>
                        <Field
                          label="Equipment Description"
                          type="textarea"
                          rows={3}
                          value={item.description || ""}
                          onChange={(v) =>
                            updateListItem(
                              "equipment",
                              item.id,
                              "description",
                              v,
                            )
                          }
                        />
                        <div className="mt-6">
                          <ImageUpload
                            value={item.image}
                            onChange={(v) =>
                              updateListItem("equipment", item.id, "image", v)
                            }
                            recommendedSize="1200x800"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      addListItem("equipment", {
                        id: 0,
                        title: "New Equipment",
                        description: "Equipment description...",
                        image: "",
                      })
                    }
                    className="w-full py-6 border-4 border-dashed border-white/5 rounded-3xl mt-8 text-white/30 hover:text-white hover:border-accent-green/40 transition-all font-black uppercase text-xs tracking-widest"
                  >
                    <Plus size={20} className="inline mr-2" /> Add New Equipment
                  </button>
                </FormCard>
              </motion.div>
            )}

            {activeTab === "qhse" && (
              <motion.div
                key="qhse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <FormCard title="Safety Compliance Header">
                  <Field
                    label="Module Title"
                    value={data.qhse.title}
                    onChange={(v) => updateNested("qhse.title", v)}
                  />
                  <Field
                    label="Commitment Context"
                    type="textarea"
                    rows={3}
                    value={data.qhse.description}
                    onChange={(v) => updateNested("qhse.description", v)}
                  />
                  <ImageUpload
                    value={data.qhse.image}
                    onChange={(v) => updateNested("qhse.image", v)}
                    recommendedSize="800x600"
                  />
                </FormCard>
                <FormCard title="Certified Standards">
                  {data.qhse.commitments.map((c, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <input
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-accent-green"
                        value={c}
                        onChange={(e) => {
                          const newC = [...data.qhse.commitments];
                          newC[i] = e.target.value;
                          updateNested("qhse.commitments", newC);
                        }}
                      />
                      <button
                        onClick={() =>
                          updateNested(
                            "qhse.commitments",
                            data.qhse.commitments.filter((_, idx) => idx !== i),
                          )
                        }
                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      updateNested("qhse.commitments", [
                        ...data.qhse.commitments,
                        "New Global Standard",
                      ])
                    }
                    className="w-full py-6 border-4 border-dashed border-white/5 rounded-3xl text-white/30 hover:text-white hover:border-accent-green/40 transition-all font-black uppercase text-xs tracking-widest"
                  >
                    <Plus size={20} className="inline mr-2" /> Append Standard
                  </button>
                </FormCard>
              </motion.div>
            )}

            {activeTab === "services" && (
              <motion.div
                key="services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                <ListManager
                  title="Hard Infrastructure Services"
                  items={data.hardServices}
                  updateItem={(id, f, v) =>
                    updateListItem("hardServices", id, f, v)
                  }
                />
                <ListManager
                  title="Soft Strategic Services"
                  items={data.softServices}
                  updateItem={(id, f, v) =>
                    updateListItem("softServices", id, f, v)
                  }
                />
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <FormCard title="Client Testimonials">
                  <div className="space-y-8">
                    {data.reviews.map((review, idx) => (
                      <div
                        key={review.id}
                        className="p-8 bg-white/5 rounded-3xl border border-white/5 relative group"
                      >
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <Field
                            label="Client Name"
                            value={review.name}
                            onChange={(v) =>
                              updateListItem("reviews", review.id, "name", v)
                            }
                          />
                          <Field
                            label="Designation / Role"
                            value={review.role}
                            onChange={(v) =>
                              updateListItem("reviews", review.id, "role", v)
                            }
                          />
                        </div>
                        <Field
                          label="Testimonial Content"
                          type="textarea"
                          rows={3}
                          value={review.text}
                          onChange={(v) =>
                            updateListItem("reviews", review.id, "text", v)
                          }
                        />
                        <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
                          <div className="flex items-center gap-4">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[3px]">
                              Rating
                            </label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() =>
                                    updateListItem(
                                      "reviews",
                                      review.id,
                                      "rating",
                                      star,
                                    )
                                  }
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${review.rating >= star ? "bg-accent-green text-primary-navy shadow-[0_0_10px_rgba(0,255,157,0.4)]" : "bg-white/5 text-white/20 hover:bg-white/10"}`}
                                >
                                  {star}
                                </button>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => removeListItem("reviews", review.id)}
                            className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-50 group-hover:opacity-100"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      addListItem("reviews", {
                        id: 0,
                        name: "New Client",
                        role: "Executive",
                        text: "Enter feedback here...",
                        rating: 5,
                      })
                    }
                    className="w-full py-6 border-4 border-dashed border-white/5 rounded-3xl mt-8 text-white/30 hover:text-white hover:border-accent-green/40 transition-all font-black uppercase text-xs tracking-widest"
                  >
                    <Plus size={20} className="inline mr-2" /> Add New
                    Testimonial
                  </button>
                </FormCard>
              </motion.div>
            )}

            {activeTab === "partners" && (
              <motion.div
                key="partners"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FormCard title="Managed Ecosystem">
                  <div className="grid grid-cols-2 gap-4">
                    {data.partners.map((p, i) => (
                      <div
                        key={i}
                        className="flex gap-4 items-center bg-white/5 p-5 rounded-2xl border border-white/10 group"
                      >
                        <input
                          className="flex-1 bg-transparent border-none text-white outline-none font-bold"
                          value={p}
                          onChange={(e) => {
                            const newP = [...data.partners];
                            newP[i] = e.target.value;
                            updateNested("partners", newP);
                          }}
                        />
                        <button
                          onClick={() =>
                            updateNested(
                              "partners",
                              data.partners.filter((_, idx) => idx !== i),
                            )
                          }
                          className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      updateNested("partners", [
                        ...data.partners,
                        "Global Corporation",
                      ])
                    }
                    className="w-full py-6 border-4 border-dashed border-white/5 rounded-3xl mt-8 text-white/30 hover:text-white hover:border-accent-green/40 transition-all font-black uppercase text-xs tracking-widest"
                  >
                    <Plus size={20} className="inline mr-2" /> Append Partner
                  </button>
                </FormCard>
              </motion.div>
            )}

            {activeTab === "sectors" && (
              <motion.div
                key="sectors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <h3 className="text-3xl font-black tracking-tight">
                      Industry Sectors
                    </h3>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  {data.sectors.map((item) => (
                    <div
                      key={item.id}
                      className="p-12 bg-white/3 rounded-[48px] border border-white/5 hover:border-white/10 transition-all"
                    >
                      <Field
                        label="Sector Title"
                        value={item.title}
                        onChange={(v) =>
                          updateListItem("sectors", item.id, "title", v)
                        }
                      />
                      <div className="mt-8">
                        <ImageUpload
                          value={item.image}
                          onChange={(v) =>
                            updateListItem("sectors", item.id, "image", v)
                          }
                          recommendedSize="800x600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "inquiries" && (
              <motion.div
                key="inquiries"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-6 mb-8">
                  <h3 className="text-3xl font-black tracking-tight">
                    Service Inquiries
                  </h3>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-white/40 font-bold">
                    {inquiries.length} Records
                  </span>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-12 text-center text-white/30 font-bold uppercase tracking-widest bg-white/5 rounded-[48px]">
                    No inquiries found
                  </div>
                ) : (
                  <>
                    {/* Paginated Inquiries */}
                    {inquiries
                      .slice(
                        (inquiriesPage - 1) * itemsPerPage,
                        inquiriesPage * itemsPerPage,
                      )
                      .map((inq) => (
                        <div
                          key={inq.id}
                          className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.08] transition-all"
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h4 className="text-xl font-black text-white mb-1">
                                {inq.name}
                              </h4>
                              <div className="text-accent-green text-xs font-black uppercase tracking-widest">
                                {inq.service}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold text-white/60">
                                {new Date(inq.createdAt).toLocaleDateString()}
                              </div>
                              <button
                                onClick={async () => {
                                  if (
                                    confirm(
                                      `Are you sure you want to delete the inquiry from ${inq.name}? This action cannot be undone.`,
                                    )
                                  ) {
                                    try {
                                      const auth =
                                        sessionStorage.getItem(
                                          "elite_admin_auth",
                                        );
                                      const response = await fetch(
                                        `/api/admin/inquiries/${inq.id}`,
                                        {
                                          method: "DELETE",
                                          headers: {
                                            Authorization: `Bearer ${auth}`,
                                          },
                                        },
                                      );

                                      if (response.ok) {
                                        alert("Inquiry deleted successfully");
                                        fetchOperationalData(); // Refresh data
                                      } else {
                                        alert("Failed to delete inquiry");
                                      }
                                    } catch (error) {
                                      console.error("Delete error:", error);
                                      alert("Failed to delete inquiry");
                                    }
                                  }
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 size={12} /> Delete
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-white/60">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-white/40 rounded-full" />{" "}
                              {inq.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-white/40 rounded-full" />{" "}
                              {inq.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-white/40 rounded-full" />{" "}
                              Target Date: {inq.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-accent-green/40 rounded-full" />{" "}
                              Status: {inq.status}
                            </div>
                          </div>
                          {inq.details && (
                            <div className="p-6 bg-black/20 rounded-2xl text-sm leading-relaxed text-white/80 border border-white/5">
                              <p>{inq.details}</p>
                            </div>
                          )}
                        </div>
                      ))}

                    {/* Pagination Controls for Inquiries */}
                    {inquiries.length > itemsPerPage && (
                      <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                          onClick={() =>
                            setInquiriesPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={inquiriesPage === 1}
                          className="px-6 py-3 bg-white/5 text-white rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-2">
                          {Array.from(
                            {
                              length: Math.ceil(
                                inquiries.length / itemsPerPage,
                              ),
                            },
                            (_, i) => i + 1,
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => setInquiriesPage(page)}
                              className={`w-12 h-12 rounded-xl font-bold transition-all ${
                                inquiriesPage === page
                                  ? "bg-accent-green text-primary-navy"
                                  : "bg-white/5 text-white hover:bg-white/10"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() =>
                            setInquiriesPage((prev) =>
                              Math.min(
                                prev + 1,
                                Math.ceil(inquiries.length / itemsPerPage),
                              ),
                            )
                          }
                          disabled={
                            inquiriesPage ===
                            Math.ceil(inquiries.length / itemsPerPage)
                          }
                          className="px-6 py-3 bg-white/5 text-white rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {activeTab === "careers" && (
              <motion.div
                key="careers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-6 mb-8">
                  <h3 className="text-3xl font-black tracking-tight">
                    Job Applications
                  </h3>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-white/40 font-bold">
                    {applications.length} Applicants
                  </span>
                </div>

                {applications.length === 0 ? (
                  <div className="p-12 text-center text-white/30 font-bold uppercase tracking-widest bg-white/5 rounded-[48px]">
                    No applications found
                  </div>
                ) : (
                  <>
                    {/* Paginated Applications */}
                    {applications
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage,
                      )
                      .map((app) => (
                        <div
                          key={app.id}
                          className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.08] transition-all group"
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h4 className="text-xl font-black text-white mb-1">
                                {app.firstName} {app.lastName}
                              </h4>
                              <div className="text-blue-400 text-xs font-black uppercase tracking-widest">
                                {app.position}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={async () => {
                                  if (!app.resumeUrl) return;

                                  const extension = (
                                    app.resumeType || "pdf"
                                  ).replace(".", "");
                                  const filename = `${app.firstName}_${app.lastName}_Resume.${extension}`;

                                  const response = await fetch(app.resumeUrl);
                                  const blob = await response.blob();

                                  const url = window.URL.createObjectURL(blob);
                                  const link = document.createElement("a");

                                  link.href = url;
                                  link.download = filename;

                                  document.body.appendChild(link);
                                  link.click();

                                  document.body.removeChild(link);
                                  window.URL.revokeObjectURL(url);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-accent-green/10 text-accent-green rounded-xl text-xs font-black uppercase tracking-wider hover:bg-accent-green hover:text-primary-navy transition-all"
                              >
                                <FileText size={14} /> Download
                              </button>

                              <button
                                onClick={async () => {
                                  if (
                                    confirm(
                                      `Are you sure you want to delete the application from ${app.firstName} ${app.lastName}? This action cannot be undone.`,
                                    )
                                  ) {
                                    try {
                                      const auth =
                                        sessionStorage.getItem(
                                          "elite_admin_auth",
                                        );
                                      const response = await fetch(
                                        `/api/admin/careers/${app.id}`,
                                        {
                                          method: "DELETE",
                                          headers: {
                                            Authorization: `Bearer ${auth}`,
                                          },
                                        },
                                      );

                                      const result = await response.json();
                                      if (result.success) {
                                        alert(
                                          "Application deleted successfully",
                                        );
                                        fetchOperationalData(); // Refresh data
                                      } else {
                                        alert(
                                          "Failed to delete application: " +
                                            result.error,
                                        );
                                      }
                                    } catch (error) {
                                      console.error("Delete error:", error);
                                      alert("Failed to delete application");
                                    }
                                  }
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 size={12} /> Delete
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-white/60">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-white/40 rounded-full" />{" "}
                              {app.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-white/40 rounded-full" />{" "}
                              {app.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-white/40 rounded-full" />{" "}
                              Applied:{" "}
                              {new Date(app.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-blue-400/40 rounded-full" />{" "}
                              Status: {app.status}
                            </div>
                          </div>
                          {app.coverLetter && (
                            <div className="p-6 bg-black/20 rounded-2xl text-sm leading-relaxed text-white/80 border border-white/5">
                              <p>{app.coverLetter}</p>
                            </div>
                          )}
                        </div>
                      ))}

                    {/* Pagination Controls */}
                    {applications.length > itemsPerPage && (
                      <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="px-6 py-3 bg-white/5 text-white rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-2">
                          {Array.from(
                            {
                              length: Math.ceil(
                                applications.length / itemsPerPage,
                              ),
                            },
                            (_, i) => i + 1,
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-12 h-12 rounded-xl font-bold transition-all ${
                                currentPage === page
                                  ? "bg-accent-green text-primary-navy"
                                  : "bg-white/5 text-white hover:bg-white/10"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(
                                prev + 1,
                                Math.ceil(applications.length / itemsPerPage),
                              ),
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(applications.length / itemsPerPage)
                          }
                          className="px-6 py-3 bg-white/5 text-white rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-2 gap-8">
                  {Object.keys(data.settings).map((key) => (
                    <div
                      key={key}
                      className="p-10 bg-white/5 rounded-[40px] border border-white/10 flex justify-between items-center group hover:bg-white/[0.08] transition-all"
                    >
                      <div>
                        <span className="text-xl font-black text-white capitalize block mb-1 tracking-tight">
                          {key.replace("show", "")} Module
                        </span>
                        <span className="text-[10px] text-accent-green font-black uppercase tracking-[2px] opacity-40">
                          System toggle
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          updateNested(`settings.${key}`, !data.settings[key])
                        }
                        className={`w-16 h-10 rounded-full relative transition-all duration-500 ease-elastic ${data.settings[key] ? "bg-accent-green shadow-[0_0_20px_rgba(0,255,157,0.3)]" : "bg-white/10"}`}
                      >
                        <div
                          className={`absolute top-2 w-6 h-6 rounded-full bg-white transition-all duration-500 ${data.settings[key] ? "right-2" : "left-2"}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 right-0 left-[320px] p-6 bg-[#0A1425]/90 backdrop-blur-md border-t border-white/5 flex justify-between items-center z-50">
          <div className="flex items-center gap-6">
            <AnimatePresence>
              {saveStatus.message && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl border font-bold ${
                    saveStatus.type === "success"
                      ? "bg-accent-green/10 border-accent-green/30 text-accent-green"
                      : saveStatus.type === "error"
                        ? "bg-red-500/10 border-red-500/30 text-red-500"
                        : "bg-white/5 border-white/10 text-white"
                  }`}
                >
                  {saveStatus.type === "success" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  {saveStatus.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-3 bg-accent-green text-primary-navy px-10 py-5 rounded-[24px] font-black hover:scale-105 active:scale-95 transition-all shadow-[0_15px_35px_rgba(0,255,157,0.2)] uppercase tracking-wider text-sm"
          >
            <Save size={20} /> Sync System
          </button>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-5 rounded-[24px] font-black transition-all duration-300 ${active ? "bg-accent-green text-primary-navy shadow-[0_20px_40px_rgba(0,255,157,0.2)]" : "text-white/40 hover:bg-white/5 hover:text-white"}`}
    >
      <span className={active ? "text-primary-navy" : "text-accent-green/50"}>
        {icon}
      </span>
      <span className="tracking-[-0.5px] uppercase text-[11px] whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div className="p-10 bg-white/5 rounded-[48px] border border-white/10 hover:border-accent-green/30 transition-all group">
      <div
        className={`w-14 h-14 bg-${color}/10 rounded-2xl flex items-center justify-center text-${color} mb-8 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <div className="text-5xl font-black mb-2 tracking-tighter text-white/90">
        {value}
      </div>
      <div className="text-[10px] text-white/20 font-black uppercase tracking-[3px]">
        {label}
      </div>
    </div>
  );
}

function HealthRow({ label, status }) {
  return (
    <div className="flex justify-between items-center bg-white/[0.03] p-6 rounded-3xl border border-white/5">
      <span className="text-white/50 font-black text-sm uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-center gap-4">
        <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_10px_rgba(0,255,157,0.8)] animate-pulse" />
        <span className="text-accent-green font-black text-xs uppercase tracking-widest">
          {status}
        </span>
      </div>
    </div>
  );
}

function FormCard({ title, children }) {
  return (
    <div className="p-12 bg-white/5 rounded-[48px] border border-white/10 shadow-xl">
      <h3 className="text-xs font-black mb-12 text-accent-green uppercase tracking-[4px] opacity-60 border-b border-white/5 pb-6">
        {title}
      </h3>
      <div className="space-y-10">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", rows = 1 }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-white/30 uppercase tracking-[3px] ml-4">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full bg-white/5 border border-white/10 rounded-[24px] p-6 text-white outline-none focus:border-accent-green focus:bg-white/[0.08] transition-all resize-none font-medium leading-relaxed shadow-inner"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-[24px] p-6 text-white outline-none focus:border-accent-green focus:bg-white/[0.08] transition-all font-bold shadow-inner"
        />
      )}
    </div>
  );
}

function ListManager({ title, items, updateItem }) {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-6">
        <h3 className="text-3xl font-black tracking-tight">{title}</h3>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="space-y-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-12 bg-white/3 rounded-[48px] border border-white/5 hover:border-white/10 transition-all"
          >
            <Field
              label="Categorical Title"
              value={item.title}
              onChange={(v) => updateItem(item.id, "title", v)}
            />
            <div className="mt-10">
              <Field
                label="Strategic Overview"
                type="textarea"
                rows={3}
                value={item.desc}
                onChange={(v) => updateItem(item.id, "desc", v)}
              />
            </div>
            <div className="mt-8">
              <ImageUpload
                value={item.image}
                onChange={(v) => updateItem(item.id, "image", v)}
                recommendedSize="800x600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

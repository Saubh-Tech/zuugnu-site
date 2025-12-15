"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";
import { MasterTableModal } from "@/components/MasterTableModal";
import ProfileForm from "@/components/ProfileForm";
import Image from "next/image";
import heroicon from "../../../public/zuugnu-removebg-preview.png";

const COUNTRIES = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+30", name: "Greece", flag: "🇬🇷" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+1", name: "Mexico", flag: "🇲🇽" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+51", name: "Peru", flag: "🇵🇪" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾" },
  { code: "+36", name: "Hungary", flag: "🇭🇺" },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { code: "+40", name: "Romania", flag: "🇷🇴" },
  { code: "+359", name: "Bulgaria", flag: "🇧🇬" },
  { code: "+385", name: "Croatia", flag: "🇭🇷" },
  { code: "+383", name: "Kosovo", flag: "🇽🇰" },
  { code: "+389", name: "North Macedonia", flag: "🇲🇰" },
  { code: "+356", name: "Malta", flag: "🇲🇹" },
  { code: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "+352", name: "Luxembourg", flag: "🇱🇺" },
  { code: "+354", name: "Iceland", flag: "🇮🇸" },
  { code: "+374", name: "Armenia", flag: "🇦🇲" },
  { code: "+380", name: "Ukraine", flag: "🇺🇦" },
  { code: "+375", name: "Belarus", flag: "🇧🇾" },
  { code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "+998", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+992", name: "Tajikistan", flag: "🇹🇯" },
  { code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
  { code: "+1", name: "Jamaica", flag: "🇯🇲" },
  { code: "+1", name: "Trinidad and Tobago", flag: "🇹🇹" },
  { code: "+1", name: "Barbados", flag: "🇧🇧" },
  { code: "+1", name: "Bahamas", flag: "🇧🇸" },
  { code: "+1", name: "Dominican Republic", flag: "🇩🇴" },
  { code: "+53", name: "Cuba", flag: "🇨🇺" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "+260", name: "Zambia", flag: "🇿🇲" },
  { code: "+263", name: "Zimbabwe", flag: "🇿🇼" },
  { code: "+265", name: "Malawi", flag: "🇲🇼" },
  { code: "+258", name: "Mozambique", flag: "🇲🇿" },
  { code: "+267", name: "Botswana", flag: "🇧🇼" },
  { code: "+264", name: "Namibia", flag: "🇳🇦" },
  { code: "+291", name: "Eritrea", flag: "🇪🇷" },
  { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
  { code: "+679", name: "Fiji", flag: "🇫🇯" },
  { code: "+680", name: "Palau", flag: "🇵🇼" },
  { code: "+676", name: "Tonga", flag: "🇹🇴" },
  { code: "+678", name: "Vanuatu", flag: "🇻🇺" },
  { code: "+685", name: "Samoa", flag: "🇼🇸" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+977", name: "Nepal", flag: "🇳🇵" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
  { code: "+98", name: "Iran", flag: "🇮🇷" },
  { code: "+964", name: "Iraq", flag: "🇮🇶" },
  { code: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+963", name: "Syria", flag: "🇸🇾" },
  { code: "+970", name: "Palestine", flag: "🇵🇸" },
  { code: "+852", name: "Hong Kong", flag: "🇭🇰" },
  { code: "+853", name: "Macau", flag: "🇲🇴" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+855", name: "Cambodia", flag: "🇰🇭" },
  { code: "+856", name: "Laos", flag: "🇱🇦" },
  { code: "+95", name: "Myanmar", flag: "🇲🇲" },
  { code: "+673", name: "Brunei", flag: "🇧🇳" },
  { code: "+976", name: "Mongolia", flag: "🇲🇳" },
  { code: "+670", name: "East Timor", flag: "🇹🇱" },
  { code: "+850", name: "North Korea", flag: "🇰🇵" },
];

export default function AuthPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [waError, setWaError] = useState("");
  const [pwError, setPwError] = useState("");
  const [error, setError] = useState("");
  const [showMasterTable, setShowMasterTable] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const dropdown = document.getElementById("countryDropdown");
      const button = document.getElementById("countryButton");
      if (
        dropdown &&
        button &&
        !dropdown.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    if (showCountryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showCountryDropdown]);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");

    try {
      const fullPhone = `${countryCode}${whatsappNumber}`;

      // Use environment variable for backend URL in production
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const apiUrl = backendUrl ? `${backendUrl}/auth/login` : "/auth/login";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: fullPhone,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Save token
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to profile/dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      setPwError(error.message || "Invalid credentials. Please try again.");
      alert(error.message || "Login failed");
    }
  };

  const handleOpenWhatsApp = () => {
    const trimmed = fullName.trim();
    if (!trimmed) {
      alert("Please enter your name");
      return;
    }

    const message = `Register: ${trimmed}`;
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/918800607598?text=${encodedMessage}`, "_blank");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-12">
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 sm:gap-4 z-10">
        {/* Master Table Button */}
        <button
          onClick={() => setShowMasterTable(true)}
          className="group flex items-center gap-3 bg-white hover:bg-purple-50 text-gray-900 px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-200 hover:border-purple-300"
          title="Master Table Management"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </div>
          <span className="hidden sm:inline font-semibold text-sm">
            Master Data
          </span>
        </button>

        {/* Career Explorer Button */}
        <Link
          href="/career"
          className="group flex items-center gap-3 bg-white hover:bg-indigo-50 text-gray-900 px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-200 hover:border-indigo-300"
          title="Career Explorer"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="hidden sm:inline font-semibold text-sm">Career</span>
        </Link>
      </div>

      {/* Master Table Modal */}
      <MasterTableModal
        isOpen={showMasterTable}
        onClose={() => setShowMasterTable(false)}
      />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 bg-white bg-opacity-80 backdrop-blur-sm hover:bg-opacity-100 text-gray-700 hover:text-indigo-600 font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-md transition-all transform hover:scale-105 border border-purple-200 z-10"
      >
        <span className="text-xl">←</span>
        <span className="text-xl">🏠</span>
        <span className="hidden sm:inline">Home</span>
      </Link>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mt-16 sm:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Register Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-purple-200 shadow-2xl hover:shadow-purple-300 transition-all">
            <div className="text-center mb-8">
              <div className="mb-6 flex justify-center">
                <Image
                  src={heroicon}
                  alt="Zuugnu"
                  width={120}
                  height={60}
                  loading="lazy"
                  className="max-w-[120px] h-auto"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <span className="text-2xl">👤</span> Register
              </h2>
            </div>

            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-gray-800 font-semibold text-lg">
                  Type "Register + Your Full Name"
                </p>
                <p className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 font-semibold shadow-sm">
                  <span className="text-sm uppercase tracking-wide text-purple-500 flex items-center gap-1">
                    WhatsApp
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </span>
                  <span className="text-base">+91 8800607598</span>
                </p>
                <p className="text-gray-600 text-sm">
                  To receive Login Password
                </p>
              </div>
            </div>

            <form className="pt-4 border-t border-purple-300 mt-4">
              <input
                type="text"
                placeholder="Enter your Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                aria-label="Full name"
              />
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="mt-3 flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Open WhatsApp Chat
              </button>
            </form>
          </div>

          {/* Sign In Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-purple-200 shadow-2xl hover:shadow-purple-300 transition-all">
            <div className="text-center mb-8">
              <div className="mb-6 flex justify-center">
                <Image
                  src={heroicon}
                  alt="Zuugnu"
                  width={120}
                  height={60}
                  loading="lazy"
                  className="max-w-[120px] h-auto"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <span className="text-2xl">↪️</span> Sign In
              </h2>
            </div>

            {/* ERROR MESSAGE DISPLAY */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm text-center mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSignInSubmit}
              autoComplete="off"
              className="w-full flex flex-col gap-6"
            >
              {/* Phone Input Group */}
              <div className="flex gap-3 w-full">
                {/* Country Code */}
                <div className="relative shrink-0 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCountryDropdown(!showCountryDropdown);
                      setSearchCountry("");
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-4 min-w-[90px] bg-white text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <span className="flex items-center gap-1 text-base">
                      {COUNTRIES.find((c) => c.code === countryCode)?.flag}
                      {countryCode}
                    </span>
                    <svg
                      className="w-4 h-4 text-slate-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute top-[calc(100%+8px)] left-0 w-[280px] max-h-[400px] bg-slate-900/95 border border-violet-400/30 rounded-xl backdrop-blur shadow-xl flex flex-col overflow-hidden animate-slideDown">
                      <div className="p-3 border-b border-violet-400/20">
                        <input
                          autoFocus
                          placeholder="Search country..."
                          value={searchCountry}
                          onChange={(e) =>
                            setSearchCountry(e.target.value.toUpperCase())
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-600/30 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        />
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        {COUNTRIES.filter(
                          (c) =>
                            c.name.toUpperCase().includes(searchCountry) ||
                            c.code.includes(searchCountry)
                        ).map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setCountryCode(country.code);
                              setShowCountryDropdown(false);
                              setSearchCountry("");
                            }}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm text-slate-300 border-l-4 border-transparent hover:bg-violet-400/15 hover:text-violet-300 hover:border-violet-400 transition"
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="flex-1 truncate font-medium">
                              {country.name}
                            </span>
                            <span className="text-blue-400 font-bold text-xs">
                              {country.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <div className="relative flex-1">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487z" />
                  </svg>

                  <input
                    type="tel"
                    placeholder="Enter your WhatsApp number"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-4 pr-12 py-4 bg-white text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />

                {/* Eye Icon Inside Input */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors text-lg"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 py-4 rounded-xl text-white text-lg font-semibold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-[length:200%] hover:bg-right transition shadow-lg hover:-translate-y-1"
              >
                Submit
              </button>

              {/* Forgot */}
              <Link
                href="/forgot-password"
                className="text-center text-slate-300 text-sm hover:text-white relative after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-violet-400 after:to-pink-400 hover:after:w-full after:transition-all"
              >
                Forgot Password?
              </Link>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-gray-600 text-sm font-medium">
          © 2025 Zuugnu.com | All rights reserved
        </p>
      </div>

      {/* Profile Form Modal */}
      {showProfileForm && (
        <ProfileForm onClose={() => setShowProfileForm(false)} />
      )}
    </div>
  );
}

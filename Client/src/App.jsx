import React, { useState } from "react";
import axios from "axios";
import ResumePreview from "./components/ResumePreview";
import { FaFileUpload, FaMagic, FaSpinner, FaPenNib, FaCheckCircle, FaRocket, FaPalette } from "react-icons/fa";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tailoredData, setTailoredData] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [color, setColor] = useState("#e11d48");
  const [template, setTemplate] = useState("modern");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTailor = async () => {
    if (!file || !jobDescription) {
      alert("Please upload a CV and enter a Job Description.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      const [cvRes, clRes] = await Promise.all([
        axios.post("http://localhost:8000/cv/tailor", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        axios.post("http://localhost:8000/cv/cover-letter", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ]);

      if (cvRes.data.error || clRes.data.error) {
        alert(cvRes.data.error || clRes.data.error);
      } else {
        setTailoredData(cvRes.data);
        setCoverLetter(clRes.data.cover_letter);
        setStep(2);
      }

    } catch (error) {
      console.error("Error tailoring CV:", error);
      alert("Something went wrong. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-rose-500 selection:text-white">
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 p-2 rounded-lg">
              <FaRocket className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold tracking-tight">CV<span className="text-rose-400">Forge</span> AI</span>
          </div>
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Transform Your CV into a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                  Job-Winning Masterpiece
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Upload your current resume, paste the job description, and let our AI tailor your CV to match the role perfectly.
              </p>
            </div>

            {/* Glass Card Input Area */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="grid md:grid-cols-2 gap-8 relative z-10">

                {/* Upload Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-rose-300 uppercase tracking-wider">
                    Step 1: Upload CV
                  </label>
                  <div className={`
                            border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 group cursor-pointer
                            ${file ? 'border-rose-500 bg-rose-500/10' : 'border-slate-600 hover:border-rose-400 hover:bg-slate-700/50'}
                        `}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cv-upload"
                      accept=".pdf,.txt"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer block h-full w-full">
                      {file ? (
                        <div className="flex flex-col items-center animate-fade-in">
                          <FaCheckCircle className="text-4xl text-pink-400 mb-3" />
                          <p className="font-medium text-white break-all">{file.name}</p>
                          <span className="text-xs text-pink-300 mt-1">Ready to process</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center group-hover:-translate-y-1 transition-transform">
                          <FaFileUpload className="text-4xl text-slate-400 group-hover:text-rose-400 mb-3 transition-colors" />
                          <p className="font-medium text-slate-300">Drop your PDF here</p>
                          <span className="text-xs text-slate-500 mt-1">or click to browse</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* JD Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-rose-300 uppercase tracking-wider">
                    Step 2: Job Description
                  </label>
                  <textarea
                    className="w-full h-48 bg-slate-900/50 border border-slate-600 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-600"
                    placeholder="Paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleTailor}
                  disabled={loading}
                  className={`
                            relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-lg
                            ${loading ? 'bg-slate-700 cursor-not-allowed opacity-70' : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-500/30'}
                        `}
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <FaSpinner className="animate-spin" />
                      Analyzing & Tailoring...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <FaMagic />
                      Generate Tailored CV
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && tailoredData && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in-up">
            {/* Sidebar Controls */}
            <div className="lg:col-span-4 space-y-6">
              {/* Styling Card */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                  <FaPalette className="text-rose-400" />
                  Customization
                </h3>
                <div className="space-y-6">
                  {/* Template Selection */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-3">Choose Template</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'modern', name: 'Modern', desc: 'Two-column' },
                        { id: 'classic', name: 'Classic', desc: 'Traditional' },
                        { id: 'minimal', name: 'Minimal', desc: 'Clean' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTemplate(t.id)}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${template === t.id
                            ? 'border-rose-500 bg-rose-500/20 text-white'
                            : 'border-slate-600 hover:border-slate-500 text-slate-300'
                            }`}
                        >
                          <div className="font-semibold text-xs">{t.name}</div>
                          <div className="text-[10px] text-slate-400">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-3">Accent Color</label>
                    {/* Custom Color Picker */}
                    <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                      <label htmlFor="color-picker" className="text-xs text-slate-400">Custom:</label>
                      <input
                        id="color-picker"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-8 rounded cursor-pointer border-0"
                      />
                      <span className="text-xs font-mono text-slate-300">{color}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter Card */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col h-[500px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    <FaPenNib className="text-rose-400" />
                    Cover Letter
                  </h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(coverLetter)}
                    className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-rose-300 transition-colors"
                  >
                    Copy Text
                  </button>
                </div>
                <div className="flex-1 bg-slate-900/50 rounded-xl p-4 overflow-y-auto border border-slate-700/50 text-sm text-slate-300 leading-relaxed font-mono custom-scrollbar">
                  {coverLetter}
                </div>
              </div>
            </div>

            {/* Resume Preview Area */}
            <div className="lg:col-span-8">
              <div className="bg-slate-700/30 rounded-3xl p-1 pb-0 backdrop-blur-sm overflow-hidden border border-white/5">
                <div className="bg-slate-800/50 p-2 flex justify-center border-b border-white/5">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Live Preview</span>
                </div>
                <div className="p-4 md:p-8 overflow-x-auto flex justify-center bg-[#525659]">
                  <ResumePreview data={tailoredData} color={color} template={template} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import React from "react";

const TechTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-[#0f172a] text-slate-300 shadow-2xl font-['JetBrains_Mono',_monospace] p-12">
            {/* Header */}
            <header className="mb-10 flex justify-between items-start border-b border-slate-700 pb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{data.personal_info?.name}</h1>
                    <p className="text-sm font-mono tracking-tighter" style={{ color: color }}>
                        {">"} Full Stack Engineer / Systems Architect
                    </p>
                </div>
                <div className="text-right text-[11px] space-y-1 font-mono text-slate-400">
                    {data.personal_info?.email && <p>email: "{data.personal_info.email}"</p>}
                    {data.personal_info?.phone && <p>phone: "{data.personal_info.phone}"</p>}
                    {data.personal_info?.linkedin && <p>linkedin: "{data.personal_info.linkedin}"</p>}
                    {data.personal_info?.github && <p>github: "{data.personal_info.github}"</p>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
                {/* Main Content */}
                <div className="col-span-8 space-y-10">
                    {/* Summary */}
                    <section>
                        <h2 className="text-xs font-bold uppercase text-slate-500 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                            About.me
                        </h2>
                        <p className="text-[13px] leading-relaxed text-slate-400">
                            {data.summary}
                        </p>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-xs font-bold uppercase text-slate-500 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                            Experience.log
                        </h2>
                        <div className="space-y-8">
                            {data.experience?.map((exp, index) => (
                                <div key={index} className="group">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-[15px] font-bold text-white">{exp.title}</h3>
                                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                                            {exp.duration || exp.dates}
                                        </span>
                                    </div>
                                    <p className="text-xs font-semibold mb-3" style={{ color: color }}>@ {exp.company}</p>
                                    <ul className="text-[12px] space-y-2 text-slate-400 pl-2 border-l-2 border-slate-800 group-hover:border-slate-700 transition-colors">
                                        {Array.isArray(exp.description) ? (
                                            exp.description.map((item, idx) => (
                                                <li key={idx}>$ {item}</li>
                                            ))
                                        ) : (
                                            <li>$ {exp.description}</li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-10 text-right">
                    {/* Skills */}
                    <section>
                        <h2 className="text-xs font-bold uppercase text-slate-500 mb-4 justify-end flex items-center gap-2">
                            Skills.json
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                        </h2>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {data.skills?.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-slate-800/50 text-[10px] text-slate-400 rounded-sm border border-slate-700">
                                    "{skill}"
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-xs font-bold uppercase text-slate-500 mb-4 justify-end flex items-center gap-2">
                            Education.edu
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                        </h2>
                        <div className="space-y-4">
                            {data.education?.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="text-[13px] font-bold text-white mb-1">{edu.degree}</h3>
                                    <p className="text-[11px] text-slate-500">{edu.school}</p>
                                    <p className="text-[10px] text-slate-600 font-bold">{edu.year || edu.dates}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <footer className="mt-20 pt-8 border-t border-slate-800 text-center">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                    System.Status 100% Correct Output // CVForge AI
                </p>
            </footer>
        </div>
    );
};

export default TechTemplate;

import React from "react";

const SidebarRightTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl font-['Inter',_sans-serif] p-0 flex">
            {/* Main Content */}
            <main className="flex-1 p-12">
                <header className="mb-10">
                    <h1 className="text-4xl font-black text-slate-900 leading-tight mb-2 tracking-tighter uppercase">{data.personal_info?.name}</h1>
                    <div className="h-1.5 w-20" style={{ backgroundColor: color }}></div>
                </header>

                <section className="mb-10">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Professional Profile</h2>
                    <p className="text-[13px] leading-relaxed text-slate-600 text-justify">
                        {data.summary}
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 font-mono font-bold tracking-[0.2em] mb-6">Experience_History</h2>
                    <div className="space-y-8">
                        {data.experience?.map((exp, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                                    <span className="text-xs font-bold text-slate-400">{exp.duration || exp.dates}</span>
                                </div>
                                <div className="text-xs font-bold uppercase" style={{ color: color }}>{exp.company}</div>
                                <ul className="text-[12px] space-y-1.5 text-slate-600 pl-4 border-l border-slate-200">
                                    {Array.isArray(exp.description) ? (
                                        exp.description.map((item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        ))
                                    ) : (
                                        <li>• {exp.description}</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 font-mono font-bold tracking-[0.2em] mb-6">Edu_Achievements</h2>
                    <div className="space-y-6">
                        {data.education?.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-[13px] font-bold text-slate-900">{edu.degree}</h3>
                                    <span className="text-[11px] font-bold text-slate-400">{edu.year || edu.dates}</span>
                                </div>
                                <p className="text-[12px] text-slate-500">{edu.school}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Right Sidebar */}
            <aside className="w-[70mm] bg-white text-slate-800 p-10 flex flex-col gap-10 border-l border-slate-100">
                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-2 border-b">Contact</h2>
                    <ul className="text-[11px] space-y-4">
                        {data.personal_info?.email && (
                            <li className="space-y-1">
                                <span className="text-slate-500 font-bold block text-[9px] uppercase tracking-wider">Email Address</span>
                                <span className="text-slate-800 font-medium break-all">{data.personal_info.email}</span>
                            </li>
                        )}
                        {data.personal_info?.phone && (
                            <li className="space-y-1">
                                <span className="text-slate-500 font-bold block text-[9px] uppercase tracking-wider">Contact Number</span>
                                <span className="text-slate-800 font-medium">{data.personal_info.phone}</span>
                            </li>
                        )}
                        {data.personal_info?.linkedin && (
                            <li className="space-y-1">
                                <span className="text-slate-500 font-bold block text-[9px] uppercase tracking-wider">LinkedIn Handle</span>
                                <span className="text-slate-800 font-medium break-all">{data.personal_info.linkedin}</span>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-2 border-b">Expertise</h2>
                    <div className="space-y-3">
                        {data.skills?.map((skill, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-slate-600">
                                    <span>{skill}</span>
                                </div>
                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: color }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-8 flex justify-center">
                    <div className="w-20 h-20 border-4 rounded-xl flex items-center justify-center border-slate-50 opacity-50" style={{ borderColor: color, opacity: 0.1 }}>
                        {/* Abstract Logo placeholder */}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default SidebarRightTemplate;

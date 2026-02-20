import React from "react";

const FunctionalTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl font-['Lexend',_sans-serif] p-12">
            {/* Header Area */}
            <header className="mb-10 text-center bg-slate-900 text-white p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: color }}></div>
                <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase">{data.personal_info?.name}</h1>
                <div className="flex justify-center gap-4 text-sm font-bold opacity-60">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>• {data.personal_info.phone}</span>}
                    {data.personal_info?.linkedin && <span>• {data.personal_info.linkedin}</span>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
                {/* Strengths Sidebar */}
                <div className="col-span-4 space-y-8">
                    <section>
                        <h2 className="text-sm font-black uppercase mb-4 text-slate-400">Core Strengths</h2>
                        <div className="space-y-2">
                            {data.skills?.map((skill, i) => (
                                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
                                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase mb-4 text-slate-400">Education</h2>
                        <div className="space-y-4">
                            {data.education?.map((edu, index) => (
                                <div key={index} className="pl-4 border-l-2" style={{ borderColor: color }}>
                                    <h3 className="text-xs font-black mb-1">{edu.degree}</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">{edu.school}</p>
                                    <p className="text-[10px] text-slate-400">{edu.year || edu.dates}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Main Timeline */}
                <div className="col-span-8 space-y-10">
                    <section>
                        <h2 className="text-xs font-black uppercase bg-slate-100 px-3 py-1 rounded inline-block text-slate-900 mb-4 tracking-[0.2em]" style={{ color: color }}>The Vision</h2>
                        <p className="text-sm leading-relaxed text-slate-600 font-medium">
                            {data.summary}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase bg-slate-100 px-3 py-1 rounded inline-block text-slate-900 mb-6 tracking-[0.2em]" style={{ color: color }}>Milestones</h2>
                        <div className="space-y-8">
                            {data.experience?.map((exp, index) => (
                                <div key={index} className="relative">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[15px] font-black text-slate-900">{exp.title}</h3>
                                        <span className="text-[10px] font-black text-slate-400 italic">[{exp.duration || exp.dates}]</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-500 uppercase mb-3 ">{exp.company}</div>
                                    <ul className="text-[13px] space-y-2 text-slate-600">
                                        {Array.isArray(exp.description) ? (
                                            exp.description.map((item, idx) => (
                                                <li key={idx} className="flex gap-2">
                                                    <span className="font-bold opacity-30">#</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="flex gap-2">
                                                <span className="font-bold opacity-30">#</span>
                                                <span>{exp.description}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FunctionalTemplate;

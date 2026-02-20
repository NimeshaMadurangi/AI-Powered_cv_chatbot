import React from "react";

const ElegantTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-[#fffdfa] text-slate-800 shadow-2xl font-['Lora',_serif] p-20">
            {/* Header */}
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-light mb-2 tracking-[0.1em] text-slate-900 border-b pb-4 inline-block" style={{ borderColor: color }}>
                    {data.personal_info?.name}
                </h1>
                <div className="flex justify-center gap-6 text-xs uppercase tracking-widest text-slate-500 mt-4">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>/ {data.personal_info.phone}</span>}
                    {data.personal_info?.linkedin && <span>/ {data.personal_info.linkedin}</span>}
                </div>
            </header>

            {/* Content Grid */}
            <div className="space-y-12">
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 text-center">Objective</h2>
                    <p className="text-sm leading-relaxed text-slate-600 text-center max-w-2xl mx-auto italic">
                        {data.summary}
                    </p>
                </section>

                <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 text-center">Experience</h2>
                    <div className="space-y-10">
                        {data.experience?.map((exp, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-base font-bold text-slate-900 mb-1">{exp.title}</h3>
                                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: color }}>{exp.company} — {exp.duration || exp.dates}</p>
                                <ul className="text-sm space-y-2 text-slate-600 max-w-xl mx-auto">
                                    {Array.isArray(exp.description) ? (
                                        exp.description.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))
                                    ) : (
                                        <li>{exp.description}</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-20">
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Expertise</h2>
                        <ul className="text-xs space-y-2 text-slate-600">
                            {data.skills?.map((skill, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }}></span>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 font-bold tracking-widest">Education</h2>
                        <div className="space-y-4">
                            {data.education?.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="text-[13px] font-bold text-slate-900">{edu.degree}</h3>
                                    <p className="text-[11px] text-slate-500 italic">{edu.school}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{edu.year || edu.dates}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <footer className="mt-20 pt-10 border-t border-slate-100 text-center opacity-30">
                <span className="text-[10px] tracking-[0.5em] uppercase font-bold">Curated by CVForge Premium</span>
            </footer>
        </div>
    );
};

export default ElegantTemplate;

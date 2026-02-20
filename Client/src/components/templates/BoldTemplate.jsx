import React from "react";

const BoldTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl font-['Montserrat',_sans-serif] p-0 overflow-hidden">
            {/* Top Banner */}
            <div className="h-4 w-full" style={{ backgroundColor: color }}></div>

            <div className="p-16">
                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4 text-slate-900">
                            {data.personal_info?.name}
                        </h1>
                        <p className="text-lg font-bold uppercase tracking-[0.3em]" style={{ color: color }}>
                            Dynamic Professional
                        </p>
                    </div>
                    <div className="text-right space-y-1 text-sm font-bold text-slate-500 uppercase tracking-widest">
                        {data.personal_info?.email && <p>{data.personal_info.email}</p>}
                        {data.personal_info?.phone && <p>{data.personal_info.phone}</p>}
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-12 space-y-12">
                        {/* Summary */}
                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 border-b-4 border-slate-900 pb-2 inline-block">
                                Profile
                            </h2>
                            <p className="text-base leading-relaxed text-slate-600 font-medium">
                                {data.summary}
                            </p>
                        </section>

                        {/* Experience */}
                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-8 border-b-4 border-slate-900 pb-2 inline-block">
                                Experience
                            </h2>
                            <div className="space-y-12">
                                {data.experience?.map((exp, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-6 group">
                                        <div className="col-span-3 text-sm font-black text-slate-400 uppercase tracking-widest pt-1">
                                            {exp.duration || exp.dates}
                                        </div>
                                        <div className="col-span-9">
                                            <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-rose-600 transition-colors" style={{ color: color }}>
                                                {exp.title}
                                            </h3>
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                                                {exp.company}
                                            </p>
                                            <ul className="text-sm space-y-3 text-slate-600 font-medium list-none">
                                                {Array.isArray(exp.description) ? (
                                                    exp.description.map((item, idx) => (
                                                        <li key={idx} className="relative pl-6">
                                                            <span className="absolute left-0 top-1.5 w-2.5 h-1 bg-slate-300"></span>
                                                            {item}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="relative pl-6">
                                                        <span className="absolute left-0 top-1.5 w-2.5 h-1 bg-slate-300"></span>
                                                        {exp.description}
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills & Education Grid */}
                        <div className="grid grid-cols-2 gap-16">
                            <section>
                                <h2 className="text-2xl font-black uppercase tracking-tight mb-6 border-b-4 border-slate-900 pb-2 inline-block">
                                    Expertise
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {data.skills?.map((skill, index) => (
                                        <span key={index} className="px-4 py-1 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black uppercase tracking-tight mb-6 border-b-4 border-slate-900 pb-2 inline-block">
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {data.education?.map((edu, index) => (
                                        <div key={index}>
                                            <h3 className="text-base font-black text-slate-900 mb-1">{edu.degree}</h3>
                                            <p className="text-xs font-bold text-slate-500 uppercase italic mb-1">{edu.school}</p>
                                            <p className="text-xs font-black text-slate-400">{edu.year || edu.dates}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 py-6 bg-slate-50 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
                    CVForge AI • Premium Template
                </p>
            </div>
        </div>
    );
};

export default BoldTemplate;

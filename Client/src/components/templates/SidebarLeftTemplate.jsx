import React from "react";

const SidebarLeftTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl font-['Inter',_sans-serif] p-0 flex">
            {/* Left Sidebar */}
            <aside className="w-[70mm] bg-slate-50 border-r border-slate-200 p-10 flex flex-col gap-8">
                <div className="text-center">
                    <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-slate-400">
                        {data.personal_info?.name?.charAt(0)}
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 leading-tight mb-1">{data.personal_info?.name}</h1>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Candidate</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest pb-1 border-b-2" style={{ borderColor: color, color: color }}>Details</h2>
                    <ul className="text-[11px] space-y-4">
                        {data.personal_info?.email && (
                            <li className="space-y-1">
                                <span className="text-slate-400 font-bold block uppercase tracking-tighter">Email</span>
                                <span className="text-slate-700 font-medium break-all">{data.personal_info.email}</span>
                            </li>
                        )}
                        {data.personal_info?.phone && (
                            <li className="space-y-1">
                                <span className="text-slate-400 font-bold block uppercase tracking-tighter">Phone</span>
                                <span className="text-slate-700 font-medium">{data.personal_info.phone}</span>
                            </li>
                        )}
                        {data.personal_info?.linkedin && (
                            <li className="space-y-1">
                                <span className="text-slate-400 font-bold block uppercase tracking-tighter">LinkedIn</span>
                                <span className="text-slate-700 font-medium break-all">{data.personal_info.linkedin}</span>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest pb-1 border-b-2" style={{ borderColor: color, color: color }}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills?.map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-600 rounded">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12">
                <section className="mb-10">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Background</h2>
                    <p className="text-sm leading-relaxed text-slate-600">
                        {data.summary}
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Experience</h2>
                    <div className="space-y-8">
                        {data.experience?.map((exp, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                                    <span className="text-xs font-bold text-slate-400 italic">{exp.duration || exp.dates}</span>
                                </div>
                                <div className="text-sm font-bold uppercase text-slate-500 tracking-wider">@ {exp.company}</div>
                                <ul className="text-[13px] space-y-2 text-slate-600 pl-4 border-l-2 border-slate-100">
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
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Education</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {data.education?.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                                    <span className="text-xs font-bold text-slate-400">{edu.year || edu.dates}</span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">{edu.school}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SidebarLeftTemplate;

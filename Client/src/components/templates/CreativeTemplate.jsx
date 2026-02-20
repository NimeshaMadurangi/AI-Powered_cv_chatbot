import React from "react";

const CreativeTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl font-['Outfit',_sans-serif] p-0 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-50 opacity-50 -z-0"></div>

            <div className="relative z-10 flex h-full min-h-[297mm]">
                {/* Main Side */}
                <div className="flex-1 p-16 space-y-12">
                    <header>
                        <h1 className="text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.8]">
                            {data.personal_info?.name?.split(' ')[0]}<br />
                            <span className="text-transparent border-2 border-slate-900 px-2 py-0 inline-block mt-2" style={{ WebkitTextStroke: '1px #0f172a' }}>
                                {data.personal_info?.name?.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>
                        <div className="mt-8 h-2 w-32 rounded-full" style={{ backgroundColor: color }}></div>
                    </header>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Profile</h2>
                        <p className="text-base leading-relaxed font-medium text-slate-600 italic">
                            {data.summary}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Legacy</h2>
                        <div className="space-y-12">
                            {data.experience?.map((exp, index) => (
                                <div key={index} className="group relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors uppercase tracking-tight">{exp.title}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exp.company}</p>
                                        </div>
                                        <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full uppercase italic">{exp.duration || exp.dates}</span>
                                    </div>
                                    <div className="text-[14px] font-medium text-slate-500 leading-snug space-y-2 pl-4 border-l-2 border-slate-100">
                                        {Array.isArray(exp.description) ? (
                                            exp.description.map((item, idx) => (
                                                <p key={idx}>{item}</p>
                                            ))
                                        ) : (
                                            <p>{exp.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Details Side */}
                <div className="w-[80mm] p-16 bg-slate-900 text-white flex flex-col gap-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-6">Contact</h2>
                        <div className="space-y-6 text-sm font-bold">
                            {data.personal_info?.email && (
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-slate-600">Email</p>
                                    <p className="break-all">{data.personal_info.email}</p>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase text-slate-600">Phone</p>
                                    <p>{data.personal_info.phone}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Arsenal</h2>
                        <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase">
                            {data.skills?.map((skill, i) => (
                                <span key={i} className="px-3 py-1 border border-slate-700 hover:border-slate-500 transition-colors rounded-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Learning</h2>
                        <div className="space-y-6">
                            {data.education?.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="text-sm font-black mb-1">{edu.degree}</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">{edu.school}</p>
                                    <p className="text-[10px] text-slate-600 mt-1" style={{ color: color }}>{edu.year || edu.dates}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;

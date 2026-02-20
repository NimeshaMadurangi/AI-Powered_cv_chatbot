import React from "react";

const CompactTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl font-['Segoe_UI',_sans-serif] p-10">
            {/* Header */}
            <header className="mb-6 flex justify-between items-center border-b-4 border-slate-900 pb-4">
                <div>
                    <h1 className="text-2xl font-black uppercase leading-none mb-1">{data.personal_info?.name}</h1>
                    <div className="flex gap-3 text-[10px] font-bold text-slate-500 uppercase">
                        {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                        {data.personal_info?.phone && <span>• {data.personal_info.phone}</span>}
                    </div>
                </div>
                <div className="text-[11px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100 rounded text-slate-600">
                    CV / Profile
                </div>
            </header>

            <div className="grid grid-cols-3 gap-6">
                {/* Side Content */}
                <div className="col-span-1 space-y-6 bg-slate-50 p-4 rounded-xl h-fit">
                    <section>
                        <h2 className="text-[11px] font-black uppercase text-white px-2 py-0.5 mb-3 inline-block rounded-sm" style={{ backgroundColor: color }}>Skills</h2>
                        <div className="flex flex-wrap gap-1">
                            {data.skills?.map((skill, i) => (
                                <span key={i} className="text-[10px] font-semibold text-slate-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-[11px] font-black uppercase text-white px-2 py-0.5 mb-3 inline-block rounded-sm" style={{ backgroundColor: color }}>Academic</h2>
                        <div className="space-y-3">
                            {data.education?.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="text-[10px] font-bold leading-tight">{edu.degree}</h3>
                                    <p className="text-[9px] text-slate-500">{edu.school} • {edu.year || edu.dates}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Main Content */}
                <div className="col-span-2 space-y-6">
                    <section>
                        <h2 className="text-[11px] font-black uppercase mb-2 border-b-2 border-slate-100 pb-1" style={{ color: color }}>Profile Overview</h2>
                        <p className="text-[11px] leading-snug text-slate-600 italic">
                            {data.summary}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[11px] font-black uppercase mb-4 border-b-2 border-slate-100 pb-1" style={{ color: color }}>Experience</h2>
                        <div className="space-y-4">
                            {data.experience?.map((exp, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-[12px] font-bold">{exp.title}</h3>
                                        <span className="text-[9px] font-black text-slate-400">{exp.duration || exp.dates}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase">{exp.company}</p>
                                    <ul className="text-[10px] space-y-1 text-slate-600 pl-3 border-l px-2 mt-1">
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
                </div>
            </div>
        </div>
    );
};

export default CompactTemplate;

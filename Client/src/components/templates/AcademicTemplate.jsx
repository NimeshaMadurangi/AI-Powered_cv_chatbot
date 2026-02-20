import React from "react";

const AcademicTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl font-['Georgia',_serif] p-[30mm]">
            {/* Minimalist Academic Header */}
            <header className="mb-12 text-center border-b border-slate-200 pb-10">
                <h1 className="text-4xl font-light italic mb-4 tracking-tight">{data.personal_info?.name}</h1>
                <div className="text-xs space-y-1 font-serif text-slate-500 italic">
                    {data.personal_info?.email && <p>{data.personal_info.email}</p>}
                    {data.personal_info?.phone && <p>{data.personal_info.phone}</p>}
                    {data.personal_info?.linkedin && <p>{data.personal_info.linkedin}</p>}
                </div>
            </header>

            <div className="space-y-12">
                {/* Education (Prioritized in Academic) */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex justify-center items-center gap-4">
                        <span className="flex-1 h-px bg-slate-100"></span>
                        Academic Background
                        <span className="flex-1 h-px bg-slate-100"></span>
                    </h2>
                    <div className="space-y-6">
                        {data.education?.map((edu, index) => (
                            <div key={index} className="text-center italic">
                                <h3 className="text-base font-bold text-slate-800 underline decoration-slate-200 underline-offset-4 mb-1">{edu.degree}</h3>
                                <p className="text-sm text-slate-600">{edu.school}, {edu.year || edu.dates}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Professional History */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-10 flex justify-center items-center gap-4">
                        <span className="flex-1 h-px bg-slate-100"></span>
                        Experience
                        <span className="flex-1 h-px bg-slate-100"></span>
                    </h2>
                    <div className="space-y-12">
                        {data.experience?.map((exp, index) => (
                            <div key={index} className="space-y-3">
                                <div className="flex justify-between items-baseline border-b border-slate-50 pb-1">
                                    <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                                    <span className="text-xs italic text-slate-500">{exp.duration || exp.dates}</span>
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{exp.company}</div>
                                <div className="text-sm space-y-2 text-slate-600 leading-relaxed text-justify px-4">
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

                {/* Skills/Publications Area */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex justify-center items-center gap-4">
                        <span className="flex-1 h-px bg-slate-100"></span>
                        Subject Expertise
                        <span className="flex-1 h-px bg-slate-100"></span>
                    </h2>
                    <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center italic text-sm text-slate-700">
                        {data.skills?.map((skill, i) => (
                            <span key={i}>{skill}</span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AcademicTemplate;

import React from "react";

const ProfessionalTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl font-['Times_New_Roman'] p-16">
            {/* Header */}
            <header className="mb-8 border-b-2 pb-6 text-center" style={{ borderColor: color }}>
                <h1 className="text-4xl font-bold text-slate-900 mb-2 uppercase tracking-tight">
                    {data.personal_info?.name}
                </h1>
                <div className="flex justify-center gap-4 text-sm text-slate-600 italic">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>• {data.personal_info.phone}</span>}
                    {data.personal_info?.linkedin && <span>• {data.personal_info.linkedin}</span>}
                </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
                <h2 className="text-lg font-bold uppercase mb-3 border-l-4 pl-3" style={{ borderLeftColor: color, color: color }}>
                    Professional Summary
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                    {data.summary}
                </p>
            </section>

            {/* Experience */}
            <section className="mb-8">
                <h2 className="text-lg font-bold uppercase mb-4 border-l-4 pl-3" style={{ borderLeftColor: color, color: color }}>
                    Work Experience
                </h2>
                <div className="space-y-6">
                    {data.experience?.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-base font-bold text-slate-900">{exp.company}</h3>
                                <span className="text-sm font-semibold text-slate-600">{exp.duration || exp.dates}</span>
                            </div>
                            <p className="text-sm italic text-slate-700 mb-2">{exp.title}</p>
                            <ul className="text-sm space-y-1 text-slate-600 pl-4 border-l border-slate-200">
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

            {/* Skills */}
            <section className="mb-8">
                <h2 className="text-lg font-bold uppercase mb-3 border-l-4 pl-3" style={{ borderLeftColor: color, color: color }}>
                    Core Competencies
                </h2>
                <div className="flex flex-wrap gap-2">
                    {data.skills?.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-sm border border-slate-200">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section>
                <h2 className="text-lg font-bold uppercase mb-4 border-l-4 pl-3" style={{ borderLeftColor: color, color: color }}>
                    Education
                </h2>
                <div className="space-y-4">
                    {data.education?.map((edu, index) => (
                        <div key={index} className="flex justify-between items-baseline">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                                <p className="text-sm text-slate-600">{edu.school}</p>
                            </div>
                            <span className="text-sm text-slate-600 font-semibold">{edu.year || edu.dates}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProfessionalTemplate;

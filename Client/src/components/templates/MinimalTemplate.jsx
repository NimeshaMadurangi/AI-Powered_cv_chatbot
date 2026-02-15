import React from "react";

const MinimalTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl font-['Inter'] relative">
            <div className="p-16">
                {/* Minimal Header - Name on left, contact on right */}
                <div className="flex justify-between items-start mb-12 pb-6 border-b border-slate-200">
                    <h1 className="text-5xl font-light tracking-tight" style={{ color }}>
                        {data.personal_info?.name}
                    </h1>
                    <div className="text-right text-xs text-slate-600 space-y-1">
                        <div>{data.personal_info?.email}</div>
                        <div>{data.personal_info?.phone}</div>
                    </div>
                </div>

                {/* Summary - Clean, no headers */}
                <section className="mb-10">
                    <p className="text-sm text-slate-700 leading-relaxed">
                        {data.summary}
                    </p>
                </section>

                {/* Experience - Minimalist style */}
                <section className="mb-10">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Experience</h2>
                    <div className="space-y-8">
                        {data.experience?.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-base">{exp.title}</h3>
                                    <span className="text-xs text-slate-400">{exp.duration || exp.dates}</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-3">{exp.company}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {Array.isArray(exp.description) ? (
                                        <ul className="list-none space-y-1">
                                            {exp.description.map((item, idx) => (
                                                <li key={idx} className="pl-4 relative before:content-['–'] before:absolute before:left-0">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Two-column bottom section */}
                <div className="grid grid-cols-2 gap-12">
                    {/* Education */}
                    <section>
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Education</h2>
                        <div className="space-y-4">
                            {data.education?.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                                    <p className="text-xs text-slate-500">{edu.school}</p>
                                    <span className="text-xs text-slate-400">{edu.year || edu.dates}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Skills</h2>
                        <div className="text-sm text-slate-600 leading-relaxed">
                            {data.skills?.join(', ')}
                        </div>
                    </section>
                </div>

                {/* Subtle accent line at bottom */}
                <div className="mt-12 pt-6 border-t border-slate-100"></div>
            </div>
        </div>
    );
};

export default MinimalTemplate;

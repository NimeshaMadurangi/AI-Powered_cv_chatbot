import React from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const ModernTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl font-['Inter'] relative">
            {/* Decorative Top Bar */}
            <div className="h-4 w-full" style={{ backgroundColor: color }}></div>

            <div className="p-12">
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-2" style={{ color }}>
                            {data.personal_info?.name}
                        </h1>
                        <p className="text-lg text-slate-500 font-medium">Professional Profile</p>
                    </div>

                    {/* Contact Info */}
                    <div className="text-right text-sm space-y-1 text-slate-600">
                        <div className="flex items-center justify-end gap-2">
                            <span>{data.personal_info?.email}</span>
                            <FaEnvelope className="text-slate-400" />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <span>{data.personal_info?.phone}</span>
                            <FaPhone className="text-slate-400" />
                        </div>
                        {data.personal_info?.linkedin && (
                            <div className="flex items-center justify-end gap-2">
                                <span>{data.personal_info?.linkedin}</span>
                                <FaLinkedin className="text-slate-400" />
                            </div>
                        )}
                        {data.personal_info?.github && (
                            <div className="flex items-center justify-end gap-2">
                                <span>{data.personal_info?.github}</span>
                                <FaGithub className="text-slate-400" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="col-span-2 space-y-8">
                        {/* Summary */}
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color }}>
                                <span className="w-8 h-[2px] bg-current opacity-50"></span>
                                Professional Summary
                            </h2>
                            <p className="text-sm text-slate-700 leading-relaxed text-justify">{data.summary}</p>
                        </section>

                        {/* Experience */}
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color }}>
                                <span className="w-8 h-[2px] bg-current opacity-50"></span>
                                Work Experience
                            </h2>
                            <div className="space-y-6">
                                {data.experience?.map((exp, index) => (
                                    <div key={index} className="relative pl-4 border-l-2 border-slate-100">
                                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                        <h3 className="font-bold text-slate-900">{exp.title}</h3>
                                        <div className="flex justify-between items-center text-xs text-slate-500 mb-2 font-medium">
                                            <span>{exp.company}</span>
                                            <span className="bg-slate-50 px-2 py-0.5 rounded text-slate-600">{exp.duration || exp.dates}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                                            {Array.isArray(exp.description) ? exp.description.join('\n') : exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-1 space-y-8">
                        {/* Education */}
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 border-slate-100 pb-1" style={{ color }}>
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education?.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                                        <p className="text-xs text-slate-500 mb-1">{edu.school}</p>
                                        <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1 py-0.5 rounded inline-block">
                                            {edu.year || edu.dates}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 border-slate-100 pb-1" style={{ color }}>
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills?.map((skill, index) => (
                                    <span key={index} className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Footer Accent */}
            <div className="absolute bottom-0 left-0 w-full h-2" style={{ backgroundColor: color }}></div>
        </div>
    );
};

export default ModernTemplate;

import React from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const ModernTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl font-['Arial'] relative p-12">
            {/* Header - Name and Title */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">
                    {data.personal_info?.name}
                </h1>
                <p className="text-sm uppercase tracking-wider text-slate-600">
                    Professional Profile
                </p>
            </div>

            {/* Contact Info - Single Line */}
            <div className="text-center text-xs text-slate-700 mb-6 pb-4 border-b border-slate-300">
                <div className="flex justify-center gap-4 flex-wrap">
                    {data.personal_info?.email && (
                        <span>{data.personal_info.email}</span>
                    )}
                    {data.personal_info?.phone && (
                        <span>| {data.personal_info.phone}</span>
                    )}
                    {data.personal_info?.linkedin && (
                        <span>| {data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.github && (
                        <span>| {data.personal_info.github}</span>
                    )}
                </div>
            </div>

            {/* Summary */}
            <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-900 pb-1">
                    Summary
                </h2>
                <p className="text-xs leading-relaxed text-justify">
                    {data.summary}
                </p>
            </section>

            {/* Skills - Two Columns */}
            <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-900 pb-1">
                    Skills
                </h2>
                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <h3 className="text-xs font-bold mb-2">Professional Skills</h3>
                        <ul className="text-xs space-y-1">
                            {data.skills?.slice(0, Math.ceil(data.skills.length / 2)).map((skill, index) => (
                                <li key={index}>• {skill}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold mb-2">Technical Skills</h3>
                        <ul className="text-xs space-y-1">
                            {data.skills?.slice(Math.ceil(data.skills.length / 2)).map((skill, index) => (
                                <li key={index}>• {skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-900 pb-1">
                    Professional Experience
                </h2>
                <div className="space-y-4">
                    {data.experience?.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-xs font-bold">{exp.title}</h3>
                                <span className="text-xs text-slate-600">{exp.duration || exp.dates}</span>
                            </div>
                            <p className="text-xs mb-2">{exp.company}</p>
                            <div className="text-xs leading-relaxed">
                                {Array.isArray(exp.description) ? (
                                    <ul className="space-y-1">
                                        {exp.description.map((item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>• {exp.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects (if available) */}
            {data.projects && data.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-900 pb-1">
                        Projects
                    </h2>
                    <div className="space-y-3">
                        {data.projects.map((proj, index) => (
                            <div key={index}>
                                <h3 className="text-xs font-bold mb-1">{proj.name}</h3>
                                <p className="text-xs leading-relaxed">• {proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-900 pb-1">
                    Education
                </h2>
                <div className="space-y-3">
                    {data.education?.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="text-xs font-bold">{edu.degree}</h3>
                                    <p className="text-xs">{edu.school}</p>
                                </div>
                                <span className="text-xs text-slate-600">{edu.year || edu.dates}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Additional Information (Languages, Certifications) */}
            {(data.languages || data.certifications) && (
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-900 pb-1">
                        Additional Information
                    </h2>
                    {data.languages && (
                        <div className="mb-2">
                            <span className="text-xs font-bold">Languages: </span>
                            <span className="text-xs">{data.languages.join(', ')}</span>
                        </div>
                    )}
                    {data.certifications && (
                        <div>
                            <span className="text-xs font-bold">Certifications: </span>
                            <span className="text-xs">{data.certifications.join(', ')}</span>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default ModernTemplate;

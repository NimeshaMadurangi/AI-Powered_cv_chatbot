import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ClassicTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl font-['Georgia'] relative">
            <div className="p-16">
                {/* Header - Centered Traditional Style */}
                <div className="text-center border-b-4 pb-6 mb-10" style={{ borderColor: color }}>
                    <h1 className="text-5xl font-serif font-bold mb-3" style={{ color }}>
                        {data.personal_info?.name}
                    </h1>
                    <div className="flex justify-center gap-6 text-sm text-slate-600">
                        <span className="flex items-center gap-2">
                            <FaEnvelope /> {data.personal_info?.email}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaPhone /> {data.personal_info?.phone}
                        </span>
                    </div>
                </div>

                {/* Professional Summary */}
                <section className="mb-10">
                    <h2 className="text-xl font-serif font-bold mb-4 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
                        Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed text-justify text-slate-700">
                        {data.summary}
                    </p>
                </section>

                {/* Experience */}
                <section className="mb-10">
                    <h2 className="text-xl font-serif font-bold mb-4 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
                        Professional Experience
                    </h2>
                    <div className="space-y-6">
                        {data.experience?.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-bold text-lg">{exp.title}</h3>
                                    <span className="text-sm text-slate-500 italic">{exp.duration || exp.dates}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-600 mb-2">{exp.company}</p>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {Array.isArray(exp.description) ? exp.description.join(' • ') : exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="mb-10">
                    <h2 className="text-xl font-serif font-bold mb-4 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
                        Education
                    </h2>
                    <div className="space-y-4">
                        {data.education?.map((edu, index) => (
                            <div key={index} className="flex justify-between">
                                <div>
                                    <h3 className="font-bold">{edu.degree}</h3>
                                    <p className="text-sm text-slate-600">{edu.school}</p>
                                </div>
                                <span className="text-sm text-slate-500 italic">{edu.year || edu.dates}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <h2 className="text-xl font-serif font-bold mb-4 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
                        Skills & Expertise
                    </h2>
                    <div className="text-sm text-slate-700 leading-relaxed">
                        {data.skills?.join(' • ')}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClassicTemplate;

import React from "react";

const SimpleTemplate = ({ data, color }) => {
    if (!data) return null;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl font-['Arial',_sans-serif] p-[20mm]">
            {/* Header */}
            <header className="mb-8 border-b border-black pb-4">
                <h1 className="text-3xl font-bold mb-2 uppercase">{data.personal_info?.name}</h1>
                <div className="flex flex-wrap gap-x-4 text-sm font-medium">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>• {data.personal_info.phone}</span>}
                    {data.personal_info?.linkedin && <span>• {data.personal_info.linkedin}</span>}
                </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase mb-2" style={{ color: color }}>Goal</h2>
                <p className="text-sm leading-normal">
                    {data.summary}
                </p>
            </section>

            {/* Experience */}
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase mb-4" style={{ color: color }}>Experience</h2>
                <div className="space-y-6">
                    {data.experience?.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between font-bold text-sm mb-1">
                                <span>{exp.title}</span>
                                <span>{exp.duration || exp.dates}</span>
                            </div>
                            <div className="text-sm font-bold mb-2">{exp.company}</div>
                            <ul className="text-sm space-y-1 pl-4">
                                {Array.isArray(exp.description) ? (
                                    exp.description.map((item, idx) => (
                                        <li key={idx}>- {item}</li>
                                    ))
                                ) : (
                                    <li>- {exp.description}</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase mb-2" style={{ color: color }}>Skills</h2>
                <p className="text-sm leading-relaxed">
                    <strong>Technical:</strong> {data.skills?.join(", ")}
                </p>
            </section>

            {/* Education */}
            <section>
                <h2 className="text-sm font-bold uppercase mb-4" style={{ color: color }}>Education</h2>
                <div className="space-y-4">
                    {data.education?.map((edu, index) => (
                        <div key={index} className="flex justify-between items-baseline text-sm">
                            <div>
                                <span className="font-bold">{edu.degree}</span>, {edu.school}
                            </div>
                            <span className="font-bold">{edu.year || edu.dates}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SimpleTemplate;

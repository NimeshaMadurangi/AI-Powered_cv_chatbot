import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const EditableCV = ({ data, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);

    const handleSave = () => {
        onUpdate(editedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedData(data);
        setIsEditing(false);
    };

    const updateField = (section, field, value) => {
        setEditedData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const updateArrayField = (section, index, field, value) => {
        setEditedData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addExperience = () => {
        setEditedData(prev => ({
            ...prev,
            experience: [...(prev.experience || []), { title: "", company: "", duration: "", description: "" }]
        }));
    };

    const removeExperience = (index) => {
        setEditedData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    const addEducation = () => {
        setEditedData(prev => ({
            ...prev,
            education: [...(prev.education || []), { degree: "", school: "", year: "" }]
        }));
    };

    const removeEducation = (index) => {
        setEditedData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const updateSkills = (value) => {
        const skillsArray = value.split(',').map(s => s.trim()).filter(s => s);
        setEditedData(prev => ({ ...prev, skills: skillsArray }));
    };

    if (!isEditing) {
        return (
            <div className="mb-4">
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <FaEdit /> Edit CV
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Edit CV Content</h3>
                <div className="flex gap-2">
                    <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <FaSave /> Save
                    </button>
                    <button onClick={handleCancel} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <FaTimes /> Cancel
                    </button>
                </div>
            </div>

            <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                {/* Personal Info */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-rose-300 uppercase">Personal Information</h4>
                    <input
                        type="text"
                        value={editedData.personal_info?.name || ""}
                        onChange={(e) => updateField('personal_info', 'name', e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                    />
                    <input
                        type="email"
                        value={editedData.personal_info?.email || ""}
                        onChange={(e) => updateField('personal_info', 'email', e.target.value)}
                        placeholder="Email"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                    />
                    <input
                        type="text"
                        value={editedData.personal_info?.phone || ""}
                        onChange={(e) => updateField('personal_info', 'phone', e.target.value)}
                        placeholder="Phone"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                    />
                    <input
                        type="text"
                        value={editedData.personal_info?.linkedin || ""}
                        onChange={(e) => updateField('personal_info', 'linkedin', e.target.value)}
                        placeholder="LinkedIn URL"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                    />
                    <input
                        type="text"
                        value={editedData.personal_info?.github || ""}
                        onChange={(e) => updateField('personal_info', 'github', e.target.value)}
                        placeholder="GitHub URL"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                    />
                </div>

                {/* Summary */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-rose-300 uppercase">Professional Summary</h4>
                    <textarea
                        value={editedData.summary || ""}
                        onChange={(e) => setEditedData(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Professional summary..."
                        rows={4}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                    />
                </div>

                {/* Skills */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-rose-300 uppercase">Skills</h4>
                    <input
                        type="text"
                        value={editedData.skills?.join(', ') || ""}
                        onChange={(e) => updateSkills(e.target.value)}
                        placeholder="Skill 1, Skill 2, Skill 3..."
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
                    />
                    <p className="text-xs text-slate-400">Separate skills with commas</p>
                </div>

                {/* Experience */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-rose-300 uppercase">Experience</h4>
                        <button onClick={addExperience} className="text-xs bg-rose-600 hover:bg-rose-700 px-3 py-1 rounded">+ Add</button>
                    </div>
                    {editedData.experience?.map((exp, index) => (
                        <div key={index} className="bg-slate-700/30 p-4 rounded-lg space-y-2 border border-slate-600">
                            <div className="flex justify-between">
                                <span className="text-xs text-slate-400">Experience {index + 1}</span>
                                <button onClick={() => removeExperience(index)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                            </div>
                            <input
                                type="text"
                                value={exp.title || ""}
                                onChange={(e) => updateArrayField('experience', index, 'title', e.target.value)}
                                placeholder="Job Title"
                                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                            />
                            <input
                                type="text"
                                value={exp.company || ""}
                                onChange={(e) => updateArrayField('experience', index, 'company', e.target.value)}
                                placeholder="Company"
                                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                            />
                            <input
                                type="text"
                                value={exp.duration || ""}
                                onChange={(e) => updateArrayField('experience', index, 'duration', e.target.value)}
                                placeholder="Duration (e.g., Jan 2020 - Present)"
                                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                            />
                            <textarea
                                value={Array.isArray(exp.description) ? exp.description.join('\n') : exp.description || ""}
                                onChange={(e) => updateArrayField('experience', index, 'description', e.target.value.split('\n'))}
                                placeholder="Job description (one point per line)"
                                rows={3}
                                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                            />
                        </div>
                    ))}
                </div>

                {/* Education */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-rose-300 uppercase">Education</h4>
                        <button onClick={addEducation} className="text-xs bg-rose-600 hover:bg-rose-700 px-3 py-1 rounded">+ Add</button>
                    </div>
                    {editedData.education?.map((edu, index) => (
                        <div key={index} className="bg-slate-700/30 p-4 rounded-lg space-y-2 border border-slate-600">
                            <div className="flex justify-between">
                                <span className="text-xs text-slate-400">Education {index + 1}</span>
                                <button onClick={() => removeEducation(index)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                            </div>
                            <input
                                type="text"
                                value={edu.degree || ""}
                                onChange={(e) => updateArrayField('education', index, 'degree', e.target.value)}
                                placeholder="Degree"
                                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                            />
                            <input
                                type="text"
                                value={edu.school || ""}
                                onChange={(e) => updateArrayField('education', index, 'school', e.target.value)}
                                placeholder="School/University"
                                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                            />
                            <input
                                type="text"
                                value={edu.year || ""}
                                onChange={(e) => updateArrayField('education', index, 'year', e.target.value)}
                                placeholder="Year (e.g., 2018-2022)"
                                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EditableCV;

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

const ResumePreview = ({ data, color, template }) => {
    const resumeRef = useRef();

    const handleDownload = async () => {
        const element = resumeRef.current;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("tailored_cv.pdf");
    };

    if (!data) return null;

    const templates = {
        modern: ModernTemplate,
        classic: ClassicTemplate,
        minimal: MinimalTemplate
    };

    const SelectedTemplate = templates[template] || ModernTemplate;

    return (
        <div className="flex flex-col items-center">
            {/* Toolbar */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={handleDownload}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-full flex items-center shadow-lg transition-all transform hover:scale-105"
                >
                    <FaDownload className="mr-2" /> Download PDF
                </button>
            </div>

            <div ref={resumeRef}>
                <SelectedTemplate data={data} color={color} />
            </div>
        </div>
    );
};

export default ResumePreview;

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload, FaSpinner } from "react-icons/fa";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import TechTemplate from "./templates/TechTemplate";
import SimpleTemplate from "./templates/SimpleTemplate";
import SidebarLeftTemplate from "./templates/SidebarLeftTemplate";
import SidebarRightTemplate from "./templates/SidebarRightTemplate";
import BoldTemplate from "./templates/BoldTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import CompactTemplate from "./templates/CompactTemplate";
import FunctionalTemplate from "./templates/FunctionalTemplate";
import AcademicTemplate from "./templates/AcademicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

const ResumePreview = ({ data, color, template }) => {
    const resumeRef = useRef();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        const element = resumeRef.current;
        if (!element || isDownloading) return;

        try {
            setIsDownloading(true);
            // Wait for any final rendering/fonts
            await new Promise(resolve => setTimeout(resolve, 800));

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: true,
                backgroundColor: "#ffffff",
                scrollX: 0,
                scrollY: 0,
                windowWidth: 1000, // Fixed width for consistent rendering
                onclone: (document) => {
                    // Ensure the cloned element is visible and has enough time to render
                    const clonedElement = document.getElementById('resume-to-capture');
                    if (clonedElement) {
                        clonedElement.style.transform = 'none';
                        clonedElement.style.margin = '0';
                        clonedElement.style.padding = '40px';
                    }
                }
            });

            const imgData = canvas.toDataURL("image/png", 1.0);
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight, undefined, 'FAST');
            pdf.save(`${data.personal_info?.name?.replace(/\s+/g, '_') || 'tailored'}_cv.pdf`);
        } catch (error) {
            console.error("PDF Generation Error Details:", error);
            alert(`Could not generate PDF: ${error.message || 'Unknown error'}. Please check if the CV preview is visible.`);
        } finally {
            setIsDownloading(false);
        }
    };

    if (!data) return null;

    const templates = {
        modern: ModernTemplate,
        classic: ClassicTemplate,
        minimal: MinimalTemplate,
        professional: ProfessionalTemplate,
        executive: ExecutiveTemplate,
        tech: TechTemplate,
        simple: SimpleTemplate,
        sidebarLeft: SidebarLeftTemplate,
        sidebarRight: SidebarRightTemplate,
        bold: BoldTemplate,
        elegant: ElegantTemplate,
        compact: CompactTemplate,
        functional: FunctionalTemplate,
        academic: AcademicTemplate,
        creative: CreativeTemplate
    };

    const SelectedTemplate = templates[template] || ModernTemplate;

    return (
        <div className="flex flex-col items-center">
            {/* Toolbar */}
            <div className="flex gap-4 mb-6 sticky top-20 z-20">
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`${isDownloading ? 'bg-rose-800' : 'bg-rose-600 hover:bg-rose-700'} text-white px-8 py-3 rounded-full flex items-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {isDownloading ? (
                        <>
                            <FaSpinner className="mr-2 animate-spin" /> Generating PDF...
                        </>
                    ) : (
                        <>
                            <FaDownload className="mr-2" /> Download PDF
                        </>
                    )}
                </button>
            </div>

            {/* Preview Container with Scaling for UI */}
            <div className="w-full flex justify-center overflow-hidden">
                <div className="transform scale-[0.55] md:scale-[0.75] lg:scale-100 origin-top transition-transform duration-300">
                    <div
                        ref={resumeRef}
                        id="resume-to-capture"
                        className="shadow-[0_0_60px_rgba(0,0,0,0.5)] bg-white rounded-sm overflow-hidden"
                        style={{ width: '210mm' }}
                    >
                        <SelectedTemplate data={data} color={color} />
                    </div>
                </div>
            </div>

            {/* Pad the bottom because of the origin-top scaling */}
            <div className="h-[200px] md:h-[100px] lg:hidden"></div>
        </div>
    );
};

export default ResumePreview;

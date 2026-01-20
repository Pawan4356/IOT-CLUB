import React from 'react';

function ReportsSection({ reports }) {
  const workshopReports = reports.filter(r => r.category === 'Workshop');
  const projectReports = reports.filter(r => r.category === 'Project');

  const handleDownload = (report) => {
    const link = document.createElement('a');
    link.href = report.file;
    link.download = `${report.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-24 mt-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#221F3B] mb-6">Reports</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access workshop and project reports documenting our activities
        </p>
      </div>

      {/* Workshop Reports */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-[#221F3B] mb-8 text-center">Workshop Reports</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-200"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium mb-3">
                  {report.category}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h4>
                {report.date && (
                  <p className="text-sm text-gray-600 mb-4">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {report.date}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDownload(report)}
                className="w-full px-6 py-3 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Project Reports */}
      <div>
        <h3 className="text-3xl font-bold text-[#221F3B] mb-8 text-center">Project Reports</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-200"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium mb-3">
                  {report.category}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h4>
                {report.date && (
                  <p className="text-sm text-gray-600 mb-4">{report.date}</p>
                )}
              </div>
              <button
                onClick={() => handleDownload(report)}
                className="w-full px-6 py-3 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReportsSection;

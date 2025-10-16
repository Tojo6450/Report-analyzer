import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ReportPage from './pages/Report';
import NotFoundPage from './helper/Notfoundpage';

function App() {
  return (
    <Router>
      <main className="min-h-screen font-sans bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8">
          <header className="text-center mb-8 md:mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-3">
              CreditSea Report Analyzer
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto px-4">
              Upload your Experian XML file to generate a comprehensive credit report with detailed insights.
            </p>
          </header>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 max-w-5xl mx-auto backdrop-blur-sm bg-opacity-95 border border-gray-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reports/:id" element={<ReportPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

      
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
        </div>

    
        <footer className="text-center py-8 mt-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
            <p className="text-sm md:text-base text-gray-500 font-medium">
              &copy; {new Date().getFullYear()} CreditSea Full-Stack Assignment. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Secure • Fast • Reliable
            </p>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </Router>
  );
}

export default App;
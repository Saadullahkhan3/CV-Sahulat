"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Briefcase, Zap, CheckCircle, AlertCircle, Loader2, X, Type, File } from 'lucide-react';

export default function AnalysisSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  // CV Input States
  const [cvInputType, setCvInputType] = useState<'file' | 'text'>('file');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState('');
  
  // Job Description Input States
  const [jobInputType, setJobInputType] = useState<'file' | 'text'>('text');
  const [jobFile, setJobFile] = useState<File | null>(null);
  const [jobText, setJobText] = useState('');
  
  const [analysisResult, setAnalysisResult] = useState('');
  const [analysisOutput, setAnalysisOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [cvDragOver, setCvDragOver] = useState(false);
  const [jobDragOver, setJobDragOver] = useState(false);
  
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const jobFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('analysis');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleFileUpload = (file: File, type: 'cv' | 'job') => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'text/plain'];
    
    if (!allowedTypes.includes(file.type)) {
      setStatus('error');
      setStatusMessage('Please upload a PDF, image file (JPG, PNG, GIF), or text file');
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 3000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setStatus('error');
      setStatusMessage('File size must be less than 10MB');
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 3000);
      return;
    }

    if (type === 'cv') {
      setCvFile(file);
    } else {
      setJobFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'cv' | 'job') => {
    e.preventDefault();
    if (type === 'cv') {
      setCvDragOver(false);
    } else {
      setJobDragOver(false);
    }
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], type);
    }
  };

  const handleDragOver = (e: React.DragEvent, type: 'cv' | 'job') => {
    e.preventDefault();
    if (type === 'cv') {
      setCvDragOver(true);
    } else {
      setJobDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent, type: 'cv' | 'job') => {
    e.preventDefault();
    if (type === 'cv') {
      setCvDragOver(false);
    } else {
      setJobDragOver(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'job') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0], type);
    }
  };

  const removeFile = (type: 'cv' | 'job') => {
    if (type === 'cv') {
      setCvFile(null);
      if (cvFileInputRef.current) {
        cvFileInputRef.current.value = '';
      }
    } else {
      setJobFile(null);
      if (jobFileInputRef.current) {
        jobFileInputRef.current.value = '';
      }
    }
  };

  const switchInputType = (type: 'cv' | 'job', inputType: 'file' | 'text') => {
    if (type === 'cv') {
      setCvInputType(inputType);
      if (inputType === 'text') {
        setCvFile(null);
        if (cvFileInputRef.current) {
          cvFileInputRef.current.value = '';
        }
      } else {
        setCvText('');
      }
    } else {
      setJobInputType(inputType);
      if (inputType === 'text') {
        setJobFile(null);
        if (jobFileInputRef.current) {
          jobFileInputRef.current.value = '';
        }
      } else {
        setJobText('');
      }
    }
  };

  const handleAnalysis = async () => {
    const hasCvInput = cvInputType === 'file' ? cvFile : cvText.trim();
    const hasJobInput = jobInputType === 'file' ? jobFile : jobText.trim();

    if (!hasCvInput || !hasJobInput) {
      setStatus('error');
      setStatusMessage('Please provide both CV/Resume and job description');
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 3000);
      return;
    }

    setStatus('loading');
    setAnalysisResult('');

    try {
      const formData = new FormData();
      
      // Add CV data
      if (cvInputType === 'file' && cvFile) {
        formData.append('cv_file', cvFile);
      } else if (cvInputType === 'text' && cvText.trim()) {
        formData.append('cv_text', cvText);
      }

      // Add job description data
      if (jobInputType === 'file' && jobFile) {
        formData.append('job_desc_file', jobFile);
      } else if (jobInputType === 'text' && jobText.trim()) {
        formData.append('job_desc_text', jobText);
      }

      // Use our API route instead of direct external API call
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setStatus('success');
      setStatusMessage(result.message || 'Analysis completed successfully!');
      
      // Extract analyzed_text for the output box
      const analyzedText = result.analysis?.analyzed_text || result.analyzed_text || 'Analysis completed successfully!';
      setAnalysisOutput(analyzedText);
      
      // Keep full result for debugging (optional)
      setAnalysisResult(JSON.stringify(result.analysis, null, 2));
      
    } catch (error) {
      console.error('Analysis error:', error);
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Failed to analyze CV and Job Description. Please try again.');
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setStatusMessage('');
    }, 5000);
  };


  const renderInputToggle = (type: 'cv' | 'job') => {
    const currentType = type === 'cv' ? cvInputType : jobInputType;
    const setType = type === 'cv' ? setCvInputType : setJobInputType;
    
    return (
      <div className="flex bg-white/5 rounded-lg p-1 mb-4">
        <button
          type="button"
          onClick={() => switchInputType(type, 'file')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all ${
            currentType === 'file'
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <File className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Upload File</span>
          <span className="sm:hidden">File</span>
        </button>
        <button
          type="button"
          onClick={() => switchInputType(type, 'text')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all ${
            currentType === 'text'
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Type className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Type Text</span>
          <span className="sm:hidden">Text</span>
        </button>
      </div>
    );
  };

  const renderFileUpload = (type: 'cv' | 'job') => {
    const file = type === 'cv' ? cvFile : jobFile;
    const dragOver = type === 'cv' ? cvDragOver : jobDragOver;
    const fileInputRef = type === 'cv' ? cvFileInputRef : jobFileInputRef;
    
    return (
      <div
        className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
          dragOver 
            ? 'border-cyan-400 bg-cyan-400/10' 
            : file 
              ? 'border-green-400 bg-green-400/10' 
              : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
        }`}
        onDrop={(e) => handleDrop(e, type)}
        onDragOver={(e) => handleDragOver(e, type)}
        onDragLeave={(e) => handleDragLeave(e, type)}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.gif,.txt"
          onChange={(e) => handleFileInputChange(e, type)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {file ? (
          <div className="text-center">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-white font-medium mb-2 text-sm sm:text-base break-all">{file.name}</p>
            <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeFile(type)}
              className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs sm:text-sm"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-white font-medium mb-2 text-sm sm:text-base">
              Drop your {type === 'cv' ? 'CV/Resume' : 'job description'} here or click to browse
            </p>
            <p className="text-slate-400 text-xs sm:text-sm">
              Supports PDF, JPG, PNG, GIF, TXT (max 10MB)
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTextInput = (type: 'cv' | 'job') => {
    const text = type === 'cv' ? cvText : jobText;
    const setText = type === 'cv' ? setCvText : setJobText;
    const placeholder = type === 'cv' 
      ? `Paste your CV/Resume content here...

Include:
• Personal information and contact details
• Work experience and achievements
• Education and certifications
• Skills and competencies
• Any other relevant information`
      : `Paste the job description here...

Include:
• Required skills and qualifications
• Job responsibilities
• Experience requirements
• Any specific technologies or tools mentioned`;

    return (
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl resize-none text-sm sm:text-base"
        placeholder={placeholder}
      />
    );
  };

  return (
    <section id="analysis" className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            CV <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Analysis</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4">
            Upload your CV and job description to get intelligent insights and recommendations
          </p>
        </div>

        {/* Analysis Form */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 shadow-2xl">
            
            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6 sm:mb-8">
              
              {/* CV Input Section */}
              <div className="space-y-4">
                <Label className="text-white font-medium flex items-center gap-2 text-sm sm:text-base">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  CV/Resume
                </Label>
                
                {renderInputToggle('cv')}
                
                {cvInputType === 'file' ? renderFileUpload('cv') : renderTextInput('cv')}
              </div>

              {/* Job Description Section */}
              <div className="space-y-4">
                <Label className="text-white font-medium flex items-center gap-2 text-sm sm:text-base">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  Job Description
                </Label>
                
                {renderInputToggle('job')}
                
                {jobInputType === 'file' ? renderFileUpload('job') : renderTextInput('job')}
              </div>
            </div>

            {/* Analysis Button */}
            <div className="mb-6 sm:mb-8">
              <Button
                onClick={handleAnalysis}
                disabled={status === 'loading' || 
                  !(cvInputType === 'file' ? cvFile : cvText.trim()) || 
                  !(jobInputType === 'file' ? jobFile : jobText.trim())}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-4 sm:py-6 text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                )}
                {status === 'loading' ? 'Analyzing...' : "Let's Analyze"}
              </Button>
            </div>

            {/* Status Message */}
            {status !== 'idle' && statusMessage && (
              <div className={`flex items-center gap-2 p-4 rounded-xl mb-6 ${
                status === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                status === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
              }`}>
                {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                {status === 'success' && <CheckCircle className="w-5 h-5" />}
                {status === 'error' && <AlertCircle className="w-5 h-5" />}
                <span className="text-sm sm:text-base">{statusMessage}</span>
              </div>
            )}

            {/* Analysis Output Box */}
            {analysisOutput && (
              <div className="space-y-4">
                <Label className="text-white font-medium flex items-center gap-2 text-sm sm:text-base">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  Analysis Output
                </Label>
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">AI Analysis Result</h4>
                      <p className="text-slate-200 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                        {analysisOutput}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Analysis Results (for debugging - can be removed in production) */}
            {analysisResult && process.env.NODE_ENV === 'development' && (
              <div className="space-y-4 mt-8">
                <Label className="text-white font-medium flex items-center gap-2 text-sm sm:text-base">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  Full Response (Debug)
                </Label>
                <details className="bg-white/5 border border-white/10 rounded-xl">
                  <summary className="p-4 cursor-pointer text-slate-400 hover:text-white transition-colors">
                    View Full API Response
                  </summary>
                  <div className="p-4 pt-0 max-h-80 overflow-y-auto">
                    <pre className="text-slate-300 whitespace-pre-wrap text-xs leading-relaxed">
                      {analysisResult}
                    </pre>
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
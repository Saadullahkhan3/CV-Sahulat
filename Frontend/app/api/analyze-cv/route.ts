import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract data using the exact parameter names your API expects
    const cvFile = formData.get('cv_file') as File;
    const cvText = formData.get('cv_text') as string;
    const jobFile = formData.get('job_desc_file') as File;
    const jobText = formData.get('job_desc_text') as string;

    // Validate CV input
    if (!cvFile && !cvText) {
      return NextResponse.json(
        { error: "Either 'cv_file' or 'cv_text' must be provided" },
        { status: 400 }
      );
    }

    if (cvFile && cvText) {
      return NextResponse.json(
        { error: "Provide either 'cv_file' or 'cv_text', not both" },
        { status: 400 }
      );
    }

    // Validate job description input
    if (!jobFile && !jobText) {
      return NextResponse.json(
        { error: "Either 'job_desc_file' or 'job_desc_text' must be provided" },
        { status: 400 }
      );
    }

    if (jobFile && jobText) {
      return NextResponse.json(
        { error: "Provide either 'job_desc_file' or 'job_desc_text', not both" },
        { status: 400 }
      );
    }

    // Validate file types and sizes if files are provided
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'text/plain'];
    
    if (cvFile) {
      if (!allowedTypes.includes(cvFile.type)) {
        return NextResponse.json(
          { error: 'CV file must be PDF, image (JPG, PNG, GIF), or text file' },
          { status: 400 }
        );
      }

      if (cvFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'CV file size must be less than 10MB' },
          { status: 400 }
        );
      }
    }

    if (jobFile) {
      if (!allowedTypes.includes(jobFile.type)) {
        return NextResponse.json(
          { error: 'Job description file must be PDF, image (JPG, PNG, GIF), or text file' },
          { status: 400 }
        );
      }

      if (jobFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Job description file size must be less than 10MB' },
          { status: 400 }
        );
      }
    }

    // Prepare FormData for your Hugging Face API
    const analysisFormData = new FormData();
    
    // Add CV data exactly as your API expects
    if (cvFile) {
      analysisFormData.append('cv_file', cvFile);
    } else if (cvText) {
      analysisFormData.append('cv_text', cvText);
    }

    // Add job description data exactly as your API expects
    if (jobFile) {
      analysisFormData.append('job_desc_file', jobFile);
    } else if (jobText) {
      analysisFormData.append('job_desc_text', jobText);
    }

    // Call your Hugging Face API directly
    const apiUrl = 'https://saadullahkhan3-cv-sahulat.hf.space';
    
    const response = await fetch(`${apiUrl}/analyze`, {
      method: 'POST',
      body: analysisFormData,
    });

    if (!response.ok) {
      throw new Error(`CV analysis failed with status: ${response.status}`);
    }

    const result = await response.json();

    // Return the analysis result directly
    return NextResponse.json({
      success: true,
      analysis: {
        analyzed_text: result.analyzed_text,
        timestamp: new Date().toISOString(),
        summary: {
          cv_processed: true,
          job_processed: true,
          analysis_type: 'CV vs Job Description Comparison'
        }
      },
      message: 'CV and job description analyzed successfully'
    });

  } catch (error) {
    console.error('CV Analysis API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze documents with CV analysis service',
        details: error instanceof Error ? error.message : 'Unknown API error'
      },
      { status: 502 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    
    // API Constants
    const API_URL = 'https://alwaysuputils.pythonanywhere.com/api/contact/';
    const API_TOKEN = "44f0b1346eee0c12082f8fa8ffdee9179d2de71c";
    
    if (!API_TOKEN) {
      throw new Error('Contact API token is not configured');
    }
    
    // Make request to external API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${API_TOKEN}`,
      },
      body: JSON.stringify({
        name,
        email,
        description: message,
        source: 'CV Sahulat'
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      );
    } else {
      const errorResult = await response.json().catch(() => ({}));
      throw new Error(errorResult.error || errorResult.message || 'Failed to send message');
    }


  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send message' },
      { status: 500 }
    );
  }
}
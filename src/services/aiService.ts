interface AIResponse {
  response: string;
}

class AIService {
  private apiKey: string | undefined;

  constructor() {
    // For Vite, we need to handle API keys differently
    // In production, this should be handled by a backend service
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  }

  async sendMessage(message: string, context?: string): Promise<string> {
    // Use real AI responses if API key is available, otherwise use demo responses
    if (!this.apiKey) {
      return this.getDemoResponse(message);
    }

    try {
      const systemPrompt = `You are an AI assistant for Turon Model United Nations (TuronMUN). You are helpful, professional, and knowledgeable about:
      - Model United Nations procedures and rules
      - TuronMUN conference details (dates, venues, committees)
      - Registration processes and requirements
      - Committee information and topics
      - Position paper guidelines
      - Conference logistics and schedules
      - General MUN best practices

      Be conversational and friendly. Keep responses concise but informative. If you don't know specific information about TuronMUN, be honest and suggest contacting the organizing team at admin@turonmun.com.

      Current context: ${context || 'general MUN assistance'}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
          presence_penalty: 0.3,
          frequency_penalty: 0.3
        })
      });

      if (!response.ok) {
        throw new Error('OpenAI API request failed');
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';
    } catch (error) {
      console.error('AI Service Error:', error);
      return 'I\'m having trouble connecting right now. Please try again later or contact admin@turonmun.com for immediate assistance.';
    }
  }

  private getDemoResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Registration related
    if (lowerMessage.includes('register') || lowerMessage.includes('registration') || lowerMessage.includes('sign up')) {
      return 'To register for TuronMUN, visit our registration page and fill out the application form. You\'ll need to provide your personal information, committee preferences, and experience. Early registration is recommended as spots fill up quickly!';
    }

    // Committee related
    if (lowerMessage.includes('committee') || lowerMessage.includes('committees')) {
      return 'TuronMUN offers several committees including UNGA, ECOSOC, HRC, and WTO. Each committee focuses on different global issues. You can express your preferences during registration, and assignments are made based on experience and availability.';
    }

    // Position papers
    if (lowerMessage.includes('position paper') || lowerMessage.includes('paper')) {
      return 'Position papers are crucial documents that outline your country\'s stance on committee topics. They should be well-researched, properly formatted, and submitted by the deadline. Guidelines and templates are available in the resources section.';
    }

    // Conference dates
    if (lowerMessage.includes('date') || lowerMessage.includes('when') || lowerMessage.includes('schedule')) {
      return 'TuronMUN 2025 will take place from April 2-4, 2025. The conference includes opening ceremony, committee sessions, and closing ceremony. A detailed schedule is available on our website.';
    }

    // Venue/location
    if (lowerMessage.includes('venue') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return 'TuronMUN 2025 will be held at the Turon Campus in Tashkent, Uzbekistan. The venue provides modern facilities for committee sessions and social events.';
    }

    // Fees/payment
    if (lowerMessage.includes('fee') || lowerMessage.includes('payment') || lowerMessage.includes('cost')) {
      return 'Registration fees vary based on delegate status and early bird discounts. Payment can be made online through our secure payment system. Scholarships are available for deserving delegates - check our website for details.';
    }

    // Dress code
    if (lowerMessage.includes('dress') || lowerMessage.includes('attire')) {
      return 'The dress code for TuronMUN is Western business formal. This includes suits for male delegates and business suits or conservative dresses for female delegates. National dress is also welcome during cultural events.';
    }

    // Awards
    if (lowerMessage.includes('award') || lowerMessage.includes('recognition')) {
      return 'TuronMUN recognizes outstanding delegates through various awards including Best Delegate, Outstanding Delegate, Honorable Mention, and Best Position Paper. Awards are based on performance, research, and diplomacy throughout the conference.';
    }

    // Rules/procedure
    if (lowerMessage.includes('rules') || lowerMessage.includes('procedure') || lowerMessage.includes('mrop')) {
      return 'TuronMUN follows standard MUN Rules of Procedure. These include speaker\'s list, moderated and unmoderated caucuses, points and motions, and voting procedures. The complete rulebook is available in our resources section.';
    }

    // Contact/support
    if (lowerMessage.includes('contact') || lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'For assistance, you can email us at admin@turonmun.com or call +998 XX XXX XX XX. Our team is available Monday-Friday, 9 AM - 6 PM. You can also reach us through our social media channels.';
    }

    // Default response
    return `I understand you're asking about: "${message}". For specific details about TuronMUN 2025, I recommend checking our official website or contacting our team at admin@turonmun.com. Is there anything specific about MUN procedures, registration, or conference logistics I can help you with?`;
  }
}

export const aiService = new AIService();

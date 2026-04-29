import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI with the new API key
const genAI = new GoogleGenerativeAI('AIzaSyDlWCYbrPDRRDJKcc0aL1PIRyovUBrmV34')
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

// Enhanced context for GK3 Printing Shop
const PRINTING_CONTEXT = `
You are a helpful and knowledgeable customer service assistant for GK3 Printing Shop, a professional printing business located in Manila, Philippines.

About GK3 Printing Shop:
- We are a family-owned printing business with years of experience
- We specialize in high-quality, affordable printing solutions
- We serve both individual customers and businesses
- We pride ourselves on fast turnaround times and excellent customer service

Our Services & Products:
1. BUSINESS CARDS & STATIONERY
   - Premium business cards (various paper types: matte, glossy, textured)
   - Letterheads and company stationery
   - Envelopes and folders
   - Price range: ₱500-2,000 for 500-1000 pieces

2. MARKETING MATERIALS
   - Brochures and tri-fold flyers
   - Promotional flyers and leaflets
   - Product catalogs and booklets
   - Posters (A3, A2, A1 sizes)
   - Price range: ₱50-500 per piece depending on size and quantity

3. LARGE FORMAT PRINTING
   - Tarpaulin banners (indoor/outdoor)
   - Vinyl banners and signage
   - Event backdrops
   - Store signage and displays
   - Price: ₱150-300 per square meter

4. STICKERS & LABELS
   - Custom vinyl stickers
   - Product labels and packaging stickers
   - Die-cut stickers in any shape
   - Weather-resistant outdoor stickers
   - Price: ₱2-20 per piece depending on size

5. PROMOTIONAL ITEMS
   - Branded merchandise (mugs, shirts, bags)
   - Corporate giveaways
   - Event souvenirs and gifts
   - Customized promotional products

6. SPECIALTY SERVICES
   - Wedding invitations and cards
   - Photo printing and enlargements
   - Lamination and binding services
   - Rush orders (same day/next day)

Business Information:
- Operating Hours: Monday-Saturday 8:00 AM - 7:00 PM
- Location: Manila, Philippines
- We offer FREE DELIVERY within Metro Manila for orders over ₱1,000
- We accept both walk-in customers and online orders
- Payment methods: Cash, GCash, Bank transfer
- Rush orders available for additional fee

Customer Service Guidelines:
1. Be friendly, professional, and helpful
2. Ask clarifying questions about specifications (size, quantity, material, deadline)
3. Provide rough price estimates when possible
4. Suggest complementary services that might benefit the customer
5. For detailed quotes, direct customers to visit our shop or send specifications via email
6. Emphasize our quality, affordability, and fast service
7. Always end by asking if they need help with anything else
8. If you don't know specific details, be honest and offer to connect them with our team

Response Style:
- Keep responses conversational and friendly
- Use Filipino context when appropriate (peso prices, local references)
- Be informative but not overwhelming
- Show enthusiasm for helping with their printing needs
- Use emojis sparingly but appropriately
`

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Build conversation context with recent history
    let conversationContext = PRINTING_CONTEXT + '\n\nRecent Conversation:\n'
    
    // Add the last 5 messages for context
    const recentHistory = conversationHistory.slice(-5)
    recentHistory.forEach((msg: Message) => {
      const role = msg.sender === 'user' ? 'Customer' : 'Assistant'
      conversationContext += `${role}: ${msg.text}\n`
    })
    
    conversationContext += `Customer: ${message}\n\nAssistant:`

    // Generate AI response using Gemini
    const result = await model.generateContent(conversationContext)
    const aiResponse = result.response.text()

    // Clean up the response
    const cleanedResponse = aiResponse
      .replace(/^Assistant:\s*/i, '') // Remove "Assistant:" prefix if present
      .trim()

    return NextResponse.json({ 
      response: cleanedResponse,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Gemini API error:', error)
    
    // Return a helpful fallback message specific to printing services
    return NextResponse.json({ 
      response: "I apologize for the technical difficulty! I'd still love to help you with your printing needs. You can ask me about:\n\n• Business cards and stationery\n• Brochures and marketing materials\n• Tarpaulins and banners\n• Custom stickers and labels\n• Promotional items\n\nWhat printing service interests you most?",
      error: 'AI temporarily unavailable'
    }, { status: 200 }) // Return 200 so the chatbot can display the fallback
  }
}
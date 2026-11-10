import { GoogleGenAI } from '@google/genai';

export async function askSolarAI(userQuery: string): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return getFallbackResponse(userQuery);
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: `You are SolarBot, an expert rooftop solar energy consultant for India. 
You specialize in explaining rooftop solar panel selection, inverter types (string vs microinverters), battery backup, net metering DISCOM procedures, PM Surya Ghar Muft Bijli Yojana subsidy details (up to ₹78,000 subsidy), and financial ROI calculation.
Keep your answer clear, encouraging, structured with bullet points, concise for a mobile screen, and calibrated in Indian Rupees (INR) and kWh units. Always maintain a professional, helpful tone.`
      }
    });

    return response.text || 'I am happy to assist you with your solar query. Please refine your question or contact our solar engineer directly.';
  } catch (error) {
    console.warn('Gemini AI call failed, using fallback rule engine:', error);
    return getFallbackResponse(userQuery);
  }
}

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('subsidy') || q.includes('government') || q.includes('pm surya')) {
    return `☀️ **PM Surya Ghar: Muft Bijli Yojana Scheme Highlights**:
• **1 kW System**: ₹ 30,000 Direct Subsidy
• **2 kW System**: ₹ 60,000 Direct Subsidy
• **3 kW to 10 kW Systems**: Capped at maximum ₹ 78,000 Subsidy

**Eligibility**: Residential houses with clear title, grid-connected DISCOM connection, and a net-metering setup. The subsidy is directly credited to your bank account within 30 days of net-meter commissioning.`;
  }

  if (q.includes('maintenance') || q.includes('cleaning') || q.includes('life')) {
    return `🔧 **Rooftop Solar Maintenance Guidelines**:
• **Lifespan**: Quality Mono PERC panels come with a **25-year performance warranty** (maintaining >80% power yield after 25 yrs).
• **Cleaning**: Dust panels with clean water every 2-3 weeks. Clean panels yield up to 12-15% higher energy.
• **Inverters**: String inverters usually carry 10-year warranty, Microinverters up to 15-25 years.`;
  }

  if (q.includes('net meter') || q.includes('discom') || q.includes('grid')) {
    return `⚡ **Net Metering Process in India**:
1. **Feasibility Approval**: Vizon Solar submits your rooftop feasibility report to your local DISCOM (e.g. MSEDCL, TATA Power, BSES, BESCOM).
2. **Installation**: Certified team installs panels & bidirectional net-meter.
3. **Synchronization**: DISCOM tests protection and replaces existing meter with net meter.
4. **Billing**: Excess solar units exported to the grid adjust directly against your monthly night consumption!`;
  }

  return `☀️ **Vizon Solar Smart Advice**:
For a standard Indian home consuming **₹ 4,000 - ₹ 5,000** monthly bill:
• **Recommended Size**: 3.3 kW System (6 Mono PERC Panels)
• **Rooftop Area Required**: ~300 sq. ft.
• **Annual Savings**: ~₹ 42,000/year
• **Net Investment Post-Subsidy**: ~₹ 85,000 - ₹ 90,000
• **Payback Period**: Just 2.2 to 2.5 Years!

Tap **Calculator** in the bottom menu to compute your exact custom savings!`;
}

# Gemini APIs — Research Findings
> Status: COMPLETE — Excellent comprehensive report

## Gemini Live API (Bidirectional Streaming)

### WebSocket Endpoint
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent

### Protocol — JSON messages with one field each:
- `setup` — sent once at connection start (model, tools, modalities)
- `clientContent` — text/conversational turns
- `realtimeInput` — raw audio/video frames
- `toolResponse` — function call results

### Audio Specs
- Input: Raw 16-bit PCM, 16kHz, little-endian, mono
- Output: 24kHz PCM audio
- Video: 1 FPS processing

### Session Limits
- Context: 128K tokens per session
- Audio-only: ~15 minutes
- Audio+video: ~2 minutes
- Resumption: 24 hours (token valid 2hrs after termination)
- Context compression for unlimited duration

### VAD: Automatic voice activity detection (configurable)

## Model Lineup (March 2026)

### Gemini 3 Flash (gemini-3-flash-preview)
- 1M token context window
- Multimodal: text, images, audio, video, PDFs
- Configurable reasoning via `thinking_level` (minimal/low/medium/high)
- Tool use: Function calling, Search, Maps, File Search, Code Execution, URL Context

### Gemini Nano (on-device)
- 32K token context window
- Text or text+image input -> text output
- Via ML Kit GenAI APIs on Android (AICore)
- Capabilities: Summarization, Proofreading, Rewriting, Image description, Custom prompts
- Pixel 10+ devices; Google AI Edge SDK
- Privacy-first: never leaves device

## SDK: @google/genai v1.45.0

### Basic Usage
```typescript
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: '...' });
```

### Live API Usage
```typescript
const session = await ai.live.connect({
  model: 'gemini-2.5-flash-native-audio-preview-12-2025',
  config: { responseModalities: [Modality.AUDIO] },
  callbacks: { onopen, onmessage, onerror, onclose }
});
session.send({ text: '...' }); // or realtimeInput for audio
```

### Next.js Architecture Pattern
1. API Route generates ephemeral token (keeps key server-side)
2. Client connects WebSocket directly to Gemini with token
3. AudioWorklet captures PCM from microphone
4. Float32 -> 16-bit PCM -> base64 -> send to WebSocket

## Pricing (per 1M tokens)
| Model | Input | Output |
|-------|-------|--------|
| Gemini 3 Flash | $0.50 | $3.00 |
| Gemini 2.5 Flash | $0.30 | $2.50 |
| Gemini 2.5 Flash-Lite | $0.10 | $0.40 |
| Gemini Nano | FREE | FREE |

### Cost Optimization
- Context caching: 10% of base input price
- Batch processing: 50% discount
- Free tier: 5-15 RPM available

## Rate Limits
- Free: 5-15 RPM
- Tier 1 (billing enabled): 150-300 RPM
- Tier 2 ($250+ spend): ~1000 RPM

## Reference Implementations
- google-gemini/live-api-web-console (React)
- yeyu2/gemini-nextjs (Next.js)

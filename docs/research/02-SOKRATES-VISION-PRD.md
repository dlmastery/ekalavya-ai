# Sokrates — "The Child Socrates AI Tutor"
# "No Child, No Teen, No Adult Left Behind"
# Rural 3rd-World Education Edition
## Vision PRD v1.2 — March 2026

> This document captures the user's product vision. It will be refined during the design phase.

### Executive Summary
Sokrates is a **meta AI tutor platform** built exclusively for rural communities in 3rd-world countries. One simple profile + any topic instantly generates a **personalized, alive AI companion** — a wise, playful "Child Socrates" that is curious, gentle, endlessly patient, and always asks questions instead of lecturing.

Runs **primarily offline** on basic Android smartphones ($30-50 devices), using:
- **Gemini Nano** (on-device, offline core)
- **Gemini Flash** (connected intelligence)
- **Nano Banana Flash** (dynamic image generation)
- **Gemini TTS** (engaging voice)

### Core Promise
Engaging voice-first conversational learning + dynamically generated audio stories/songs + custom photos/diagrams using local cultural context. Low data, zero cost after initial download, solar-friendly, multilingual (100+ low-resource languages).

### Product Vision
**"One profile. Any topic. Your Child Socrates appears instantly — even offline in the middle of a field."**

Sokrates is NOT a chatbot. It is a lifelong learning companion that:
- Speaks like a curious, kind child who asks beautiful questions
- Never leaves anyone behind — adapts for children (playful stories), teens (deeper exploration), adults (practical life skills)
- Generates audio (personalized stories, songs, explanations in local accent) and photos/images (custom diagrams, village scenes, step-by-step drawings) dynamically
- Uses Socratic method: "What do you notice?" "Why do you think the farmer did it this way?"

### Impact Goals
- Reach 10M rural learners in first 3 years (India, Africa, Latin America, Southeast Asia)
- 3x faster literacy/numeracy gains, higher school retention
- Free for users. <$0.01 per 30-min connected session
- 80%+ daily usage, 90%+ learning path completion

### Target Users (All Ages, All Literacy Levels)
- Children (6-12): Playful stories + pictures
- Teens (13-18): Curiosity-driven exploration + practical skills
- Adults & elders: Vocational, health, farming, financial literacy
- Teachers/community leaders: Create shared village tutors

### Core User Flow
1. **One-time Profile** (5 min, voice-guided): Age group, village context, learning goals, language/dialect, favorite stories
2. **Start Learning**: Say topic or upload photo of textbook/problem
3. **Instant Child Socrates**: Custom tutor in <10s offline via Gemini Nano
4. **Live Conversation**: Pure voice + generated images + stories + songs

### Core Capabilities
- 6.1: Child Socrates Persona (always on — gentle, curious, playful)
- 6.2: Voice-First Conversational Model (100+ languages, dynamic audio gen)
- 6.3: Dynamic Photo/Image Generation (Nano Banana Flash)
- 6.4: Personalized Learning Modes (Story/Discovery, Practical Skills, Group/Village, Literacy Booster)
- 6.5: Offline-First Architecture (Gemini Nano primary, Flash fallback)
- 6.6: Rural-Optimized (low-data, solar-friendly, voice commands, WhatsApp/Bluetooth export)

### Technical Architecture
- **Frontend**: Android-first (Kotlin + Jetpack Compose) + PWA fallback
- **Models**: Gemini Nano (offline) + Flash (connected) + Nano Banana (images) + TTS
- **Memory**: On-device vector store + profile JSON
- **Deployment**: Play Store + APK sideloading + village USB sharing
- **Prompts**: Dynamic Socratic templates (open source for NGO customization)

### Non-Functional Requirements
- Android 10+ (even 1GB RAM devices)
- Offline 95%+ of time
- <50MB initial download
- Zero ongoing user cost
- Open Source: AGPL-3.0

### Roadmap
- MVP (Month 1): Profile + voice Socratic tutor + basic image/audio
- V0.5 (Month 2): Nano Banana dynamic photos + village group mode
- V1 (Month 3): Full offline caching + 50+ local language voices + NGO dashboard

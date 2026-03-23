import type { Lesson, Scene } from '@/lib/types'
import { colors } from '@/lib/constants/theme-tokens'

const WATER_CYCLE_SCENES: Scene[] = [
  {
    id: 'wc-scene-1',
    type: 'slide',
    title: 'What is the Water Cycle?',
    order: 1,
    content: {
      title: 'What is the Water Cycle?',
      bullets: [
        'The water cycle is the continuous journey water takes on Earth.',
        'Water moves between oceans, the atmosphere, and land.',
        'The same water has been recycling for billions of years!',
        'There are four main stages: evaporation, condensation, precipitation, and collection.',
      ],
      imageAlt: 'Overview diagram of the water cycle showing the sun, clouds, rain, and ocean',
      speakerNotes:
        'Start by asking students: "Where does rain come from?" Let them share ideas before revealing the slide. Emphasize that this is a cycle — it has no beginning or end.',
    },
    duration: 120,
  },
  {
    id: 'wc-scene-2',
    type: 'slide',
    title: 'Evaporation and Condensation',
    order: 2,
    content: {
      title: 'Evaporation and Condensation',
      bullets: [
        'Evaporation: The sun heats water in oceans, rivers, and lakes, turning it into vapor.',
        'Water vapor rises because warm air is lighter than cool air.',
        'Condensation: When vapor reaches cool air high up, it turns back into tiny water droplets.',
        'Billions of droplets clump together to form clouds.',
        'Fun fact: A single cumulus cloud can weigh over 500,000 kg!',
      ],
      imageAlt: 'Diagram showing water evaporating from a lake and condensing into clouds',
      speakerNotes:
        'Relate evaporation to everyday life: steam from chai, wet clothes drying on a clothesline. Ask: "Why do clothes dry faster on a sunny day?"',
    },
    duration: 180,
  },
  {
    id: 'wc-scene-3',
    type: 'quiz',
    title: 'Check Your Understanding',
    order: 3,
    content: null,
    duration: 120,
  },
  {
    id: 'wc-scene-4',
    type: 'simulation',
    title: 'Watch the Water Cycle in Action',
    order: 4,
    content: {
      title: 'Interactive Water Cycle Simulation',
      bullets: [
        'Click on the sun to increase temperature and watch evaporation speed up.',
        'Observe how clouds form as vapor rises and cools.',
        'Watch precipitation happen when clouds become saturated.',
        'Trace where the water goes after it falls — into rivers, groundwater, or the ocean.',
      ],
      speakerNotes:
        'This is a placeholder for an interactive simulation. Students will be able to manipulate temperature and see how it affects each stage of the cycle.',
    },
    duration: 240,
  },
  {
    id: 'wc-scene-5',
    type: 'pbl',
    title: 'Build Your Own Water Filter',
    order: 5,
    content: {
      title: 'Project: Build Your Own Water Filter',
      bullets: [
        'Materials needed: plastic bottle, sand, gravel, cotton, muddy water.',
        'Step 1: Cut the bottom off a plastic bottle and turn it upside down.',
        'Step 2: Layer cotton, then fine sand, then coarse sand, then gravel.',
        'Step 3: Pour muddy water through the top and collect filtered water below.',
        'Observe: How does this relate to what happens in nature when rainwater seeps into the ground?',
      ],
      speakerNotes:
        'This PBL activity connects filtration to the groundwater stage of the water cycle. Ask students to predict what will happen before they pour the water. After the experiment, discuss: "Is this water safe to drink? Why or why not?"',
    },
    duration: 600,
  },
]

export const WATER_CYCLE_LESSON: Lesson = {
  id: 'lesson-water-cycle-1',
  topic: 'The Water Cycle',
  description:
    'Explore how water moves through Earth\'s systems — from evaporation to precipitation and back again. Includes interactive activities and a hands-on project.',
  scenes: WATER_CYCLE_SCENES,
  totalDuration: WATER_CYCLE_SCENES.reduce((sum, s) => sum + s.duration, 0),
  createdAt: new Date('2026-03-15'),
  subjectColor: colors.subject.science,
}

/** All mock lessons indexed by topic key */
export const MOCK_LESSONS: Record<string, Lesson> = {
  'water-cycle': WATER_CYCLE_LESSON,
}

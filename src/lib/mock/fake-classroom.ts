import type { Agent, AgentAction, ClassroomSession, DebateSession } from '@/lib/types'

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------
export const CLASSROOM_AGENTS: Agent[] = [
  {
    id: 'agent-teacher',
    name: 'Ms. Vidya',
    role: 'teacher',
    avatar: '\u{1F469}\u200D\u{1F3EB}',
    personality: 'Patient, expert, guides discussion with clear explanations and probing questions.',
  },
  {
    id: 'agent-curious',
    name: 'Ravi',
    role: 'curious',
    avatar: '\u{1F466}',
    personality: 'Always asking "why?" and "how?" — loves exploring ideas beyond the lesson.',
  },
  {
    id: 'agent-skeptic',
    name: 'Meera',
    role: 'skeptic',
    avatar: '\u{1F467}',
    personality: 'Challenges assumptions and asks for evidence. Pushes everyone to think critically.',
  },
  {
    id: 'agent-beginner',
    name: 'Kiran',
    role: 'beginner',
    avatar: '\u{1F9D1}',
    personality: 'Struggles with new concepts but tries hard. Needs encouragement and simpler explanations.',
  },
  {
    id: 'agent-advanced',
    name: 'Dev',
    role: 'advanced',
    avatar: '\u{1F468}\u200D\u{1F393}',
    personality: 'Quickly grasps concepts and makes connections to other subjects. Enjoys extending ideas.',
  },
]

// ---------------------------------------------------------------------------
// Scripted classroom turns — "The Water Cycle"
// ---------------------------------------------------------------------------
function turn(
  agentId: string,
  type: AgentAction['type'],
  content: string,
  minutesAgo: number,
): AgentAction {
  return {
    agentId,
    type,
    content,
    timestamp: new Date(Date.now() - minutesAgo * 60_000),
  }
}

export const CLASSROOM_TURNS: AgentAction[] = [
  turn('agent-teacher', 'speak', 'Good morning, everyone! Today we\'re going to explore something you see almost every day — the water cycle. Can anyone tell me where rain comes from?', 30),
  turn('agent-curious', 'speak', 'From the clouds! But how does water get INTO the clouds in the first place?', 29),
  turn('agent-teacher', 'speak', 'Excellent question, Ravi! That\'s exactly what we\'ll discover. Let\'s start with evaporation.', 28),
  turn('agent-teacher', 'whiteboard-draw', 'Drawing a sun over an ocean with wavy arrows rising upward.', 27),
  turn('agent-teacher', 'speak', 'When the sun heats water in oceans, lakes, and rivers, the water turns into vapor and rises. This is evaporation. Has anyone seen steam rising from a hot cup of chai?', 26),
  turn('agent-beginner', 'speak', 'Wait, so the water just disappears into the air? Where does it go?', 25),
  turn('agent-teacher', 'speak', 'Great observation, Kiran! The water doesn\'t disappear — it becomes invisible water vapor mixed into the air. It\'s still there, just in a different form.', 24),
  turn('agent-skeptic', 'speak', 'But if the sun is always evaporating water, why don\'t the oceans dry up?', 23),
  turn('agent-teacher', 'pose-question', 'That\'s a brilliant critical question, Meera! What do the rest of you think? Why don\'t oceans dry up if the sun keeps evaporating water?', 22),
  turn('agent-advanced', 'speak', 'Because the water comes back! It rains back into the rivers and oceans. That\'s why it\'s called a cycle — it goes around and around.', 21),
  turn('agent-teacher', 'speak', 'Exactly, Dev! You\'ve jumped ahead to the big picture. Let\'s fill in the middle steps. After evaporation, the vapor rises and cools. What forms when it cools?', 20),
  turn('agent-curious', 'speak', 'Clouds! The vapor condenses into tiny droplets and makes clouds. I read that some clouds can weigh as much as 80 elephants!', 19),
  turn('agent-teacher', 'whiteboard-text', 'Evaporation \u2192 Condensation \u2192 Precipitation \u2192 Collection \u2192 (repeat)', 18),
  turn('agent-beginner', 'speak', 'I think I get it now. So rain is just the water falling back down from the clouds?', 17),
  turn('agent-teacher', 'speak', 'Exactly, Kiran! That falling water — whether it\'s rain, snow, or hail — is called precipitation. And then the water collects in rivers, lakes, and oceans, and the whole cycle starts again. Well done, everyone!', 16),
]

// ---------------------------------------------------------------------------
// Classroom session object
// ---------------------------------------------------------------------------
export const MOCK_CLASSROOM_SESSION: ClassroomSession = {
  id: 'classroom-water-cycle-1',
  topic: 'The Water Cycle',
  agents: CLASSROOM_AGENTS,
  currentScene: 1,
  totalScenes: 5,
  isActive: true,
}

// ---------------------------------------------------------------------------
// Debate session (bonus — used by startDebate)
// ---------------------------------------------------------------------------
export const MOCK_DEBATE_SESSION: DebateSession = {
  id: 'debate-renewable-1',
  topic: 'Renewable Energy',
  proposition: 'Solar energy is the best solution for India\'s electricity needs.',
  agents: [
    CLASSROOM_AGENTS[0], // teacher as moderator
    CLASSROOM_AGENTS[1], // curious — for
    CLASSROOM_AGENTS[2], // skeptic — against
  ],
  turns: [
    turn('agent-teacher', 'speak', 'Today\'s debate: "Solar energy is the best solution for India\'s electricity needs." Ravi will argue for, Meera will argue against. Let\'s begin!', 15),
    turn('agent-curious', 'speak', 'India gets over 300 sunny days a year in many regions. Solar panels are getting cheaper every year, and they produce no pollution. Solar is clearly the best path forward!', 14),
    turn('agent-skeptic', 'speak', 'But what about at night or during monsoon season when there\'s no sun? Solar can\'t work alone. And manufacturing solar panels creates pollution too. We need a mix of solutions, not just one.', 13),
  ],
}

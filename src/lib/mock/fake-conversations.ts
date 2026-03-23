import type { Message } from '@/lib/types'

function msg(
  id: string,
  role: 'user' | 'assistant',
  content: string,
  minutesAgo: number,
  mode?: 'socratic',
): Message {
  return {
    id,
    role,
    content,
    timestamp: new Date(Date.now() - minutesAgo * 60_000),
    mode: mode ?? undefined,
  }
}

// ---------------------------------------------------------------------------
// Conversation 1: Math — Fractions (child-friendly, Socratic)
// ---------------------------------------------------------------------------
export const FRACTIONS_CONVERSATION: Message[] = [
  msg('frac-01', 'user', 'What are fractions?', 30),
  msg(
    'frac-02',
    'assistant',
    'Great question! \u{1F914} Imagine you have a whole roti and you break it into 4 equal pieces. If you eat one piece, what part of the roti did you eat? Can you describe it?',
    29,
    'socratic',
  ),
  msg('frac-03', 'user', 'One out of four?', 28),
  msg(
    'frac-04',
    'assistant',
    'Exactly! You just described a fraction without even knowing it! When we write "one out of four", we can write it as 1/4. The bottom number (4) tells us how many equal pieces we divided the roti into. What do you think the top number (1) represents?',
    27,
    'socratic',
  ),
  msg('frac-05', 'user', 'The number of pieces I ate?', 26),
  msg(
    'frac-06',
    'assistant',
    'Spot on! \u{1F389} The top number is called the "numerator" — it tells us how many pieces we took. The bottom number is the "denominator" — it tells us how many equal pieces the whole thing was divided into. Now, if your friend eats 2 pieces out of the same 4, how would you write that as a fraction?',
    25,
    'socratic',
  ),
  msg('frac-07', 'user', '2/4?', 24),
  msg(
    'frac-08',
    'assistant',
    'Perfect! 2/4 is absolutely right. Now here\'s a fun puzzle \u{1F9E9}: If you have another roti and cut it into only 2 equal pieces, and your friend eats 1 piece, they ate 1/2 of the roti. But wait — didn\'t they eat the same amount as 2/4? What do you notice?',
    23,
    'socratic',
  ),
  msg('frac-09', 'user', 'They are the same thing!', 22),
  msg(
    'frac-10',
    'assistant',
    'You\'re discovering something really important! \u{2728} 1/2 and 2/4 are called "equivalent fractions" — they look different but represent the same amount. Can you think of another fraction that equals 1/2? Maybe try cutting the roti into 6 pieces...',
    21,
    'socratic',
  ),
  msg('frac-11', 'user', '3/6?', 20),
  msg(
    'frac-12',
    'assistant',
    'Brilliant! \u{1F31F} You found the pattern — to get an equivalent fraction, you multiply both the top and bottom by the same number. 1\u00D72 = 2 and 2\u00D72 = 4, giving us 2/4. And 1\u00D73 = 3 and 2\u00D73 = 6, giving us 3/6. What happens if you multiply both by 5?',
    19,
    'socratic',
  ),
]

// ---------------------------------------------------------------------------
// Conversation 2: Science — The Water Cycle (teen, Socratic)
// ---------------------------------------------------------------------------
export const WATER_CYCLE_CONVERSATION: Message[] = [
  msg('wc-01', 'user', 'How does the water cycle work?', 45),
  msg(
    'wc-02',
    'assistant',
    'Let\'s figure this out together! \u{1F30D} Think about what happens when your mother boils water for chai. You see steam rising from the pot. Where do you think that steam goes?',
    44,
    'socratic',
  ),
  msg('wc-03', 'user', 'It goes up into the air?', 43),
  msg(
    'wc-04',
    'assistant',
    'Right! That process of water turning into vapor and rising is called "evaporation." Now, the sun does the same thing to oceans, rivers, and lakes — but on a massive scale. What do you think happens to all that water vapor once it rises high into the sky where it\'s very cold?',
    42,
    'socratic',
  ),
  msg('wc-05', 'user', 'Maybe it becomes clouds?', 41),
  msg(
    'wc-06',
    'assistant',
    'Exactly! \u2601\uFE0F When warm water vapor meets cold air high up, it turns back into tiny water droplets — this is called "condensation." Billions of these tiny droplets clump together to form clouds. Now, those clouds keep collecting more and more droplets. What do you think happens when the clouds get too heavy?',
    40,
    'socratic',
  ),
  msg('wc-07', 'user', 'It rains!', 39),
  msg(
    'wc-08',
    'assistant',
    'Yes! That\'s "precipitation" — the water falls back to Earth as rain, snow, or hail depending on the temperature. Now here\'s the interesting part: once the rain hits the ground, it doesn\'t just disappear. Where do you think the water goes?',
    38,
    'socratic',
  ),
  msg('wc-09', 'user', 'Into rivers and back to the ocean?', 37),
  msg(
    'wc-10',
    'assistant',
    'That\'s one path! Water flowing over the ground into streams, rivers, and eventually the ocean is called "runoff." But some water takes a different route — it seeps into the ground. What do you think happens to water that goes underground?',
    36,
    'socratic',
  ),
  msg('wc-11', 'user', 'Does it become groundwater?', 35),
  msg(
    'wc-12',
    'assistant',
    'Exactly right! \u{1F4A7} That underground water can be stored for years in what we call "aquifers." People dig wells to access this water. Some of it slowly makes its way back to rivers and oceans too. So now you\'ve traced the whole cycle: evaporation \u2192 condensation \u2192 precipitation \u2192 collection. Can you explain why it\'s called a "cycle"?',
    34,
    'socratic',
  ),
  msg('wc-13', 'user', 'Because it keeps repeating over and over?', 33),
  msg(
    'wc-14',
    'assistant',
    'Perfect understanding! \u{1F4AA} The same water molecules have been cycling through this process for billions of years. The water you drank today might have once been part of a dinosaur\'s lake! Here\'s a thought experiment: how do you think cutting down forests might affect the water cycle in your area?',
    32,
    'socratic',
  ),
]

// ---------------------------------------------------------------------------
// Conversation 3: Life Skills — Saving Money (adult, Socratic)
// ---------------------------------------------------------------------------
export const SAVING_MONEY_CONVERSATION: Message[] = [
  msg('save-01', 'user', 'How should I start saving money?', 60),
  msg(
    'save-02',
    'assistant',
    'That\'s a wonderful step to think about! Before we talk about saving, let me ask you this: do you know how much money you spend in a typical month? Have you ever tracked your expenses?',
    59,
    'socratic',
  ),
  msg('save-03', 'user', 'Not really, I just spend as needed.', 58),
  msg(
    'save-04',
    'assistant',
    'That\'s very common! Most people don\'t track their spending until they start. Here\'s a thought: if you don\'t know where your money goes, how would you know where you could cut back? What if you tried writing down every expense for just one week — do you think you\'d find any surprises?',
    57,
    'socratic',
  ),
  msg('save-05', 'user', 'Maybe I spend too much on chai and snacks outside?', 56),
  msg(
    'save-06',
    'assistant',
    'That\'s great self-awareness! \u{1F4A1} Let\'s do some quick math together. If you spend \u20B930 on chai and snacks every day, how much would that be in a month? And in a year?',
    55,
    'socratic',
  ),
  msg('save-07', 'user', 'About 900 per month... and over 10,000 per year!', 54),
  msg(
    'save-08',
    'assistant',
    'Surprising, right? \u20B910,800 per year on just chai and snacks! Now, I\'m not saying you should stop enjoying chai \u2615 — but what if you made chai at home 4 days a week and only bought outside on 3 days? How much could you save?',
    53,
    'socratic',
  ),
  msg('save-09', 'user', 'Maybe half? So about 5000 per year?', 52),
  msg(
    'save-10',
    'assistant',
    'Exactly! And that\'s from just one small habit. Now, financial experts often recommend the "50-30-20" rule. Have you heard of it? If your monthly income is \u20B920,000, can you guess what those three numbers might represent?',
    51,
    'socratic',
  ),
  msg('save-11', 'user', 'Maybe 50% for needs, 30% for wants, 20% for savings?', 50),
  msg(
    'save-12',
    'assistant',
    'You got it! So that would be \u20B910,000 for needs like rent and food, \u20B96,000 for wants like entertainment, and \u20B94,000 for savings. Now, where do you think would be the safest place to keep those savings where they can also grow a little?',
    49,
    'socratic',
  ),
  msg('save-13', 'user', 'A bank savings account?', 48),
  msg(
    'save-14',
    'assistant',
    'That\'s a good start! A savings account gives you about 3-4% interest per year. But have you heard of recurring deposits (RD) or fixed deposits (FD) at your bank? What do you think might be different about them compared to a regular savings account?',
    47,
    'socratic',
  ),
]

/** All mock conversations indexed by topic key */
export const MOCK_CONVERSATIONS: Record<string, Message[]> = {
  fractions: FRACTIONS_CONVERSATION,
  'water-cycle': WATER_CYCLE_CONVERSATION,
  'saving-money': SAVING_MONEY_CONVERSATION,
}

/** Default conversation used when no topic is specified */
export const DEFAULT_CONVERSATION = FRACTIONS_CONVERSATION

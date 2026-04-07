const dummyStories = [
  {
    id: "1",
    title: "The Cartographer of Forgotten Seas",
    genre: "Fantasy",
    description:
      "A map only visible at midnight leads a fisherman to waters no living soul has ever charted. The sea should feel ancient and alive.",
    author: "zainab",
    contributors: 12,
    status: "open",
    createdAt: "3 days ago",
  },
  {
    id: "2",
    title: "The House That Remembered Everything",
    genre: "Horror",
    description:
      "Every family that moves in vanishes. The house keeps their voices in the walls, waiting for the next ones to arrive.",
    author: "aryan",
    contributors: 6,
    status: "completed",
    createdAt: "5 days ago",
  },
  {
    id: "3",
    title: "Letters from a Dead Star",
    genre: "Sci-Fi",
    description:
      "A signal arrives from a star that collapsed forty years ago. The message is addressed to someone not yet born.",
    author: "mei",
    contributors: 9,
    status: "open",
    createdAt: "1 day ago",
  },
  {
    id: "4",
    title: "A Wolf Who Forgot Winter",
    genre: "Folklore",
    description:
      "The pack circled him not with menace but with grief, for they had never seen one of their own forget the cold.",
    author: "nomad",
    contributors: 4,
    status: "open",
    createdAt: "2 days ago",
  },
  {
    id: "5",
    title: "The Last Tea House in Kyoto",
    genre: "Drama",
    description:
      "She poured tea for a man who had been dead for thirty years and said nothing unusual about it.",
    author: "riya",
    contributors: 7,
    status: "open",
    createdAt: "4 days ago",
  },
  {
    id: "6",
    title: "The Clockmaker's Missing Hour",
    genre: "Mystery",
    description:
      "Every clock in the village stopped at the same moment — and only one man knew why he was smiling.",
    author: "samir",
    contributors: 11,
    status: "completed",
    createdAt: "6 days ago",
  },
  {
    id: "7",
    title: "We Met in the Margins",
    genre: "Romance",
    description:
      "She returned the library book with handwritten notes in every margin. He wrote back in the same copy.",
    author: "leila",
    contributors: 2,
    status: "open",
    createdAt: "12 hours ago",
  },
  {
    id: "8",
    title: "The Seventh Passenger",
    genre: "Thriller",
    description:
      "The overnight train was booked for six. The conductor counted seven. No one admitted to being the extra one.",
    author: "dev",
    contributors: 1,
    status: "open",
    createdAt: "8 hours ago",
  },
  {
    id: "9",
    title: "The Boy Who Mapped the Wind",
    genre: "Adventure",
    description:
      "He claimed he could draw where the wind had been. The mapmakers laughed until the storm followed his lines exactly.",
    author: "kira",
    contributors: 3,
    status: "open",
    createdAt: "1 day ago",
  },
];

export const dummyStoryDetail = {
  id: "1",
  title: "The Cartographer of Forgotten Seas",
  genre: "Fantasy",
  description:
    "A story of wonder and quiet dread. The sea should feel ancient and alive. Aim for an ending where the map leads home.",
  author: "zainab",
  contributors: 12,
  status: "open",
  createdAt: "3 days ago",
  paragraphs: [
    {
      id: "p1",
      author: "zainab",
      isOwner: true,
      text: "The map appeared only at the stroke of midnight, drawn in ink that smelled of brine and old storms. Tariq had found it tucked beneath the floorboards of his grandfather's fishing hut — a hut that had been empty for eleven years. The parchment showed coastlines he did not recognize, islands that bore no name in any atlas he had ever read, and at the very center, a single word written in his grandfather's hand: Come.",
      createdAt: "3 days ago",
    },
    {
      id: "p2",
      author: "aryan",
      isOwner: false,
      text: "He had meant to ignore it. He was a practical man — a fisherman who trusted tides and weather, not paper and ink that vanished by morning. But the third night, he found himself standing at the water's edge with the map in his hands, watching the lines rearrange themselves into something that looked unmistakably like the cove outside his door.",
      createdAt: "2 days ago",
    },
    {
      id: "p3",
      author: "mei",
      isOwner: false,
      text: "The boat moved without wind. That was the first thing that frightened him. The second was the silence — not the comfortable silence of an empty sea, but the deliberate hush of something vast holding its breath just below the surface. The stars above were wrong. Not dramatically wrong, not science-fiction wrong, but tilted, slightly, as though the sky had been folded and put back imperfectly.",
      createdAt: "1 day ago",
    },
    {
      id: "p4",
      author: "riya",
      isOwner: false,
      text: "He thought of his grandfather then — not the old man he remembered, bent and smelling of pipe smoke, but the younger version he had only seen in photographs. That man had the same look in his eyes that Tariq imagined he himself must have now. The look of someone who has stopped asking where he is going and started simply going.",
      createdAt: "18 hours ago",
    },
  ],
  comments: [
    {
      id: "c1",
      author: "riya",
      text: "@aryan the detail about stars being tilted is genuinely unsettling, love it",
      createdAt: "2 hours ago",
    },
    {
      id: "c2",
      author: "samir",
      text: "Someone should continue with what's under the water. The setup is perfect for it.",
      createdAt: "5 hours ago",
    },
    {
      id: "c3",
      author: "kira",
      text: "This is the best story on the platform right now. @zainab the opening paragraph is incredible.",
      createdAt: "1 day ago",
    },
    {
      id: "c4",
      author: "dev",
      text: "The grandfather detail makes this feel so personal. Can't wait to see where this goes.",
      createdAt: "1 day ago",
    },
  ],
}

export const dummyMyStory = {
  id: "1",
  title: "The Cartographer of Forgotten Seas",
  genre: "Fantasy",
  description:
    "A story of wonder and quiet dread. The sea should feel ancient and alive. Aim for an ending where the map leads home.",
  author: "zainab",
  status: "open",
  createdAt: "3 days ago",
  paragraphs: [
    {
      id: "p1",
      author: "zainab",
      isOwner: true,
      text: "The map appeared only at the stroke of midnight, drawn in ink that smelled of brine and old storms. Tariq had found it tucked beneath the floorboards of his grandfather's fishing hut — a hut that had been empty for eleven years. The parchment showed coastlines he did not recognize, islands that bore no name in any atlas he had ever read, and at the very center, a single word written in his grandfather's hand: Come.",
      createdAt: "3 days ago",
    },
    {
      id: "p2",
      author: "aryan",
      isOwner: false,
      text: "He had meant to ignore it. He was a practical man — a fisherman who trusted tides and weather, not paper and ink that vanished by morning. But the third night, he found himself standing at the water's edge with the map in his hands, watching the lines rearrange themselves into something that looked unmistakably like the cove outside his door.",
      createdAt: "2 days ago",
    },
    {
      id: "p3",
      author: "mei",
      isOwner: false,
      text: "The boat moved without wind. That was the first thing that frightened him. The second was the silence — not the comfortable silence of an empty sea, but the deliberate hush of something vast holding its breath just below the surface. The stars above were wrong. Not dramatically wrong, not science-fiction wrong, but tilted, slightly, as though the sky had been folded and put back imperfectly.",
      createdAt: "1 day ago",
    },
    {
      id: "p4",
      author: "riya",
      isOwner: false,
      text: "He thought of his grandfather then — not the old man he remembered, bent and smelling of pipe smoke, but the younger version he had only seen in photographs. That man had the same look in his eyes that Tariq imagined he himself must have now. The look of someone who has stopped asking where he is going and started simply going.",
      createdAt: "18 hours ago",
    },
  ],
  contributors: [
    { author: "aryan", count: 4, isNew: true },
    { author: "mei", count: 3, isNew: true },
    { author: "riya", count: 2, isNew: false },
    { author: "samir", count: 2, isNew: false },
    { author: "kira", count: 1, isNew: false },
    { author: "dev", count: 1, isNew: false },
  ],
}

export const dummyProfile = {
  name: "Aryan Mehta",
  username: "aryan",
  joinedAt: "January 2025",
  bio: "I write stories that begin in the middle of something and never quite explain how. Lover of folklore, fog, and unreliable narrators.",
  totalParagraphsWritten: 84,
  totalContributors: 213,
  stories: [
    {
      id: "2",
      title: "The House That Remembered Everything",
      genre: "Horror",
      description:
        "Every family that moves in vanishes. The house keeps their voices in the walls, waiting for the next ones to arrive.",
      author: "aryan",
      contributors: 6,
      status: "completed",
      createdAt: "5 days ago",
    },
    {
      id: "10",
      title: "The River That Spoke at Dusk",
      genre: "Folklore",
      description:
        "Villagers had always known not to listen to the river after sunset. One child did not know.",
      author: "aryan",
      contributors: 9,
      status: "open",
      createdAt: "3 days ago",
    },
    {
      id: "11",
      title: "The Man Who Slept Through Tuesday",
      genre: "Mystery",
      description:
        "He woke up Wednesday and everyone around him acted like Tuesday had never happened at all.",
      author: "aryan",
      contributors: 5,
      status: "open",
      createdAt: "1 day ago",
    },
    {
      id: "12",
      title: "A Letter With No Return Address",
      genre: "Thriller",
      description:
        "She recognized the handwriting immediately. The problem was that the person who wrote it had been dead for six years.",
      author: "aryan",
      contributors: 3,
      status: "open",
      createdAt: "12 hours ago",
    },
  ],
}

export const dummyDashboard = {
  name: "Zainab Perween",
  username: "zainab",
  joinedAt: "March 2025",
  bio: "I start stories and let the world finish them. Believer in collaborative magic.",
  notifications: [
    {
      id: "n1",
      type: "contribution",
      message: "@aryan added a new paragraph to The Cartographer of Forgotten Seas",
      createdAt: "2 hours ago",
      read: false,
    },
    {
      id: "n2",
      type: "comment",
      message: "@kira commented on The Cartographer of Forgotten Seas",
      createdAt: "5 hours ago",
      read: false,
    },
    {
      id: "n3",
      type: "contribution",
      message: "@mei added a new paragraph to The Cartographer of Forgotten Seas",
      createdAt: "1 day ago",
      read: true,
    },
    {
      id: "n4",
      type: "comment",
      message: "@samir commented on The Cartographer of Forgotten Seas",
      createdAt: "1 day ago",
      read: true,
    },
  ],
  myStories: [
    {
      id: "1",
      title: "The Cartographer of Forgotten Seas",
      genre: "Fantasy",
      description: "A map only visible at midnight leads a fisherman to waters no living soul has ever charted.",
      author: "zainab",
      contributors: 12,
      status: "open",
      createdAt: "3 days ago",
    },
    {
      id: "13",
      title: "The House That Remembered Everything",
      genre: "Horror",
      description: "Every family that moves in vanishes. The house keeps their voices in the walls.",
      author: "zainab",
      contributors: 6,
      status: "completed",
      createdAt: "5 days ago",
    },
    {
      id: "14",
      title: "The Girl Who Collected Silences",
      genre: "Drama",
      description: "She kept them in jars on her windowsill — the silence after an argument, the silence before a goodbye.",
      author: "zainab",
      contributors: 4,
      status: "open",
      createdAt: "1 day ago",
    },
    {
      id: "15",
      title: "When the Lighthouse Went Dark",
      genre: "Mystery",
      description: "The lighthouse keeper vanished on the same night every ship in the harbor changed course.",
      author: "zainab",
      contributors: 2,
      status: "open",
      createdAt: "12 hours ago",
    },
  ],
  contributedStories: [
    {
      id: "3",
      title: "Letters from a Dead Star",
      genre: "Sci-Fi",
      description: "A signal arrives from a star that collapsed forty years ago. The message is addressed to someone not yet born.",
      author: "mei",
      contributors: 9,
      status: "open",
      myParagraphs: 3,
      lastContributed: "2 hours ago",
    },
    {
      id: "10",
      title: "The River That Spoke at Dusk",
      genre: "Folklore",
      description: "Villagers had always known not to listen to the river after sunset. One child did not know.",
      author: "aryan",
      contributors: 9,
      status: "open",
      myParagraphs: 2,
      lastContributed: "yesterday",
    },
    {
      id: "4",
      title: "A Wolf Who Forgot Winter",
      genre: "Folklore",
      description: "The pack circled him not with menace but with grief, for they had never seen one of their own forget the cold.",
      author: "nomad",
      contributors: 4,
      status: "open",
      myParagraphs: 1,
      lastContributed: "3 days ago",
    },
  ],
}

comments: [
  {
    id: "c1",
    author: "riya",
    text: "@aryan the detail about stars being tilted is genuinely unsettling, love it",
    createdAt: "2 hours ago",
    replies: [
      {
        id: "r1",
        author: "aryan",
        text: "Thank you! That part just came naturally, glad it landed.",
        createdAt: "1 hour ago",
      }
    ],
  },
  {
    id: "c2",
    author: "samir",
    text: "Someone should continue with what's under the water. The setup is perfect for it.",
    createdAt: "5 hours ago",
    replies: [],
  },
  {
    id: "c3",
    author: "kira",
    text: "This is the best story on the platform right now. @zainab the opening paragraph is incredible.",
    createdAt: "1 day ago",
    replies: [],
  },
  {
    id: "c4",
    author: "dev",
    text: "The grandfather detail makes this feel so personal. Can't wait to see where this goes.",
    createdAt: "1 day ago",
    replies: [],
  },
]

export default dummyStories;
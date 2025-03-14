export interface SelfCareArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  duration: string;
  author: string;
  image: string;
}

export const selfCareArticles: SelfCareArticle[] = [
  {
    id: 1,
    title: "The Importance of Self-Care Routines",
    description: "Learn how to create and maintain effective self-care practices",
    content: `Self-care is more than just a buzzword—it's a vital practice for maintaining mental health and overall well-being. This comprehensive guide explores how to build sustainable self-care routines that fit your lifestyle.

Key aspects of self-care:
1. Physical self-care: Exercise, nutrition, and sleep
2. Emotional self-care: Journaling, therapy, and emotional awareness
3. Social self-care: Setting boundaries and nurturing relationships
4. Spiritual self-care: Meditation, mindfulness, and finding meaning

Creating your routine:
• Start small with 5-10 minutes daily
• Choose activities you genuinely enjoy
• Track your progress and adjust as needed
• Be consistent but flexible`,
    category: "Daily Practices",
    duration: "5 min",
    author: "Dr. Emma Wilson",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597"
  },
  {
    id: 2,
    title: "Mindful Self-Care Techniques",
    description: "Discover mindfulness-based approaches to self-care",
    content: `Mindfulness is a powerful tool for self-care that can help reduce stress, anxiety, and depression. Learn practical mindfulness techniques you can incorporate into your daily life.

Essential mindfulness practices:
1. Mindful breathing exercises
2. Body scan meditation
3. Walking meditation
4. Mindful eating
5. Gratitude practice

Benefits of mindful self-care:
• Reduced stress and anxiety
• Improved emotional regulation
• Better sleep quality
• Enhanced self-awareness
• Increased focus and productivity`,
    category: "Mindfulness",
    duration: "8 min",
    author: "Sarah Chen, LMFT",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
  },
  {
    id: 3,
    title: "Physical Self-Care Practices",
    description: "Explore exercises and activities for physical well-being",
    content: `Physical self-care forms the foundation of overall well-being. This guide covers essential physical self-care practices that support mental health.

Key areas of physical self-care:
1. Exercise and movement
2. Nutrition and hydration
3. Sleep hygiene
4. Rest and recovery
5. Physical environment

Practical tips:
• Start with 10 minutes of morning stretching
• Take regular movement breaks
• Create a calming bedtime routine
• Stay hydrated throughout the day
• Maintain a clean and organized space`,
    category: "Physical Health",
    duration: "6 min",
    author: "Dr. Michael Chang",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
  },
  {
    id: 4,
    title: "Emotional Self-Care Strategies",
    description: "Understanding and managing your emotional health",
    content: `Emotional self-care is crucial for maintaining mental well-being. Learn effective strategies for managing emotions and building emotional resilience.

Essential emotional self-care practices:
1. Emotional awareness exercises
2. Journaling techniques
3. Healthy coping mechanisms
4. Boundary setting
5. Self-compassion practices

Building emotional resilience:
• Identify and name your emotions
• Accept emotions without judgment
• Develop healthy coping strategies
• Seek support when needed
• Practice self-compassion daily`,
    category: "Emotional Health",
    duration: "7 min",
    author: "Dr. Rachel Green",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88"
  },
  {
    id: 5,
    title: "Self-Care at Work",
    description: "Maintaining well-being in professional settings",
    content: `Learn how to prioritize self-care in the workplace and maintain a healthy work-life balance.

Workplace self-care strategies:
1. Setting boundaries
2. Taking regular breaks
3. Creating a comfortable workspace
4. Managing workplace stress
5. Effective time management

Practical workplace tips:
• Schedule regular breaks
• Practice desk exercises
• Maintain work-life boundaries
• Use stress-management techniques
• Create a supportive network`,
    category: "Work-Life Balance",
    duration: "4 min",
    author: "Lisa Anderson, MBA",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc"
  },
  {
    id: 6,
    title: "Digital Wellness and Self-Care",
    description: "Managing your relationship with technology",
    content: `In our connected world, digital wellness is an essential aspect of self-care. Learn how to maintain a healthy relationship with technology.

Digital wellness strategies:
1. Setting screen time limits
2. Creating tech-free zones
3. Digital detox practices
4. Mindful social media use
5. Healthy online boundaries

Implementation tips:
• Schedule regular digital detox periods
• Create tech-free bedtime routines
• Use apps mindfully
• Practice digital minimalism
• Set notification boundaries`,
    category: "Digital Wellness",
    duration: "6 min",
    author: "Tech Wellness Expert",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
  },
  {
    id: 7,
    title: "Creative Self-Care Activities",
    description: "Exploring artistic and creative wellness practices",
    content: `Creative activities can be powerful tools for self-care and emotional expression. Discover various creative practices that promote mental well-being.

Creative self-care ideas:
1. Art therapy exercises
2. Expressive writing
3. Music and movement
4. DIY projects
5. Nature-inspired creativity

Benefits of creative self-care:
• Stress reduction
• Emotional expression
• Mindful focus
• Self-discovery
• Joy and satisfaction`,
    category: "Creative Expression",
    duration: "5 min",
    author: "Maria Torres, Art Therapist",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f"
  },
  {
    id: 8,
    title: "Nutritional Self-Care",
    description: "Nourishing your body and mind through food",
    content: `Nutrition plays a crucial role in mental health and well-being. Learn about mindful eating and nutritional self-care practices.

Key nutritional self-care aspects:
1. Mindful eating practices
2. Mood-boosting foods
3. Hydration habits
4. Meal planning
5. Social eating

Practical nutrition tips:
• Practice mindful eating
• Include mood-supporting foods
• Stay properly hydrated
• Plan meals ahead
• Create enjoyable eating experiences`,
    category: "Nutrition",
    duration: "7 min",
    author: "Dr. Sarah Johnson, RD",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  }
];

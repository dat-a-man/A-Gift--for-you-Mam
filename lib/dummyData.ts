import { BlogPost, Category } from "@/types/blog";

export const dummyCategories: Category[] = [
  { name: "Curiosity and Magic at 80+", slug: "curiosity-and-magic-at-80", description: "Finding wonder in everyday things." },
  { name: "Ageing Well, But The Odd Problem?", slug: "ageing-well", description: "The reality of growing older." },
  { name: "Later years? Happy Years!", slug: "happy-years", description: "Celebrating the golden years." },
  { name: "Let's Challenge Unthinking Ageism", slug: "challenge-ageism", description: "Speaking out against stereotypes." },
];

export const dummyPosts: BlogPost[] = [
  {
    id: "1",
    created_at: "2024-03-15T10:00:00Z",
    updated_at: "2024-03-15T10:00:00Z",
    title: "The Garden Path Led Somewhere Unexpected",
    slug: "the-garden-path-led-somewhere-unexpected",
    description: "The knees needed their daily. So I followed the path. It led somewhere wonderful.",
    excerpt: "The knees needed their daily. So I followed the path behind the old church—the one I'd walked past a hundred times but never taken. It wound through a bit of woodland, and do you know what? It turned out to be a bluebell wood. Clean paths, well gravelled, good for anyone with a stick or a wheelchair. The sort of green space that reminds you communities still look after each other.",
    cover_image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop",
    published_at: "2024-03-15T10:00:00Z",
    categories: dummyCategories[0],
    tags: ["nature", "curiosity", "walking", "bluebells"],
    reading_time: 4,
    body: [
      {
        _type: "block",
        _key: "b1",
        children: [{ _type: "span", _key: "s1", text: "The knees needed their daily. So I followed the path behind the old church—the one I'd walked past a hundred times but never taken. It wound through a bit of woodland, and do you know what? It turned out to be a bluebell wood. Clean paths, well gravelled, good for anyone with a stick or a wheelchair. The sort of green space that reminds you communities still look after each other. Curiosity is my best gift. I suspect my mother gave it to me. Each week at bedtime she read to us—adventure stories, histories, odd bits of the world. That's how it starts, I think. Someone shows you the map, and you spend the rest of your life wondering what's down the next path." }]
      }
    ]
  },
  {
    id: "2",
    created_at: "2024-02-28T10:00:00Z",
    updated_at: "2024-02-28T10:00:00Z",
    title: "Is It Rude to Be Content? Thoughts at 85.",
    slug: "is-it-rude-to-be-content",
    description: "At 80+ you've lost family, friends, neighbours. Yet somehow—contentment.",
    excerpt: "At 80+ you've lost family, many friends, and neighbours. You know, quite starkly, that the queue is shortening. And yet—here's the odd thing—I find myself oddly content. Not in a morbid way. I'm not ill. I enjoy life enormously. But the frantic need to achieve, to prove, to grasp? It softens. You realise the small things were the big things all along. A cup of tea. A good book. A walk when the knees allow.",
    cover_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    published_at: "2024-02-28T10:00:00Z",
    categories: dummyCategories[2],
    tags: ["contentment", "ageing", "perspective", "gratitude"],
    reading_time: 5,
    body: [
      {
        _type: "block",
        _key: "b1",
        children: [{ _type: "span", _key: "s1", text: "At 80+ you've lost family, many friends, and neighbours. You know, quite starkly, that the queue is shortening. And yet—here's the odd thing—I find myself oddly content. Not in a morbid way. I'm not ill. I enjoy life enormously. But the frantic need to achieve, to prove, to grasp? It softens. You realise the small things were the big things all along. A cup of tea. A good book. A walk when the knees allow. Someone asked me recently if I had a bucket list. I said no. I've done enough. The rest is bonus." }]
      }
    ]
  },
  {
    id: "3",
    created_at: "2024-02-10T10:00:00Z",
    updated_at: "2024-02-10T10:00:00Z",
    title: "Wobbling Is Exercise. Who Knew?",
    slug: "wobbling-is-exercise",
    description: "So long as it has speed and sudden stops or turns—it counts. The balance mechanisms need their workout too.",
    excerpt: "The physio said something that made me laugh. She said: wobbling counts. So long as you're moving, changing direction, stopping and starting—you're giving your balance mechanisms a proper workout. I'd been avoiding uneven ground, thinking I was being sensible. Turns out I was being too careful. A bit of shilly-shallying, a sudden stop to admire a flower, a quick turn when you hear a bird—it all helps. The body likes to be kept on its toes. Literally.",
    cover_image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    published_at: "2024-02-10T10:00:00Z",
    categories: dummyCategories[1],
    tags: ["exercise", "balance", "health", "physio"],
    reading_time: 3,
    body: [
      {
        _type: "block",
        _key: "b1",
        children: [{ _type: "span", _key: "s1", text: "The physio said something that made me laugh. She said: wobbling counts. So long as you're moving, changing direction, stopping and starting—you're giving your balance mechanisms a proper workout. I'd been avoiding uneven ground, thinking I was being sensible. Turns out I was being too careful. A bit of shilly-shallying, a sudden stop to admire a flower, a quick turn when you hear a bird—it all helps. The body likes to be kept on its toes. Literally. So go on. Wobble a bit. It's good for you." }]
      }
    ]
  },
  {
    id: "4",
    created_at: "2024-01-22T10:00:00Z",
    updated_at: "2024-01-22T10:00:00Z",
    title: "Did We Lose Something? Thoughts on Cleanliness and Risk.",
    slug: "did-we-lose-something",
    description: "A reader wrote in. We grew up rough. Dirty. Risky. Was it a wiser way?",
    excerpt: "A reader wrote to me recently—Marion, 84—and her letter struck a chord. She wondered if we'd lost something with all our cleanliness and our fear of risk. We grew up playing in the dirt, climbing trees, coming home filthy. Nobody sterilised everything. And we survived. More than survived—we learned. I'm not saying we should go back to that. But I do wonder if we've swung too far the other way. The young ones seem so anxious. So afraid of getting it wrong. We weren't. We got it wrong all the time. And we learned.",
    cover_image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
    published_at: "2024-01-22T10:00:00Z",
    categories: dummyCategories[2],
    tags: ["childhood", "memories", "wisdom", "risk"],
    reading_time: 4,
    body: [
      {
        _type: "block",
        _key: "b1",
        children: [{ _type: "span", _key: "s1", text: "A reader wrote to me recently—Marion, 84—and her letter struck a chord. She wondered if we'd lost something with all our cleanliness and our fear of risk. We grew up playing in the dirt, climbing trees, coming home filthy. Nobody sterilised everything. And we survived. More than survived—we learned. I'm not saying we should go back to that. But I do wonder if we've swung too far the other way. The young ones seem so anxious. So afraid of getting it wrong. We weren't. We got it wrong all the time. And we learned. What do you think?" }]
      }
    ]
  },
  {
    id: "5",
    created_at: "2024-01-08T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z",
    title: "The Self-Checkout Thinks I'm Stupid. I'm Not.",
    slug: "the-self-checkout-thinks-im-stupid",
    description: "Technology is supposed to make life easier. For some of us, it just makes us feel invisible.",
    excerpt: "I went to the supermarket yesterday. All the regular tills were closed. Self-checkout only. I stood there while the machine bleeped at me, while people behind me sighed, while I fumbled for my reading glasses to see the tiny screen. Nobody offered to help. They probably thought I was slow. I'm not slow. I've run departments, raised a family, written books. I just can't see the screen. And I refuse to feel stupid for that. This is unthinking ageism—designing the world for one sort of person and acting surprised when the rest of us struggle.",
    cover_image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1200&auto=format&fit=crop",
    published_at: "2024-01-08T10:00:00Z",
    categories: dummyCategories[3],
    tags: ["ageism", "technology", "everyday-life", "dignity"],
    reading_time: 4,
    body: [
      {
        _type: "block",
        _key: "b1",
        children: [{ _type: "span", _key: "s1", text: "I went to the supermarket yesterday. All the regular tills were closed. Self-checkout only. I stood there while the machine bleeped at me, while people behind me sighed, while I fumbled for my reading glasses to see the tiny screen. Nobody offered to help. They probably thought I was slow. I'm not slow. I've run departments, raised a family, written books. I just can't see the screen. And I refuse to feel stupid for that. This is unthinking ageism—designing the world for one sort of person and acting surprised when the rest of us struggle. We need to challenge it. Politely. Firmly. Every time." }]
      }
    ]
  }
];

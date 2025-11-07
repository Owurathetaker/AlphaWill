import { Quote, QuoteInput, Category } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllQuotes(): Promise<Quote[]>;
  getQuotesByCategory(category: Category): Promise<Quote[]>;
  getDailyQuote(): Promise<Quote>;
  getRandomQuote(): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private quotes: Map<string, Quote>;

  constructor() {
    this.quotes = new Map();
    this.seedQuotes();
  }

  private seedQuotes() {
    const warriorQuotes: QuoteInput[] = [
      {
        text: "Discipline is choosing between what you want now and what you want most.",
        author: "Abraham Lincoln",
        category: "Discipline",
        biblicalReference: "1 Corinthians 9:27"
      },
      {
        text: "The price of greatness is responsibility. Every man must answer for his actions.",
        author: "Winston Churchill",
        category: "Integrity",
        biblicalReference: "Romans 14:12"
      },
      {
        text: "Strength does not come from physical capacity. It comes from an indomitable will.",
        author: "Mahatma Gandhi",
        category: "Strength",
        biblicalReference: "Philippians 4:13"
      },
      {
        text: "A goal without a plan is just a wish. Lock in and execute.",
        author: "Antoine de Saint-Exupéry",
        category: "Goals",
        biblicalReference: "Proverbs 21:5"
      },
      {
        text: "Faith is taking the first step even when you don't see the whole staircase.",
        author: "Martin Luther King Jr.",
        category: "Faith",
        biblicalReference: "Hebrews 11:1"
      },
      {
        text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to make some difference that you have lived.",
        author: "Ralph Waldo Emerson",
        category: "Purpose",
        biblicalReference: "Ephesians 2:10"
      },
      {
        text: "Hard times don't create heroes. It is during the hard times when the hero within us is revealed.",
        author: "Bob Riley",
        category: "Strength",
        biblicalReference: "James 1:2-4"
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "Discipline",
        biblicalReference: "Galatians 6:9"
      },
      {
        text: "Do not pray for an easy life, pray for the strength to endure a difficult one.",
        author: "Bruce Lee",
        category: "Faith",
        biblicalReference: "Isaiah 40:31"
      },
      {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "Strength",
        biblicalReference: "Proverbs 24:16"
      },
      {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs",
        category: "Purpose",
        biblicalReference: "Jeremiah 29:11"
      },
      {
        text: "The only way to do great work is to love what you do and give it everything.",
        author: "Steve Jobs",
        category: "Goals",
        biblicalReference: "Colossians 3:23"
      },
      {
        text: "Character is doing the right thing when nobody's looking.",
        author: "J.C. Watts",
        category: "Integrity",
        biblicalReference: "Proverbs 11:3"
      },
      {
        text: "The difference between who you are and who you want to be is what you do.",
        author: "Bill Phillips",
        category: "Discipline",
        biblicalReference: "James 2:17"
      },
      {
        text: "God gives his hardest battles to his strongest soldiers.",
        author: "Unknown",
        category: "Faith",
        biblicalReference: "2 Corinthians 12:9"
      },
      {
        text: "A man who stands for nothing will fall for anything.",
        author: "Malcolm X",
        category: "Integrity",
        biblicalReference: "Ephesians 6:13"
      },
      {
        text: "You don't have to be great to start, but you have to start to be great.",
        author: "Zig Ziglar",
        category: "Goals",
        biblicalReference: "Zechariah 4:10"
      },
      {
        text: "Courage is not the absence of fear, but the triumph over it.",
        author: "Nelson Mandela",
        category: "Strength",
        biblicalReference: "Joshua 1:9"
      },
      {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
        category: "Purpose",
        biblicalReference: "Romans 8:29"
      },
      {
        text: "Integrity is doing the right thing, even when no one is watching.",
        author: "C.S. Lewis",
        category: "Integrity",
        biblicalReference: "Psalm 15:2"
      },
      {
        text: "A champion is someone who gets up when he can't.",
        author: "Jack Dempsey",
        category: "Discipline",
        biblicalReference: "Philippians 3:14"
      },
      {
        text: "With God, all things are possible. Trust Him even when you can't trace Him.",
        author: "Matthew 19:26",
        category: "Faith",
        biblicalReference: "Matthew 19:26"
      },
      {
        text: "Set your goals high, and don't stop till you get there.",
        author: "Bo Jackson",
        category: "Goals",
        biblicalReference: "Philippians 3:13-14"
      },
      {
        text: "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
        author: "Rikki Rogers",
        category: "Strength",
        biblicalReference: "Isaiah 41:10"
      },
      {
        text: "Your purpose in life is to find your purpose and give your whole heart and soul to it.",
        author: "Buddha",
        category: "Purpose",
        biblicalReference: "Proverbs 19:21"
      },
      {
        text: "Excellence is not a destination; it is a continuous journey that never ends.",
        author: "Brian Tracy",
        category: "Discipline",
        biblicalReference: "2 Peter 1:5-7"
      },
      {
        text: "Real integrity is doing the right thing, knowing that nobody's going to know whether you did it or not.",
        author: "Oprah Winfrey",
        category: "Integrity",
        biblicalReference: "Proverbs 10:9"
      },
      {
        text: "Faith is the bird that feels the light when the dawn is still dark.",
        author: "Rabindranath Tagore",
        category: "Faith",
        biblicalReference: "Romans 8:24-25"
      },
      {
        text: "A goal is a dream with a deadline. Make it happen.",
        author: "Napoleon Hill",
        category: "Goals",
        biblicalReference: "Habakkuk 2:2"
      },
      {
        text: "True strength is keeping everything together when everyone expects you to fall apart.",
        author: "Unknown",
        category: "Strength",
        biblicalReference: "2 Corinthians 4:8-9"
      },
      {
        text: "The two most important days in your life are the day you are born and the day you find out why.",
        author: "Mark Twain",
        category: "Purpose",
        biblicalReference: "Ecclesiastes 3:1"
      },
      {
        text: "Self-discipline is the magic power that makes you virtually unstoppable.",
        author: "Dan Kennedy",
        category: "Discipline",
        biblicalReference: "Proverbs 25:28"
      },
      {
        text: "Live so that when your children think of fairness, caring, and integrity, they think of you.",
        author: "H. Jackson Brown Jr.",
        category: "Integrity",
        biblicalReference: "Proverbs 20:7"
      },
      {
        text: "Faith makes all things possible. Love makes all things easy. Hope makes all things work.",
        author: "Unknown",
        category: "Faith",
        biblicalReference: "1 Corinthians 13:13"
      },
      {
        text: "Setting goals is the first step in turning the invisible into the visible.",
        author: "Tony Robbins",
        category: "Goals",
        biblicalReference: "Hebrews 11:1"
      },
      {
        text: "Strength is the product of struggle. You must do what others don't to achieve what others won't.",
        author: "Henry Rollins",
        category: "Strength",
        biblicalReference: "Romans 5:3-4"
      },
      {
        text: "The meaning of life is to find your gift. The purpose of life is to give it away.",
        author: "Pablo Picasso",
        category: "Purpose",
        biblicalReference: "1 Peter 4:10"
      },
      {
        text: "We are what we repeatedly do. Excellence, then, is not an act but a habit.",
        author: "Aristotle",
        category: "Discipline",
        biblicalReference: "Hebrews 10:36"
      },
      {
        text: "The supreme quality for leadership is unquestionably integrity. Without it, no real success is possible.",
        author: "Dwight D. Eisenhower",
        category: "Integrity",
        biblicalReference: "Proverbs 11:3"
      },
      {
        text: "Faith is not something to grasp, it is a state to grow into.",
        author: "Mahatma Gandhi",
        category: "Faith",
        biblicalReference: "2 Peter 3:18"
      },
      {
        text: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis",
        category: "Goals",
        biblicalReference: "Joel 2:28"
      },
      {
        text: "Strength is not just about physical power, but the power to persevere when all seems lost.",
        author: "Unknown",
        category: "Strength",
        biblicalReference: "Psalm 46:1"
      },
      {
        text: "He who has a why to live can bear almost any how.",
        author: "Friedrich Nietzsche",
        category: "Purpose",
        biblicalReference: "Colossians 1:16"
      },
      {
        text: "Discipline is the bridge between goals and accomplishment.",
        author: "Jim Rohn",
        category: "Discipline",
        biblicalReference: "Proverbs 13:18"
      },
      {
        text: "Integrity is the essence of everything successful.",
        author: "R. Buckminster Fuller",
        category: "Integrity",
        biblicalReference: "Proverbs 28:6"
      },
      {
        text: "Let your faith be bigger than your fear. Trust God's timing.",
        author: "Unknown",
        category: "Faith",
        biblicalReference: "Psalm 27:1"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams and chase them relentlessly.",
        author: "Eleanor Roosevelt",
        category: "Goals",
        biblicalReference: "Jeremiah 29:11"
      },
      {
        text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        author: "Marcus Aurelius",
        category: "Strength",
        biblicalReference: "Philippians 4:8"
      },
      {
        text: "The purpose of our lives is to be happy and to make others happy.",
        author: "Dalai Lama",
        category: "Purpose",
        biblicalReference: "Ecclesiastes 3:12"
      },
      {
        text: "Without self-discipline, success is impossible. Period.",
        author: "Lou Holtz",
        category: "Discipline",
        biblicalReference: "1 Corinthians 9:25"
      },
      {
        text: "In looking for people to hire, you look for three qualities: integrity, intelligence, and energy. And if they don't have the first, the other two will kill you.",
        author: "Warren Buffett",
        category: "Integrity",
        biblicalReference: "Proverbs 12:22"
      }
    ];

    warriorQuotes.forEach(quoteInput => {
      const id = randomUUID();
      const quote: Quote = { ...quoteInput, id };
      this.quotes.set(id, quote);
    });
  }

  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuotesByCategory(category: Category): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(q => q.category === category);
  }

  async getDailyQuote(): Promise<Quote> {
    const quotes = Array.from(this.quotes.values());
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % quotes.length;
    return quotes[index];
  }

  async getRandomQuote(): Promise<Quote> {
    const quotes = Array.from(this.quotes.values());
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
}

export const storage = new MemStorage();

export const knowledgeResources = [
  // ==========================================
  // Web2 - Beginner
  // ==========================================
  {
    id: 1,
    title: "MDN Learn Web Development",
    domain: "Web2",
    type: "Documentation",
    difficulty: "Beginner",
    description: "An excellent starting point for learning HTML, CSS, and JavaScript from scratch.",
    author: "Mozilla",
    tags: ["HTML", "CSS", "JavaScript", "Beginner"],
    cost: "Free",
    official: true,
    links: [{ label: "Start Learning", url: "https://developer.mozilla.org/en-US/docs/Learn" }],
    rating: "9.5/10"
  },
  {
    id: 2,
    title: "freeCodeCamp - Responsive Web Design",
    domain: "Web2",
    type: "Interactive Course",
    difficulty: "Beginner",
    description: "A free, comprehensive, interactive curriculum to learn HTML and CSS.",
    author: "freeCodeCamp",
    tags: ["HTML", "CSS", "Responsive Design", "Interactive"],
    cost: "Free",
    official: false,
    links: [{ label: "Course", url: "https://www.freecodecamp.org/learn/responsive-web-design/" }],
    rating: "9.6/10"
  },
  {
    id: 3,
    title: "Codecademy - Learn HTML",
    domain: "Web2",
    type: "Interactive Course",
    difficulty: "Beginner",
    description: "Interactive learning platform perfect for absolute beginners writing their first lines of code.",
    author: "Codecademy",
    tags: ["HTML", "Basics", "Interactive"],
    cost: "Freemium",
    official: false,
    links: [{ label: "Course", url: "https://www.codecademy.com/learn/learn-html" }],
    rating: "8.5/10"
  },

  // ==========================================
  // Web2 - Intermediate
  // ==========================================
  {
    id: 4,
    title: "The Odin Project",
    domain: "Web2",
    type: "Curriculum",
    difficulty: "Intermediate",
    description: "A project-oriented full-stack curriculum covering JavaScript, React, Node.js, databases, and more.",
    author: "The Odin Project",
    tags: ["JavaScript", "React", "Node.js", "Projects"],
    cost: "Free",
    official: false,
    links: [{ label: "Curriculum", url: "https://www.theodinproject.com/" }],
    rating: "9.8/10"
  },
  {
    id: 5,
    title: "Full Stack Open",
    domain: "Web2",
    type: "Course",
    difficulty: "Intermediate",
    description: "Deep dive into React, Redux, Node.js, Express, databases, testing, TypeScript, and CI/CD.",
    author: "University of Helsinki",
    tags: ["React", "TypeScript", "Node.js", "CI/CD"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://fullstackopen.com/en/" }],
    rating: "9.7/10"
  },
  {
    id: 6,
    title: "JavaScript.info",
    domain: "Web2",
    type: "Guide",
    difficulty: "Intermediate",
    description: "A detailed written JavaScript curriculum covering the language itself and browser APIs.",
    author: "Ilya Kantor",
    tags: ["JavaScript", "DOM", "Async", "Web APIs"],
    cost: "Free",
    official: false,
    links: [{ label: "Read Guide", url: "https://javascript.info/" }],
    rating: "9.4/10"
  },

  // ==========================================
  // Web2 - Advanced
  // ==========================================
  {
    id: 7,
    title: "React Official Documentation",
    domain: "Web2",
    type: "Documentation",
    difficulty: "Advanced",
    description: "The canonical React learning resource. Dive deep into advanced state, effects, and architecture.",
    author: "Meta",
    tags: ["React", "Architecture", "Hooks", "Frontend"],
    cost: "Free",
    official: true,
    links: [{ label: "Docs", url: "https://react.dev/" }],
    rating: "9.5/10"
  },
  {
    id: 8,
    title: "Web.dev",
    domain: "Web2",
    type: "Articles",
    difficulty: "Advanced",
    description: "Google's platform for web developers, covering advanced performance, accessibility, and modern CSS/JS.",
    author: "Google",
    tags: ["Performance", "Web Vitals", "Accessibility", "CSS"],
    cost: "Free",
    official: true,
    links: [{ label: "Website", url: "https://web.dev/" }],
    rating: "9.3/10"
  },
  {
    id: 9,
    title: "Patterns.dev",
    domain: "Web2",
    type: "Book / Articles",
    difficulty: "Advanced",
    description: "A free book on design patterns and component patterns for building powerful web apps.",
    author: "Lydia Hallie & Addy Osmani",
    tags: ["Design Patterns", "Architecture", "React", "Performance"],
    cost: "Free",
    official: false,
    links: [{ label: "Read Book", url: "https://www.patterns.dev/" }],
    rating: "9.6/10"
  },

  // ==========================================
  // Web3 - Beginner
  // ==========================================
  {
    id: 10,
    title: "CryptoZombies",
    domain: "Web3",
    type: "Interactive Course",
    difficulty: "Beginner",
    description: "Learn to code Ethereum smart contracts by building a zombie game.",
    author: "Loom Network",
    tags: ["Solidity", "Smart Contracts", "Ethereum", "Game"],
    cost: "Free",
    official: false,
    links: [{ label: "Play & Learn", url: "https://cryptozombies.io/" }],
    rating: "9.4/10"
  },
  {
    id: 11,
    title: "LearnWeb3 DAO (Freshman Track)",
    domain: "Web3",
    type: "Curriculum",
    difficulty: "Beginner",
    description: "The best starting track for complete beginners to understand blockchains, wallets, and basic smart contracts.",
    author: "LearnWeb3",
    tags: ["Blockchain", "Ethereum", "Wallets"],
    cost: "Free",
    official: false,
    links: [{ label: "Website", url: "https://learnweb3.io/" }],
    rating: "9.2/10"
  },
  {
    id: 12,
    title: "Ethereum.org Learn",
    domain: "Web3",
    type: "Documentation",
    difficulty: "Beginner",
    description: "Official guides and resources to understand Ethereum concepts and basic development.",
    author: "Ethereum Foundation",
    tags: ["Ethereum", "Concepts", "Blockchain"],
    cost: "Free",
    official: true,
    links: [{ label: "Docs", url: "https://ethereum.org/en/learn/" }],
    rating: "9.0/10"
  },

  // ==========================================
  // Web3 - Intermediate
  // ==========================================
  {
    id: 13,
    title: "Cyfrin Updraft",
    domain: "Web3",
    type: "Course",
    difficulty: "Intermediate",
    description: "A structured Solidity curriculum focusing on security, Foundry, and modern smart contract deployment.",
    author: "Cyfrin",
    tags: ["Solidity", "Foundry", "Security", "DeFi"],
    cost: "Free",
    official: false,
    links: [{ label: "Platform", url: "https://updraft.cyfrin.io/" }],
    rating: "9.5/10"
  },
  {
    id: 14,
    title: "SpeedRun Ethereum",
    domain: "Web3",
    type: "Projects",
    difficulty: "Intermediate",
    description: "Project-based challenges testing your Ethereum development skills using Scaffold-ETH.",
    author: "BuidlGuidl",
    tags: ["Ethereum", "Projects", "Scaffold-ETH", "React"],
    cost: "Free",
    official: false,
    links: [{ label: "Challenges", url: "https://speedrunethereum.com/" }],
    rating: "9.3/10"
  },
  {
    id: 15,
    title: "Alchemy University",
    domain: "Web3",
    type: "Course",
    difficulty: "Intermediate",
    description: "Comprehensive Web3 bootcamp covering cryptography, smart contracts, and dApp architecture.",
    author: "Alchemy",
    tags: ["Cryptography", "dApps", "Solidity", "Ethers.js"],
    cost: "Free",
    official: true,
    links: [{ label: "University", url: "https://university.alchemy.com/" }],
    rating: "9.4/10"
  },

  // ==========================================
  // Web3 - Advanced
  // ==========================================
  {
    id: 16,
    title: "Ethernaut",
    domain: "Web3",
    type: "Wargames",
    difficulty: "Advanced",
    description: "A Web3/Solidity based wargame to learn smart contract vulnerabilities and security.",
    author: "OpenZeppelin",
    tags: ["Security", "Exploits", "Solidity", "Wargames"],
    cost: "Free",
    official: true,
    links: [{ label: "Play", url: "https://ethernaut.openzeppelin.com/" }],
    rating: "9.7/10"
  },
  {
    id: 17,
    title: "Smart Contract Weakness Classification (SWC)",
    domain: "Web3",
    type: "Documentation",
    difficulty: "Advanced",
    description: "A comprehensive registry of known smart contract vulnerabilities and attack vectors.",
    author: "SWC Registry",
    tags: ["Security", "Vulnerabilities", "Auditing"],
    cost: "Free",
    official: true,
    links: [{ label: "Registry", url: "https://swcregistry.io/" }],
    rating: "9.1/10"
  },
  {
    id: 18,
    title: "Ethereum Yellow Paper",
    domain: "Web3",
    type: "Paper",
    difficulty: "Advanced",
    description: "The formal specification of the Ethereum protocol.",
    author: "Gavin Wood",
    tags: ["Protocol", "Mathematics", "EVM", "Core"],
    cost: "Free",
    official: true,
    links: [{ label: "Paper", url: "https://ethereum.github.io/yellowpaper/paper.pdf" }],
    rating: "9.9/10"
  },

  // ==========================================
  // AI/ML - Beginner
  // ==========================================
  {
    id: 19,
    title: "Kaggle Intro to Machine Learning",
    domain: "AI/ML",
    type: "Course",
    difficulty: "Beginner",
    description: "A very hands-on, code-first introduction to core Machine Learning models using Python.",
    author: "Kaggle",
    tags: ["Python", "Data Science", "Pandas", "Scikit-Learn"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://www.kaggle.com/learn/intro-to-machine-learning" }],
    rating: "9.2/10"
  },
  {
    id: 20,
    title: "Google Machine Learning Crash Course",
    domain: "AI/ML",
    type: "Course",
    difficulty: "Beginner",
    description: "Google's fast-paced, practical introduction to machine learning using TensorFlow.",
    author: "Google",
    tags: ["TensorFlow", "Neural Networks", "Crash Course"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://developers.google.com/machine-learning/crash-course" }],
    rating: "9.0/10"
  },
  {
    id: 21,
    title: "Elements of AI",
    domain: "AI/ML",
    type: "Course",
    difficulty: "Beginner",
    description: "A non-technical introduction to AI basics, ethics, and logic.",
    author: "University of Helsinki",
    tags: ["Theory", "Ethics", "AI Basics"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://www.elementsofai.com/" }],
    rating: "9.3/10"
  },

  // ==========================================
  // AI/ML - Intermediate
  // ==========================================
  {
    id: 22,
    title: "fast.ai — Practical Deep Learning",
    domain: "AI/ML",
    type: "Course",
    difficulty: "Intermediate",
    description: "A top-down, practical deep learning course focusing on building models before diving into math.",
    author: "fast.ai",
    tags: ["Deep Learning", "PyTorch", "Computer Vision", "NLP"],
    cost: "Free",
    official: false,
    links: [{ label: "Course", url: "https://course.fast.ai/" }],
    rating: "9.6/10"
  },
  {
    id: 23,
    title: "Machine Learning by Andrew Ng",
    domain: "AI/ML",
    type: "Course",
    difficulty: "Intermediate",
    description: "The legendary Coursera course that teaches the fundamentals of Machine Learning (Free Audit available).",
    author: "Stanford / Coursera",
    tags: ["Algorithms", "Supervised Learning", "Unsupervised Learning"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://www.coursera.org/specializations/machine-learning-introduction" }],
    rating: "9.8/10"
  },
  {
    id: 24,
    title: "Made With ML",
    domain: "AI/ML",
    type: "Course",
    difficulty: "Intermediate",
    description: "A practical ML engineering curriculum covering the full lifecycle of machine-learning systems (MLOps).",
    author: "Goku Mohandas",
    tags: ["MLOps", "Production ML", "Deployment"],
    cost: "Free",
    official: false,
    links: [{ label: "Website", url: "https://madewithml.com/" }],
    rating: "9.4/10"
  },

  // ==========================================
  // AI/ML - Advanced
  // ==========================================
  {
    id: 25,
    title: "Stanford CS229",
    domain: "AI/ML",
    type: "University Course",
    difficulty: "Advanced",
    description: "Stanford's foundational machine learning course. Mathematically rigorous and in-depth.",
    author: "Stanford University",
    tags: ["Mathematics", "Theory", "Algorithms", "Stanford"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://cs229.stanford.edu/" }],
    rating: "9.7/10"
  },
  {
    id: 26,
    title: "Hugging Face NLP Course",
    domain: "AI/ML",
    type: "Course",
    difficulty: "Advanced",
    description: "An advanced, comprehensive guide to using Transformer models and the Hugging Face ecosystem.",
    author: "Hugging Face",
    tags: ["NLP", "Transformers", "LLMs", "PyTorch"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1" }],
    rating: "9.5/10"
  },
  {
    id: 27,
    title: "DeepLearning.AI Specialization",
    domain: "AI/ML",
    type: "Course",
    difficulty: "Advanced",
    description: "Advanced deep learning sequence by Andrew Ng covering CNNs, RNNs, and sequence models.",
    author: "DeepLearning.AI",
    tags: ["Deep Learning", "Neural Networks", "TensorFlow"],
    cost: "Freemium",
    official: true,
    links: [{ label: "Course", url: "https://www.coursera.org/specializations/deep-learning" }],
    rating: "9.6/10"
  },

  // ==========================================
  // Cyber Security - Beginner
  // ==========================================
  {
    id: 28,
    title: "TryHackMe - Beginner Level",
    domain: "Cyber Security",
    type: "Interactive Labs",
    difficulty: "Beginner",
    description: "Gamified platform with virtual machines designed to teach security fundamentals to absolute beginners.",
    author: "TryHackMe",
    tags: ["Fundamentals", "Linux", "Networking", "Labs"],
    cost: "Freemium",
    official: true,
    links: [{ label: "Platform", url: "https://tryhackme.com/" }],
    rating: "9.5/10"
  },
  {
    id: 29,
    title: "OverTheWire - Bandit",
    domain: "Cyber Security",
    type: "Wargames",
    difficulty: "Beginner",
    description: "Learn Linux command line and basic security concepts by playing terminal-based wargames.",
    author: "OverTheWire",
    tags: ["Linux", "CLI", "Wargames"],
    cost: "Free",
    official: false,
    links: [{ label: "Bandit", url: "https://overthewire.org/wargames/bandit/" }],
    rating: "9.3/10"
  },
  {
    id: 30,
    title: "Cyber Security Base",
    domain: "Cyber Security",
    type: "Course",
    difficulty: "Beginner",
    description: "A free course series focusing on building secure software systems.",
    author: "University of Helsinki",
    tags: ["Web Security", "Software Engineering"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://cybersecuritybase.mooc.fi/" }],
    rating: "9.0/10"
  },

  // ==========================================
  // Cyber Security - Intermediate
  // ==========================================
  {
    id: 31,
    title: "PortSwigger Web Security Academy",
    domain: "Cyber Security",
    type: "Hands-on Labs",
    difficulty: "Intermediate",
    description: "Highly regarded platform built around practical vulnerability labs by the creators of Burp Suite.",
    author: "PortSwigger",
    tags: ["Web Security", "Burp Suite", "Pentesting", "OWASP"],
    cost: "Free",
    official: true,
    links: [{ label: "Academy", url: "https://portswigger.net/web-security" }],
    rating: "9.8/10"
  },
  {
    id: 32,
    title: "Hack The Box",
    domain: "Cyber Security",
    type: "Labs",
    difficulty: "Intermediate",
    description: "Penetration testing labs ranging from easy to hard. Great for practicing real-world exploitation.",
    author: "Hack The Box",
    tags: ["Pentesting", "Red Team", "Exploitation"],
    cost: "Freemium",
    official: true,
    links: [{ label: "Platform", url: "https://www.hackthebox.com/" }],
    rating: "9.4/10"
  },
  {
    id: 33,
    title: "PicoCTF",
    domain: "Cyber Security",
    type: "CTF Challenges",
    difficulty: "Intermediate",
    description: "A free computer security education program with original CTF challenges covering crypto, web, and reversing.",
    author: "Carnegie Mellon",
    tags: ["CTF", "Cryptography", "Reverse Engineering"],
    cost: "Free",
    official: true,
    links: [{ label: "Play", url: "https://picoctf.org/" }],
    rating: "9.3/10"
  },

  // ==========================================
  // Cyber Security - Advanced
  // ==========================================
  {
    id: 34,
    title: "Hack The Box Academy - Advanced Paths",
    domain: "Cyber Security",
    type: "Course",
    difficulty: "Advanced",
    description: "Deep dive modules covering advanced exploitation, malware analysis, and red teaming.",
    author: "Hack The Box",
    tags: ["Red Team", "Malware Analysis", "Advanced Labs"],
    cost: "Freemium",
    official: true,
    links: [{ label: "Academy", url: "https://academy.hackthebox.com/" }],
    rating: "9.6/10"
  },
  {
    id: 35,
    title: "OWASP Web Security Testing Guide",
    domain: "Cyber Security",
    type: "Documentation",
    description: "The ultimate reference for testing web application security.",
    difficulty: "Advanced",
    author: "OWASP",
    tags: ["OWASP", "Testing", "Methodology"],
    cost: "Free",
    official: true,
    links: [{ label: "Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" }],
    rating: "9.5/10"
  },
  {
    id: 36,
    title: "Phrack Magazine",
    domain: "Cyber Security",
    type: "Articles / Ezine",
    difficulty: "Advanced",
    description: "The legendary hacker ezine covering deep technical exploits, reverse engineering, and phreaking.",
    author: "Phrack Staff",
    tags: ["Exploitation", "Reverse Engineering", "Hacker Culture"],
    cost: "Free",
    official: false,
    links: [{ label: "Read", url: "http://phrack.org/" }],
    rating: "9.2/10"
  },

  // ==========================================
  // App Development - Beginner
  // ==========================================
  {
    id: 37,
    title: "Android Basics in Kotlin",
    domain: "App Development",
    type: "Course",
    difficulty: "Beginner",
    description: "Google's official starting point for learning Android app development with Kotlin.",
    author: "Google",
    tags: ["Android", "Kotlin", "Mobile"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://developer.android.com/courses/android-basics-kotlin/course" }],
    rating: "9.3/10"
  },
  {
    id: 38,
    title: "100 Days of SwiftUI",
    domain: "App Development",
    type: "Course",
    difficulty: "Beginner",
    description: "An incredibly popular free collection of tutorials that teaches iOS app development using Swift.",
    author: "Paul Hudson",
    tags: ["iOS", "SwiftUI", "Swift", "Apple"],
    cost: "Free",
    official: false,
    links: [{ label: "Course", url: "https://www.hackingwithswift.com/100/swiftui" }],
    rating: "9.8/10"
  },
  {
    id: 39,
    title: "Flutter - Get Started",
    domain: "App Development",
    type: "Documentation",
    difficulty: "Beginner",
    description: "The official guide to installing Flutter and building your first cross-platform mobile app.",
    author: "Google",
    tags: ["Flutter", "Dart", "Cross-Platform"],
    cost: "Free",
    official: true,
    links: [{ label: "Docs", url: "https://docs.flutter.dev/get-started/install" }],
    rating: "9.2/10"
  },

  // ==========================================
  // App Development - Intermediate
  // ==========================================
  {
    id: 40,
    title: "Stanford CS193p",
    domain: "App Development",
    type: "University Course",
    difficulty: "Intermediate",
    description: "Stanford's course on developing iOS applications using SwiftUI, going deeper into architecture.",
    author: "Stanford University",
    tags: ["iOS", "SwiftUI", "Architecture", "Stanford"],
    cost: "Free",
    official: true,
    links: [{ label: "Course", url: "https://cs193p.sites.stanford.edu/" }],
    rating: "9.6/10"
  },
  {
    id: 41,
    title: "Flutter Codelabs",
    domain: "App Development",
    type: "Tutorials",
    difficulty: "Intermediate",
    description: "Hands-on coding tutorials covering intermediate Flutter UI, animations, and state management.",
    author: "Google",
    tags: ["Flutter", "Dart", "Codelabs", "UI"],
    cost: "Free",
    official: true,
    links: [{ label: "Codelabs", url: "https://docs.flutter.dev/codelabs" }],
    rating: "9.1/10"
  },
  {
    id: 42,
    title: "React Native Official Docs",
    domain: "App Development",
    type: "Documentation",
    difficulty: "Intermediate",
    description: "Learn how to build native mobile apps using React.",
    author: "Meta",
    tags: ["React Native", "JavaScript", "Cross-Platform"],
    cost: "Free",
    official: true,
    links: [{ label: "Docs", url: "https://reactnative.dev/docs/getting-started" }],
    rating: "9.0/10"
  },

  // ==========================================
  // App Development - Advanced
  // ==========================================
  {
    id: 43,
    title: "Android Architecture Components",
    domain: "App Development",
    type: "Documentation",
    difficulty: "Advanced",
    description: "Advanced guide to robust app architecture using Jetpack, Room, ViewModels, and Coroutines.",
    author: "Google",
    tags: ["Android", "Architecture", "Jetpack"],
    cost: "Free",
    official: true,
    links: [{ label: "Guide", url: "https://developer.android.com/topic/architecture" }],
    rating: "9.4/10"
  },
  {
    id: 44,
    title: "iOS App Dev Tutorials",
    domain: "App Development",
    type: "Tutorials",
    difficulty: "Advanced",
    description: "Apple's official tutorials covering advanced iOS features, data flow, and drawing.",
    author: "Apple",
    tags: ["iOS", "Swift", "Apple", "Performance"],
    cost: "Free",
    official: true,
    links: [{ label: "Tutorials", url: "https://developer.apple.com/tutorials/app-dev-training" }],
    rating: "9.2/10"
  },
  {
    id: 45,
    title: "Flutter Performance Profiling",
    domain: "App Development",
    type: "Documentation",
    difficulty: "Advanced",
    description: "Learn how to profile memory, rendering, and network performance in large Flutter applications.",
    author: "Google",
    tags: ["Flutter", "Performance", "Dart DevTools"],
    cost: "Free",
    official: true,
    links: [{ label: "Docs", url: "https://docs.flutter.dev/perf/ui-performance" }],
    rating: "9.1/10"
  },

  // ==========================================
  // Open Source - Beginner
  // ==========================================
  {
    id: 46,
    title: "Open Source Guides",
    domain: "Open Source",
    type: "Guide",
    difficulty: "Beginner",
    description: "A practical introduction to participating in and maintaining open-source projects.",
    author: "GitHub",
    tags: ["Open Source", "GitHub", "Contributing"],
    cost: "Free",
    official: true,
    links: [{ label: "Website", url: "https://opensource.guide/" }],
    rating: "9.4/10"
  },
  {
    id: 47,
    title: "First Contributions",
    domain: "Open Source",
    type: "Project / Tutorial",
    difficulty: "Beginner",
    description: "A guided way to make a first open-source contribution and understand the pull-request workflow.",
    author: "First Contributions",
    tags: ["Git", "GitHub", "Pull Requests"],
    cost: "Free",
    official: false,
    links: [
      { label: "Website", url: "https://firstcontributions.github.io/" },
      { label: "GitHub", url: "https://github.com/firstcontributions/first-contributions" }
    ],
    rating: "9.3/10"
  },
  {
    id: 48,
    title: "Good First Issue",
    domain: "Open Source",
    type: "Project Discovery",
    difficulty: "Beginner",
    description: "A curated list of issues from popular open-source projects that are perfect for beginners.",
    author: "Good First Issue",
    tags: ["Issues", "GitHub", "Projects"],
    cost: "Free",
    official: false,
    links: [{ label: "Website", url: "https://goodfirstissue.dev/" }],
    rating: "9.1/10"
  },

  // ==========================================
  // Open Source - Intermediate
  // ==========================================
  {
    id: 49,
    title: "Up For Grabs",
    domain: "Open Source",
    type: "Project Discovery",
    difficulty: "Intermediate",
    description: "A directory of open-source projects looking for contributors with specific tags.",
    author: "Up For Grabs",
    tags: ["Open Source", "GitHub", "Contributing"],
    cost: "Free",
    official: false,
    links: [{ label: "Website", url: "https://up-for-grabs.net/" }],
    rating: "8.9/10"
  },
  {
    id: 50,
    title: "Google Summer of Code Archive",
    domain: "Open Source",
    type: "Archive",
    difficulty: "Intermediate",
    description: "Explore thousands of successful open source projects and organizations to find places to contribute.",
    author: "Google",
    tags: ["GSoC", "Mentorship", "Projects"],
    cost: "Free",
    official: true,
    links: [{ label: "Archive", url: "https://summerofcode.withgoogle.com/archive" }],
    rating: "9.2/10"
  },
  {
    id: 51,
    title: "GitHub Actions Documentation",
    domain: "Open Source",
    type: "Documentation",
    difficulty: "Intermediate",
    description: "Learn how to build CI/CD pipelines to automate open source project testing.",
    author: "GitHub",
    tags: ["CI/CD", "GitHub Actions", "Automation"],
    cost: "Free",
    official: true,
    links: [{ label: "Docs", url: "https://docs.github.com/en/actions" }],
    rating: "9.5/10"
  },

  // ==========================================
  // Open Source - Advanced
  // ==========================================
  {
    id: 52,
    title: "Linux Kernel Newbies",
    domain: "Open Source",
    type: "Wiki / Guide",
    difficulty: "Advanced",
    description: "A community for those interested in learning about and contributing to the Linux Kernel.",
    author: "Kernel Newbies",
    tags: ["Linux", "C", "Kernel", "OS"],
    cost: "Free",
    official: false,
    links: [{ label: "Wiki", url: "https://kernelnewbies.org/" }],
    rating: "9.6/10"
  },
  {
    id: 53,
    title: "The Architecture of Open Source Applications",
    domain: "Open Source",
    type: "Book",
    difficulty: "Advanced",
    description: "Learn how the creators of complex open source systems designed their architecture.",
    author: "Various Authors",
    tags: ["Architecture", "System Design", "Engineering"],
    cost: "Free",
    official: false,
    links: [{ label: "Read", url: "http://aosabook.org/en/index.html" }],
    rating: "9.8/10"
  },
  {
    id: 54,
    title: "Apache Foundation Contributor Guide",
    domain: "Open Source",
    type: "Documentation",
    difficulty: "Advanced",
    description: "Deep dive into the governance, contribution flow, and architecture of massive Apache projects.",
    author: "Apache Foundation",
    tags: ["Apache", "Governance", "Enterprise"],
    cost: "Free",
    official: true,
    links: [{ label: "Guide", url: "https://community.apache.org/contributors/" }],
    rating: "9.1/10"
  },

  // ==========================================
  // Role Specific Curated Learning Pathways
  // ==========================================
  // Full Stack Developer
  {
    id: 101,
    title: "Developer Roadmap - Full Stack Path",
    domain: "Web2",
    type: "Roadmap & Guide",
    difficulty: "Beginner",
    description: "Step-by-step interactive roadmap to master modern frontend, backend, databases, and DevOps.",
    author: "roadmap.sh",
    tags: ["Full Stack Developer", "Full Stack", "Web2", "Roadmap", "JavaScript"],
    cost: "Free",
    official: true,
    links: [{ label: "View Roadmap", url: "https://roadmap.sh/full-stack" }],
    rating: "9.9/10"
  },
  {
    id: 102,
    title: "Full Stack Open 2024",
    domain: "Web2",
    type: "Complete Course",
    difficulty: "Intermediate",
    description: "Learn React, Redux, Node.js, Express, MongoDB, GraphQL, and TypeScript in one comprehensive university course.",
    author: "University of Helsinki",
    tags: ["Full Stack Developer", "React", "Node.js", "MongoDB", "TypeScript"],
    cost: "Free",
    official: true,
    links: [{ label: "Start Course", url: "https://fullstackopen.com/en/" }],
    rating: "9.8/10"
  },
  {
    id: 103,
    title: "The Odin Project - Full Stack JavaScript",
    domain: "Web2",
    type: "Hands-on Curriculum",
    difficulty: "Beginner",
    description: "Free, open-source full stack curriculum covering HTML/CSS, JS, React, Node, and database integration.",
    author: "The Odin Project",
    tags: ["Full Stack Developer", "JavaScript", "React", "Node.js", "Express"],
    cost: "Free",
    official: false,
    links: [{ label: "Explore Curriculum", url: "https://www.theodinproject.com/paths/full-stack-javascript" }],
    rating: "9.7/10"
  },

  // Backend Engineer
  {
    id: 104,
    title: "Backend Engineering Roadmap & Architecture",
    domain: "Web2",
    type: "Roadmap & Architecture",
    difficulty: "Intermediate",
    description: "Comprehensive step-by-step breakdown of OS, Networking, APIs, Databases, Caching, and Microservices.",
    author: "roadmap.sh",
    tags: ["Backend Engineer", "Backend", "APIs", "Databases", "Node.js"],
    cost: "Free",
    official: true,
    links: [{ label: "View Roadmap", url: "https://roadmap.sh/backend" }],
    rating: "9.9/10"
  },
  {
    id: 105,
    title: "Node.js & Express Production Architecture",
    domain: "Web2",
    type: "Documentation & Best Practices",
    difficulty: "Intermediate",
    description: "Official guide and best practices for building scalable RESTful APIs, JWT authentication, and database connections.",
    author: "Node.js Org",
    tags: ["Backend Engineer", "Node.js", "Express", "REST API", "Database"],
    cost: "Free",
    official: true,
    links: [{ label: "Official Docs", url: "https://nodejs.org/en/docs/guides" }],
    rating: "9.6/10"
  },
  {
    id: 106,
    title: "Database Systems & SQL Masterclass",
    domain: "Web2",
    type: "Handbook & Interactive",
    difficulty: "Intermediate",
    description: "Master Relational Databases (PostgreSQL/MySQL), Data Modeling, Indexing, and Query Optimization.",
    author: "Use The Index, Luke!",
    tags: ["Backend Engineer", "SQL", "PostgreSQL", "Database Design", "Performance"],
    cost: "Free",
    official: false,
    links: [{ label: "Read Guide", url: "https://use-the-index-luke.com/" }],
    rating: "9.7/10"
  },

  // System Design
  {
    id: 107,
    title: "The System Design Primer",
    domain: "Web2",
    type: "Comprehensive Guide",
    difficulty: "Advanced",
    description: "An open-source repository to learn how to design large-scale systems (Scalability, Load Balancing, Caching, Sharding).",
    author: "Donne Martin",
    tags: ["System Design", "Architecture", "Scalability", "Microservices", "Distributed Systems"],
    cost: "Free",
    official: false,
    links: [{ label: "GitHub Repo", url: "https://github.com/donnemartin/system-design-primer" }],
    rating: "9.9/10"
  },
  {
    id: 108,
    title: "ByteByteGo System Design Fundamentals",
    domain: "Web2",
    type: "Visual Guide",
    difficulty: "Intermediate",
    description: "Visual breakdowns of complex distributed systems like Rate Limiters, Message Queues, CDN, and Key-Value Stores.",
    author: "Alex Xu",
    tags: ["System Design", "Distributed Systems", "Architecture", "API Design"],
    cost: "Free",
    official: false,
    links: [{ label: "Read Articles", url: "https://bytebytego.com/" }],
    rating: "9.8/10"
  },
  {
    id: 109,
    title: "Designing Data-Intensive Applications Guide",
    domain: "Web2",
    type: "Architecture Reference",
    difficulty: "Advanced",
    description: "Key principles behind reliable, scalable, and maintainable systems by Martin Kleppmann.",
    author: "Martin Kleppmann",
    tags: ["System Design", "Databases", "Distributed Systems", "Consensus"],
    cost: "Free",
    official: true,
    links: [{ label: "Book Overview", url: "https://dataintensive.net/" }],
    rating: "9.9/10"
  },

  // AI Engineer
  {
    id: 110,
    title: "AI Engineer Roadmap & Tech Stack",
    domain: "AI/ML",
    type: "Roadmap & Guide",
    difficulty: "Beginner",
    description: "Learn LLMs, Vector Databases, Prompt Engineering, LangChain, RAG architectures, and Fine-Tuning.",
    author: "roadmap.sh",
    tags: ["AI Engineer", "AI/ML", "LLMs", "RAG", "LangChain", "Vector DB"],
    cost: "Free",
    official: true,
    links: [{ label: "View Roadmap", url: "https://roadmap.sh/ai-engineer" }],
    rating: "9.8/10"
  },
  {
    id: 111,
    title: "Hugging Face LLM & NLP Course",
    domain: "AI/ML",
    type: "Course & Labs",
    difficulty: "Intermediate",
    description: "Official hands-on course covering Transformers, tokenizers, fine-tuning open-source LLMs, and deployment.",
    author: "Hugging Face",
    tags: ["AI Engineer", "Transformers", "LLMs", "PyTorch", "Hugging Face"],
    cost: "Free",
    official: true,
    links: [{ label: "Start Course", url: "https://huggingface.co/learn/nlp-course" }],
    rating: "9.7/10"
  },
  {
    id: 112,
    title: "Building Systems with ChatGPT API & RAG",
    domain: "AI/ML",
    type: "Short Course",
    difficulty: "Beginner",
    description: "Learn to chain LLM calls, parse outputs, and implement Retrieval-Augmented Generation (RAG).",
    author: "DeepLearning.AI",
    tags: ["AI Engineer", "OpenAI", "RAG", "Prompt Engineering", "Python"],
    cost: "Free",
    official: true,
    links: [{ label: "Access Course", url: "https://www.deeplearning.ai/short-courses/" }],
    rating: "9.6/10"
  },

  // Applied Scientist
  {
    id: 113,
    title: "Stanford CS229: Machine Learning & Applied Science",
    domain: "AI/ML",
    type: "University Course",
    difficulty: "Advanced",
    description: "Comprehensive mathematical foundations of Supervised Learning, Unsupervised Learning, and Deep Learning.",
    author: "Stanford University",
    tags: ["Applied Scientist", "AI/ML", "Mathematics", "Machine Learning", "Stanford"],
    cost: "Free",
    official: true,
    links: [{ label: "Course Materials", url: "https://cs229.stanford.edu/" }],
    rating: "9.9/10"
  },
  {
    id: 114,
    title: "fast.ai Practical Deep Learning for Coders",
    domain: "AI/ML",
    type: "Hands-on Course",
    difficulty: "Intermediate",
    description: "Top-down approach to applying state-of-the-art Deep Learning models in PyTorch to real-world datasets.",
    author: "Jeremy Howard",
    tags: ["Applied Scientist", "PyTorch", "Deep Learning", "Computer Vision", "NLP"],
    cost: "Free",
    official: false,
    links: [{ label: "Start Learning", url: "https://course.fast.ai/" }],
    rating: "9.8/10"
  },
  {
    id: 115,
    title: "PyTorch Official Tutorials & Research Models",
    domain: "AI/ML",
    type: "Documentation & Code",
    difficulty: "Intermediate",
    description: "Build, train, and benchmark neural network architectures from scratch using PyTorch.",
    author: "PyTorch Core Team",
    tags: ["Applied Scientist", "PyTorch", "Neural Networks", "Deep Learning"],
    cost: "Free",
    official: true,
    links: [{ label: "Official Tutorials", url: "https://pytorch.org/tutorials/" }],
    rating: "9.7/10"
  },

  // Cyber Security Developer
  {
    id: 116,
    title: "Cyber Security Developer Roadmap",
    domain: "Cyber Security",
    type: "Roadmap & Guide",
    difficulty: "Beginner",
    description: "Step-by-step path covering Network Security, Cryptography, Secure Coding, Reverse Engineering, and Pentesting.",
    author: "roadmap.sh",
    tags: ["Cyber Security Developer", "Cyber Security", "Secure Coding", "Cryptography", "Network Security"],
    cost: "Free",
    official: true,
    links: [{ label: "View Roadmap", url: "https://roadmap.sh/cyber-security" }],
    rating: "9.8/10"
  },
  {
    id: 117,
    title: "PortSwigger Web Security Academy",
    domain: "Cyber Security",
    type: "Hands-on Labs",
    difficulty: "Intermediate",
    description: "Master SQL Injection, XSS, CSRF, Authentication Bypasses, and Server-Side Vulnerabilities with interactive labs.",
    author: "PortSwigger",
    tags: ["Cyber Security Developer", "Web Security", "Burp Suite", "OWASP", "Pentesting"],
    cost: "Free",
    official: true,
    links: [{ label: "Start Labs", url: "https://portswigger.net/web-security" }],
    rating: "9.9/10"
  },
  {
    id: 118,
    title: "OWASP Secure Coding Practices Guide",
    domain: "Cyber Security",
    type: "Documentation & Standard",
    difficulty: "Intermediate",
    description: "Technology-agnostic set of software security coding practices to build resilient applications.",
    author: "OWASP Foundation",
    tags: ["Cyber Security Developer", "OWASP", "Secure Coding", "AppSec"],
    cost: "Free",
    official: true,
    links: [{ label: "Download Guide", url: "https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/" }],
    rating: "9.6/10"
  },

  // Devops Developer
  {
    id: 119,
    title: "DevOps Engineer Roadmap & CI/CD Mastery",
    domain: "Web2",
    type: "Roadmap & Guide",
    difficulty: "Beginner",
    description: "Complete guide to Containers (Docker), Orchestration (Kubernetes), Infrastructure as Code (Terraform), and CI/CD.",
    author: "roadmap.sh",
    tags: ["Devops Developer", "DevOps", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    cost: "Free",
    official: true,
    links: [{ label: "View Roadmap", url: "https://roadmap.sh/devops" }],
    rating: "9.9/10"
  },
  {
    id: 120,
    title: "Docker & Containerization Hands-on Guide",
    domain: "Web2",
    type: "Documentation & Tutorial",
    difficulty: "Beginner",
    description: "Learn to containerize microservices, write Dockerfiles, configure Docker Compose, and optimize multi-stage builds.",
    author: "Docker Inc.",
    tags: ["Devops Developer", "Docker", "Containers", "DevOps", "Microservices"],
    cost: "Free",
    official: true,
    links: [{ label: "Docker Docs", url: "https://docs.docker.com/get-started/" }],
    rating: "9.7/10"
  },
  {
    id: 121,
    title: "GitHub Actions & Automated Pipelines",
    domain: "Web2",
    type: "Documentation",
    difficulty: "Intermediate",
    description: "Automate build, test, linting, and deployment workflows directly from your GitHub repositories.",
    author: "GitHub",
    tags: ["Devops Developer", "GitHub Actions", "CI/CD", "Automation", "DevOps"],
    cost: "Free",
    official: true,
    links: [{ label: "Actions Guide", url: "https://docs.github.com/en/actions" }],
    rating: "9.6/10"
  }
];

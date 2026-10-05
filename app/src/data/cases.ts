export interface Suspect {
  id: string;
  name: string;
  role: string;
  avatar: string; // emoji
  personality: string;
  alibi: string;
  isCulprit: boolean;
  // AI chat personality prompt
  systemPrompt: string;
}

export interface Clue {
  id: string;
  title: string;
  description: string;
  image?: string;
  isKeyClue: boolean; // key clues are needed to solve
}

export interface GameCase {
  id: string;
  title: string;
  emoji: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  timeEstimate: string;
  scene: string; // image path
  story: string;
  victim: string;
  suspects: Suspect[];
  clues: Clue[];
  solution: {
    culpritId: string;
    explanation: string;
    keyClueIds: string[];
  };
}

export const CASES: GameCase[] = [
  {
    id: "chai-qatl",
    title: "Chai Wala Qatl",
    emoji: "☕",
    difficulty: 1,
    timeEstimate: "10-15 min",
    scene: "/scenes/case1-chai.jpg",
    story:
      "Famous food vlogger Bunty Bhai (34) apne kitchen mein murgha paya gaya — subah 7 baje. Paas mein chai ka cup tha. Ghar mein 3 log thay.",
    victim: "Bunty Bhai, 34, food vlogger (2M followers)",
    suspects: [
      {
        id: "chintu",
        name: "Chintu",
        role: "Chhota bhai",
        avatar: "🧑",
        personality: "Defensive, jaldi gussa hota hai",
        alibi: "So raha tha",
        isCulprit: false,
        systemPrompt:
          "Tum Chintu ho, Bunty Bhai ke chhote bhai. Tum defensive ho aur jaldi gussa hote ho. Tum ne 3 din pehle online rat poison order kiya tha (apne farm ke liye). Tum innocent ho — tum so rahe thay jab qatl hua. Rat poison ke baare mein puchne par pehle chhupao, phir maan lo ke farm ke liye tha. Kabhi confess mat karo ke tum ne qatl kiya.",
      },
      {
        id: "sana",
        name: "Sana",
        role: "Biwi",
        avatar: "👩",
        personality: "Nervous, zyada explain karti hai",
        alibi: "Ammi ke ghar thi",
        isCulprit: false,
        systemPrompt:
          "Tum Sana ho, Bunty ki biwi. Tum nervous ho aur zyada explain karti ho. Tum par Rs 50 lakh ka life insurance hai (suspicious lagta hai). Tum subah 6:30 par ghar ayi thi (surprise breakfast ke liye) lekin 6:35 par wapas chali gayi — itne kam time mein qatl nahi kar sakti. Tum innocent ho. Padosi ne tumhari car dekhi thi, is baare mein puchne par sach batao.",
      },
      {
        id: "kalu",
        name: "Kalu",
        role: "Cook",
        avatar: "👨‍🍳",
        personality: "Calm liar, smooth jawab",
        alibi: "Bazaar gaya tha",
        isCulprit: true,
        systemPrompt:
          "Tum Kalu ho, Bunty ke cook. Tumhe pichle hafte nikaal diya gaya tha (bina tankhwah). Tum ne badla lene ke liye chai mein cyanide milaya. Tum calm aur smooth ho — perfect jawab dete ho jo suspicious lagta hai. Kabhi confess mat karo jab tak tumhare saamne key evidence (apron par white powder, pest control kit se gayab cyanide) na rakha jaye. Evidence dikhane par toot jao aur maan lo.",
      },
    ],
    clues: [
      {
        id: "c1-1",
        title: "Karwi badam ki khushboo",
        description: "Chai ke cup se karwi badam jaisi smell aa rahi hai — cyanide ki nishani (rat poison nahi).",
        isKeyClue: true,
      },
      {
        id: "c1-2",
        title: "Apron par safed powder",
        description: "Kalu ke apron par safed powder ke daagh hain.",
        isKeyClue: true,
      },
      {
        id: "c1-3",
        title: "Gayab cyanide",
        description: "Kitchen ke pest control kit se cyanide ki bottle gayab hai. Sirf Kalu ko access tha.",
        isKeyClue: true,
      },
      {
        id: "c1-4",
        title: "Chintu ka order",
        description: "Chintu ne rat poison order kiya tha — lekin ye cyanide se alag chemical hai. Ye clue usay clear karta hai.",
        isKeyClue: false,
      },
      {
        id: "c1-5",
        title: "Sana ki car",
        description: "Padosi ne Sana ki car 6:30 par dekhi, lekin GPS ke mutabiq woh 6:35 par chali gayi — itne kam waqt mein qatl mumkin nahi.",
        isKeyClue: false,
      },
    ],
    solution: {
      culpritId: "kalu",
      explanation:
        "Kalu ne chai mein cyanide milaya. Woh janta tha ke Bunty roz 7 baje chai peeta hai. Nikaale jaane ka badla liya. Apron par powder aur gayab cyanide saboot hain.",
      keyClueIds: ["c1-1", "c1-2", "c1-3"],
    },
  },
  {
    id: "gumshuda-iphone",
    title: "Gumshuda iPhone",
    emoji: "📱",
    difficulty: 2,
    timeEstimate: "15-20 min",
    scene: "/scenes/case2-iphone.jpg",
    story:
      "Ayesha ka iPhone 15 Pro Max university cafeteria ki table se gayab. Woh 2 minute ke liye chai lene gayi thi. Paas mein 3 classmates thay.",
    victim: "Ayesha (phone owner)",
    suspects: [
      {
        id: "danish",
        name: "Danish",
        role: "Classmate",
        avatar: "🧑‍🎓",
        personality: "Calm liar, overconfident",
        alibi: "Apna phone utha raha tha",
        isCulprit: true,
        systemPrompt:
          "Tum Danish ho. Tum ne Ayesha ka phone churaya hai — tumhare paas same model, same transparent case hai. Tum ne cases swap kiye. Tumhare phone ki back par scratch hai, Ayesha ke phone par nahi. Ab tum jo phone dikha rahe ho us par scratch NAHI hai (woh Ayesha ka hai). Tumhara scratched phone bag mein chhupa hai. Calm aur overconfident raho. Scratch ke baare mein puchne par ghabrao. Kabhi confess mat karo jab tak scratch ka saboot na dikhaya jaye.",
      },
      {
        id: "fatima",
        name: "Fatima",
        role: "Classmate (rival)",
        avatar: "👩‍🎓",
        personality: "Defensive, jealous ke ilzaam par gussa",
        alibi: "Washroom mein thi",
        isCulprit: false,
        systemPrompt:
          "Tum Fatima ho, Ayesha ki rival. Log samajhte hain tum jealous ho. Tum washroom mein thi jab phone gayab hua (CCTV se verified). Tum innocent ho. Jealousy ke ilzaam par gussa ho jao lekin sach ye hai ke tum ne kuch nahi kiya.",
      },
      {
        id: "bilal",
        name: "Bilal",
        role: "Classmate",
        avatar: "🧑",
        personality: "Nervous, purani chori ki wajah se shak",
        alibi: "Samosa le raha tha",
        isCulprit: false,
        systemPrompt:
          "Tum Bilal ho. Tum pehle phone chori mein pakre gaye thay, is liye sab tum par shak karte hain. Lekin is baar tum counter par samosa le rahe thay (vendor + 3 gawah confirm karenge). Tum innocent ho. Purani chori ka zikr aane par sharminda ho jao.",
      },
    ],
    clues: [
      {
        id: "c2-1",
        title: "Scratch ka raaz",
        description: "Danish ke phone ki back par scratch tha. Jo phone woh dikha raha hai us par KOI scratch nahi — matlab ye uska phone nahi!",
        isKeyClue: true,
      },
      {
        id: "c2-2",
        title: "CCTV footage",
        description: "CCTV mein Danish do phone uthata nazar aa raha hai — ek Ayesha ka, ek apna.",
        isKeyClue: true,
      },
      {
        id: "c2-3",
        title: "Same case",
        description: "Dono ke paas same transparent case hai — swap karna aasan tha.",
        isKeyClue: false,
      },
      {
        id: "c2-4",
        title: "Fatima ka alibi",
        description: "CCTV timestamp ke mutabiq Fatima washroom mein thi.",
        isKeyClue: false,
      },
      {
        id: "c2-5",
        title: "Bilal ka alibi",
        description: "Vendor aur 3 gawah confirm karte hain ke Bilal counter par tha.",
        isKeyClue: false,
      },
    ],
    solution: {
      culpritId: "danish",
      explanation:
        "Danish ne phone cases swap kiye. Same case hone ki wajah se pata nahi chala. Scratch saboot hai — uska phone scratched hai, jo phone woh dikha raha hai woh Ayesha ka hai.",
      keyClueIds: ["c2-1", "c2-2"],
    },
  },
  {
    id: "dulhan-ka-haar",
    title: "Dulhan Ka Haar",
    emoji: "💎",
    difficulty: 3,
    timeEstimate: "20-25 min",
    scene: "/scenes/case3-necklace.jpg",
    story:
      "Lahore ki shaadi mein dulhan ka Rs 15 lakh ka haar bridal room se gayab. Kamra andar se locked tha. 4 logon ko access tha.",
    victim: "Mahnoor (dulhan)",
    suspects: [
      {
        id: "rani",
        name: "Rani",
        role: "Makeup artist",
        avatar: "💄",
        personality: "Calm liar, professional mask",
        alibi: "10 min akeli thi (kaam kar rahi thi)",
        isCulprit: true,
        systemPrompt:
          "Tum Rani ho, makeup artist. Tum par Rs 8 lakh ka karz hai. Tum ne duplicate key banwayi, 10 min akeli reh kar haar churaya, phir kamra lock kar diya. Tum professional aur calm ho. Karz ke baare mein puchne par pehle inkaar karo. Bank transfer (Rs 5 lakh lender ko) ka saboot dikhane par toot jao.",
      },
      {
        id: "sadia",
        name: "Sadia",
        role: "Dulhan ki behen",
        avatar: "👩",
        personality: "Emotional, behes par roti hai",
        alibi: "Hall mein thi (50 gawah)",
        isCulprit: false,
        systemPrompt:
          "Tum Sadia ho, dulhan ki behen. Subah dulhan se behes hui thi (dress par, jewelry par nahi). Tum hall mein thi jab haar gayab hua — 50 gawah hain. Tum innocent ho. Behes ka zikr aane par emotional ho jao.",
      },
      {
        id: "nadia",
        name: "Nadia",
        role: "Khala",
        avatar: "🧕",
        personality: "Nervous, purani chori ki aadat par sharminda",
        alibi: "Kitchen mein thi",
        isCulprit: false,
        systemPrompt:
          "Tum Nadia khala ho. Tumhe kleptomania hai (pichli shaadi mein chamche churaye thay). Sab tum par shak karte hain. Lekin is baar tum kitchen mein thi (verified). Tum innocent ho. Purani aadat ka zikr aane par sharminda ho jao.",
      },
      {
        id: "imran",
        name: "Imran",
        role: "Photographer",
        avatar: "📸",
        personality: "Helpful, cooperative",
        alibi: "Baraat shoot kar raha tha",
        isCulprit: false,
        systemPrompt:
          "Tum Imran ho, photographer. Tumhare paas room ki key hai (equipment ke liye). Tum baraat shoot kar rahe thay jab haar gayab hua — timestamped photos saboot hain. Tum innocent aur cooperative ho.",
      },
    ],
    clues: [
      {
        id: "c3-1",
        title: "Duplicate key",
        description: "Key shop ki receipt mili — Rani ne duplicate key banwayi thi.",
        isKeyClue: true,
      },
      {
        id: "c3-2",
        title: "Bank transfer",
        description: "Rani ne agle din apne lender ko Rs 5 lakh transfer kiye.",
        isKeyClue: true,
      },
      {
        id: "c3-3",
        title: "Gold polish",
        description: "Rani ke bag mein gold polish ka residue — pehchan mitane ki koshish.",
        isKeyClue: true,
      },
      {
        id: "c3-4",
        title: "Locked room",
        description: "Kamra andar se locked tha — matlab chor ke paas key thi.",
        isKeyClue: false,
      },
      {
        id: "c3-5",
        title: "Sadia ki behes",
        description: "Behes dress par thi, jewelry par nahi (gawah confirm).",
        isKeyClue: false,
      },
    ],
    solution: {
      culpritId: "rani",
      explanation:
        "Rani ne duplicate key se kamra khola, 10 min mein haar churaya, aur lock karke mystery banayi. Karz aur bank transfer saboot hain. Sab khala par shak kar rahe thay — wohi misdirection thi.",
      keyClueIds: ["c3-1", "c3-2", "c3-3"],
    },
  },
  {
    id: "professor-zeher",
    title: "Professor Ka Zeher",
    emoji: "🧪",
    difficulty: 4,
    timeEstimate: "25-35 min",
    scene: "/scenes/case4-lab.jpg",
    story:
      "Professor Rashid (58) apni university lab mein murda paye gaye. Coffee cup mein zeher. Security camera us din 'kharab' tha. 3 log aaye thay.",
    victim: "Prof. Rashid, 58, chemistry professor",
    suspects: [
      {
        id: "kamran",
        name: "Dr. Kamran",
        role: "Colleague",
        avatar: "👨‍🏫",
        personality: "Calm liar, academic arrogance",
        alibi: "Coffee de kar chala gaya",
        isCulprit: true,
        systemPrompt:
          "Tum Dr. Kamran ho. Tum department head banna chahte ho, Prof. Rashid rukawat thay. Tum ne NAYE thermos ke DHakkan mein cyanide lagaya — coffee dalne par zeher ghul gaya. Tum ne pichli shaam camera ka cable nikaal diya tha. Tum academic aur arrogant ho. Naye thermos ke baare mein puchne par bahana banao (purana toot gaya). Dhakkan mein residue ka saboot dikhane par toot jao.",
      },
      {
        id: "ali",
        name: "Ali",
        role: "PhD student",
        avatar: "🧑‍🔬",
        personality: "Nervous, darra hua",
        alibi: "Library mein tha",
        isCulprit: false,
        systemPrompt:
          "Tum Ali ho, PhD student. Prof. ne tumhe fail kiya tha, tum ne dhamki di thi (6 mahine pehle). Lekin tab se sulah ho gayi (emails saboot). Tum library mein thay (5 students + CCTV). Tum innocent ho. Purani dhamki ka zikr aane par dar jao.",
      },
      {
        id: "mrs-rashid",
        name: "Mrs. Rashid",
        role: "Biwi",
        avatar: "👩",
        personality: "Cold, calculated lekin innocent",
        alibi: "Ghar par thi",
        isCulprit: false,
        systemPrompt:
          "Tum Mrs. Rashid ho. Tumhara affair pakra gaya tha, divorce mein sab kuch jata. Ye motive lagta hai. Lekin tum ghar par thi (maid + phone location confirm). Tum innocent ho. Affair ke baare mein puchne par cold raho.",
      },
    ],
    clues: [
      {
        id: "c4-1",
        title: "Naya thermos",
        description: "Kamran hamesha purana mug use karta tha. Aaj NAYA thermos kyun laya?",
        isKeyClue: true,
      },
      {
        id: "c4-2",
        title: "Dhakkan mein zeher",
        description: "Thermos ke dhakkan mein cyanide residue — zeher coffee mein nahi, dhakkan mein tha!",
        isKeyClue: true,
      },
      {
        id: "c4-3",
        title: "Camera cable",
        description: "Camera kharab nahi tha — cable nikali gayi thi. Kamran pichli shaam sab se aakhir mein gaya tha.",
        isKeyClue: true,
      },
      {
        id: "c4-4",
        title: "Lab se nahi nikla",
        description: "Lab ke log mein cyanide withdrawal record nahi — matlab zeher bahar se aya.",
        isKeyClue: false,
      },
      {
        id: "c4-5",
        title: "Ali ki sulah",
        description: "Emails se pata chalta hai Ali aur Prof. mein sulah ho gayi thi.",
        isKeyClue: false,
      },
    ],
    solution: {
      culpritId: "kamran",
      explanation:
        "Kamran ne thermos ke dhakkan mein cyanide lagaya. Coffee dalne par zeher ghul gaya. Naya thermos is liye taake purane par shak na ho. Camera ka cable pichli raat nikala. Motive: department head ki kursi.",
      keyClueIds: ["c4-1", "c4-2", "c4-3"],
    },
  },
  {
    id: "midnight-paisa",
    title: "Midnight Paisa",
    emoji: "💰",
    difficulty: 5,
    timeEstimate: "30-45 min",
    scene: "/scenes/case5-vault.jpg",
    story:
      "Gulberg Lahore ke bank se raat ko Rs 2 crore cash gayab. Na zabardasti entry, na alarm baja. Sirf 3 logon ke paas vault codes hain. Inside job.",
    victim: "Private bank, Gulberg Lahore",
    suspects: [
      {
        id: "tariq",
        name: "Manager Tariq",
        role: "Bank Manager",
        avatar: "👔",
        personality: "Calm liar, mastermind",
        alibi: "Ghar par tha",
        isCulprit: true,
        systemPrompt:
          "Tum Manager Tariq ho, MASTERMIND. Tum par Rs 80 lakh ka gambling debt hai. Tum ne RD ki diary se dusra code churaya (photo tumhare phone mein hai), Hina ko Rs 10 lakh rishwat di (alarm + CCTV band karne ke liye), Aslam ki chai mein neend ki goli milayi. Tum 3 baje 4 suitcase le kar nikle. Tum calm aur smart ho. Diary photo ka saboot dikhane par hi tootoge. Hina ko accomplice ke tor par phasane ki koshish karoge.",
      },
      {
        id: "aslam",
        name: "Guard Aslam",
        role: "Security Guard",
        avatar: "💂",
        personality: "Guilty, sharminda (so gaya tha)",
        alibi: "Duty par tha (so gaya)",
        isCulprit: false,
        systemPrompt:
          "Tum Guard Aslam ho. Tum duty par so gaye thay (maante ho). Tumhe nahi pata ke tumhari chai mein neend ki goli thi. Tumhare paas vault code nahi, tum akele vault nahi khol sakte. Tum innocent aur sharminda ho.",
      },
      {
        id: "hina",
        name: "Hina",
        role: "IT Officer",
        avatar: "👩‍💻",
        personality: "Nervous, phansi hui",
        alibi: "'Maintenance' kar rahi thi",
        isCulprit: false,
        systemPrompt:
          "Tum Hina ho, IT officer. Tum ne Tariq se Rs 10 lakh le kar alarm band kiya (koi scheduled maintenance nahi thi — IT logs mein ticket nahi). Tum accomplice ho lekin mastermind NAHI. Tum ne CCTV ka secret backup rakha hai (Tariq ke khilaf insurance). Dabao daalne par pehle inkaar karo, phir backup recording ka zikr karo. Tumhe sirf accomplice ke tor par pakra ja sakta hai, mastermind Tariq hai.",
      },
    ],
    clues: [
      {
        id: "c5-1",
        title: "Dual control",
        description: "Vault ko KHOLNE ke liye DO codes chahiye ek saath. Tariq ke paas sirf ek hai.",
        isKeyClue: true,
      },
      {
        id: "c5-2",
        title: "Diary ki photo",
        description: "Tariq ke phone mein RD ki diary ke page ki photo — dusra code!",
        isKeyClue: true,
      },
      {
        id: "c5-3",
        title: "Fake maintenance",
        description: "IT logs mein koi maintenance ticket nahi — Hina ne jhoot bola.",
        isKeyClue: true,
      },
      {
        id: "c5-4",
        title: "Neend ki goli",
        description: "Aslam ki chai mein sleeping pills thi — usay behosh kiya gaya.",
        isKeyClue: false,
      },
      {
        id: "c5-5",
        title: "Parking CCTV",
        description: "Parking camera mein Tariq ki car 3 baje bhaari bags ke saath.",
        isKeyClue: false,
      },
      {
        id: "c5-6",
        title: "Hina ka backup",
        description: "Hina ne CCTV ka secret backup rakha hai — Tariq ke khilaf saboot.",
        isKeyClue: true,
      },
    ],
    solution: {
      culpritId: "tariq",
      explanation:
        "Tariq mastermind hai. Diary se dusra code churaya, Hina ko rishwat di, Aslam ko behosh kiya, Rs 2 crore le kar nikla. Hina accomplice hai (us par bhi ilzaam aa sakta hai) lekin asal mujrim Tariq hai. Hina ka backup recording final saboot hai.",
      keyClueIds: ["c5-1", "c5-2", "c5-3", "c5-6"],
    },
  },
];

import type {
  Question,
  StaticSection,
  VocabCluster,
  DialogueLine,
} from "./types";

// ============================================================
// PART 1 — Marleku article (Public Intelligence)
// 7 anticipated exam questions
// ============================================================
const PART_1: Question[] = [
  {
    id: "p1-q1",
    part: 1,
    number: 1,
    topicTag: "Overview",
    questionText:
      "Could you summarize the main argument of Marleku's article?",
    answer:
      "Well, // the article by **Alfred Marleku** explores how states are now using **public intelligence** as a strategic tool. /// Essentially, // the author argues that we are seeing a **paradigm shift** — from secret, // classified statecraft toward open, // real-time disclosure. /// He focuses on the case of Ukraine in **2022**, // when the United States and the United Kingdom released intelligence about the Russian invasion before it happened. /// What's interesting is that this approach succeeded in shaping the global narrative, // but it failed to deter the actual invasion. /// So, to put it briefly, // Marleku presents public intelligence as both a powerful and a limited tool — // one that controls the story, // but does not always control the outcome. ///",
    targetSeconds: [50, 60],
    trickyWords: [
      {
        word: "public intelligence",
        pronunciation: "PUB-lik in-TEL-i-jəns",
        polish: "wywiad publiczny",
        example: "the role of public intelligence",
      },
      {
        word: "paradigm shift",
        pronunciation: "PAR-ə-daim shift",
        polish: "zmiana paradygmatu",
        example: "a paradigm shift in statecraft",
        flags: ["silent-letter"],
      },
      {
        word: "disclosure",
        pronunciation: "dis-CLO-zhər",
        polish: "ujawnienie",
        example: "real-time disclosure",
      },
      {
        word: "statecraft",
        pronunciation: "STATE-kraft",
        polish: "sztuka rządzenia",
        example: "the art of statecraft",
      },
      {
        word: "deter",
        pronunciation: "di-TER",
        polish: "odstraszyć",
        example: "to deter aggression",
      },
    ],
  },
  {
    id: "p1-q2",
    part: 1,
    number: 2,
    topicTag: "Concept definition",
    questionText:
      "What does the author mean by 'public intelligence' or PUBINT, and how does it differ from traditional intelligence?",
    answer:
      "Well, // public intelligence — sometimes called **PUBINT** — refers to the deliberate release of **declassified** information to the public. /// It is the opposite of traditional intelligence, // which is normally **covert** and kept inside government agencies. /// In fact, // Marleku stresses that PUBINT is not a leak. /// It is planned, // strategic, // and aimed at influencing **public opinion**, // deterring adversaries, // or shaping diplomatic discourse. /// For instance, // when CIA Director **William Burns** publicly disclosed Russian casualty figures, // that was a clear act of public intelligence. ///",
    targetSeconds: [40, 50],
    trickyWords: [
      {
        word: "declassified",
        pronunciation: "de-KLAS-i-faid",
        polish: "odtajniony",
        example: "declassified documents",
      },
      {
        word: "covert",
        pronunciation: "KO-vərt",
        polish: "tajny, niejawny",
        example: "covert operations",
      },
      {
        word: "adversary",
        pronunciation: "AD-vər-ser-i",
        polish: "przeciwnik, wróg",
        example: "to deter adversaries",
      },
      {
        word: "discourse",
        pronunciation: "DIS-kors",
        polish: "dyskurs",
        example: "diplomatic discourse",
      },
      {
        word: "casualty",
        pronunciation: "KAZH-u-əl-ti",
        polish: "ofiara, strata",
        example: "casualty figures",
      },
    ],
  },
  {
    id: "p1-q3",
    part: 1,
    number: 3,
    topicTag: "Functional analysis",
    questionText:
      "What are the three strategic functions of public intelligence?",
    answer:
      "Marleku identifies **three strategic functions** of public intelligence. /// First, // it works as a form of **deterrence** — by exposing an adversary's plans, // a state hopes to make aggression too costly to pursue. /// Second, // it serves as **diplomatic pressure**. /// When intelligence is shared with allies in real time, // it forces them to align their position and respond together. /// Third, // it acts as a **counter-narrative** — neutralizing disinformation by presenting verified facts. /// A clear example would be the way the **UK and the US** shared intelligence with hesitant European partners in late 2021. /// What's interesting is that the third function — narrative control — proved the most effective in the Ukraine case, // while deterrence largely failed. ///",
    targetSeconds: [50, 60],
    trickyWords: [
      {
        word: "deterrence",
        pronunciation: "di-TER-əns",
        polish: "odstraszanie",
        example: "nuclear deterrence",
      },
      {
        word: "counter-narrative",
        pronunciation: "COUN-tər NAR-ə-tiv",
        polish: "kontr-narracja",
        example: "a counter-narrative strategy",
      },
      {
        word: "disinformation",
        pronunciation: "dis-in-fər-MAY-shən",
        polish: "dezinformacja",
        example: "to neutralize disinformation",
      },
      {
        word: "align",
        pronunciation: "ə-LAIN",
        polish: "dostosować, zrównać",
        example: "to align positions",
        flags: ["silent-letter"],
      },
      {
        word: "hesitant",
        pronunciation: "HEZ-i-tənt",
        polish: "wahający się",
        example: "hesitant European partners",
      },
    ],
  },
  {
    id: "p1-q4",
    part: 1,
    number: 4,
    topicTag: "Comparative case",
    questionText:
      "Compare the Iraq 2003 case with the Ukraine 2022 case. Why did one succeed where the other did not?",
    answer:
      "Marleku presents these two cases as opposite models of public intelligence. /// In **Iraq 2003**, // intelligence was **orchestrated and politicized**. /// The Bush administration selectively declassified information to justify the invasion, // claiming Saddam Hussein possessed weapons of mass destruction. /// When no weapons were found, // the credibility of Western intelligence services collapsed for years. /// [breathe] In contrast, // the **Ukraine 2022** case shows a **strategic and real-time** model. /// The US and the UK released intelligence about Russian troop movements weeks before the invasion. /// **MI6 Director Richard Moore** even posted public statements on Twitter. /// What made this approach succeed was **honesty** — the warnings turned out to be accurate. /// On the other hand, // Iraq failed because the intelligence was shaped to fit a political goal. /// So, to put it briefly, // the difference is not the technique itself, // but whether the intelligence reflects reality or distorts it. ///",
    targetSeconds: [70, 80],
    trickyWords: [
      {
        word: "orchestrated",
        pronunciation: "OR-kə-strey-tid",
        polish: "zaaranżowany",
        example: "an orchestrated campaign",
      },
      {
        word: "politicized",
        pronunciation: "pə-LIT-i-saizd",
        polish: "upolityczniony",
        example: "politicized intelligence",
      },
      {
        word: "weapons",
        pronunciation: "WEP-ənz",
        polish: "broń",
        example: "weapons of mass destruction",
        flags: ["silent-letter"],
      },
      {
        word: "credibility",
        pronunciation: "kred-i-BIL-i-ti",
        polish: "wiarygodność",
        example: "to lose credibility",
      },
      {
        word: "distort",
        pronunciation: "dis-TORT",
        polish: "zniekształcić",
        example: "to distort the truth",
      },
      {
        word: "possess",
        pronunciation: "pə-ZES",
        polish: "posiadać",
        example: "to possess weapons",
      },
    ],
  },
  {
    id: "p1-q5",
    part: 1,
    number: 5,
    topicTag: "Specific case — Israel",
    questionText: "What does the Israel 2023–2024 case add to the argument?",
    answer:
      "The Israel case adds an important **third model** — what Marleku calls **selective and cautious** disclosure. /// Unlike Ukraine, // Israel chose to keep most of its intelligence classified during the conflict in Gaza. /// In fact, // operational sensitivities and the involvement of **hostages** limited what could be shared in public. /// What's interesting is that this case shows the **limits** of the PUBINT model. /// Public intelligence works well when the goal is to expose an aggressor, // but it works less well when the operating side itself wants to retain freedom of action. /// On the other hand, // it confirms that disclosure is always a **strategic choice**, // not a default. ///",
    targetSeconds: [40, 55],
    trickyWords: [
      {
        word: "selective",
        pronunciation: "sə-LEK-tiv",
        polish: "selektywny",
        example: "selective disclosure",
      },
      {
        word: "cautious",
        pronunciation: "KO-shəs",
        polish: "ostrożny",
        example: "a cautious approach",
      },
      {
        word: "operational",
        pronunciation: "op-ə-RAY-shə-nəl",
        polish: "operacyjny",
        example: "operational secrecy",
      },
      {
        word: "hostage",
        pronunciation: "HOS-tij",
        polish: "zakładnik",
        example: "the involvement of hostages",
      },
      {
        word: "retain",
        pronunciation: "ri-TAYN",
        polish: "zachować",
        example: "to retain freedom of action",
      },
    ],
  },
  {
    id: "p1-q6",
    part: 1,
    number: 6,
    topicTag: "Critique / limits",
    questionText:
      "Why does the author conclude that public intelligence works for narrative control but is limited as deterrence?",
    answer:
      "Well, // Marleku's main critique is that **deterrence requires fear**, // and fear depends on the credibility of consequences. /// In Ukraine, // the West publicly warned Russia about an upcoming invasion, // but Putin proceeded anyway. /// In fact, // the warnings did not change the cost calculation in Moscow. /// On the other hand, // **narrative control** worked very well. /// Western intelligence shaped the global perception of Russia as the aggressor // before the first shot was fired. /// What this means is that public intelligence is excellent at framing reality, // but it cannot replace traditional military or economic deterrence. /// So, // it is a tool of **communication**, // not coercion. ///",
    targetSeconds: [40, 55],
    trickyWords: [
      {
        word: "credibility",
        pronunciation: "kred-i-BIL-i-ti",
        polish: "wiarygodność",
        example: "credibility of warnings",
      },
      {
        word: "perception",
        pronunciation: "pər-SEP-shən",
        polish: "postrzeganie",
        example: "global perception",
      },
      {
        word: "coercion",
        pronunciation: "ko-ER-zhən",
        polish: "przymus",
        example: "coercion vs. communication",
      },
      {
        word: "proceed",
        pronunciation: "prə-SEED",
        polish: "przystąpić, kontynuować",
        example: "to proceed with the invasion",
        flags: ["long-vowel"],
      },
      {
        word: "aggressor",
        pronunciation: "ə-GRES-ər",
        polish: "agresor",
        example: "Russia as the aggressor",
      },
    ],
  },
  {
    id: "p1-q7",
    part: 1,
    number: 7,
    topicTag: "Specialization bridge",
    questionText:
      "How might these findings apply to your own field of study or to the security challenges Poland faces today?",
    answer:
      "That's a really interesting question. /// From the perspective of **Poland's strategic situation**, // the lessons of Marleku's article are very practical. /// Poland sits on **NATO's eastern flank**, // close to the war in Ukraine and to Belarus. /// In fact, // Polish authorities have been actively sharing intelligence about Russian hybrid threats — // drone incursions, // sabotage, // and disinformation campaigns. /// What this article teaches us is that **transparency** can be a weapon of its own. /// By releasing information quickly and credibly, // a state can build alliance cohesion and weaken hostile narratives. /// On the other hand, // Poland must also remember Marleku's warning — public intelligence is not a substitute for hard power. /// So, // disclosure should support deterrence, // not replace it. ///",
    targetSeconds: [55, 70],
    trickyWords: [
      {
        word: "flank",
        pronunciation: "flænk",
        polish: "flanka",
        example: "NATO's eastern flank",
      },
      {
        word: "hybrid",
        pronunciation: "HAI-brid",
        polish: "hybrydowy",
        example: "hybrid threats",
      },
      {
        word: "incursion",
        pronunciation: "in-KER-zhən",
        polish: "wtargnięcie",
        example: "drone incursions",
      },
      {
        word: "sabotage",
        pronunciation: "SAB-ə-tazh",
        polish: "sabotaż",
        example: "acts of sabotage",
      },
      {
        word: "substitute",
        pronunciation: "SUB-sti-tyut",
        polish: "zamiennik",
        example: "not a substitute for hard power",
      },
      {
        word: "transparency",
        pronunciation: "trans-PAR-ən-si",
        polish: "przejrzystość",
        example: "transparency as a weapon",
      },
    ],
  },
];

// ============================================================
// PART 2 — UN Resilience Guidance
// 10 explicit questions from the PDF
// ============================================================
const PART_2: Question[] = [
  {
    id: "p2-q1",
    part: 2,
    number: 1,
    topicTag: "Why resilience is a prerequisite",
    questionText:
      "According to the Introduction (pp. 17–21), why does the UN consider resilience-building a prerequisite for national security, peace, and sustainable development?",
    answer:
      "Well, // the UN considers **resilience-building** a prerequisite because crises today are **interconnected**. /// In fact, // a single shock — a pandemic, // a conflict, // or a climate event — can destabilize health, // economy, // and governance at the same time. /// Without resilience, // states are forced to react after the damage is done, // which is far more expensive than prevention. /// Essentially, // resilience allows societies to **anticipate**, // **absorb**, // and **recover** from shocks while continuing to function. /// On the other hand, // a fragile state cannot deliver development goals, // because every crisis erases the previous gains. /// So, // resilience is the **foundation** on which security and development stand. ///",
    targetSeconds: [45, 55],
    trickyWords: [
      {
        word: "prerequisite",
        pronunciation: "pre-REK-wi-zit",
        polish: "warunek wstępny",
        example: "a prerequisite for security",
      },
      {
        word: "interconnected",
        pronunciation: "in-tər-kə-NEK-tid",
        polish: "wzajemnie połączony",
        example: "interconnected crises",
      },
      {
        word: "destabilize",
        pronunciation: "de-STAY-bi-laiz",
        polish: "destabilizować",
        example: "to destabilize the economy",
      },
      {
        word: "anticipate",
        pronunciation: "an-TIS-i-payt",
        polish: "przewidywać",
        example: "to anticipate shocks",
      },
      {
        word: "fragile",
        pronunciation: "FRA-jail",
        polish: "kruchy",
        example: "a fragile state",
      },
    ],
  },
  {
    id: "p2-q2",
    part: 2,
    number: 2,
    topicTag: "Fragmented actions",
    questionText:
      "What problems arise from separating humanitarian, development, and peace-and-security actions, and why does the Guidance argue for a joined-up approach?",
    answer:
      "When humanitarian, // development, // and peace-and-security work are **separated**, // serious problems appear. /// First, // there is **duplication** — different agencies repeat similar projects without coordination. /// Second, // there are **gaps** — some needs fall between mandates and remain unaddressed. /// In fact, // root causes go untreated when each actor focuses only on the symptoms in their own area. /// What's interesting is that conflict and underdevelopment usually share the same drivers — // inequality, // weak institutions, // climate stress. /// So, // the Guidance argues for a **joined-up approach** that combines all three pillars. /// Essentially, // by working together, // these actors save resources, // reduce confusion, // and deliver longer-lasting results. ///",
    targetSeconds: [50, 60],
    trickyWords: [
      {
        word: "humanitarian",
        pronunciation: "hyu-man-i-TER-i-ən",
        polish: "humanitarny",
        example: "humanitarian aid",
      },
      {
        word: "duplication",
        pronunciation: "dyu-pli-KAY-shən",
        polish: "powielanie",
        example: "duplication of efforts",
      },
      {
        word: "mandate",
        pronunciation: "MAN-deyt",
        polish: "mandat, zakres działania",
        example: "between mandates",
      },
      {
        word: "joined-up",
        pronunciation: "JOYND-up",
        polish: "zintegrowany",
        example: "a joined-up approach",
      },
      {
        word: "pillar",
        pronunciation: "PIL-ər",
        polish: "filar",
        example: "all three pillars",
      },
    ],
  },
  {
    id: "p2-q3",
    part: 2,
    number: 3,
    topicTag: "Global trends",
    questionText:
      "What global trends described in Why Resilience Matters (pp. 23–24) show that traditional threat-response security models are no longer sufficient?",
    answer:
      "Several **global trends** make traditional security models inadequate. /// First, // we see the **rise of climate-related disasters** — floods, // droughts, // wildfires — which are larger and more frequent. /// Second, // there is the **return of pandemics**, // as COVID-19 demonstrated. /// Third, // **hybrid and cyber threats** blur the line between war and peace. /// In fact, // even disinformation has become a security issue. /// What's interesting is that these threats do not respect borders, // so a single state cannot defend against them alone. /// On the other hand, // the old threat-response model assumed clear enemies, // visible attacks, // and short timelines. /// So, // a new approach is needed — one based on **anticipation**, // not just reaction. ///",
    targetSeconds: [50, 60],
    trickyWords: [
      {
        word: "threat",
        pronunciation: "THret",
        polish: "zagrożenie",
        example: "threat-response model",
        flags: ["TH-soft"],
      },
      {
        word: "pandemic",
        pronunciation: "pan-DEM-ik",
        polish: "pandemia",
        example: "the return of pandemics",
      },
      {
        word: "cyber",
        pronunciation: "SAI-bər",
        polish: "cybernetyczny",
        example: "cyber threats",
      },
      {
        word: "anticipation",
        pronunciation: "an-tis-i-PAY-shən",
        polish: "przewidywanie",
        example: "based on anticipation",
      },
      {
        word: "drought",
        pronunciation: "draut",
        polish: "susza",
        example: "droughts and wildfires",
        flags: ["silent-letter"],
      },
    ],
  },
  {
    id: "p2-q4",
    part: 2,
    number: 4,
    topicTag: "Cascading effects",
    questionText:
      "How does the UN Guidance explain cascading or knock-on effects between systems (e.g. health, economy, governance, information space), and why is this important for security planning?",
    answer:
      "The Guidance describes **cascading effects** as chain reactions between systems. /// A failure in one area triggers failures in others, // often very quickly. /// For instance, // imagine a major **pandemic**. /// First, // the health system is overwhelmed. /// Then, // the economy contracts because workers stay home. /// Soon after, // governments lose tax revenue and public trust. /// [breathe] In fact, // disinformation begins to spread, // weakening the information space and threatening political stability. /// What's interesting is that none of these effects exist in isolation — // each one feeds the next. /// So, // for security planning, // this matters enormously. /// Planners must look beyond the **initial shock** and map second-order and third-order consequences. /// On the other hand, // ignoring cascading effects leads to **fragile responses** that solve one problem and create three more. ///",
    targetSeconds: [60, 75],
    trickyWords: [
      {
        word: "cascading",
        pronunciation: "kæs-KAY-ding",
        polish: "kaskadowy",
        example: "cascading effects",
      },
      {
        word: "knock-on",
        pronunciation: "NOK-on",
        polish: "wtórny, łańcuchowy",
        example: "knock-on effects",
      },
      {
        word: "overwhelmed",
        pronunciation: "o-vər-WELMD",
        polish: "przytłoczony",
        example: "the system is overwhelmed",
      },
      {
        word: "consequence",
        pronunciation: "KON-si-kwens",
        polish: "konsekwencja",
        example: "second-order consequences",
      },
      {
        word: "revenue",
        pronunciation: "REV-ə-nyu",
        polish: "dochód, wpływy",
        example: "tax revenue",
      },
    ],
  },
  {
    id: "p2-q5",
    part: 2,
    number: 5,
    topicTag: "Benefits beyond crisis",
    questionText:
      "What security-relevant benefits result from investing in resilience-building, beyond immediate crisis response?",
    answer:
      "Investing in resilience produces several **security-relevant benefits** beyond simple crisis response. /// First, // it strengthens **public trust** in institutions. /// When people see that the state can prevent and absorb shocks, // social cohesion improves. /// Second, // it reduces the **cost** of future crises by preventing rather than repairing. /// In fact, // every dollar spent on prevention saves several dollars in recovery. /// Third, // it builds **diplomatic capital** — resilient states can offer support to weaker partners. /// What's interesting is that resilience also **deters opportunistic adversaries**. /// A society that is hard to disrupt is, // by definition, // less attractive as a target. ///",
    targetSeconds: [45, 55],
    trickyWords: [
      {
        word: "cohesion",
        pronunciation: "ko-HEE-zhən",
        polish: "spójność",
        example: "social cohesion",
      },
      {
        word: "prevention",
        pronunciation: "pri-VEN-shən",
        polish: "zapobieganie",
        example: "prevention saves money",
      },
      {
        word: "opportunistic",
        pronunciation: "op-ər-tu-NIS-tik",
        polish: "oportunistyczny",
        example: "opportunistic adversaries",
      },
      {
        word: "disrupt",
        pronunciation: "dis-RUPT",
        polish: "zakłócać",
        example: "hard to disrupt",
      },
      {
        word: "diplomatic",
        pronunciation: "dip-lə-MA-tik",
        polish: "dyplomatyczny",
        example: "diplomatic capital",
      },
    ],
  },
  {
    id: "p2-q6",
    part: 2,
    number: 6,
    topicTag: "Conflict-affected countries",
    questionText:
      "Why is resilience-building especially important in countries affected by conflict or emerging from conflict, according to pages 27–28?",
    answer:
      "Conflict-affected countries face a **double challenge**. /// First, // they must repair the damage left by violence — destroyed infrastructure, // displaced populations, // weak institutions. /// Second, // they must prevent **relapse** into conflict, // which is statistically very common. /// In fact, // the Guidance notes that countries emerging from war have a high risk of returning to it within ten years. /// What's interesting is that resilience addresses both challenges at once. /// By rebuilding institutions, // restoring services, // and including marginalized groups, // resilience reduces the drivers that caused the war. /// On the other hand, // a fragile peace without resilience is just a pause, // not an end. /// So, // resilience is the **bridge** between recovery and lasting stability. ///",
    targetSeconds: [50, 60],
    trickyWords: [
      {
        word: "conflict-affected",
        pronunciation: "KON-flikt ə-FEK-tid",
        polish: "dotknięty konfliktem",
        example: "conflict-affected countries",
      },
      {
        word: "relapse",
        pronunciation: "ri-LAPS",
        polish: "nawrót",
        example: "relapse into conflict",
      },
      {
        word: "displaced",
        pronunciation: "dis-PLAYST",
        polish: "wysiedlony",
        example: "displaced populations",
      },
      {
        word: "marginalized",
        pronunciation: "MAR-jin-ə-laizd",
        polish: "zmarginalizowany",
        example: "marginalized groups",
      },
      {
        word: "infrastructure",
        pronunciation: "IN-frə-struk-chər",
        polish: "infrastruktura",
        example: "destroyed infrastructure",
      },
    ],
  },
  {
    id: "p2-q7",
    part: 2,
    number: 7,
    topicTag: "Regional cooperation",
    questionText:
      "Why does the Guidance stress regional and cross-border cooperation for building resilience, and how does this relate to diplomacy and international security?",
    answer:
      "The Guidance emphasizes **regional cooperation** because most modern threats are **transnational**. /// Pandemics, // climate change, // refugee flows, // and cyber attacks ignore borders. /// In fact, // a single state cannot solve them on its own, // no matter how strong it is. /// For instance, // a flood in one country may displace people across the border, // creating a regional crisis. /// What's interesting is that cooperation also builds **trust** between governments — and trust is itself a form of security. /// On the other hand, // when neighbors share data, // coordinate responses, // and align policies, // they reduce vulnerabilities and improve early warning. /// So, // regional resilience is good diplomacy. ///",
    targetSeconds: [45, 55],
    trickyWords: [
      {
        word: "transnational",
        pronunciation: "trans-NASH-ə-nəl",
        polish: "transgraniczny",
        example: "transnational threats",
      },
      {
        word: "border",
        pronunciation: "BOR-dər",
        polish: "granica",
        example: "cross-border cooperation",
      },
      {
        word: "refugee",
        pronunciation: "ref-yu-JEE",
        polish: "uchodźca",
        example: "refugee flows",
        flags: ["long-vowel"],
      },
      {
        word: "vulnerability",
        pronunciation: "vul-nər-ə-BIL-i-ti",
        polish: "podatność",
        example: "to reduce vulnerabilities",
      },
      {
        word: "align",
        pronunciation: "ə-LAIN",
        polish: "dostosować",
        example: "to align policies",
      },
    ],
  },
  {
    id: "p2-q8",
    part: 2,
    number: 8,
    topicTag: "Definition of resilience",
    questionText:
      "How does the Guidance define 'resilience' (pp. 30–31), and which abilities are most relevant for protecting state institutions and public trust?",
    answer:
      "The Guidance defines **resilience** as the ability of a system or society to **prevent**, // **resist**, // **absorb**, // **adapt**, // **respond**, // and **recover** from shocks while maintaining its essential functions. /// In fact, // it is not a single trait but a combination of capacities. /// For protecting state institutions and public trust, // **adaptive capacity** is especially important — the ability to learn from a crisis and adjust. /// **Anticipatory capacity** also matters, // because institutions that prepare in advance keep public confidence even in difficult moments. /// On the other hand, // a system that only **absorbs** shocks without adapting will eventually break under repeated pressure. ///",
    targetSeconds: [45, 55],
    trickyWords: [
      {
        word: "resilience",
        pronunciation: "ri-ZIL-i-əns",
        polish: "odporność",
        example: "the ability of resilience",
      },
      {
        word: "absorb",
        pronunciation: "əb-ZORB",
        polish: "pochłaniać",
        example: "to absorb shocks",
      },
      {
        word: "adapt",
        pronunciation: "ə-DAPT",
        polish: "adaptować się",
        example: "to adapt and recover",
      },
      {
        word: "adaptive",
        pronunciation: "ə-DAP-tiv",
        polish: "adaptacyjny",
        example: "adaptive capacity",
      },
      {
        word: "maintain",
        pronunciation: "meyn-TAYN",
        polish: "utrzymywać",
        example: "to maintain functions",
      },
    ],
  },
  {
    id: "p2-q9",
    part: 2,
    number: 9,
    topicTag: "Risk and components",
    questionText:
      "According to pp. 31–32, how is 'risk' defined, and how do threat, exposure, vulnerability, and capacity interact in security contexts?",
    answer:
      "In the Guidance, // **risk** is defined as the likelihood and impact of a hazard, // shaped by four interacting factors. /// First, // **threat** — the source of harm, // such as an armed group or a hurricane. /// Second, // **exposure** — the people or assets in the path of the threat. /// Third, // **vulnerability** — the qualities that make them susceptible to damage. /// Fourth, // **capacity** — the resources and skills available to respond. /// In fact, // the relationship can be expressed as: // risk equals threat times exposure times vulnerability divided by capacity. /// What's interesting is that capacity is the only factor we can fully **control**, // which is why resilience-building focuses on it. ///",
    targetSeconds: [45, 55],
    trickyWords: [
      {
        word: "hazard",
        pronunciation: "HAZ-ərd",
        polish: "zagrożenie",
        example: "the impact of a hazard",
      },
      {
        word: "exposure",
        pronunciation: "ek-SPO-zhər",
        polish: "narażenie, ekspozycja",
        example: "exposure to risk",
      },
      {
        word: "vulnerability",
        pronunciation: "vul-nər-ə-BIL-i-ti",
        polish: "podatność",
        example: "vulnerability factors",
      },
      {
        word: "capacity",
        pronunciation: "kə-PAS-i-ti",
        polish: "zdolność",
        example: "response capacity",
      },
      {
        word: "susceptible",
        pronunciation: "sə-SEP-ti-bəl",
        polish: "podatny",
        example: "susceptible to damage",
      },
    ],
  },
  {
    id: "p2-q10",
    part: 2,
    number: 10,
    topicTag: "Five resilience capacities",
    questionText:
      "Briefly explain the five resilience capacities (absorptive, adaptive, anticipatory, preventive, and transformative) described on pages 35–36 and indicate which are most important for national security, international cooperation, and information/cybersecurity.",
    answer:
      "The Guidance describes **five resilience capacities**. /// First, // **absorptive capacity** is the ability to take a shock without collapsing — // for example, // a hospital handling a sudden surge of patients. /// Second, // **adaptive capacity** is the ability to learn and change — // adjusting policies based on new information. /// Third, // **anticipatory capacity** is foresight — // using early warning systems and forecasts. /// Fourth, // **preventive capacity** stops a crisis from happening at all. /// [breathe] Fifth, // **transformative capacity** is the deepest change — // reshaping the system itself when the old structure cannot survive. /// For **national security**, // anticipatory and absorptive capacities matter most. /// States must see threats early and survive the first impact. /// For **international cooperation**, // transformative capacity is key, // since global problems require new institutions. /// On the other hand, // for **information and cyber-security**, // adaptive capacity is the priority. /// What's interesting is that cyber threats evolve weekly, // so defenders must keep learning. /// So, // each domain emphasizes a different capacity, // but all five are needed together. ///",
    targetSeconds: [85, 100],
    trickyWords: [
      {
        word: "absorptive",
        pronunciation: "əb-ZORP-tiv",
        polish: "absorpcyjny",
        example: "absorptive capacity",
      },
      {
        word: "adaptive",
        pronunciation: "ə-DAP-tiv",
        polish: "adaptacyjny",
        example: "adaptive capacity",
      },
      {
        word: "anticipatory",
        pronunciation: "an-TIS-i-pə-tor-i",
        polish: "antycypacyjny",
        example: "anticipatory capacity",
      },
      {
        word: "preventive",
        pronunciation: "pri-VEN-tiv",
        polish: "prewencyjny",
        example: "preventive capacity",
      },
      {
        word: "transformative",
        pronunciation: "trans-FOR-mə-tiv",
        polish: "transformacyjny",
        example: "transformative capacity",
      },
      {
        word: "foresight",
        pronunciation: "FOR-sait",
        polish: "przewidywanie",
        example: "foresight is key",
      },
      {
        word: "surge",
        pronunciation: "sərj",
        polish: "nagły wzrost",
        example: "a surge of patients",
      },
    ],
  },
];

export const QUESTIONS: Question[] = [...PART_1, ...PART_2];

// ============================================================
// Static sections
// ============================================================
export const WARMUP_SECTION: StaticSection = {
  id: "warmup",
  title: "Warm-up",
  contentMarkdown: `### Sound drills — read each line twice

- **TH (voiceless /θ/)** — tongue between teeth, breath out:
  *"The thesis of this third theory is the threat of thinking thin."*
- **TH (voiced /ð/)** — same tongue position, with voice:
  *"These three brothers gather rather than bother the others."*
- **W vs V** — Polish "w" = English "v"; flip it for English "w":
  *"We were very wary of the vivid warnings about the war."*
- **Vowel length** (short *i* vs long *ee*):
  *"The chief briefed the brief, leaving the leak unleaked."*

### Vocabulary drill — each word twice, slowly

dis-CLO-sure · de-TERR-ence · re-SIL-ience · cas-CAY-ding · vul-ner-a-BIL-i-ty · NAR-ra-tive · THRES-hold · pre-VEN-tive

### Warm sentence — one calm flow

*"Today I would like to discuss two related topics — // the strategic use of public intelligence, /// and the United Nations approach to resilience-building. ///"*`,
};

export const TIPS_SECTION: StaticSection = {
  id: "tips",
  title: "Pre-exam tips",
  contentMarkdown: `### Pace control

Aim for **140 words per minute**. /// Polish speakers under stress tend to accelerate to 180+ and lose intelligibility. /// Two slow-down phrases, ready to deploy:

- *"Well, // let me think about this for a moment…"*
- *"If I understand the question correctly…"*

### Repair phrases — memorize verbatim

1. *"Could you repeat the question, please?"*
2. *"I'm sorry, could you rephrase that?"*
3. *"Just to make sure I understand — you're asking about X?"*
4. *"May I have a moment to think?"*

### If you forget a word

**Paraphrase. // Do not switch to Polish.** /// Say *"What I mean is…"* or *"It's the kind of intelligence that's normally kept secret…"* — that is far better than dropping a Polish word into the answer.

### Body language for Teams

- Look at the **camera**, // not at the screen.
- Sit upright, // shoulders back.
- Test microphone before joining the meeting.
- A small smile relaxes your voice.

### Three save sentences when your mind blanks

1. *"That's a really interesting question."*
2. *"Let me approach this from two angles."*
3. *"There are a few things to consider here."*`,
};

// ============================================================
// Vocabulary clusters (cross-cutting glossary)
// ============================================================
export const VOCABULARY_CLUSTERS: VocabCluster[] = [
  {
    id: "intelligence",
    title: "Intelligence & statecraft",
    entries: [
      { word: "deterrence", pronunciation: "de-TERR-əns", polish: "odstraszanie", example: "nuclear deterrence" },
      { word: "disclosure", pronunciation: "dis-CLO-zhər", polish: "ujawnienie", example: "real-time disclosure" },
      { word: "covert", pronunciation: "KO-vərt", polish: "tajny", example: "covert operations" },
      { word: "declassified", pronunciation: "de-KLAS-i-faid", polish: "odtajniony", example: "declassified files" },
      { word: "narrative", pronunciation: "NAR-ə-tiv", polish: "narracja", example: "to control the narrative" },
      { word: "alliance cohesion", pronunciation: "ə-LAI-əns ko-HEE-zhən", polish: "spójność sojuszu", example: "alliance cohesion" },
      { word: "plausible deniability", pronunciation: "PLO-zi-bəl di-NAI-ə-bil-i-ti", polish: "wiarygodne zaprzeczenie", example: "plausible deniability" },
      { word: "briefing", pronunciation: "BREE-fing", polish: "odprawa", example: "to deliver a briefing" },
      { word: "leak", pronunciation: "leek", polish: "przeciek", example: "an intelligence leak" },
      { word: "statecraft", pronunciation: "STATE-kraft", polish: "sztuka rządzenia", example: "the art of statecraft" },
    ],
  },
  {
    id: "resilience",
    title: "Resilience & risk",
    entries: [
      { word: "resilience", pronunciation: "re-SIL-i-əns", polish: "odporność", example: "social resilience" },
      { word: "vulnerability", pronunciation: "vul-nər-ə-BIL-i-ti", polish: "podatność", example: "to reduce vulnerability" },
      { word: "threshold", pronunciation: "THRESH-old", polish: "próg", example: "below the threshold" },
      { word: "cascading", pronunciation: "kæs-KAY-ding", polish: "kaskadowy", example: "cascading effects" },
      { word: "knock-on effect", pronunciation: "NOK-on i-FEKT", polish: "efekt łańcuchowy", example: "a knock-on effect" },
      { word: "mitigate", pronunciation: "MIT-i-gayt", polish: "łagodzić", example: "to mitigate the impact" },
      { word: "absorb", pronunciation: "əb-ZORB", polish: "pochłaniać", example: "to absorb a shock" },
      { word: "adapt", pronunciation: "ə-DAPT", polish: "przystosować się", example: "to adapt to change" },
      { word: "transform", pronunciation: "trans-FORM", polish: "przekształcać", example: "to transform institutions" },
      { word: "prevent", pronunciation: "pri-VENT", polish: "zapobiegać", example: "to prevent collapse" },
    ],
  },
  {
    id: "academic",
    title: "Academic discourse",
    entries: [
      { word: "paradigm", pronunciation: "PAR-ə-daim", polish: "paradygmat", example: "a paradigm shift" },
      { word: "framework", pronunciation: "FRAYM-werk", polish: "ramy, model", example: "a strategic framework" },
      { word: "prerequisite", pronunciation: "pre-REK-wi-zit", polish: "warunek wstępny", example: "a prerequisite for peace" },
      { word: "fragmented", pronunciation: "frag-MEN-tid", polish: "fragmentaryczny", example: "fragmented action" },
      { word: "joined-up", pronunciation: "JOYND-up", polish: "zintegrowany", example: "a joined-up approach" },
      { word: "sustainable", pronunciation: "sə-STAY-nə-bəl", polish: "zrównoważony", example: "sustainable development" },
      { word: "leverage", pronunciation: "LEV-ər-ij", polish: "wykorzystać", example: "to leverage information" },
      { word: "mainstream", pronunciation: "MAYN-streem", polish: "główny nurt", example: "to mainstream the issue" },
      { word: "underpin", pronunciation: "un-dər-PIN", polish: "być fundamentem", example: "to underpin the framework" },
      { word: "encompass", pronunciation: "en-KOM-pəs", polish: "obejmować", example: "to encompass several areas" },
    ],
  },
];

// ============================================================
// Mock dialogue (final dress rehearsal)
// ============================================================
export const MOCK_DIALOGUE: DialogueLine[] = [
  {
    speaker: "examiner",
    text: "Good afternoon. Could we begin with a short summary — what is Marleku's article actually about?",
  },
  {
    speaker: "student",
    text: "Well, // the article looks at how states are now using **public intelligence** as a strategic tool. /// In fact, // Marleku argues that we are seeing a **paradigm shift** from secret to open statecraft. /// He focuses on Ukraine in 2022, // when Western governments released intelligence in real time. /// What's interesting is that this approach controlled the narrative, // but it failed to deter the actual invasion. ///",
  },
  {
    speaker: "examiner",
    text: "Thank you. Now, switching topics — how does the UN define resilience?",
  },
  {
    speaker: "student",
    text: "The UN defines **resilience** as the ability of a system or society to **prevent**, // **absorb**, // **adapt**, // **respond**, // and **recover** from shocks while still maintaining its essential functions. /// Essentially, // it is not a single trait but a combination of capacities. /// On the other hand, // adaptive and anticipatory capacities are especially important for protecting institutions and public trust. ///",
  },
  {
    speaker: "examiner",
    text: "Interesting. Do you see a connection between these two topics — public intelligence and resilience?",
  },
  {
    speaker: "student",
    text: "Yes, // I think they connect very clearly. /// Both are about building **anticipation** — seeing threats before they hit. /// In fact, // public intelligence is, // in a sense, // a tool of **anticipatory capacity**. /// By exposing risks early, // a state strengthens both alliance cohesion and societal preparedness. /// On the other hand, // both also have limits — neither can replace traditional hard power or stable institutions. ///",
  },
  {
    speaker: "examiner",
    text: "Do you agree with Marleku's conclusion that disclosure cannot deter aggression?",
  },
  {
    speaker: "student",
    text: "That's a really interesting question. /// I largely agree, // but with one nuance. /// Disclosure alone may not deter, // as the Russian invasion shows. /// What's interesting, // however, // is that disclosure combined with sanctions, // weapons deliveries, // and alliance unity may produce a stronger overall deterrent. /// So, to put it briefly, // public intelligence is a **piece** of deterrence, // not the whole of it. ///",
  },
  {
    speaker: "examiner",
    text: "Thank you. One last question — what would you say is the most useful lesson from these two readings for your own future work?",
  },
  {
    speaker: "student",
    text: "Well, // I would say the most useful lesson is the importance of **integration**. /// Whether we are talking about intelligence agencies or humanitarian actors, // success depends on cooperation across silos. /// Essentially, // both readings argue that fragmented action fails, // and joined-up action succeeds. /// For my own field, // this means thinking in systems — // and being ready to share information faster than I would by instinct. ///",
  },
  {
    speaker: "examiner",
    text: "Thank you, that was very thorough.",
  },
];

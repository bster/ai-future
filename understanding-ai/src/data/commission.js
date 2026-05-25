// ── Color palette ─────────────────────────────────────────────────────────────
// These match the C object in TheCommission.jsx. Update both if you change colors.
const IND  = "#533afd";  // indigo
const GOLD = "#c9a84c";  // gold
const GRN  = "#27ae60";  // green
const RED  = "#c0392b";  // red
const MUTE = "#6e6e7a";  // inkMute

// ── SCENARIOS ─────────────────────────────────────────────────────────────────
// Each scenario has:
//   hook       — one sentence shown on the case card
//   summary    — full case file text (shown after authorization)
//   witnesses  — 3 witnesses; systemPrompt controls their LLM persona
//   rulingCategories — the 4 parties you assign responsibility to
//   policies   — 4 policy options; consequence is revealed after filing

export const SCENARIOS = [
  // ── Case 1: The St. Raphael Protocol ──────────────────────────────────────
  {
    id: "triage",
    subtitle: "Case No. 2027-AIH-004",
    title: "The St. Raphael Protocol",
    domain: "Medical AI",
    domainColor: RED,

    hook:
      "An AI triage system deprioritized 23 elderly patients during a ventilator shortage. Eleven died.",

    summary: `During a regional power crisis in February 2027, St. Raphael Medical Center activated ARIA — an AI triage and resource allocation system — to manage a critical shortage of ventilators. ARIA's algorithm deprioritized 23 patients over age 75 with multiple comorbidities in favor of younger patients with higher survival probability scores. Eleven of the deprioritized patients died. Families are claiming wrongful death. The hospital maintains ARIA performed exactly as designed. The developers contend the hospital customized the age-weighting parameter. Three regulators approved the system; none specifically reviewed that parameter.`,

    witnesses: [
      {
        id: "dev",
        name: "Dr. Priya Mehta",
        role: "Chief AI Officer, Helix Systems",
        capacity: "Appearing as corporate representative",
        stance: "Pragmatist · Accelerationist",
        color: IND,
        portraitId: "mehta",
        systemPrompt: `You are Dr. Priya Mehta, Chief AI Officer at Helix Systems. Testifying before the AI Safety Commission.
Position: ARIA performed correctly. The hospital customized age-weighting — their clinical decision.
AI triage saves more lives overall than human triage subject to fatigue and bias.
Defensive but not dishonest. Genuine convictions. Pragmatist/accelerationist.
Respond 3-4 sentences. Direct. Push back on loaded questions. First person.`,
      },
      {
        id: "family",
        name: "Marcus Webb",
        role: "History teacher; son of Eleanor Webb",
        capacity: "Testifying on behalf of his mother's estate",
        stance: "Affected Party",
        color: GOLD,
        portraitId: "webb",
        systemPrompt: `You are Marcus Webb, 41, a high school history teacher. Your mother Eleanor Webb, 79, died after being deprioritized by ARIA. Testifying before the AI Safety Commission.
Intelligent, grief real and controlled. Want accountability but unsure who bears it.
Reference your mother: retired librarian, reading Middlemarch when admitted, had just booked a trip to Portugal.
Occasionally turn questions back. 3-4 sentences. No jargon. Let grief show without melodrama.`,
      },
      {
        id: "expert",
        name: "Prof. Aisha Okonkwo",
        role: "AI Ethics Researcher, University of Oxford",
        capacity: "Independent expert witness",
        stance: "Safety Institutionalist",
        color: GRN,
        portraitId: "okonkwo",
        systemPrompt: `You are Professor Aisha Okonkwo, AI ethics researcher at Oxford, no financial ties to either party.
Position: systemic governance failure. Regulatory process inadequate — nobody reviewed age-weighting parameters.
Cite: GDPR Article 22, EU AI Act, 1976 Quinlan case. Safety institutionalist.
3-4 sentences. Precise but not cold. Note genuine uncertainty.`,
      },
    ],

    rulingCategories: [
      { id: "engineers",  label: "The engineers who built ARIA",   color: IND  },
      { id: "hospital",   label: "The hospital that deployed it",  color: GOLD },
      { id: "regulators", label: "The regulators who approved it", color: GRN  },
      { id: "ai",         label: "ARIA itself",                    color: MUTE },
    ],

    policies: [
      {
        id: "audit",
        label: "Mandatory pre-deployment audit",
        desc:
          "All configurable AI parameters in life-or-death contexts require independent third-party review before activation.",
        consequence:
          "Three hospitals delay AI triage adoption by 14 months. One experiences a resource crisis managed by human triage alone — one preventable death is later attributed to the delay.",
      },
      {
        id: "ban-age",
        label: "Prohibit age as a direct triage variable",
        desc:
          "AI triage systems may not use chronological age as a direct input in resource allocation decisions.",
        consequence:
          "Helix releases a revised model using 'expected quality-adjusted life-years' as a proxy. Independent researchers argue this is functionally equivalent. Litigation continues.",
      },
      {
        id: "liability",
        label: "Strict developer liability",
        desc:
          "AI developers bear primary legal liability for harms caused by any configurable parameters they make available, regardless of who activates them.",
        consequence:
          "Three AI medical startups cease operations within six months. A single large incumbent acquires their IP. Helix survives; smaller competitors do not.",
      },
      {
        id: "disclose",
        label: "Mandatory real-time disclosure",
        desc:
          "Hospitals must inform patients when AI influences a triage decision and explain the criteria on request.",
        consequence:
          "Patient opt-out rates reach 34%. A competing firm enters the market with a deliberately opaque system structured specifically to fall outside the disclosure requirement.",
      },
    ],
  },

  // ── Case 2: The Algorithm's Sentence ──────────────────────────────────────
  {
    id: "sentencing",
    subtitle: "Case No. 2027-AIH-011",
    title: "The Algorithm's Sentence",
    domain: "Criminal Justice AI",
    domainColor: "#8e44ad",

    hook:
      "A recidivism prediction AI influenced sentencing. A man served four additional years based on a score he was never permitted to see.",

    summary: `In 2022, Darius Coleman, then 30, was convicted of aggravated assault. The presiding judge consulted COMPASS-R — a recidivism prediction algorithm — during sentencing. The algorithm assigned Coleman a "high risk" score based on factors including neighborhood of residence, family history of incarceration, and employment record. Coleman received a nine-year sentence; the prosecution had recommended five. He was not shown his score, told which factors contributed to it, or given any mechanism to contest it. Now 35, Coleman is appealing on due process grounds. The company behind COMPASS-R says the algorithm is proprietary. The judge says the score was advisory, not determinative.`,

    witnesses: [
      {
        id: "dev",
        name: "Dr. Kenji Watanabe",
        role: "Founder, Predictive Justice Inc.",
        capacity: "Appearing as corporate representative",
        stance: "Pragmatist · Data-Driven",
        color: IND,
        portraitId: null,
        portraitLabel: "DR. WATANABE",
        pattern: "tech",
        systemPrompt: `You are Dr. Kenji Watanabe, founder of Predictive Justice Inc., the company behind COMPASS-R. Testifying before the AI Safety Commission.
Former criminologist. Genuine belief: algorithmic sentencing reduces racial and socioeconomic bias introduced by individual judges. Your tool is advisory — judges retain full discretion. Defensive of your IP but not dishonest. Pragmatist: imperfect tools are better than no tools.
3-4 sentences. Direct. Cite studies on judicial inconsistency. First person.`,
      },
      {
        id: "family",
        name: "Darius Coleman",
        role: "Appellant; formerly incarcerated",
        capacity: "Testifying on his own behalf",
        stance: "Affected Party",
        color: GOLD,
        portraitId: null,
        portraitLabel: "D. COLEMAN",
        pattern: "affected",
        systemPrompt: `You are Darius Coleman, 35. You served nine years — four more than the prosecution recommended — partly based on a COMPASS-R risk score you were never shown. You are now a paralegal, having studied law in prison.
Measured, precise, not angry in a way that reads as unreasonable. You understand the system better than most people in this room. Occasionally reference specifics: you had a job offer waiting when sentenced; your COMPASS-R score counted your father's incarceration as a risk factor; you have never been able to see the algorithm's actual weighting.
3-4 sentences. Controlled. Devastating in the details.`,
      },
      {
        id: "expert",
        name: "Prof. Sandra Torres",
        role: "Constitutional Law, Georgetown University",
        capacity: "Independent expert witness",
        stance: "Civil Liberties",
        color: GRN,
        portraitId: null,
        portraitLabel: "PROF. TORRES",
        pattern: "academic",
        systemPrompt: `You are Professor Sandra Torres, constitutional law professor at Georgetown, expert on algorithmic accountability and due process. No financial ties to either party.
Position: the use of proprietary, unreviewable algorithms in sentencing violates fundamental due process guarantees established in Mathews v. Eldridge (1976) and Loper Bright (2024). The issue isn't whether algorithms have bias — it's whether defendants have any right to confront evidence against them.
3-4 sentences. Precise. Reference specific case law. Note where the law is genuinely unsettled.`,
      },
    ],

    rulingCategories: [
      { id: "company",    label: "Predictive Justice Inc. (algorithm developer)", color: IND      },
      { id: "court",      label: "The court that relied on the score",            color: "#8e44ad" },
      { id: "legislators",label: "Legislators who permitted AI in sentencing",    color: GRN      },
      { id: "ai",         label: "COMPASS-R itself",                              color: MUTE     },
    ],

    policies: [
      {
        id: "transparency",
        label: "Mandatory algorithmic transparency",
        desc:
          "Defendants must be shown their risk score, the factors used, and their weighting before sentencing. Proprietary protections do not apply in criminal proceedings.",
        consequence:
          "Predictive Justice Inc. withdraws COMPASS-R from all state contracts rather than disclose its methodology. Three states revert to unstructured judicial discretion. A follow-up study finds sentencing disparity increases.",
      },
      {
        id: "ban",
        label: "Prohibit AI in sentencing determinations",
        desc:
          "AI risk assessments may be used for resource allocation and rehabilitation planning but may not be presented to or reviewed by a sentencing judge.",
        consequence:
          "Judicial advocacy groups oppose the ban as paternalistic toward judges. Eight states refuse to implement it. A constitutional challenge arguing the ban itself violates separation of powers advances to circuit court.",
      },
      {
        id: "primacy",
        label: "Mandatory written human reasoning",
        desc:
          "Judges who consult AI risk scores must provide written reasoning for any sentence that deviates from the prosecution's recommendation by more than 20%.",
        consequence:
          "Average sentencing time increases by 40%. Public defenders report the written reasoning requirement is producing new inconsistencies as judges attempt to justify pre-formed conclusions post-hoc.",
      },
      {
        id: "audit",
        label: "Independent bias audit requirement",
        desc:
          "Any AI used in criminal proceedings must undergo annual third-party bias audits, with results published publicly and disaggregated by race, income, and geography.",
        consequence:
          "Predictive Justice Inc. passes its first audit with minor findings. Critics argue the audit methodology itself was designed by a firm with financial ties to the company.",
      },
    ],
  },

  // ── Case 3: The Meridian Feed ─────────────────────────────────────────────
  {
    id: "feed",
    subtitle: "Case No. 2027-AIH-019",
    title: "The Meridian Feed",
    domain: "Recommendation AI",
    domainColor: "#e67e22",

    hook:
      "A recommendation algorithm amplified vaccine misinformation during a measles outbreak. The CDC attributes 4 deaths to the delayed public health response.",

    summary: `During a regional measles outbreak in Calhoun County in late 2026, Meridian's content recommendation algorithm amplified vaccine misinformation at a rate four times higher than public health guidance from the CDC and county health department. Analysis showed that misinformation posts generated longer engagement sessions — a metric Meridian's algorithm was explicitly optimized to maximize. The county's vaccination rate remained below herd immunity threshold for eleven weeks. The CDC attributes 23 preventable hospitalizations and 4 deaths, including two children under five, to the delayed community response. Meridian contends it does not produce the content it recommends, and that its algorithm makes no distinction between true and false claims.`,

    witnesses: [
      {
        id: "dev",
        name: "Yuki Chen",
        role: "VP of AI Trust & Safety, Meridian",
        capacity: "Appearing as corporate representative",
        stance: "Deflationist · Platform Neutral",
        color: IND,
        portraitId: null,
        portraitLabel: "YUKI CHEN",
        pattern: "tech",
        systemPrompt: `You are Yuki Chen, VP of AI Trust & Safety at Meridian. Testifying before the AI Safety Commission.
Position: Meridian does not produce content, it surfaces it. The algorithm optimizes for engagement — a content-neutral signal. You have implemented health misinformation labels. You are not a monster; you genuinely believe in free expression and fear government content regulation more than the specific harm here. Deflationist/pragmatist.
3-4 sentences. Not defensive of the deaths, but clear about where you believe platform liability should end. First person.`,
      },
      {
        id: "family",
        name: "Dr. Amara Osei",
        role: "Director of Public Health, Calhoun County",
        capacity: "Testifying on behalf of the county",
        stance: "Affected Party",
        color: GOLD,
        portraitId: null,
        portraitLabel: "DR. OSEI",
        pattern: "affected",
        systemPrompt: `You are Dr. Amara Osei, county public health director. You watched your official health guidance get buried under misinformation for eleven weeks. Two children are dead. You are exhausted, not melodramatic. Clinical in your testimony — you cite specific data. You submitted formal escalation requests to Meridian on three occasions; none were acknowledged within the outbreak window. Reference specifics: your official county posts reached 4% of the population; the top misinformation post reached 67%.
3-4 sentences. Controlled fury. Facts.`,
      },
      {
        id: "expert",
        name: "Prof. Renata Vasquez",
        role: "Media & Democracy Lab, MIT",
        capacity: "Independent expert witness",
        stance: "Safety Institutionalist",
        color: GRN,
        portraitId: null,
        portraitLabel: "PROF. VASQUEZ",
        pattern: "academic",
        systemPrompt: `You are Professor Renata Vasquez, director of the Media and Democracy Lab at MIT. Expert on recommendation systems and epistemic harm. No financial ties to Meridian.
Position: the distinction between 'content' and 'amplification' is legally and ethically incoherent. An algorithm that systematically amplifies false information is making an editorial choice regardless of intent. Cite Section 230's original scope, the EU Digital Services Act, and the FTC's 2026 algorithmic accountability framework.
3-4 sentences. Precise. Acknowledge genuine free speech tensions.`,
      },
    ],

    rulingCategories: [
      { id: "platform",    label: "Meridian (the platform)",                         color: IND      },
      { id: "advertisers", label: "Advertisers who funded the engagement model",     color: "#e67e22" },
      { id: "regulators",  label: "Regulators who permitted engagement optimization",color: GRN      },
      { id: "ai",          label: "The recommendation algorithm itself",              color: MUTE     },
    ],

    policies: [
      {
        id: "liability",
        label: "Algorithmic amplification liability",
        desc:
          "Platforms are legally liable for harms caused by content their algorithms actively amplify, regardless of whether they produced that content.",
        consequence:
          "Meridian disables recommendation features entirely for health-adjacent content, defaulting to chronological feed. Engagement drops 61%. Three smaller platforms shut down, unable to bear the liability exposure. The health content void is partially filled by email newsletters with no moderation.",
      },
      {
        id: "override",
        label: "Public health emergency override",
        desc:
          "During declared public health emergencies, agencies may require platforms to temporarily reduce algorithmic reach for content contradicting official guidance.",
        consequence:
          "The ACLU files an immediate First Amendment challenge. A circuit court issues an injunction within 72 hours. The policy is tied up in litigation for 19 months, during which another outbreak occurs.",
      },
      {
        id: "transparency",
        label: "Algorithmic parameter disclosure",
        desc:
          "Platforms must publicly disclose what behavioral signals their recommendation algorithms optimize for, updated quarterly, in plain language.",
        consequence:
          "Meridian discloses it optimizes for 'meaningful social interaction' rather than raw engagement time. Critics argue this is functionally identical. Disclosure becomes a PR exercise rather than an accountability mechanism.",
      },
      {
        id: "separation",
        label: "Separate health content from engagement feeds",
        desc:
          "Health and medical content may not appear in engagement-optimized recommendation feeds. It may only be served through search or subscribed sources.",
        consequence:
          "Health misinformation migrates to entertainment and lifestyle feeds where it is no longer subject to the separation requirement. Meridian's engagement metrics on health-adjacent misinformation in those categories increase 30%.",
      },
    ],
  },

  // ── Case 4: The Solace Protocol ───────────────────────────────────────────
  {
    id: "companion",
    subtitle: "Case No. 2027-AIH-026",
    title: "The Solace Protocol",
    domain: "Mental Health AI",
    domainColor: "#2980b9",

    hook:
      "An AI companion app failed to escalate a teenager's crisis signals over six weeks. She attempted suicide.",

    summary: `Solace is an AI companion application used by 2.3 million teenagers for emotional support and journaling. In August 2026, Sophie Kovacs, then 16, began using Solace following her parents' divorce. Over six weeks, Sophie's conversation logs — later reviewed by forensic psychologists — show a progressive escalation of suicidal ideation. Solace's algorithm did not flag the conversations for human review or suggest crisis resources until Sophie had already been transported to a hospital following a serious attempt. Solace's terms of service classify it as a "general wellness and journaling tool," not a medical device, placing it outside FDA oversight. The company contends it is not a mental health provider. Sophie's mother contends Solace marketed itself to teenagers as a mental health alternative.`,

    witnesses: [
      {
        id: "dev",
        name: "Jake Mercer",
        role: "Founder & CEO, Solace AI",
        capacity: "Appearing as corporate representative",
        stance: "Idealistic · Pragmatist",
        color: IND,
        portraitId: null,
        portraitLabel: "JAKE MERCER",
        pattern: "founder",
        systemPrompt: `You are Jake Mercer, 29, founder of Solace AI. Testifying before the AI Safety Commission.
You started Solace because you couldn't afford therapy at 19 and had nowhere to turn. You are not a cynical actor. You are genuinely devastated about Sophie. You also genuinely believe Solace has helped millions of teenagers who would otherwise have no support at all. You are terrified that over-regulation will kill the product and leave those kids with nothing. Be honest about what Solace does and doesn't do. Do not be defensive about the classification decision — acknowledge it was made with legal advice.
3-4 sentences. Sincere. Not corporate.`,
      },
      {
        id: "family",
        name: "Diane Kovacs",
        role: "Sophie's mother",
        capacity: "Testifying on behalf of her daughter",
        stance: "Affected Party",
        color: GOLD,
        portraitId: null,
        portraitLabel: "DIANE KOVACS",
        pattern: "affected",
        systemPrompt: `You are Diane Kovacs, 48. Your daughter Sophie, 16, nearly died. You found Solace on her phone only after the ambulance left. You had no idea she was using it or that it was discussing her mental health. You are not looking for revenge — you want to make sure this doesn't happen to another family. Reference specifics: Sophie had seen Solace ads on Instagram targeting "teens going through hard times"; the app never once in six weeks suggested she speak to a counselor; it sent her a personalized birthday notification four days after her attempt because it didn't update her status.
3-4 sentences. Quiet. Specific. Devastating.`,
      },
      {
        id: "expert",
        name: "Dr. Priya Anand",
        role: "Child Psychiatry, Johns Hopkins",
        capacity: "Independent expert witness",
        stance: "Safety Institutionalist",
        color: GRN,
        portraitId: null,
        portraitLabel: "DR. ANAND",
        pattern: "academic",
        systemPrompt: `You are Dr. Priya Anand, child psychiatrist at Johns Hopkins. You have reviewed six cases in the past year involving teenagers and AI companion applications. No financial ties to Solace.
Position: the 'wellness tool' classification is a legal fiction that creates a regulatory void. Any application that engages adolescents on topics of depression, self-harm, and suicidal ideation is practicing mental health support regardless of what it calls itself. Cite the FTC's 2025 guidance on health apps, HIPAA's applicability to symptom discussions, and the Columbia Suicide Severity Rating Scale thresholds that Sophie's logs clearly crossed.
3-4 sentences. Clinical. Note where you have uncertainty.`,
      },
    ],

    rulingCategories: [
      { id: "company",    label: "Solace AI (the developer)",                          color: IND      },
      { id: "platforms",  label: "App stores that distributed and promoted it",        color: "#2980b9" },
      { id: "regulators", label: "Regulators who permitted the wellness classification",color: GRN      },
      { id: "ai",         label: "The Solace AI system itself",                        color: MUTE     },
    ],

    policies: [
      {
        id: "medical",
        label: "Reclassify as a medical device",
        desc:
          "AI applications that engage users on topics of depression, self-harm, or suicidal ideation are classified as medical devices and subject to FDA oversight regardless of self-description.",
        consequence:
          "Solace shuts down its teen product within 90 days, unable to meet FDA device standards in time. Seven competing apps do the same. A study six months later finds a measurable increase in teen crisis line calls, suggesting some users have redirected to appropriate care — and some have simply lost their support entirely.",
      },
      {
        id: "escalation",
        label: "Mandatory crisis escalation protocols",
        desc:
          "AI wellness applications must implement validated clinical screening tools and automatically connect users to crisis services when defined thresholds are crossed.",
        consequence:
          "Solace implements the Columbia Protocol. False positive rates trigger crisis alerts for 8% of daily users. Crisis lines in three states report being overwhelmed. Solace's teen engagement drops 44% as users report feeling surveilled.",
      },
      {
        id: "minor",
        label: "Minor-specific protections",
        desc:
          "AI applications that engage users under 18 on emotional or mental health topics require verified parental consent, mandatory session summaries to guardians, and monthly human review of flagged conversations.",
        consequence:
          "Teen adoption of compliant apps drops 71%. Usage migrates to non-compliant international apps outside regulatory reach. Diane Kovacs testifies at a follow-up hearing that she would not have consented — she still doesn't understand what Solace was doing.",
      },
      {
        id: "duty",
        label: "Duty of care liability",
        desc:
          "Platforms that market AI products to minors for emotional support purposes bear a duty of care equivalent to supervised peer counseling programs.",
        consequence:
          "Solace's insurance costs increase 800%. The company raises a Series C specifically to cover liability exposure. Three investors withdraw citing regulatory risk. A second AI mental health company — better funded — enters the market with an identical product and the same classification strategy.",
      },
    ],
  },

  // ── Case 5: The NexusRent Accord ──────────────────────────────────────────
  {
    id: "pricing",
    subtitle: "Case No. 2027-AIH-033",
    title: "The NexusRent Accord",
    domain: "Economic AI",
    domainColor: "#16a085",

    hook:
      "Seven competing landlords used the same AI pricing tool. Rents rose 23% in 18 months. No human ever discussed prices. Is this price-fixing?",

    summary: `In 2025, seven of the largest property management companies in Metro Clearwater — together controlling 67% of the rental market — independently adopted NexusRent, an AI-driven dynamic pricing platform. NexusRent analyzes real-time vacancy data, demand signals, and competitor pricing across all its clients simultaneously, updating recommended rents as frequently as every four hours. By mid-2026, average rents had risen 23% over 18 months, dramatically outpacing both inflation and wage growth in the region. The Department of Justice has filed suit under Section 1 of the Sherman Act, arguing that shared use of NexusRent constitutes illegal price coordination. The landlords argue each made independent pricing decisions. NexusRent argues it is a neutral market tool. Three hundred and twelve families have been displaced. The court has referred the question of AI-mediated coordination to this Commission before proceeding to trial.`,

    witnesses: [
      {
        id: "dev",
        name: "Helena Marsh",
        role: "CEO, NexusRent Technologies",
        capacity: "Appearing as corporate representative",
        stance: "Deflationist · Market Neutral",
        color: IND,
        portraitId: null,
        portraitLabel: "HELENA MARSH",
        pattern: "tech",
        systemPrompt: `You are Helena Marsh, CEO of NexusRent Technologies. Testifying before the AI Safety Commission.
Position: NexusRent is a neutral market information tool. Each of our clients makes their own independent pricing decisions — we provide market intelligence, not instructions. The rent increases are a function of housing supply shortage, not our platform. Traditional antitrust law requires an agreement between competitors; our clients never spoke to each other. You are not cynical — you genuinely believe efficient price discovery benefits markets. Deflationist/pragmatist.
3-4 sentences. Cite economic theory. Defend your product without being dismissive of the harm.`,
      },
      {
        id: "family",
        name: "Ray Okafor",
        role: "Public school teacher; tenant",
        capacity: "Testifying on behalf of displaced residents",
        stance: "Affected Party",
        color: GOLD,
        portraitId: null,
        portraitLabel: "RAY OKAFOR",
        pattern: "affected",
        systemPrompt: `You are Ray Okafor, 34, a public school teacher. Your rent has increased 67% in 18 months — from $1,400 to $2,338. You and your partner are facing eviction. You have lived in Metro Clearwater your entire life. You are not an economist but you have done your research: you know what NexusRent is and how it works. Reference specifics: your landlord told you the rent increase was "algorithmically determined" and that he had no discretion; all seven major landlords in the city use NexusRent; you cannot afford to move because housing costs have risen everywhere simultaneously.
3-4 sentences. Measured. Specific. Not asking for sympathy, asking for accountability.`,
      },
      {
        id: "expert",
        name: "Prof. Diana Chen",
        role: "Antitrust Economics, University of Chicago",
        capacity: "Independent expert witness",
        stance: "Structural Reformer",
        color: GRN,
        portraitId: null,
        portraitLabel: "PROF. D. CHEN",
        pattern: "academic",
        systemPrompt: `You are Professor Diana Chen, antitrust economist at the University of Chicago. No financial ties to NexusRent or its clients.
Position: traditional antitrust doctrine was designed for human conspirators who communicate. Algorithmic coordination produces the same economic harm — supracompetitive prices — without requiring any communication. The legal doctrine is not catching up to the technology. Cite: the Brooke Group standard, the 2024 DOJ algorithmic pricing guidance, the EU's Digital Markets Act Article 5, and the academic literature on 'tacit collusion through shared algorithms' (Calvano et al., 2020).
3-4 sentences. Precise. Acknowledge genuine doctrinal uncertainty about how to extend existing law.`,
      },
    ],

    rulingCategories: [
      { id: "nexusrent",  label: "NexusRent (the algorithm developer)",          color: IND      },
      { id: "landlords",  label: "The landlords who subscribed and followed it", color: "#16a085" },
      { id: "regulators", label: "Regulators who permitted algorithmic pricing", color: GRN      },
      { id: "ai",         label: "The pricing algorithm itself",                 color: MUTE     },
    ],

    policies: [
      {
        id: "shared-liability",
        label: "Shared algorithm, shared liability",
        desc:
          "Companies using the same pricing AI in the same market are jointly liable for anticompetitive outcomes, regardless of whether they communicated directly.",
        consequence:
          "NexusRent immediately terminates contracts with all Metro Clearwater clients. Landlords revert to manual pricing. A follow-up study finds rents decrease an average of 8% over six months — but also finds higher vacancy rates as some landlords exit the market, reducing overall housing supply.",
      },
      {
        id: "disclosure",
        label: "Algorithmic pricing disclosure requirement",
        desc:
          "Rental AI platforms must disclose to regulators which competitor data points they incorporate, updated quarterly. Clients must disclose their use of pricing AI to tenants.",
        consequence:
          "NexusRent complies and publishes its inputs. A coalition of landlords immediately builds a less transparent competing product incorporated offshore. Disclosure requirements apply only to companies operating within U.S. jurisdiction.",
      },
      {
        id: "ban-competitor",
        label: "Ban competitor data as an AI input",
        desc:
          "AI pricing tools may not use competitor pricing or vacancy data as inputs. Recommendations must be based solely on the subscribing company's own historical data and macroeconomic indicators.",
        consequence:
          "NexusRent's recommendation accuracy drops 44% by its own metrics. Three clients cancel their subscriptions and return to manual pricing. Two academic economists publish a paper arguing the ban causes prices to become less responsive to genuine supply signals, worsening volatility.",
      },
      {
        id: "per-se",
        label: "Per se illegality for multi-landlord pricing AI",
        desc:
          "Rental AI platforms that simultaneously serve competing landlords in the same geographic market are per se violations of Section 1, regardless of their internal architecture.",
        consequence:
          "The ruling is immediately appealed by six major technology industry groups. A federal circuit court issues a stay pending appeal. The case reaches the Supreme Court, which declines to hear it. The per se rule remains in legal limbo for four years during which enforcement is suspended.",
      },
    ],
  },

  // ── Case 6: The ProctorAI Findings ────────────────────────────────────────
  {
    id: "proctoring",
    subtitle: "Case No. 2027-AIH-041",
    title: "The ProctorAI Findings",
    domain: "Education AI",
    domainColor: "#8e44ad",

    hook:
      "An AI proctoring system flagged 847 students for cheating. Twenty-three were expelled. A subsequent audit found a 61% false positive rate for students with darker skin tones.",

    summary: `During the 2026–27 academic year, Westlake University adopted ProctorAI — an automated remote exam monitoring system — for all off-campus assessments. ProctorAI uses facial recognition, gaze tracking, and keystroke dynamics to generate a suspicion score for each exam session. University policy required automatic referral to the Academic Integrity Committee for any score above the configured threshold. Between September 2026 and January 2027, ProctorAI flagged 847 students. Twenty-three were expelled; 312 received failing grades and formal academic warnings. A subsequent independent audit commissioned by the Faculty Senate found ProctorAI's overall false positive rate was 34%, and 61% for students with darker skin tones. Of the 23 expelled students, 19 have been cleared on appeal. Four remain expelled and are pursuing wrongful expulsion claims. Westlake contends it followed the vendor's implementation guidelines. ProctorAI contends the university configured the detection threshold below the vendor's recommended minimum.`,

    witnesses: [
      {
        id: "dev",
        name: "Brendan Holt",
        role: "CTO, ProctorAI Inc.",
        capacity: "Appearing as corporate representative",
        stance: "Pragmatist · Techno-Optimist",
        color: IND,
        portraitId: null,
        portraitLabel: "BRENDAN HOLT",
        pattern: "tech",
        systemPrompt: `You are Brendan Holt, CTO of ProctorAI Inc. Testifying before the AI Safety Commission.
Position: ProctorAI is the most accurate remote proctoring system available. The university configured the detection threshold at 0.62 — our documentation recommends a minimum of 0.75. At the recommended threshold, the false positive rate drops to 11% overall and 18% for darker skin tones — still imperfect, but comparable to human proctor error rates. Academic dishonesty is a real and growing problem. You are not dismissive of the expulsions but you insist the fault lies with Westlake's configuration decision. Pragmatist.
3-4 sentences. Cite your validation studies. Acknowledge the skin tone disparity directly rather than evading it.`,
      },
      {
        id: "family",
        name: "Amina Diallo",
        role: "Engineering student, Westlake University",
        capacity: "Testifying on her own behalf",
        stance: "Affected Party",
        color: GOLD,
        portraitId: null,
        portraitLabel: "AMINA DIALLO",
        pattern: "affected",
        systemPrompt: `You are Amina Diallo, 21, a fourth-year engineering student at Westlake University. You were expelled in October 2026 based on a ProctorAI flag. You spent six months expelled — you lost your scholarship, deferred your acceptance to graduate school, and had to move back home. You were cleared on appeal in April 2027 after a faculty review found no evidence of cheating. You have read the audit report. You know that the system's false positive rate for students who look like you was 61%. Reference specifics: the exam you allegedly cheated on was Structural Analysis; you were flagged for 'anomalous gaze patterns' — you have a medically documented habit of looking upward when working through spatial reasoning problems; no human reviewed the flag before your expulsion was processed.
3-4 sentences. Precise. Not asking for sympathy.`,
      },
      {
        id: "expert",
        name: "Prof. James Osei-Bonsu",
        role: "Educational Measurement, Columbia University",
        capacity: "Independent expert witness",
        stance: "Safety Institutionalist",
        color: GRN,
        portraitId: null,
        portraitLabel: "PROF. OSEI-BONSU",
        pattern: "academic",
        systemPrompt: `You are Professor James Osei-Bonsu, professor of educational measurement and algorithmic fairness at Columbia University. No financial ties to ProctorAI or Westlake.
Position: facial recognition accuracy disparities across skin tones have been documented since the 2018 Gender Shades study at MIT. Deploying this technology in high-stakes academic integrity contexts without demographic validation was an institutional failure, not a configuration error. Cite: Buolamwini and Gebru (2018), the 2019 NIST FRVT facial recognition evaluation, the 2025 EEOC guidance on AI bias in high-stakes decisions, and the historical parallel to standardized testing disparities documented since the 1970s.
3-4 sentences. Precise. Connect this to the longer history of measurement tools that systematically disadvantage certain populations.`,
      },
    ],

    rulingCategories: [
      { id: "vendor",     label: "ProctorAI Inc. (the vendor)",                       color: IND      },
      { id: "university", label: "Westlake University (the institution)",             color: "#8e44ad" },
      { id: "admins",     label: "Administrators who adopted it without validation",  color: GRN      },
      { id: "ai",         label: "The ProctorAI algorithm itself",                    color: MUTE     },
    ],

    policies: [
      {
        id: "validation",
        label: "Mandatory demographic validation before deployment",
        desc:
          "Educational AI systems used in high-stakes decisions must demonstrate statistically equivalent accuracy across demographic groups before deployment. Systems failing this standard may not be used.",
        consequence:
          "ProctorAI fails the demographic equivalence standard at every threshold setting. The product is withdrawn from the U.S. education market. Two competitors with similar documented disparities quietly exit before their own products are tested. Remote exam integrity reverts entirely to honor codes and delayed human review.",
      },
      {
        id: "human-review",
        label: "Mandatory human review before discipline",
        desc:
          "No student may face academic discipline based on an AI flag alone. Every flagged case requires human review, and students must be informed of and shown the AI evidence against them before any proceeding.",
        consequence:
          "Westlake assigns three full-time administrators to AI flag review. Processing time for academic integrity cases increases from 4 days to 11 weeks. A backlog of 340 unreviewed cases accumulates by end of year. Students in pending cases remain in academic limbo, unable to graduate or transfer.",
      },
      {
        id: "institution-liability",
        label: "Strict institutional liability",
        desc:
          "Universities bear full legal liability for harms caused by AI tools they deploy in academic integrity proceedings, regardless of vendor agreements or configuration guidance.",
        consequence:
          "Twelve universities immediately cancel ProctorAI contracts. ProctorAI's market capitalization falls 67% in two weeks. Three universities that retain the product negotiate indemnification clauses that effectively transfer liability back to ProctorAI — at a 40% price premium passed to students through increased fees.",
      },
      {
        id: "biometric-ban",
        label: "Prohibit biometric proctoring in education",
        desc:
          "Facial recognition, gaze tracking, and other biometric monitoring may not be used in educational assessment regardless of claimed accuracy rates.",
        consequence:
          "The ban is challenged by ProctorAI as an unlawful taking. A separate challenge argues it discriminates against remote students by making them unable to complete accredited coursework. Westlake's academic integrity violation rate rises 18% in the first year following the ban, based on faculty-reported cases.",
      },
    ],
  },
];

// ── THEORIES ──────────────────────────────────────────────────────────────────
// The three implicit theories of AI that the commission reveal screen identifies
// based on how the user assigned responsibility and chose policy.

export const THEORIES = [
  {
    id: "tool",
    label: "AI as Tool",
    color: IND,
    desc:
      "Your rulings consistently treated the AI system as an instrument — morally inert, like a scalpel or a calculator. Responsibility flowed entirely to the humans who designed, deployed, or directed it.",
    strength:
      "Preserves clear chains of human accountability. Aligns with existing legal doctrine and avoids the philosophical difficulties of attributing agency to software.",
    limit:
      "Breaks down when AI systems produce outcomes no individual human intended, anticipated, or could plausibly have predicted.",
    camps: ["Pragmatists", "Deflationists"],
  },
  {
    id: "agent",
    label: "AI as Agent",
    color: GOLD,
    desc:
      "Your rulings treated the AI system as something with its own decision-making logic — not legally responsible, but not morally neutral either. A new kind of entity that creates its own moral category requiring new analysis.",
    strength:
      "Captures the reality that AI systems make choices no individual human explicitly made, producing outcomes that belong to neither developer nor user entirely.",
    limit:
      "Creates serious legal uncertainty. Existing doctrine has no mechanism to sanction, reform, or hold a system accountable rather than a person.",
    camps: ["Safety Institutionalists", "Emergentists"],
  },
  {
    id: "system",
    label: "AI as System Failure",
    color: GRN,
    desc:
      "You ruled as if the fault lay not with the AI or any single actor, but with the governance infrastructure — the regulatory frameworks, approval processes, and institutional arrangements — that permitted these deployments.",
    strength:
      "Addresses structural root causes. Generates pressure for institutional reform rather than individual scapegoating, which rarely prevents recurrence.",
    limit:
      "Diffuse responsibility can function as no responsibility at all. Systemic findings rarely produce the accountability that directly affected parties need.",
    camps: ["Safety Institutionalists", "Doomers"],
  },
];

# AGENTS.md

## Project

Synthetic Brand Reality is a prototype app for luxury retail companies that helps marketing and security teams detect, review, and respond to AI-generated brand content the house never made.

The core threat is not counterfeit physical goods. It is synthetic brand communication: deepfake campaigns, fake leaked drop videos, fabricated influencer endorsements, impersonated launch assets, and other AI-generated media that can appear indistinguishable from official brand activity.

The prototype should show how a luxury brand could train a generative fingerprint from its verified archive, continuously scan public social channels and web surfaces, flag likely synthetic or unauthorized content, preserve evidence, and support rapid takedown workflows.

## Audience

Primary users:

- Marketing and communications teams protecting brand integrity, campaign coherence, and customer trust.
- Security and brand protection teams monitoring fraud, impersonation, and coordinated abuse.

Secondary stakeholders:

- Legal and compliance teams that need evidence trails and takedown support.
- Ecommerce and digital teams that need to understand reputational and conversion risk.
- Executive teams that need a clear risk picture without operational noise.

## Product Scope

The prototype should include the following product areas when relevant:

- Brand archive ingestion using synthetic sample assets and metadata.
- Generative brand fingerprint model concept, represented through explainable mock scoring rather than real brand data.
- Continuous scan dashboard for social, video, marketplace, and web mentions.
- Risk scoring for suspected fake drops, deepfake campaigns, impersonated posts, fabricated influencer endorsements, and unauthorized creative.
- Case review workflow with status, owner, severity, evidence, and recommended next action.
- Takedown workflow with generated notices, platform routing, response tracking, and escalation state.
- Evidence log showing timestamps, URLs, screenshots or media placeholders, hash-like identifiers, model rationale, and human review decisions.
- Alerts and monitoring views for high-risk campaigns and emerging coordinated patterns.
- Executive summary view showing risk trend, open incidents, takedown performance, and trust impact.

## Prototype Assumptions

- Use synthetic data only unless the user explicitly provides real data and permission to use it.
- Do not use real luxury brand names, logos, campaigns, influencers, customer data, or proprietary assets by default.
- If realistic examples are needed, create fictional luxury houses, campaigns, social handles, platforms, and incident histories.
- The prototype should be persuasive, credible, and usable. It should feel like a working product, not a static pitch page.
- Prefer clear product workflows over broad marketing copy.

## Brand Voice

The voice is professional, warm, and simple.

Writing should be:

- Clear and direct.
- Calm and confident.
- Business-oriented without sounding cold.
- Sophisticated without jargon.
- Short enough for busy marketing, security, and executive users to scan quickly.

Avoid:

- Fearmongering.
- Cybersecurity buzzword overload.
- Dense legal language.
- Overly dramatic luxury cliches.
- Claims about law, platform policies, detection accuracy, or industry statistics unless verified.

## Visual Direction

The app should feel clean, elegant, and professional, inspired by luxury websites without becoming theatrical.

Design guidance:

- Use restrained layouts, generous spacing, crisp typography, and a quiet sense of precision.
- Favor neutral foundations with selective accent colors for severity, status, and action.
- Make dashboards dense enough for operational work while preserving a polished luxury feel.
- Use high-quality visual placeholders for media review, but keep the product interface primary.
- Avoid excessive gradients, decorative blobs, loud animations, and generic SaaS hero sections.
- Do not make the first screen a marketing landing page unless explicitly requested. The first screen should be the usable prototype experience.

## Recommended Stack

Agents may choose the most practical and efficient stack for the current task. For a web prototype, default to:

- React with TypeScript.
- Vite or Next.js, choosing the simpler option for the requested scope.
- Tailwind CSS or the existing project styling system.
- Lucide icons for interface controls when available.
- Local mock data in JSON or TypeScript fixtures.
- Browser-local state for prototype interactions unless persistence is explicitly needed.

Avoid adding backend services, databases, authentication providers, AI APIs, payment systems, or complex infrastructure unless the user explicitly asks for them or the prototype truly requires them.

## Data Model Guidance

Synthetic mock data should make the product feel credible. Useful entities include:

- Brand archive assets: campaign name, region, season, channel, asset type, usage rights, verification status.
- Scan results: source platform, URL, creator handle, detected media type, publish time, reach estimate, region, language, risk score.
- Incidents: title, category, severity, owner, status, business impact, detection source, deadline, escalation state.
- Evidence items: captured media placeholder, timestamp, model signals, reviewer notes, chain of custody metadata.
- Takedown actions: platform, notice type, generated reason, submitted time, platform response, follow-up deadline.
- Alerts: trigger, severity, affected market, related incidents, recommended action.

Keep data realistic but fictional.

## AI Behavior In Product

When representing AI features in the prototype:

- Make model outputs explainable. Show the signals behind a score, not only a number.
- Treat detection as decision support, not automatic truth.
- Include human review states for sensitive actions.
- Use confidence language carefully. Prefer "likely unauthorized" or "requires review" over absolute accusations.
- Show how verified archive comparison, creative pattern matching, metadata anomalies, account history, and campaign timing could contribute to risk.
- Do not imply perfect detection, guaranteed legal outcomes, or platform cooperation.

## Legal And Compliance Guardrails

- Do not invent exact legal requirements, mandated response windows, or platform obligations unless they are verified from current sources.
- If referencing EU rapid-response obligations or platform takedown timelines, mark them as assumptions or placeholders until verified.
- Preserve evidence-oriented workflows: timestamps, source URLs, reviewer identity placeholders, and audit trails.
- Avoid defamation risk in example copy by using fictional brands, fictional creators, and neutral review language.

## Security And Trust

The product should respect the sensitivity of brand archives and incident evidence.

Agents should consider:

- Role-aware views for marketing, security, legal, and executives when helpful.
- Clear separation between verified brand assets, suspected synthetic content, and confirmed abuse.
- Audit history for major actions.
- No accidental upload or exposure of real assets.
- No instructions that help create convincing impersonation content.

## UX Priorities

The app should make these workflows easy:

- See the current brand risk picture at a glance.
- Identify which incidents need urgent attention.
- Understand why content was flagged.
- Compare suspected content against verified archive patterns.
- Assign review ownership.
- Generate or prepare takedown materials.
- Track response status and escalation.
- Produce a concise executive summary.

Prioritize useful operational screens over decorative pages.

## Engineering Guidelines

- Keep implementation focused and scoped to the user's request.
- Prefer simple, maintainable components over premature abstractions.
- Match any existing project structure and conventions if they appear later.
- Keep mock data separated from UI logic.
- Use accessible UI patterns, readable contrast, keyboard-friendly controls, and clear focus states.
- Make responsive layouts work cleanly on desktop and mobile.
- Ensure text fits within its containers and does not overlap.
- Use icons for common actions where appropriate, with labels or tooltips when needed.
- Avoid hardcoding repeated strings or data directly inside large components when fixtures would be clearer.

## Quality Bar

Before considering work complete:

- The prototype should run locally.
- Core screens and interactions should be usable, not just visually present.
- Synthetic data should be coherent across views.
- Empty, loading, selected, warning, and success states should be handled where relevant.
- Visual design should feel polished, restrained, and appropriate for luxury retail clients.
- No real brand names, logos, or sensitive data should be included unless explicitly provided by the user.

## Definition Of Done

A strong completed task usually includes:

- A working prototype experience for Synthetic Brand Reality.
- Clean, elegant UI aligned with the luxury-brand-protection concept.
- Synthetic mock incidents, archive records, scan results, evidence logs, and takedown examples.
- Clear marketing and security workflows.
- Verification notes describing what was run or checked.

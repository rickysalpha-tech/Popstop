const assets = {
  official: "./assets/official-archive.svg",
  fakeDrop: "./assets/fake-drop.svg",
  runway: "./assets/deepfake-runway.svg",
  influencer: "./assets/influencer-post.svg"
};

const incidents = [
  {
    id: "INC-2417",
    title: "Unverified capsule drop video",
    category: "Fake leaked drop",
    platform: "Short video",
    source: "@velora_private_access",
    url: "social.example/velora-private-access/drop-021",
    region: "EMEA",
    language: "English",
    risk: 94,
    severity: "Critical",
    status: "Needs review",
    owner: "Security",
    deadline: "Today 17:00",
    reach: "1.8M",
    media: assets.fakeDrop,
    summary:
      "A high-reach video presents a private capsule release using campaign language that closely resembles verified archive copy, but the timing and account lineage do not match official plans.",
    recommendation:
      "Assign security review, preserve evidence, prepare platform notice, and notify marketing leads before the claimed release window.",
    impact: "Likely to divert demand and trigger customer service volume before an official campaign.",
    match: "Winter capsule archive, 82% visual proximity",
    signals: [
      { label: "Archive visual proximity", value: 82, tone: "high" },
      { label: "Campaign timing anomaly", value: 91, tone: "high" },
      { label: "Account lineage risk", value: 88, tone: "high" },
      { label: "Copy phrase reuse", value: 77, tone: "medium" }
    ],
    evidence: [
      {
        type: "Capture",
        label: "Video still and caption captured",
        time: "25 Jun 2026, 09:42",
        ref: "EV-7841"
      },
      {
        type: "Model",
        label: "Fingerprint comparison completed",
        time: "25 Jun 2026, 09:44",
        ref: "FP-33A9"
      },
      {
        type: "Review",
        label: "Marketing confirms no matching launch plan",
        time: "25 Jun 2026, 10:05",
        ref: "RV-1190"
      }
    ],
    notice:
      "This notice concerns a suspected unauthorized release claim using fictional Maison Velora campaign marks, creative language, and product imagery. The content is under human review and should be preserved while the platform evaluates removal under its impersonation and deceptive practices policies."
  },
  {
    id: "INC-2409",
    title: "Fabricated influencer endorsement",
    category: "Influencer impersonation",
    platform: "Social feed",
    source: "@nora_ateliernotes",
    url: "social.example/nora-ateliernotes/post-918",
    region: "North America",
    language: "English",
    risk: 86,
    severity: "High",
    status: "Legal prep",
    owner: "Marketing",
    deadline: "Tomorrow 11:00",
    reach: "640K",
    media: assets.influencer,
    summary:
      "A creator-style post claims a paid relationship and early access to a fictional house accessory. The content uses a synthetic product image and a caption pattern not present in approved creator briefs.",
    recommendation:
      "Route to marketing for creator relationship confirmation, then prepare an impersonation and false endorsement notice if unsupported.",
    impact: "May erode trust in official partnerships and confuse launch priority for retail clients.",
    match: "Creator brief archive, 69% language proximity",
    signals: [
      { label: "Paid partnership mismatch", value: 90, tone: "high" },
      { label: "Synthetic product image", value: 84, tone: "high" },
      { label: "Caption pattern mismatch", value: 71, tone: "medium" },
      { label: "Creator history consistency", value: 42, tone: "low" }
    ],
    evidence: [
      {
        type: "Capture",
        label: "Post image, caption, and engagement snapshot",
        time: "24 Jun 2026, 18:18",
        ref: "EV-7798"
      },
      {
        type: "Archive",
        label: "No approved creator brief found",
        time: "24 Jun 2026, 18:31",
        ref: "AR-1802"
      },
      {
        type: "Review",
        label: "Partnership team confirmation requested",
        time: "25 Jun 2026, 08:20",
        ref: "RV-1176"
      }
    ],
    notice:
      "The referenced post appears to present an unsupported paid endorsement for fictional Maison Velora. Please review the account, caption, and image for potential impersonation, deceptive partnership claims, and unauthorized commercial use."
  },
  {
    id: "INC-2398",
    title: "Deepfake runway campaign teaser",
    category: "Deepfake campaign",
    platform: "Video network",
    source: "velora-runway-preview.example",
    url: "video.example/channel/runway-preview-04",
    region: "APAC",
    language: "Japanese",
    risk: 79,
    severity: "High",
    status: "Notice submitted",
    owner: "Security",
    deadline: "Awaiting platform",
    reach: "380K",
    media: assets.runway,
    summary:
      "A runway-style teaser uses a synthetic voiceover and claims to reveal an upcoming show format. The composition echoes verified campaign assets but lacks approved metadata.",
    recommendation:
      "Keep monitoring mirrors, track response time, and prepare escalation packet if the platform misses the internal deadline.",
    impact: "Could disrupt regional communications planning and seed inaccurate press coverage.",
    match: "Runway visual archive, 74% layout proximity",
    signals: [
      { label: "Voice clone markers", value: 81, tone: "high" },
      { label: "Missing official metadata", value: 78, tone: "high" },
      { label: "Regional timing anomaly", value: 73, tone: "medium" },
      { label: "Visual composition match", value: 74, tone: "medium" }
    ],
    evidence: [
      {
        type: "Capture",
        label: "Video mirror and transcript saved",
        time: "23 Jun 2026, 16:02",
        ref: "EV-7710"
      },
      {
        type: "Model",
        label: "Synthetic voice indicators logged",
        time: "23 Jun 2026, 16:06",
        ref: "FP-3291"
      },
      {
        type: "Notice",
        label: "Platform notice submitted",
        time: "24 Jun 2026, 09:15",
        ref: "TD-5224"
      }
    ],
    notice:
      "This submission concerns a likely unauthorized synthetic runway teaser using fictional Maison Velora brand signals and a synthetic voiceover. Please review for impersonation, deceptive brand representation, and misleading campaign claims."
  },
  {
    id: "INC-2386",
    title: "Marketplace listing with campaign still",
    category: "Unauthorized creative",
    platform: "Marketplace",
    source: "seller-luxe-outlet",
    url: "market.example/luxe-outlet/listing-481",
    region: "Global",
    language: "English",
    risk: 63,
    severity: "Medium",
    status: "Monitoring",
    owner: "Marketing",
    deadline: "30 Jun 2026",
    reach: "92K",
    media: assets.official,
    summary:
      "A marketplace listing uses a synthetic variation of an official archive still to imply an authorized relationship. Product details do not match any verified catalog record.",
    recommendation:
      "Continue monitoring, request seller verification from the platform, and escalate if conversion links expand.",
    impact: "Potential confusion around distribution partners and product availability.",
    match: "Official archive still, 88% layout proximity",
    signals: [
      { label: "Archive image proximity", value: 88, tone: "high" },
      { label: "Catalog mismatch", value: 68, tone: "medium" },
      { label: "Seller history risk", value: 51, tone: "medium" },
      { label: "Reach velocity", value: 35, tone: "low" }
    ],
    evidence: [
      {
        type: "Capture",
        label: "Listing image, price, and seller profile saved",
        time: "22 Jun 2026, 12:10",
        ref: "EV-7601"
      },
      {
        type: "Archive",
        label: "Catalog comparison completed",
        time: "22 Jun 2026, 12:19",
        ref: "AR-1760"
      },
      {
        type: "Review",
        label: "Monitoring rule extended to similar sellers",
        time: "23 Jun 2026, 09:00",
        ref: "RV-1142"
      }
    ],
    notice:
      "The listing appears to use a synthetic variation of a verified fictional Maison Velora campaign still in a way that may imply authorization. Please review the listing for misleading brand representation and unauthorized creative use."
  }
];

const archiveAssets = [
  {
    id: "AR-204",
    campaign: "Winter Capsule",
    channel: "Owned social",
    region: "EMEA",
    season: "Winter 2026",
    type: "Campaign still",
    status: "Verified",
    matchSignal: "High silhouette control",
    image: assets.official
  },
  {
    id: "AR-198",
    campaign: "Atelier Notes",
    channel: "Creator brief",
    region: "North America",
    season: "Summer 2026",
    type: "Brief copy",
    status: "Verified",
    matchSignal: "Approved partnership language",
    image: assets.influencer
  },
  {
    id: "AR-177",
    campaign: "Runway Preview",
    channel: "Press preview",
    region: "APAC",
    season: "Autumn 2026",
    type: "Video direction",
    status: "Verified",
    matchSignal: "Lighting and composition model",
    image: assets.runway
  }
];

const alerts = [
  {
    id: "AL-91",
    title: "Repeated private-drop phrasing",
    region: "EMEA",
    severity: "Critical",
    related: "INC-2417",
    action: "Escalate before claimed release window"
  },
  {
    id: "AL-88",
    title: "Creator disclosure mismatch",
    region: "North America",
    severity: "High",
    related: "INC-2409",
    action: "Confirm partner status"
  },
  {
    id: "AL-82",
    title: "Runway teaser mirrors spreading",
    region: "APAC",
    severity: "High",
    related: "INC-2398",
    action: "Track platform response"
  }
];

const state = {
  view: "command",
  selectedId: incidents[0].id,
  lens: "Joint view",
  scanFilter: "All",
  statusOverrides: {},
  ownerOverrides: {},
  preparedNotices: new Set(["INC-2398"]),
  toast: ""
};

const root = document.querySelector("#app");

function selectedIncident() {
  return incidents.find((incident) => incident.id === state.selectedId) || incidents[0];
}

function incidentStatus(incident) {
  return state.statusOverrides[incident.id] || incident.status;
}

function incidentOwner(incident) {
  return state.ownerOverrides[incident.id] || incident.owner;
}

function severityClass(severity) {
  return severity.toLowerCase();
}

function riskTone(score) {
  if (score >= 90) return "critical";
  if (score >= 75) return "high";
  if (score >= 55) return "medium";
  return "low";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function metricValues() {
  const open = incidents.filter((incident) => incidentStatus(incident) !== "Closed").length;
  const critical = incidents.filter((incident) => incident.severity === "Critical").length;
  const avgRisk = Math.round(
    incidents.reduce((total, incident) => total + incident.risk, 0) / incidents.length
  );
  const submitted = incidents.filter(
    (incident) => incidentStatus(incident) === "Notice submitted"
  ).length;

  return [
    { label: "Open incidents", value: open, detail: "+2 since yesterday" },
    { label: "Critical exposure", value: critical, detail: "1 release-window risk" },
    { label: "Average risk", value: `${avgRisk}%`, detail: "Across active cases" },
    { label: "Notices submitted", value: submitted, detail: "1 awaiting response" }
  ];
}

function statusOptions(current) {
  return ["Needs review", "Legal prep", "Notice submitted", "Monitoring", "Closed"]
    .map(
      (status) =>
        `<option value="${escapeHtml(status)}" ${status === current ? "selected" : ""}>${escapeHtml(
          status
        )}</option>`
    )
    .join("");
}

function ownerOptions(current) {
  return ["Marketing", "Security", "Legal", "Executive"]
    .map(
      (owner) =>
        `<option value="${escapeHtml(owner)}" ${owner === current ? "selected" : ""}>${escapeHtml(
          owner
        )}</option>`
    )
    .join("");
}

function icon(name) {
  const icons = {
    command:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h6v7H4v-7Zm10-9h6v16h-6V4ZM4 4h6v5H4V4Z"/></svg>',
    scan:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7V4h3v2H6v1H4Zm13-3h3v3h-2V6h-1V4ZM6 17v1h1v2H4v-3h2Zm12 1v-1h2v3h-3v-2h1ZM7 11h10v2H7v-2Z"/></svg>',
    archive:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v4H5V4Zm1 6h12v10H6V10Zm4 3v2h4v-2h-4Z"/></svg>',
    cases:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16H6V4Zm3 4h6v2H9V8Zm0 4h6v2H9v-2Zm0 4h4v2H9v-2Z"/></svg>',
    notice:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 4v2h10V9H7Zm0 4v2h7v-2H7Z"/></svg>',
    brief:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16v2H4v-2Zm1-6h3v4H5v-4Zm5-5h3v9h-3V8Zm5-4h3v13h-3V4Z"/></svg>',
    alert:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 21h20L12 3Zm-1 6h2v6h-2V9Zm0 8h2v2h-2v-2Z"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 16.2-3.5-3.5L4 14.2 9 19 20 8l-1.5-1.5L9 16.2Z"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 5 7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5Z"/></svg>'
  };

  return icons[name] || "";
}

function shell(content) {
  const navItems = [
    ["command", "Command"],
    ["scan", "Live scan"],
    ["archive", "Archive"],
    ["cases", "Cases"],
    ["notice", "Takedown"],
    ["brief", "Brief"]
  ];

  return `
    <div class="app-shell">
      <aside class="sidebar" aria-label="Primary">
        <div class="brand-block">
          <div class="brand-mark">SBR</div>
          <div>
            <p class="eyebrow">Prototype</p>
            <h1>Synthetic Brand Reality</h1>
          </div>
        </div>
        <nav class="nav-list">
          ${navItems
            .map(
              ([id, label]) => `
                <button class="nav-button ${state.view === id ? "active" : ""}" data-view="${id}">
                  ${icon(id)}
                  <span>${label}</span>
                </button>
              `
            )
            .join("")}
        </nav>
        <div class="sidebar-note">
          <span>${icon("check")}</span>
          <p>Synthetic data only. No real brand assets are used.</p>
        </div>
      </aside>
      <main class="workspace">
        ${topBar()}
        ${content}
      </main>
      ${state.toast ? `<div class="toast" role="status">${escapeHtml(state.toast)}</div>` : ""}
    </div>
  `;
}

function topBar() {
  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">Maison Velora monitoring room</p>
        <h2>${viewTitle()}</h2>
      </div>
      <div class="topbar-actions" aria-label="Role lens">
        ${["Joint view", "Marketing", "Security"]
          .map(
            (lens) => `
              <button class="segment ${state.lens === lens ? "active" : ""}" data-lens="${lens}">
                ${escapeHtml(lens)}
              </button>
            `
          )
          .join("")}
      </div>
    </header>
  `;
}

function viewTitle() {
  const titles = {
    command: "Command center",
    scan: "Live scan",
    archive: "Archive fingerprint",
    cases: "Case review",
    notice: "Takedown workflow",
    brief: "Executive brief"
  };

  return titles[state.view] || "Command center";
}

function render() {
  const views = {
    command: renderCommand,
    scan: renderScan,
    archive: renderArchive,
    cases: renderCases,
    notice: renderTakedown,
    brief: renderBrief
  };

  root.innerHTML = shell((views[state.view] || renderCommand)());
  attachEvents();
}

function renderCommand() {
  const selected = selectedIncident();

  return `
    <div class="command-stack">
      ${renderCommandHero(selected)}
      <section class="command-grid">
        <div class="main-column">
          <div class="metric-grid">
            ${metricValues()
              .map(
                (metric) => `
                  <article class="metric">
                    <span>${escapeHtml(metric.label)}</span>
                    <strong>${escapeHtml(metric.value)}</strong>
                    <p>${escapeHtml(metric.detail)}</p>
                  </article>
                `
              )
              .join("")}
          </div>
          <section class="surface">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Priority queue</p>
                <h3>Incidents needing decisions</h3>
              </div>
              <button class="ghost-button" data-view="scan">${icon("scan")} Scan feed</button>
            </div>
            <div class="incident-list">
              ${incidents.map(renderIncidentRow).join("")}
            </div>
          </section>
          ${renderAlertBand()}
        </div>
        <aside class="detail-column">
          ${renderIncidentDetail(selected)}
        </aside>
      </section>
    </div>
  `;
}

function renderCommandHero(incident) {
  return `
    <section class="command-hero" aria-labelledby="command-hero-title">
      <div class="hero-copy">
        <p class="hero-kicker">AI brand integrity command center</p>
        <h2 id="command-hero-title">Protect the house from campaigns it never made.</h2>
        <p>
          Synthetic Brand Reality helps marketing and security teams find fake drops,
          deepfake campaign teasers, and false creator endorsements before they dilute trust.
        </p>
        <div class="hero-actions">
          <button class="hero-primary" data-view="scan">${icon("scan")} Review live risks</button>
          <button class="hero-secondary" data-view="cases">${icon("cases")} Open review board</button>
        </div>
      </div>
      <div class="hero-visual" aria-label="Live synthetic brand monitoring preview">
        <div class="hero-visual-header">
          <span>Live scan</span>
          <strong>${escapeHtml(incident.region)} / ${escapeHtml(incident.platform)}</strong>
        </div>
        <div class="hero-monitor">
          <img src="${escapeHtml(incident.media)}" alt="${escapeHtml(incident.category)} preview" />
          <div class="hero-risk ${riskTone(incident.risk)}">
            <strong>${incident.risk}</strong>
            <span>risk</span>
          </div>
        </div>
        <div class="hero-signal-grid">
          <span>
            <strong>${escapeHtml(incident.id)}</strong>
            active case
          </span>
          <span>
            <strong>${escapeHtml(incident.reach)}</strong>
            estimated reach
          </span>
          <span>
            <strong>${escapeHtml(incident.deadline)}</strong>
            response window
          </span>
        </div>
      </div>
    </section>
  `;
}

function renderIncidentRow(incident) {
  const selected = state.selectedId === incident.id;

  return `
    <button class="incident-row ${selected ? "active" : ""}" data-incident="${escapeHtml(incident.id)}">
      <img src="${escapeHtml(incident.media)}" alt="" />
      <span class="incident-copy">
        <span class="row-title">
          <strong>${escapeHtml(incident.title)}</strong>
          <span class="pill ${severityClass(incident.severity)}">${escapeHtml(incident.severity)}</span>
        </span>
        <span>${escapeHtml(incident.category)} / ${escapeHtml(incident.platform)} / ${escapeHtml(
          incident.region
        )}</span>
      </span>
      <span class="risk-chip ${riskTone(incident.risk)}">${incident.risk}%</span>
    </button>
  `;
}

function renderAlertBand() {
  return `
    <section class="surface">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Alerts</p>
          <h3>Emerging patterns</h3>
        </div>
        <span class="muted-label">Updated 10:18</span>
      </div>
      <div class="alert-grid">
        ${alerts
          .map(
            (alert) => `
              <button class="alert-item" data-incident="${escapeHtml(alert.related)}">
                <span class="alert-icon">${icon("alert")}</span>
                <span>
                  <strong>${escapeHtml(alert.title)}</strong>
                  <small>${escapeHtml(alert.region)} / ${escapeHtml(alert.action)}</small>
                </span>
                <span class="pill ${severityClass(alert.severity)}">${escapeHtml(alert.severity)}</span>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderIncidentDetail(incident) {
  const status = incidentStatus(incident);
  const owner = incidentOwner(incident);
  const noticeReady = state.preparedNotices.has(incident.id);

  return `
    <section class="incident-detail">
      <div class="detail-media">
        <img src="${escapeHtml(incident.media)}" alt="${escapeHtml(incident.category)} visual preview" />
        <span class="media-badge">${escapeHtml(incident.id)}</span>
      </div>
      <div class="detail-header">
        <div>
          <p class="eyebrow">${escapeHtml(incident.category)}</p>
          <h3>${escapeHtml(incident.title)}</h3>
        </div>
        <div class="score ${riskTone(incident.risk)}">
          <strong>${incident.risk}</strong>
          <span>risk</span>
        </div>
      </div>
      <p class="detail-summary">${escapeHtml(incident.summary)}</p>
      <div class="detail-meta">
        <span><strong>Source</strong>${escapeHtml(incident.source)}</span>
        <span><strong>Reach</strong>${escapeHtml(incident.reach)}</span>
        <span><strong>Deadline</strong>${escapeHtml(incident.deadline)}</span>
        <span><strong>Match</strong>${escapeHtml(incident.match)}</span>
      </div>
      <div class="control-grid">
        <label>
          <span>Status</span>
          <select data-status="${escapeHtml(incident.id)}">${statusOptions(status)}</select>
        </label>
        <label>
          <span>Owner</span>
          <select data-owner="${escapeHtml(incident.id)}">${ownerOptions(owner)}</select>
        </label>
      </div>
      <div class="signal-list">
        ${incident.signals
          .map(
            (signal) => `
              <div class="signal-row">
                <span>${escapeHtml(signal.label)}</span>
                <div class="meter" aria-label="${escapeHtml(signal.label)} ${signal.value}%">
                  <i class="${signal.tone}" style="width: ${signal.value}%"></i>
                </div>
                <strong>${signal.value}%</strong>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="recommendation">
        <strong>Recommended next action</strong>
        <p>${escapeHtml(incident.recommendation)}</p>
      </div>
      <div class="detail-actions">
        <button class="primary-button" data-prepare="${escapeHtml(incident.id)}">
          ${noticeReady ? icon("check") : icon("notice")}
          ${noticeReady ? "Notice prepared" : "Prepare notice"}
        </button>
        <button class="secondary-button" data-view="cases">${icon("cases")} Review case</button>
      </div>
    </section>
  `;
}

function renderScan() {
  const filters = ["All", "Critical", "Video", "Social", "Marketplace"];
  const filtered = incidents.filter((incident) => {
    if (state.scanFilter === "All") return true;
    if (state.scanFilter === "Critical") return incident.severity === "Critical";
    if (state.scanFilter === "Video") return incident.platform.toLowerCase().includes("video");
    if (state.scanFilter === "Social") return incident.platform.toLowerCase().includes("social");
    if (state.scanFilter === "Marketplace") return incident.platform === "Marketplace";
    return true;
  });

  return `
    <section class="full-grid">
      <section class="surface">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Continuous scan</p>
            <h3>Flagged public content</h3>
          </div>
          <div class="filter-bar">
            ${filters
              .map(
                (filter) => `
                  <button class="filter-chip ${state.scanFilter === filter ? "active" : ""}" data-filter="${filter}">
                    ${escapeHtml(filter)}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="scan-table" role="table" aria-label="Flagged scan results">
          <div class="scan-row header" role="row">
            <span>Content</span>
            <span>Platform</span>
            <span>Region</span>
            <span>Risk</span>
            <span>Status</span>
          </div>
          ${filtered
            .map(
              (incident) => `
                <button class="scan-row" role="row" data-incident="${escapeHtml(incident.id)}">
                  <span>
                    <strong>${escapeHtml(incident.title)}</strong>
                    <small>${escapeHtml(incident.source)}</small>
                  </span>
                  <span>${escapeHtml(incident.platform)}</span>
                  <span>${escapeHtml(incident.region)}</span>
                  <span><mark class="${riskTone(incident.risk)}">${incident.risk}%</mark></span>
                  <span>${escapeHtml(incidentStatus(incident))}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="evidence-layout">
        ${renderIncidentDetail(selectedIncident())}
        ${renderEvidenceLog(selectedIncident())}
      </section>
    </section>
  `;
}

function renderEvidenceLog(incident) {
  return `
    <section class="surface evidence-panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Evidence log</p>
          <h3>${escapeHtml(incident.id)} chain of custody</h3>
        </div>
        <span class="muted-label">Hash placeholders</span>
      </div>
      <ol class="timeline">
        ${incident.evidence
          .map(
            (item) => `
              <li>
                <span>${escapeHtml(item.type)}</span>
                <strong>${escapeHtml(item.label)}</strong>
                <small>${escapeHtml(item.time)} / ${escapeHtml(item.ref)}</small>
              </li>
            `
          )
          .join("")}
      </ol>
    </section>
  `;
}

function renderArchive() {
  return `
    <section class="archive-grid">
      <section class="surface">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Verified archive</p>
            <h3>Fingerprint training set</h3>
          </div>
          <span class="muted-label">Synthetic sample</span>
        </div>
        <div class="archive-list">
          ${archiveAssets
            .map(
              (asset) => `
                <article class="archive-item">
                  <img src="${escapeHtml(asset.image)}" alt="" />
                  <div>
                    <p class="eyebrow">${escapeHtml(asset.id)} / ${escapeHtml(asset.status)}</p>
                    <h4>${escapeHtml(asset.campaign)}</h4>
                    <p>${escapeHtml(asset.channel)} / ${escapeHtml(asset.region)} / ${escapeHtml(asset.season)}</p>
                    <strong>${escapeHtml(asset.matchSignal)}</strong>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="surface">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Generative fingerprint</p>
            <h3>Explainable signals</h3>
          </div>
        </div>
        <div class="fingerprint-map">
          ${[
            ["Visual composition", 87],
            ["Product silhouette", 82],
            ["Campaign language", 76],
            ["Metadata lineage", 69],
            ["Timing patterns", 91],
            ["Account relationship", 74]
          ]
            .map(
              ([label, value]) => `
                <div>
                  <span>${escapeHtml(label)}</span>
                  <strong>${value}%</strong>
                  <i style="height: ${value}%"></i>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="recommendation">
          <strong>Model posture</strong>
          <p>
            The prototype treats fingerprinting as decision support. Scores combine verified archive similarity,
            metadata consistency, account history, and timing anomalies before human review.
          </p>
        </div>
      </section>
    </section>
  `;
}

function renderCases() {
  const columns = ["Needs review", "Legal prep", "Notice submitted", "Monitoring"];

  return `
    <section class="case-grid">
      <section class="surface board-surface">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Case review</p>
            <h3>Human decision board</h3>
          </div>
          <span class="muted-label">Role lens: ${escapeHtml(state.lens)}</span>
        </div>
        <div class="case-board">
          ${columns
            .map(
              (column) => `
                <div class="case-column">
                  <h4>${escapeHtml(column)}</h4>
                  ${incidents
                    .filter((incident) => incidentStatus(incident) === column)
                    .map(
                      (incident) => `
                        <button class="case-card" data-incident="${escapeHtml(incident.id)}">
                          <span class="pill ${severityClass(incident.severity)}">${escapeHtml(
                            incident.severity
                          )}</span>
                          <strong>${escapeHtml(incident.title)}</strong>
                          <small>${escapeHtml(incident.owner)} / ${escapeHtml(incident.deadline)}</small>
                        </button>
                      `
                    )
                    .join("") || `<p class="empty-state">No active cases.</p>`}
                </div>
              `
            )
            .join("")}
        </div>
      </section>
      ${renderIncidentDetail(selectedIncident())}
    </section>
  `;
}

function renderTakedown() {
  const incident = selectedIncident();
  const prepared = state.preparedNotices.has(incident.id);

  return `
    <section class="takedown-grid">
      <section class="surface">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Takedown preparation</p>
            <h3>${escapeHtml(incident.title)}</h3>
          </div>
          <span class="pill ${prepared ? "success" : severityClass(incident.severity)}">
            ${prepared ? "Prepared" : escapeHtml(incident.severity)}
          </span>
        </div>
        <div class="notice-layout">
          <div class="notice-meta">
            <span><strong>Platform</strong>${escapeHtml(incident.platform)}</span>
            <span><strong>Source URL</strong>${escapeHtml(incident.url)}</span>
            <span><strong>Owner</strong>${escapeHtml(incidentOwner(incident))}</span>
            <span><strong>Status</strong>${escapeHtml(incidentStatus(incident))}</span>
          </div>
          <article class="notice-draft">
            <p class="eyebrow">Generated notice draft</p>
            <h4>Unauthorized synthetic brand content review</h4>
            <p>${escapeHtml(incident.notice)}</p>
            <p>
              Evidence references: ${incident.evidence
                .map((item) => escapeHtml(item.ref))
                .join(", ")}. This draft uses placeholder legal language until reviewed by counsel.
            </p>
          </article>
        </div>
        <div class="detail-actions">
          <button class="primary-button" data-prepare="${escapeHtml(incident.id)}">
            ${prepared ? icon("check") : icon("notice")}
            ${prepared ? "Notice ready" : "Prepare notice"}
          </button>
          <button class="secondary-button" data-submit="${escapeHtml(incident.id)}">
            ${icon("arrow")} Log submitted
          </button>
        </div>
      </section>
      ${renderEvidenceLog(incident)}
    </section>
  `;
}

function renderBrief() {
  const topIncident = incidents.reduce((top, incident) =>
    incident.risk > top.risk ? incident : top
  );

  return `
    <section class="brief-grid">
      <section class="surface brief-main">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Executive summary</p>
            <h3>Trust risk snapshot</h3>
          </div>
          <span class="muted-label">25 Jun 2026</span>
        </div>
        <div class="brief-lede">
          <strong>${incidents.length} active synthetic-brand incidents</strong>
          <p>
            The highest current risk is a claimed private capsule release with ${escapeHtml(
              topIncident.reach
            )} estimated reach. Marketing and security should align response before the advertised release window.
          </p>
        </div>
        <div class="trend-chart" aria-label="Seven day synthetic brand risk trend">
          ${[42, 48, 51, 58, 73, 81, 88]
            .map((value, index) => `<i style="height:${value}%" title="Day ${index + 1}: ${value}%"></i>`)
            .join("")}
        </div>
        <div class="brief-points">
          <div>
            <span>Primary exposure</span>
            <strong>Fake drop narrative</strong>
            <p>High-reach urgency language could divert demand and pressure service teams.</p>
          </div>
          <div>
            <span>Response health</span>
            <strong>1 notice submitted</strong>
            <p>One platform response is pending. Two cases need human confirmation before submission.</p>
          </div>
          <div>
            <span>Trust posture</span>
            <strong>Stable but watchful</strong>
            <p>No confirmed official-account compromise in synthetic data; impersonation remains the main pattern.</p>
          </div>
        </div>
      </section>
      <section class="surface">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Board-ready actions</p>
            <h3>Next decisions</h3>
          </div>
        </div>
        <div class="decision-list">
          ${incidents
            .slice(0, 3)
            .map(
              (incident) => `
                <button data-incident="${escapeHtml(incident.id)}">
                  <span class="risk-chip ${riskTone(incident.risk)}">${incident.risk}%</span>
                  <span>
                    <strong>${escapeHtml(incident.title)}</strong>
                    <small>${escapeHtml(incident.recommendation)}</small>
                  </span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function attachEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      render();
    });
  });

  document.querySelectorAll("[data-incident]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.incident;
      state.toast = "";
      render();
    });
  });

  document.querySelectorAll("[data-lens]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lens = button.dataset.lens;
      state.toast = `${state.lens} lens applied`;
      render();
      clearToastSoon();
    });
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.scanFilter = button.dataset.filter;
      render();
    });
  });

  document.querySelectorAll("[data-status]").forEach((select) => {
    select.addEventListener("change", () => {
      state.statusOverrides[select.dataset.status] = select.value;
      state.toast = "Case status updated";
      render();
      clearToastSoon();
    });
  });

  document.querySelectorAll("[data-owner]").forEach((select) => {
    select.addEventListener("change", () => {
      state.ownerOverrides[select.dataset.owner] = select.value;
      state.toast = "Owner updated";
      render();
      clearToastSoon();
    });
  });

  document.querySelectorAll("[data-prepare]").forEach((button) => {
    button.addEventListener("click", () => {
      state.preparedNotices.add(button.dataset.prepare);
      state.view = "notice";
      state.toast = "Notice draft prepared for review";
      render();
      clearToastSoon();
    });
  });

  document.querySelectorAll("[data-submit]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.submit;
      state.preparedNotices.add(id);
      state.statusOverrides[id] = "Notice submitted";
      state.toast = "Platform submission logged";
      render();
      clearToastSoon();
    });
  });
}

function clearToastSoon() {
  window.clearTimeout(clearToastSoon.timer);
  clearToastSoon.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

render();

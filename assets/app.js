function loadData() {
  return Promise.resolve(window.PORTAL_DATA);
}

function number(value) {
  const n = Number(value || 0);
  return n.toLocaleString();
}

const archiveLinks = [
  {
    title: 'Photos',
    href: 'archive_files/joycetagudinespiritu/photos/joycetagudinespiritu/photos/',
    description: 'Image set and face-review candidates',
    badge: 'Images'
  },
  {
    title: 'Videos',
    href: 'archive_files/joycetagudinespiritu/videos/joycetagudinespiritu/videos/',
    description: 'Video records and media exports',
    badge: 'Media'
  },
  {
    title: 'Audio',
    href: 'archive_files/joycetagudinespiritu/audio/joycetagudinespiritu/audio/',
    description: 'Voice and audio files',
    badge: 'Audio'
  },
  {
    title: 'Documents',
    href: 'archive_files/joycetagudinespiritu/documents/joycetagudinespiritu/files/',
    description: 'Files and exported documents',
    badge: 'Docs'
  },
  {
    title: 'Messages',
    href: 'archive_files/joycetagudinespiritu/messenger/joycetagudinespiritu/Messages/',
    description: 'Conversation exports and records',
    badge: 'Chat'
  },
  {
    title: 'Notes',
    href: 'archive_files/joycetagudinespiritu/notes/joycetagudinespiritu/files/',
    description: 'Notes and saved references',
    badge: 'Notes'
  },
  {
    title: 'Attachments',
    href: 'archive_files/joycetagudinespiritu/attachments/gifs/joycetagudinespiritu/',
    description: 'Attachment and media bundle',
    badge: 'Files'
  },
  {
    title: 'Archive root',
    href: 'archive_files/joycetagudinespiritu/',
    description: 'Top-level view of the full workspace',
    badge: 'Root'
  }
];

function renderStats(data) {
  const stats = document.getElementById('stats');
  const archive = data.archive || {};
  const messages = data.messages || {};
  const people = data.foreground_people_photos || {};

  const items = [
    ['Files', number(archive.inventoried_files), 'Total archived files'],
    ['Messages', number(messages.records), 'Conversation records'],
    ['Photos', number(people.selected_total), 'Face-review candidates'],
    ['Videos', number((archive.file_type_counts || {}).mp4 || 0), 'MP4 files indexed']
  ];

  stats.replaceChildren(...items.map(([label, value, caption]) => {
    const card = document.createElement('article');
    card.className = 'stat';
    card.innerHTML = `<strong>${value}</strong><span>${caption}</span>`;
    return card;
  }));
}

function renderArchiveLinks() {
  const grid = document.getElementById('archiveGrid');
  if (!grid) return;

  grid.replaceChildren(...archiveLinks.map((item) => {
    const card = document.createElement('a');
    card.className = 'archive-card';
    card.href = item.href;
    card.target = '_blank';
    card.rel = 'noreferrer';
    card.innerHTML = `
      <span class="archive-badge">${item.badge}</span>
      <strong>${item.title}</strong>
      <small>${item.description}</small>
      <span class="archive-link">Open folder →</span>
    `;
    return card;
  }));
}

function renderQuickLinks() {
  const quickLinks = document.getElementById('quickLinks');
  if (!quickLinks) return;

  quickLinks.replaceChildren(...archiveLinks.map((item) => {
    const row = document.createElement('a');
    row.className = 'quick-link';
    row.href = item.href;
    row.target = '_blank';
    row.rel = 'noreferrer';
    row.textContent = item.title;
    return row;
  }));
}

loadData().then(data => {
  renderStats(data);
  renderArchiveLinks();
  renderQuickLinks();
  document.getElementById('generatedAt').textContent = `Generated ${data.generated_at}.`;
}).catch(error => {
  document.body.insertAdjacentHTML('afterbegin', `<div class="notice"><strong>Portal data failed to load:</strong> ${error}</div>`);
});

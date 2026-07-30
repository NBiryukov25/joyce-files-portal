function loadData() {
  return Promise.resolve(window.PORTAL_DATA);
}
function number(value) {
  const n = Number(value || 0);
  return n.toLocaleString();
}
function row(label, value) {
  const div = document.createElement('div');
  div.className = 'row';
  div.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return div;
}
function renderStats(data) {
  const stats = document.getElementById('stats');
  const people = data.foreground_people_photos || {};
  const archive = data.archive || {};
  const messages = data.messages || {};
  const items = [
    ['Files', number(archive.inventoried_files), 'Inventoried source files'],
    ['Messages', number(messages.records), 'Normalized message records'],
    ['People Photos', number(people.selected_total), 'Copied candidates for review'],
    ['Videos', number((archive.file_type_counts || {}).mp4), 'MP4 files cataloged']
  ];
  stats.replaceChildren(...items.map(([label, value, caption]) => {
    const card = document.createElement('article');
    card.className = 'stat';
    card.innerHTML = `<strong>${value}</strong><span>${caption}</span>`;
    return card;
  }));
}
function renderPhotos(data) {
  const people = data.foreground_people_photos || {};
  document.getElementById('photoSummary').textContent = `${number(people.selected_one_person)} one-person and ${number(people.selected_two_people)} two-person candidates.`;
  const gallery = document.getElementById('gallery');
  const sample = data.photo_samples || [];
  gallery.replaceChildren(...sample.map(photo => {
    const item = document.createElement('article');
    item.className = 'photo-tile';
    item.innerHTML = `<img loading="lazy" src="${photo.url}" alt="${photo.faces} face candidate: ${photo.filename}"><div><strong>${photo.filename}</strong><span>${photo.faces} detected face(s), ${photo.width} x ${photo.height}</span></div>`;
    return item;
  }));
}
function renderSources(data) {
  const fileTypes = document.getElementById('fileTypes');
  const counts = data.archive?.file_type_counts || {};
  fileTypes.replaceChildren(...Object.entries(counts).sort((a,b) => b[1]-a[1]).map(([k,v]) => row(k, number(v))));
  const messages = document.getElementById('messages');
  const msg = data.messages || {};
  const senders = msg.sender_counts || {};
  const rows = [row('Records', number(msg.records)), row('Date range', `${msg.date_min || 'unknown'} to ${msg.date_max || 'unknown'}`)];
  Object.entries(senders).slice(0, 6).forEach(([sender, count]) => rows.push(row(sender, number(count))));
  messages.replaceChildren(...rows);
}
loadData().then(data => {
  renderStats(data);
  renderPhotos(data);
  renderSources(data);
  document.getElementById('generatedAt').textContent = `Generated ${data.generated_at}.`;
}).catch(error => {
  document.body.insertAdjacentHTML('afterbegin', `<div class="notice"><strong>Portal data failed to load:</strong> ${error}</div>`);
});

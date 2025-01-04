const { resolve } = require('path');
const { readFile, writeFile } = require('node:fs/promises');

const sessionFile = resolve(__dirname, '..', 'data', 'session.json');

module.exports = {
  saveSession,
  getSessions,
  getUsername,
};

async function saveSession(username, sessionId) {
  const sessions = await getSessions();
  sessions[username] = sessionId;
  await writeFile(sessionFile, JSON.stringify(sessions, null, 2), 'utf8');
}

async function getSessions() {
  const sessionFile = resolve(__dirname, '..', 'data', 'session.json');
  const sessions = (await readFile(sessionFile)).toString('utf8');
  return JSON.parse(sessions);
}

async function getUsername(sessionId) {
  const sessions = await getSessions();
  const sessionEntry = Object.entries(sessions).find(
    ([_username, id]) => sessionId === id,
  );
  return sessionEntry?.[0];
}

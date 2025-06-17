const feedUrl = "https://neelketkar.github.io/optimus-prime/feeds/briefly-remembered";

async function loadEpisode() {
  const slug = window.location.pathname.split("/").pop().replace(".html", "");
  const index = parseInt(slug.replace("episode-", "")) - 1;

  const res = await fetch(feedUrl);
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");

  const items = xml.querySelectorAll("item");
  if (!items[index]) {
    document.getElementById("episode-content").innerHTML = "<p>Episode not found.</p>";
    return;
  }

  const item = items[index];
  const title = item.querySelector("title").textContent;
  const pubDate = item.querySelector("pubDate")?.textContent ?? "";
  const audio = item.querySelector("enclosure")?.getAttribute("url") ?? "";
  const desc = item.querySelector("description")?.textContent ?? "";
  const transcript = item.querySelector("transcript")?.textContent ?? "";

  const container = document.getElementById("episode-content");
  container.innerHTML = `
    <h1>${title}</h1>
    <p><em>${pubDate}</em></p>
    <audio controls src="${audio}"></audio>
    <h2>Description</h2>
    <p>${desc}</p>
    ${transcript ? `<h2>Transcript</h2><pre>${transcript}</pre>` : ""}
  `;
}

loadEpisode();
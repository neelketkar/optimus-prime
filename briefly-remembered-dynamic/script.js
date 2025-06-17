const feedUrl = "https://neelketkar.github.io/optimus-prime/feeds/briefly-remembered";

async function loadFeed() {
  const res = await fetch(feedUrl);
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");

  const channel = xml.querySelector("channel");
  document.getElementById("description").textContent =
    channel.querySelector("description")?.textContent ?? "";

  const items = xml.querySelectorAll("item");
  const episodesEl = document.getElementById("episodes");
  episodesEl.innerHTML = "";

  items.forEach((item, index) => {
    const title = item.querySelector("title").textContent;
    const pubDate = item.querySelector("pubDate")?.textContent ?? "";
    const summary = item.querySelector("itunes\:summary")?.textContent ?? "";
    const slug = `episode-${index + 1}`;

    const el = document.createElement("div");
    el.className = "episode";
    el.innerHTML = `
      <h2><a href="episodes/${slug}.html">${title}</a></h2>
      <p><em>${pubDate}</em></p>
      <p>${summary}</p>
    `;
    episodesEl.appendChild(el);
  });
}

loadFeed();
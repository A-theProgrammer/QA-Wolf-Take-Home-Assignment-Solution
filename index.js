const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://news.ycombinator.com/newest", { timeout: 30000 });

    // Wait for articles to load
    await page.waitForSelector("tr.athing");

    // Collect the first 100 articles (may need to paginate)
    let articles = [];
    let nextPageUrl = "https://news.ycombinator.com/newest";
    while (articles.length < 100 && nextPageUrl) {
      await page.goto(nextPageUrl, { timeout: 30000 });
      await page.waitForSelector("tr.athing");
      const pageArticles = await page.$$eval("tr.athing", rows => {
        return rows.map(row => {
          const id = row.getAttribute("id");
          // Use the precise selector for the title cell: td:nth-child(3)
          const titleCell = row.querySelector("td:nth-child(3)");
          const title = titleCell ? titleCell.innerText.trim() : "";
          // The age is in the next row, in a span.age
          const ageRow = row.nextElementSibling;
          const ageSpan = ageRow?.querySelector("span.age");
          const ageTitle = ageSpan?.getAttribute("title") || ""; // ISO timestamp
          return { id, title, ageTitle };
        });
      });
      articles = articles.concat(pageArticles);
      // Find next page link
      nextPageUrl = await page.$eval('a.morelink', a => a.href).catch(() => null);
    }
    articles = articles.slice(0, 100);

    // Validate sorting (newest to oldest by ageTitle, which is ISO string)
    let isSorted = true;
    let outOfOrder = [];
    for (let i = 0; i < articles.length - 1; i++) {
      if (articles[i].ageTitle < articles[i + 1].ageTitle) {
        isSorted = false;
        outOfOrder.push({
          index: i,
          current: articles[i],
          next: articles[i + 1],
        });
      }
    }

    if (isSorted) {
      console.log("PASS: The first 100 articles are sorted from newest to oldest.");
    } else {
      console.log("FAIL: The articles are not sorted from newest to oldest.");
      outOfOrder.slice(0, 5).forEach(({ index, current, next }) => {
        console.log(`Out of order at index ${index}:\n  '${current.title}' (${current.ageTitle})\n  should be newer than\n  '${next.title}' (${next.ageTitle})`);
      });
      if (outOfOrder.length > 5) {
        console.log(`...and ${outOfOrder.length - 5} more out-of-order pairs.`);
      }
    }
    // Print the first 5 article titles and human-readable timestamps, then ellipsis
    function formatDate(isoString) {
      if (!isoString) return "N/A";
      // Some ageTitle values may be empty or not valid ISO, so check validity
      let d = new Date(isoString.replace(' ', 'T'));
      if (isNaN(d.getTime())) return "N/A";
      const pad = n => n.toString().padStart(2, '0');
      return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear().toString().slice(-2)} ; ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    console.log("\nFirst 5 articles gathered:");
    articles.slice(0, 5).forEach((article, idx) => {
      console.log(`${idx + 1}. '${article.title}' (${article.ageTitle || 'N/A'})`);
    });
    if (articles.length > 5) {
      console.log("...");
    }
    // print a summary
    console.log(`\nChecked ${articles.length} articles.`);
    if (!isSorted) process.exitCode = 1;
  } catch (err) {
    console.error("ERROR:", err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
}

if (require.main === module) {
  sortHackerNewsArticles();
}

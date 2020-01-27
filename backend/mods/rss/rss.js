const fs = require("fs");

fs.readFile(__dirname + "/urls.txt", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const contents = data.split("\n");
  console.log(contents);

  const Parser = require("rss-parser");
  const parser = new Parser();

  (async () => {
    for (url of contents) {
      const feed = await parser.parseURL(url);
      console.log(feed.title);

      feed.items.forEach(item => {
        console.log(item.title + ":" + item.link);
      });
    }
  })();
});

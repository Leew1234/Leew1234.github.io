# Wyatt Lee Portfolio

Personal site, built with plain HTML, CSS, and JavaScript. There is no build step.

## Run locally

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

- `http://localhost:8000/` shows what the live site would show.
- `http://localhost:8000/?preview` also shows draft entries.

## Update content

Edit `data/content.js`. Only entries with `publicOk: true` appear on the page.

`publicOk: false` hides an entry from the page but not from the page source, so delete the text of any entry that should stay private before publishing.

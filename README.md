# How to launch
Important notices:
- run docker container with specified seccomp settings
- run from `pptruser`

## Docker:
### Build
```bash
docker build . -t YOUR_IMAGE_TAG
```

### Run
```bash
docker run -itp 3000:3000 --security-opt seccomp=chrome.json YOUR_IMAGE_TAG
```

And you can go to [localhost:3000/api](http://localhost:3000/api) (or send request from browser: [localhost:3000/?target=https://google.com](http://localhost:3000/?target=https://google.com))

---

[buymeacoffee], if i helped you 😉

[buymeacoffee]: <https://www.buymeacoffee.com/lexagr>

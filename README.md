# Code In The Dark

Code In The Dark app for tiny LAN sessions! 🕶️

Code In The Dark is a front-end contest that originated at [Tictail](https://tictail.com/). Competitors build a UI from one screenshot using HTML and CSS. They do not see their results until the round ends!”

## Features

- 👨‍💻👨‍💻 2 players with Monaco Editor (VSCode) + Emmet
- 📺 Shared TV screen showing live updates
- 🎛️ Simple admin panel to create and switch rounds

## Tasks

There are 12 prepared tasks in `/tasks` folder:

- chat.png
- vote-checkbox.png
- calendar.png
- confirm.png
- payments.png
- …

To add a new task, put your own screenshot in `/tasks`

## How to start

1. Make sure all computers are on the same LAN

2. [Install Node.js](https://nodejs.org/en/download)

3. Create `.env` file with `ADMIN_PASSWORD=yourpassword`. If you skip this, the default password is `pass`

4. Run `npm i && npm start`

5. On 2 laptops, open:

```
http://<server_ip>/game/?player=1
http://<server_ip>/game/?player=2
```

6. On the TV screen, open:

```
http://<server_ip>/tv/
```

## Roadmap/Ideas

- [x] Player editor with live preview
- [x] [Monaco Editor](https://github.com/microsoft/monaco-editor)
- [x] [Emmet](https://github.com/troy351/emmet-monaco-es)
- [x] Admin panel for rounds
- [x] Basic admin password
- [x] Real-time updates on TV screen
- [ ] Tasks with assets & variables
- [ ] Switch code/preview on TV
- [ ] Pulling → WebSockets
- [ ] Add extra time to the round
- [ ] End game & show confetti
- [ ] Support 4 players
- [ ] Prompt In The Dark — AI rounds with ChatGPT/Deepseek etc. 🤓

## Development

1. [Install Node.js](https://nodejs.org/en/download)

2. Install dependencies

```
npm i
```

3. Run client and server apps

```
npm start
```

## See also

See the original Code In The Dark events here: [codeinthedark/codeinthedark.github.io](https://github.com/codeinthedark/codeinthedark.github.io)! 🤝

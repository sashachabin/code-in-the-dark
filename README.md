# Code In The Dark

Front-End contest for tiny LAN parties. Based on the original [Tictail](https://tictail.com/) challenge: recreate a UI from a single screenshot using HTML & CSS and don’t see the result until time’s up!

- 2-player coding in Monaco editor with Emmet
- Live updates on a TV screen
- Admin controls for rounds and timing


<br />

| Main `/` | TV `/tv` |
| --  | -- |
| ![image](https://github.com/user-attachments/assets/d131cfd2-5926-442b-a214-a64dfa346402) | ![image](https://github.com/user-attachments/assets/61b2df27-2a36-4d87-9ebc-a49637b7d46e) |



| Player editor `/game?player=1\|2` | Admin panel `/admin` |
| --  | -- |
| ![image](https://github.com/user-attachments/assets/66a1ef44-e9ee-4dbd-82ff-4a5fe8a727d5) | ![image](https://github.com/user-attachments/assets/3050bec3-0e05-48f5-bfde-b29c936e642e) |


## Host Your Own Contest

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


## Custom tasks

There are 12 prepared tasks in [`/tasks`](https://github.com/sashachabin/code-in-the-dark/tree/master/tasks) folder:

- chat.png
- vote-checkbox.png
- calendar.png
- confirm.png
- payments.png
- …

To add a new task, put your own screenshot in [`/tasks`](https://github.com/sashachabin/code-in-the-dark/tree/master/tasks)


## Roadmap

- [x] Player editor with live preview
- [x] [Monaco Editor](https://github.com/microsoft/monaco-editor)
- [x] [Emmet](https://github.com/troy351/emmet-monaco-es)
- [x] Admin panel for rounds
- [x] Basic admin password
- [x] Real-time updates on TV screen
- [ ] Add Tailwind/Bootstrap options
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
npm run dev
```

## See also

See the original Code In The Dark events here: [codeinthedark/codeinthedark.github.io](https://github.com/codeinthedark/codeinthedark.github.io)! 🤝

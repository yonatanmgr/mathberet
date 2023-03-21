<div align="center">
<img width=500 src="https://i.imgur.com/M4tds7u.png" alt="mathberet logo">
<p><b>📝 Mathberet (Hebrew: מַתְבֶּרֶת)</b> - A self-hosted digital mathematics notebook, written in React and built with Electron</p>
<p><b>🚧 In active development, open for contributions! 🚧</b></p>
</div>

---

> Currently works in Hebrew, English, Arabic, Russian and Spanish, localized using [i18next](https://github.com/i18next/i18next). Still buggy.

## :white_check_mark: Features

- [x] Block based drag-n-drop editor
- [x] Text, Math, Graph and Drawing blocks are currently available
- [x] LaTeX shortcuts and snippets
- [x] Local files can be saved and loaded from the file system
- [x] File tags (currently useless)
- [x] Command bar (currently only used for user preferences)
- [x] 6 color themes and light/dark theme
- [ ] Customize LaTeX shortcuts
- [ ] Shortcuts help menu
- [ ] Searching from command bar
- [ ] Adding points and polygons to graph blocks
- [ ] Math memory sidebar (for variable assignments and quick functions)
- [ ] Archive

## :camera_flash: Screenshots

### Hebrew

![image](https://user-images.githubusercontent.com/31913495/225077627-82fa032c-88e7-4e25-971f-98a37a436d40.jpg)
</details>

### English

<details><summary><b>Dark theme and purple accent color</b></summary>

![image](https://user-images.githubusercontent.com/31913495/225168731-13afd8f2-7e17-448d-a434-5b6bd1f43494.png)
</details>

<details><summary><b>Light theme and green accent color</b></summary>

![image](https://user-images.githubusercontent.com/31913495/225170025-65b7cde0-434d-4c66-8d9a-1c9237a92f3b.png)
</details>

<details><summary><b>Command bar (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>)</b></summary>

![image](https://user-images.githubusercontent.com/31913495/225170120-e3dcdeb3-bdf2-4fa9-80dc-f2ebbfe2051b.png)
</details>

## :bricks: Built With

- [ERWT](https://github.com/codesbiome/electron-react-webpack-typescript-2023): Electron + React apps boilerplate
- [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout): Grid layout for the blocks
- [slate](https://github.com/ianstormtaylor/slate): Text block component
- [MathLive](https://cortexjs.io/mathlive/) ([react-math-view](https://github.com/arnog/react-mathlive)): Math block component
- [Mafs](https://mafs.dev/): Graph block component
- [tldraw](https://github.com/tldraw/tldraw): Drawing block component
- [kbar](https://kbar.vercel.app/): Command bar
- [react-complex-tree](https://rct.lukasbach.com/): Used for displaying the file system
- [UIcons](https://github.com/freepik-company/flaticon-uicons): App icons

## :building_construction: Building from source

1. Clone the repository to a folder on your machine:
```bash
git clone https://github.com/yonatanmgr/mathberet.git
```
2. Run `npm install` in the project root folder
3. Run `npm start` in the project root folder

## :handshake: Contributing

We welcome any positive contribution towards our project's growth! Whether you choose to work on a [listed feature](https://github.com/yonatanmgr/mathberet#white_check_mark-features) or create a new one, your help is appreciated. Simply submit a Pull Request after adding your code. To ensure a smooth process, please review our `CODE OF CONDUCT` and read the `CONTRIBUTING` guidelines for further details on submitting pull requests.

Make sure to visit Mathberet's [project](https://github.com/users/yonatanmgr/projects/2) to view our roadmap and plans, and our [wiki](https://github.com/yonatanmgr/mathberet/wiki/%F0%9F%8F%A0-Home) to read the documentation!

## :balance_scale: Liscense

This project is licensed under the MIT License - see the `LICENSE` file for details.

## :technologist: Contributors

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/yonatanmgr"><img src="https://avatars.githubusercontent.com/u/31913495?v=3?s=100" width="100px;" alt="Yonatan Magier"/><br /><sub><b>Yonatan Magier</b></sub></a><br />
        <span title="Ideas & Planning">🤔</span>
        <a href="https://github.com/yonatanmgr/mathberet/commits?author=yonatanmgr" title="Code">💻</a>
        <a href="https://github.com/yonatanmgr/mathberet/commits?author=yonatanmgr" title="Maintenance">🚧</a>
        <a href="https://github.com/yonatanmgr/mathberet/tree/master/src/common/locals" title="Translation">🌍</a>
        <span title="Design">🎨</span>
      </td>
      <td align="center"><a href="https://github.com/ErezBiren"><img src="https://avatars.githubusercontent.com/u/7828909?v=3?s=100" width="100px;" alt="Erez Birenholz"/><br /><sub><b>Erez Birenholz</b></sub></a><br />
        <span title="Mentoring">🧑‍🏫</span>
        <a href="https://github.com/yonatanmgr/mathberet/commits?author=ErezBiren" title="Code">💻</a>
        <a href="https://github.com/yonatanmgr/mathberet/commits?author=ErezBiren" title="Maintenance">🚧</a>
        <a href="https://github.com/yonatanmgr/mathberet/tree/master/src/common/locals" title="Translation">🌍</a>
      </td>
      <td align="center"><a href="https://github.com/Nadav0077"><img src="https://avatars.githubusercontent.com/u/18245584?v=3?s=100" width="100px;" alt="Nadav Magier"/><br /><sub><b>Nadav Magier</b></sub></a><br />
        <a href="https://github.com/yonatanmgr/mathberet/commits?author=Nadav0077" title="Code">💻</a>
        <a href="https://github.com/yonatanmgr/mathberet/commits?author=Nadav0077" title="Maintenance">🚧</a>
        <span title="Security">🛡️</span>
      </td>
    </tr>
  </tbody>
</table>

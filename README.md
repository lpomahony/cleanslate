
# cleanslate - Screenplay Editor

cleanslate is a screenplay editor built with React and the Fountain.js library, designed to offer a clean and simple interface for writing screenplays. The app offers real-time preview of the screenplay formatted according to industry standards. You can type your screenplay on the left panel, and the right panel will show the properly formatted result.

## Features

- **Two-panel interface**: Write your screenplay in plain text on the left and see the formatted screenplay on the right.
- **Fountain.js integration**: Supports industry-standard screenplay formatting, including scene headings, action, dialogue, and transitions.
- **Real-time formatting**: Automatically formats your screenplay as you type.
- **Dark mode**: User-friendly interface with dark mode for comfortable screenwriting.
- **Transition handling**: Currently supports the "CUT TO:" transition.

## Installation

To get started with cleanslate locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Clone the Repository

```bash
git clone https://github.com/lpomahony/cleanslate.git
cd cleanslate
```

### Install Dependencies

```bash
npm install
```

### Run Locally

Start the development server:

```bash
npm start
```

The app will be running at `http://localhost:3000`.

### Deployment

If you want to deploy the project (for example, to GitHub Pages), run:

```bash
npm run deploy
```

This will build the project and deploy it to your GitHub Pages repository.

## Usage

- Write your screenplay on the left panel.
- See the formatted version on the right panel as you type.

### Syntax Guide

The editor uses Fountain syntax. Here are some quick examples of how to format your script:

- **Scene Heading**: Write `INT.` or `EXT.` at the start of a line for a scene heading.
  - Example: `INT. HOUSE - DAY`
- **Character**: Write the character’s name in uppercase before their dialogue.
  - Example: `PAUL`
- **Dialogue**: Write the dialogue under the character’s name.
  - Example:
    ```
    PAUL
    This is an example of dialogue.
    ```
- **Transitions**: Start a line with a transition, such as `CUT TO:`.

## Technologies Used

- **React**: The frontend framework used to build the application.
- **Fountain.js**: A library to parse and format Fountain screenplay markup.
- **GitHub Pages**: For deployment.
- **Draft.js**: For managing the plain text input editor.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

---

Thanks for using cleanslate! We hope this tool helps you bring your screenplays to life.

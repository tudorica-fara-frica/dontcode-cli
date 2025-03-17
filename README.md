# CLI Documentation

## Overview

`dontcode-cli` is a command-line interface tool that allows users to interact with [dontcode](https://dontcode.vercel.app) files easily. It supports reading, exporting and updating content efficiently.

## Installation

### Global Installation

To use `dontcode-cli` globally, install it with:

```
npm install -g dontcode-cli
```

Now, you can run it anywhere using:

```
dontcode-cli
```

### Local Installation

If installed locally, use it via `npx`:

```
npx dontcode-cli
```

## Usage

When running `dontcode-cli`, the tool promts you with a series of questions to determine your desired action.

### Step 1: Select `dontcode`

The first prompt asks which `dontcode` file you want to access.

### Step 2: Choose an Action

The second prompt asks what you want to do:

1. **View the content** - Displays the `dontcode` content in the console

2. **Save to a file** - Saves the `dontcode` content as a text file in the current terminal location

3. **Load content from a file (overwrite)** - Loads content from a selected file, replacing the existing content.

4. **Load content from a file (append)** - Loads content from a selected file and appends it to the existing content

### Step 3: Specify a File (If Required)

If you choose an action that requires a file (options 2, 3 or 4), the CLI prompts you to enter the filename

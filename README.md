## @initx-plugin/pm

Project manager plugin for `initx`.

## Usage

install the plugin globally

```bash
npm i @initx-plugin/pm -g
```

### Set project directory

```bash
npx initx pm add <path>
```

`path` can be a relative path or an absolute path.

```bash
# Add the current directory as a project directory
npx initx pm add .
# Add the parent directory as a project directory
npx initx pm add ..
# Add the directory D:/Projets as a project directory
npx initx pm add D:/Projets
```

### Remove project directory

```bash
npx initx pm remove <path>
```

### Create a new project to the specified directory

```bash
npx initx pm create username/my-project
```

Equivalent to running

```bash
cd <path>
git clone git@github.com:username/my-project.git
```

## Documentation

[initx](https://github.com/initx-collective/initx)

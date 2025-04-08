## @initx-plugin/pm

Project manager plugin for `initx`.

## Usage

install the plugin globally

```bash
npx initx plugin add pm
```

### Set project directory

```bash
npx initx pm add <name?> <path>
```

`name` is optional. If it is not provided, it defaults to `default`.

`path` can be a relative path or an absolute path.

```bash
# Add the current directory as a project directory
npx initx pm add .
# Add the parent directory as a project directory
npx initx pm add ..
# Add the directory D:/Projets as a project directory
npx initx pm add D:/projets
# Add the directory D:/my-projects with name
npx initx pm add frontend D:/projects-front
npx initx pm add backend D:/projects-backend
```

### List project directories

```bash
npx initx pm list
```

### Use project directory

```bash
npx initx pm use <name>
```

### Remove project directory

```bash
npx initx pm remove <name>
```

### Create a new project to the specified directory

```bash
npx initx pm create name/repo <as?>
```

Equivalent to run

```bash
cd <path>
git clone git@github.com:username/my-project.git as-name
```

## Documentation

[initx](https://github.com/initx-collective/initx)

const {join: createPath} = require("node:path");
const fs = require("node:fs/promises");

const func = async () => {
    await fs.rm(createPath(process.cwd(), 'data'), {recursive: true, force: true});
    await fs.mkdir(createPath(process.cwd(), 'data'))

    const createDirectories = async (dirs) => {
        for (const dir of dirs) {
            await fs.mkdir(createPath(process.cwd(), 'data', dir), {recursive: true});
        }
    }


    const createFilesToDirs = async (dirs, files) => {
        for (let i = 0; i < dirs.length; i++) {
            const pathToDir = createPath(process.cwd(), 'data', dirs[i])
            await fs.writeFile(createPath(pathToDir, files[i] + '.json'), JSON.stringify({}), "utf-8")
        }
    }

    const identifyPaths = async (paths) => {
        for (const path of paths) {
                const stat = await fs.stat(path);
                if (stat.isFile()) {
                    console.log(`${path} - file.`);
                } else if (stat.isDirectory()) {
                    console.log(`${path} - directory.`);
                }
        }
    };

    await void createDirectories(['dogs', 'cats', 'elephants', 'tigers', 'lions']);
    await void createFilesToDirs(['dogs', 'cats', 'elephants', 'tigers', 'lions'], ['dog', 'cat', 'elephant', 'tiger', 'lion']);

    await void identifyPaths([createPath(process.cwd(), 'data'),
        createPath(process.cwd(), 'data')]);
}
void func()




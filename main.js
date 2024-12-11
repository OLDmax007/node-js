const {join: createPath} = require("node:path");
const fs = require("node:fs/promises");

const func = async () => {
    await fs.mkdir(createPath(process.cwd(), 'data'), {recursive: true, force: true})

    const createDirectories = async (dirs) => {
        // dirs.map(async (dir) => {
        //     await fs.mkdir(createPath(process.cwd(), 'data', dir), {recursive: true});
        // })
        await Promise.all(dirs.map(async (dir) => {
            await fs.mkdir(createPath(process.cwd(), 'data', dir), {recursive: true});
        }))
    }


    const createFilesToDirs = async (dirs, files) => {
        for (let i = 0; i < dirs.length; i++) {
            const pathToDir = createPath(process.cwd(), 'data', dirs[i])
            await fs.writeFile(createPath(pathToDir, files[i] + '.json'), JSON.stringify({}), "utf-8")
        }
    }

    const identifyPaths = async (dirs) => {

        pathToMainDir = createPath(process.cwd(), 'data')
        const data = await fs.readdir(pathToMainDir)
        for (const dir of data) {
            console.log(dir)
            const files = await fs.readdir(createPath(pathToMainDir, dir))
            for (const file of files) {
                const path = createPath(pathToMainDir, dir, file)
                const stat = await fs.stat(path);
                if (stat.isFile()) {
                    console.log(`${path} - file.`);
                } else if (stat.isDirectory()) {
                    console.log(`${path} - directory.`);
                }
            }

        }
    };

    await  createDirectories(['dogs', 'cats', 'elephants', 'tigers', 'lions']);
    await  createFilesToDirs(['dogs', 'cats', 'elephants', 'tigers', 'lions'], ['dog', 'cat', 'elephant', 'tiger', 'lion']);

    await  identifyPaths(['dogs', 'cats', 'elephants', 'tigers', 'lions']);

}
void func()


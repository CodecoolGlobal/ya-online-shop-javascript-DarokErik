import express from "express";
import path from "path"
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dataJsonPath = join(__dirname, 'data.json');

async function readData() {
    const fileContent = await readFile(dataJsonPath, 'utf-8');
    const data = JSON.parse(fileContent);
    const dataList = data.data;
    return dataList;
}

async function writeData(newData) {
    const dataList = await readData();
    dataList.push(newData);
    const fileContentToSave = JSON.stringify(
        {
            data: dataList
        }
        , null, 2);
    await writeFile(dataJsonPath, fileContentToSave);
}

async function patchData(updatedFields, id) {
    const dataList = await readData();
    const index = dataList.findIndex((data) => data.id === parseInt(id));
    if (index === -1) {
        return { code: 404, error: 'User not found' };
    } else {
        dataList[index] = { ...dataList[index], ...updatedFields };
        const fileContentToSave = JSON.stringify(
            {
                data: dataList
            }
          , null, 2);
        await writeFile(dataJsonPath, fileContentToSave);
        return dataList[index];
    }
}

async function putData(updatedFields, id) {
    const dataList = await readData();
    const index = dataList.findIndex((data) => data.id === parseInt(id));
    if (index === -1) {
        return { code: 404, error: 'User not found' };
    } else {
        dataList[index] = {...updatedFields };
        const fileContentToSave = JSON.stringify(
            {
                data: dataList
            }
          , null, 2);
        await writeFile(dataJsonPath, fileContentToSave);
        return dataList[index];
    }
}

async function deleteData(id) {
    const dataList = await readData();
    const index = dataList.findIndex((data) => data.id === parseInt(id));
    if (index === -1) {
        return { code: 404, error: 'User not found' };
    } else {
        const fileContentToSave = JSON.stringify(
            {
                data: dataList.filter((data) => data.id !== parseInt(id))
            }
          , null, 2);
        await writeFile(dataJsonPath, fileContentToSave);
        return dataList[index];
    }
}

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/all', async (req, res) => {
    const response = await readData()
    return res.json(response);
});

app.get('/admin', async (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/public/admin.html"));
});

app.get('/user', async (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/user/user.html"));
});

app.post("/api/data", async (req, res) => {
    const data = req.body;
    await writeData(data)
    return res.sendStatus(201);
});

app.patch("/api/data/:id", async (req, res) => {
    const updatedFields = req.body;
    const id = req.params.id
    const response = await patchData(updatedFields, id)
    return res.json(response);
});

app.put("/api/data/:id", async (req, res) => {
    const updatedFields = req.body;
    const id = req.params.id
    const response = await putData(updatedFields, id)
    return res.json(response);
});

app.delete("/api/data/:id", async (req, res) => {
    const id = req.params.id
    const response = await deleteData(id)
    return res.json(response);
});

app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
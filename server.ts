import express from "express";
const app = express();

const PORT = process.env.PORT || 4000;

async function helloWorld() {
    return { status: 200, message: "Hello World" };
}

app.listen(PORT, () =>
    console.log(`⚡Server is running here 👉 https://localhost:${PORT}`),
);

export { helloWorld }
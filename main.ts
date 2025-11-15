import express from 'express';
import { useRoutes } from './src/useRoutes.js';
import { PrismaClient } from './generated/prisma/client.js';
const app = express();
const port = 3000;
const Prisma = new PrismaClient();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
async function main() {
    useRoutes(app);
}

main().catch((e) => {
    console.error(e);
}).finally(async () => {
    await Prisma.$disconnect();
});





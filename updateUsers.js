const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        where: {
            apiKey: null, // Знаходимо користувачів без apiKey
        },
    });

    for (const user of users) {
        await prisma.user.update({
            where: { id: user.id },
            data: { apiKey: uuidv4() }, // Генеруємо та зберігаємо новий apiKey
        });
    }

    console.log(`Оновлено ${users.length} користувачів.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
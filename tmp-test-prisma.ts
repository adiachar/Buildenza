import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import * as fs from 'fs';
import 'dotenv/config';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
    try {
        console.log("Testing connection...");
        const res = await prisma.user.findFirst();
        console.log("Account query SUCCESS");
    } catch (err: any) {
        fs.writeFileSync('tmp-error.txt', err.message);
        console.log("Error written to tmp-error.txt");
    }
}

main().finally(() => process.exit(0));

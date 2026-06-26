import { Options } from "argon2";

export const hashOptions = {
    timeCost: 3,
    memoryCost: 65536,
    parallelism: 4,
    secret: Buffer.from(process.env.ARGON2_PEPPER || '', 'hex'),
    associatedData: undefined
} satisfies Partial<Options>
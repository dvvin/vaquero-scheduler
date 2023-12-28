// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../lib/prisma';

// // Specify the types for the request and response parameters
// export default async function handler(
//     _req: NextApiRequest, // Prefix with underscore if not used
//     res: NextApiResponse
// ) {
//     try {
//         const users = await prisma.user.findMany();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'Error fetching users' });
//     }
// }

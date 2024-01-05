import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function sessionHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session && session.user) {
        return res.status(200).json({
            fullName: session.user.fullName,
            studentID: session.user.studentID,
            email: session.user.email,
            classification: session.user.classification
        });
    }
}

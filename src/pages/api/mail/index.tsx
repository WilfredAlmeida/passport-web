import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import * as HttpStatus from "http-status"
import { helius, searchAssets } from "@/lib/helius";
import { getPassportAddress } from "@underdog-protocol/passport";

const router = createRouter<NextApiRequest, NextApiResponse>();


router.get(async (req, res) => {

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: "You must be logged in." });
    }

    const assets = await searchAssets({
        ownerAddress: getPassportAddress({ namespace: "mail", identifier: session.user!.email! }),
        grouping: ["collection", process.env.MAIL_UNDERDOG_PROJECT_MINT] as any,
        page: 1,
        limit: 1000,
    });

    return res.status(HttpStatus.OK).json({ assets });
})



export default router.handler();
import { connect } from "@helius-labs/xray/dist";

import { z } from "zod";

import { t } from "$lib/trpc/t";

import { AnchorProvider, Program, type Idl } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Keypair } from "@solana/web3.js";

const { HELIUS_KEY } = process.env;

interface ProgramInfo {
    programAddress: string;
    anchorProgramName: string;
}

export const anchorProgramName = t.procedure
    .input(z.array(z.string()))
    .query(async ({ input: addresses }) => {
        const connection = connect("mainnet", HELIUS_KEY);
        const programs: ProgramInfo[] = [];

        addresses.forEach((address) => {
            const promise = Program.at(
                address,
                new AnchorProvider(
                    connection,
                    new NodeWallet(Keypair.generate()),
                    {}
                )
            )
                .then((program) => {
                    programs.push({
                        anchorProgramName: program.idl.name,
                        programAddress: address,
                    });
                    return program.idl.name;
                })
                .catch((_) => {
                    programs.push({
                        anchorProgramName: "",
                        programAddress: address,
                    });
                    return "";
                });
        });

        return programs;
    });

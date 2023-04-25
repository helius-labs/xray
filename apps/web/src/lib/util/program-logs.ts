export type LogMessage = {
    text: string;
    prefix: string;
    style: "neutral" | "info-content" | "success" | "error";
};

export type InstructionLogs = {
    invokedProgram: string | null;
    logs: LogMessage[];
    computeUnits: number;
    truncated: boolean;
    failed: boolean;
};

export const parseProgramLogs = (logs: string[]) => {
    let depth = 0;
    let parsedLogs: InstructionLogs[] = [];

    function prefixBuilder(
        // Indent level starts at 1.
        indentLevel: number
    ) {
        let prefix;
        if (indentLevel <= 0) {
            // Log should always be at index level 1 or higher
            prefix = "";
        } else {
            prefix = new Array(indentLevel - 1).fill("\u00A0\u00A0").join("");
        }
        return prefix + "> ";
    }

    logs.forEach((log) => {
        if (log.startsWith("Program log:")) {
            log = log.replace(/Program log: (.*)/g, (match, p1) => {
                return `Program logged: "${p1}"`;
            });

            parsedLogs[parsedLogs.length - 1].logs.push({
                prefix: prefixBuilder(depth),
                style: "neutral",
                text: log,
            });
        } else if (log.startsWith("Log truncated")) {
            parsedLogs[parsedLogs.length - 1].truncated = true;
        } else {
            const regex = /Program (\w*) invoke \[(\d)\]/g;
            const matches = [...log.matchAll(regex)];

            if (matches.length > 0) {
                const programAddress = matches[0][1];
                // const programName = getProgramName(programAddress, cluster);

                if (depth === 0) {
                    parsedLogs.push({
                        computeUnits: 0,
                        failed: false,
                        invokedProgram: programAddress,
                        logs: [],
                        truncated: false,
                    });
                } else {
                    parsedLogs[parsedLogs.length - 1].logs.push({
                        prefix: prefixBuilder(depth),
                        style: "info-content",
                        text: `Program invoked: ${programAddress}`,
                    });
                }

                depth++;
            } else if (log.includes("success")) {
                parsedLogs[parsedLogs.length - 1].logs.push({
                    prefix: prefixBuilder(depth),
                    style: "success",
                    text: `Program returned success`,
                });
                depth--;
            } else if (log.includes("failed")) {
                const instructionLog = parsedLogs[parsedLogs.length - 1];
                instructionLog.failed = true;

                let currText = `Program returned error: "${log.slice(
                    log.indexOf(": ") + 2
                )}"`;
                // failed to verify log of previous program so reset depth and print full log
                if (log.startsWith("failed")) {
                    depth++;
                    currText = log.charAt(0).toUpperCase() + log.slice(1);
                }

                instructionLog.logs.push({
                    prefix: prefixBuilder(depth),
                    style: "error",
                    text: currText,
                });
                depth--;
            } else {
                if (depth === 0) {
                    parsedLogs.push({
                        computeUnits: 0,
                        failed: false,
                        invokedProgram: null,
                        logs: [],
                        truncated: false,
                    });
                    depth++;
                }

                // Remove redundant program address from logs
                log = log.replace(
                    /Program \w* consumed (\d*) (.*)/g,
                    (match, p1, p2) => {
                        // Only aggregate compute units consumed from top-level tx instructions
                        // because they include inner ix compute units as well.
                        if (depth === 1) {
                            parsedLogs[parsedLogs.length - 1].computeUnits +=
                                Number.parseInt(p1);
                        }

                        return `Program consumed: ${p1} ${p2}`;
                    }
                );

                // native program logs don't start with "Program log:"
                parsedLogs[parsedLogs.length - 1].logs.push({
                    prefix: prefixBuilder(depth),
                    style: "neutral",
                    text: log,
                });
            }
        }
    });

    return parsedLogs;
};

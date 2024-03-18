#!/usr/bin/env bun
import sh from "shelljs";
import { displayCLIHeader } from "./asciiArt.js";
import { colors } from "./colors.js";
import { program } from "./commander.js";
import { logger } from "./utils/logger.js";
import { Spinner } from "./utils/spinner.js";

export const main = () => {
  displayCLIHeader();
  const spinner = new Spinner();
  try {
    console.log(colors.info("\nStarting..."));
    console.log(colors.info("Running Pre-checks..."));
    spinner.start("Initializing...");
    // Read params from cli
    program.parse(process.argv);

    const options = program.opts();

    if (!options.projectName) {
      spinner.stop();
      logger.error(
        'Error: No Project Name specified. Please include "--project-name <project-name>"',
      );
      sh.exit(0);
    }

    spinner.stop();
    logger.warning(`Creating new beth-stack site at ./${options.projectName}`);

    Bun.spawnSync(
      [
        "git",
        "clone",
        "https://github.com/ethanniser/beth-big.git",
        options.projectName,
      ],
      {
        onExit(subprocess, exitCode, signalCode, error) {
          if (exitCode !== 0) {
            console.log(colors.error(error));
            sh.exit(0);
          }
        },
      },
    );

    sh.cd(options.projectName);

    // Replace all instances of template name with new project name
    sh.ls("package.json").forEach((file: string) => {
      sh.sed("-i", '"test"', `"${options.projectName}"`, file);
    });

    // Remove the .git folder
    sh.exec(`rm -rf .git`);

    spinner.start("Installing dependencies...");

    Bun.spawnSync(["bun", "install"], {
      onExit(subprocess, exitCode, signalCode, error) {
        if (exitCode !== 0) {
          console.log(colors.error(error));
          sh.exit(0);
        }
      },
    });

    // Print our done message
    spinner.stop();
    console.log(colors.success.bold("Complete! 🎉"));
  } catch (error) {
    spinner.stop();
    logger.error(
      `Uh oh - Something happened, please create an issue here: \n\nhttps://github.com/lundjrl/repo-cli`,
    );
  } finally {
    logger.info(
      "This CLI is extremely new and barebones, contributions are welcome.",
    );
    logger.info("https://github.com/ethanniser/the-beth-stack");
    logger.info("Looking for help? Open an issue or ask in the discord.");
    logger.info("Ethan's Discord: https://discord.gg/Z3yUtMfkwa");
  }
};

main();

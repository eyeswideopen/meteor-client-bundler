const Chai = require("chai");
const Fs = require("fs");
const Path = require("path");

const expect = Chai.expect;

describe("Bundler", function () {
  describe("bundle()", function () {
    it("should use packages specified in the config if no source was " +
       "provided", function () {
      this.slow(80 * 1000);

      const dataDir = this.getDataDir("5896074c1e4a1c27d165811b");
      const destinationFile = Path.resolve(this.testDir, "meteor-client.bundle.js");
      const configFile = Path.resolve(dataDir, "meteor-client.config.json");

      this.execBundler(["bundle",
        `--destination=${destinationFile}`,
        `--config=${configFile}`
      ]);

      const expectedBundleFile = Path.resolve(dataDir, "meteor-client.bundle.js");
      const actualBundleBuffer = Fs.readFileSync(destinationFile);
      const expectedBundleBuffer = Fs.readFileSync(expectedBundleFile);

      expect(actualBundleBuffer).to.deep.equal(expectedBundleBuffer);
    });

    it("should set DDP default connection URL based on provided URL", function () {
      this.slow(80 * 1000);

      const dataDir = this.getDataDir("589674ef8dc0877afb36d64b");
      const destinationFile = Path.resolve(this.testDir, "meteor-client.bundle.js");
      const configFile = Path.resolve(dataDir, "meteor-client.config.json");
      const url = "http://1.0.0.127:8100";

      this.execBundler(["bundle",
        `--destination=${destinationFile}`,
        `--config=${configFile}`,
        `--url=${url}`
      ]);

      const expectedBundleFile = Path.resolve(dataDir, "meteor-client.bundle.js");
      const actualBundleBuffer = Fs.readFileSync(destinationFile);
      const expectedBundleBuffer = Fs.readFileSync(expectedBundleFile);

      expect(actualBundleBuffer).to.deep.equal(expectedBundleBuffer);
    });

    it("should use specified meteor packages directory", function () {
      this.slow(80 * 1000);

      const dataDir = this.getDataDir("58f5b6eee2cc39c0a2e7aa4e");
      const destinationFile = Path.resolve(this.testDir, "meteor-client.bundle.js");
      const packsDir = Path.resolve(dataDir, "packages");

      this.execBundler(["bundle",
        `--destination=${destinationFile}`,
        `--packs-dir=${packsDir}`
      ]);

      const expectedBundleFile = Path.resolve(dataDir, "meteor-client.bundle.js");
      const actualBundleBuffer = Fs.readFileSync(destinationFile);
      const expectedBundleBuffer = Fs.readFileSync(expectedBundleFile);

      Fs.writeFileSync(expectedBundleFile, actualBundleBuffer);

      expect(actualBundleBuffer).to.deep.equal(expectedBundleBuffer);
    });

    it("should use specified meteor release", function () {
      this.slow(80 * 1000);

      const dataDir = this.getDataDir("59b6a98c2987ff43125fdcfb");
      const destinationFile = Path.resolve(this.testDir, "meteor-client.bundle.js");
      const meteorRelease = "1.6-beta.26";

      this.execBundler(["bundle",
        `--destination=${destinationFile}`,
        `--release=${meteorRelease}`
      ]);

      const expectedBundleFile = Path.resolve(dataDir, "meteor-client.bundle.js");
      const actualBundleBuffer = Fs.readFileSync(destinationFile);
      const expectedBundleBuffer = Fs.readFileSync(expectedBundleFile);

      Fs.writeFileSync(expectedBundleFile, actualBundleBuffer);

      expect(actualBundleBuffer).to.deep.equal(expectedBundleBuffer);
    });
  });
});

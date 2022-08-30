let infuraId;
if (process.env.INFURA_ID) {
  infuraId = process.env.INFURA_ID;
} else if (CONFIG.defaultProviderConfig.type === "infura") {
  const { config } = CONFIG.defaultProviderConfig;
  infuraId = config.infuraId;
} else {
  infuraId = "";
}

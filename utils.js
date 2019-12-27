const defaultAxios = require("axios");
const config = require("config");

const TIMEOUT_MS = 20000;

const wordpromptUrl = config.get("wordpromptUrl");

const axios = defaultAxios.create({
  baseURL: `${wordpromptUrl}/api/`,
  timeout: TIMEOUT_MS,
  headers: { "Content-Type": "application/json" }
});

module.exports = { axios };

const defaultAxios = require("axios");
const config = require("config");

const timeoutMs = 1000 * Number(config.get("intervalSec"));

const wordpromptUrl = config.get("wordpromptUrl");

const axios = defaultAxios.create({
  baseURL: `${wordpromptUrl}/api/`,
  timeout: timeoutMs,
  headers: { "Content-Type": "application/json" }
});

module.exports = { axios };

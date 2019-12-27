const { axios } = require("./utils");
const prompts = require("./prompts");
const config = require("config");

const name = config.get("username");
const password = config.get("password");
const intervalMs = 1000 * Number(config.get("intervalSec"));

const login = async () => {
  const body = JSON.stringify({ name, password });
  try {
    const res = await axios.post("/auth", body);
    return res.data.token;
  } catch (error) {
    console.log(error);
  }
};

const createPrompt = async content => {
  const body = JSON.stringify({ content });
  try {
    return await axios.post("/prompts", body);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  let token = await login();
  console.log(token);
  axios.defaults.headers.common["x-auth-token"] = token;
  setInterval(() => {
    const index = Math.floor(Math.random() * prompts.length);
    token = login()
      .then(() => "Token updated")
      .catch(console.error);
    createPrompt(prompts[index])
      .then(() => console.log(`Prompt ${index} created`))
      .catch(console.error);
  }, intervalMs);
})();

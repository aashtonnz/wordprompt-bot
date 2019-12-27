const { axios } = require("./utils");
const prompts = require("./prompts");
const config = require("config");

const name = config.get("username");
const password = config.get("password");
const intervalMs = 1000 * Number(config.get("intervalSec"));

const prompt = () => {
  const index = Math.floor(Math.random() * prompts.length);
  axios
    .post("/auth", { name, password })
    .then(res => {
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      console.log("Token updated");
      axios
        .post("/prompts", JSON.stringify({ content: prompts[index] }))
        .then(() => console.log(`Prompt ${index} created`))
        .catch(console.error);
    })
    .catch(console.error);
};

(async () => {
  prompt();
  setInterval(prompt, intervalMs);
})();

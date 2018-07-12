const handler = require("serve-handler");
const micro = require("micro");

const appHandler = async (req, res) => {
  await handler(req, res, {
    public: "build",
    rewrites: [
      { source: "*", destination: "index.html"}
    ]
  })
};

micro(appHandler).listen(3000);
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51NRB51SFSg0zhrbsDNfq3B5hx3A71xsqQZOIe40d33SHuVnujZnxunY7HA6dK1Stx5zr2mUFy03a1hZkjdL6eAnh00fzHejm0i"
);
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{pr_1234}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(3000, () => console.log("Running on port 3000"));

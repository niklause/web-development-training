const zod = require("zod");

const validateInput = (obj) => {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
  });
  console.log(JSON.stringify(schema.safeParse(obj)));
};
validateInput({
  email: "test@test.com",
  password: "12378",
});

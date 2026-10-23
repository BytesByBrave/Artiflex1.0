import { Router } from "express";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import * as c from "../controllers/contentController.js";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});
const newsletterSchema = z.object({ email: z.string().email() });

router.get("/services", c.listServices);
router.get("/projects", c.listProjects);
router.get("/projects/:slug", c.getProject);
router.post("/contact", validate(contactSchema), c.createContact);
router.post("/newsletter", validate(newsletterSchema), c.subscribe);

export default router;

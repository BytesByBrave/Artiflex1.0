import "dotenv/config";
import mongoose from "mongoose";
import Service from "../models/Service.js";
import Project from "../models/Project.js";

try {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 });
  await Promise.all([Service.deleteMany(), Project.deleteMany()]);

  await Service.insertMany([
    {
      order: 1,
      title: "Brand Identity",
      description: "We craft distinctive brand identities that capture your essence and resonate deeply with your target audience.",
      tags: ["Brand Strategy", "Visual Identity", "Logo Design", "Brand Guidelines", "Naming"],
      image: "/images/cube-1.png",
    },
    {
      order: 2,
      title: "Digital Product Design",
      description: "User-centered design that blends beautiful interfaces with intuitive experiences.",
      tags: ["UX Research", "UI Design", "Prototyping", "Design Systems", "Usability Testing"],
      image: "/images/cube-2.png",
    },
    {
      order: 3,
      title: "Web Development",
      description: "High-performance, scalable web applications built with cutting-edge technologies.",
      tags: ["Frontend", "CMS", "API Integration", "Performance"],
      image: "/images/cube-3.png",
    },
  ]);

  await Project.insertMany([
    { title: "Studio Rebrand", slug: "studio-rebrand", client: "Creative Studio", category: "Brand Identity", year: 2026, cover: "/images/work-1.jpg", featured: true },
    { title: "FinanceFlow Platform", slug: "financeflow-platform", client: "FinTech Startup", category: "Digital Product", year: 2026, cover: "/images/work-2.jpg", featured: true },
    { title: "Aura Packaging", slug: "aura-packaging", client: "Skincare Brand", category: "Packaging", year: 2025, cover: "/images/work-3.jpg" },
    { title: "Pulse App", slug: "pulse-app", client: "Health & Fitness", category: "Mobile App", year: 2025, cover: "/images/work-4.jpg" },
  ]);

  console.log("MongoDB seeded successfully");
  await mongoose.disconnect();
} catch (err) {
  console.warn("MongoDB is offline or unreachable:", err.message);
  console.log("Note: The Dorio API server runs with built-in in-memory seed data automatically when MongoDB is offline.");
  process.exit(0);
}

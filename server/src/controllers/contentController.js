import mongoose from "mongoose";
import Service from "../models/Service.js";
import Project from "../models/Project.js";
import Contact from "../models/Contact.js";
import Subscriber from "../models/Subscriber.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

// Resilient in-memory dataset when MongoDB is offline
const memoryServices = [
  {
    _id: "s1",
    order: 1,
    title: "Brand Identity",
    description: "We craft distinctive brand identities that capture your essence and resonate deeply with your target audience.",
    tags: ["Brand Strategy", "Visual Identity", "Logo Design", "Brand Guidelines", "Naming"],
    image: "/images/cube-1.png",
  },
  {
    _id: "s2",
    order: 2,
    title: "Digital Product Design",
    description: "User-centered design that blends beautiful interfaces with intuitive experiences.",
    tags: ["UX Research", "UI Design", "Prototyping", "Design Systems", "Usability Testing"],
    image: "/images/cube-2.png",
  },
  {
    _id: "s3",
    order: 3,
    title: "Web Development",
    description: "High-performance, scalable web applications built with cutting-edge technologies.",
    tags: ["Frontend", "CMS", "API Integration", "Performance"],
    image: "/images/cube-3.png",
  },
];

const memoryProjects = [
  { _id: "p1", title: "Studio Rebrand", slug: "studio-rebrand", client: "Creative Studio", category: "Brand Identity", year: 2026, cover: "/images/work-1.jpg", featured: true },
  { _id: "p2", title: "FinanceFlow Platform", slug: "financeflow-platform", client: "FinTech Startup", category: "Digital Product", year: 2026, cover: "/images/work-2.jpg", featured: true },
  { _id: "p3", title: "Aura Packaging", slug: "aura-packaging", client: "Skincare Brand", category: "Packaging", year: 2025, cover: "/images/work-3.jpg" },
  { _id: "p4", title: "Pulse App", slug: "pulse-app", client: "Health & Fitness", category: "Mobile App", year: 2025, cover: "/images/work-4.jpg" },
];

const memoryContacts = [];
const memorySubscribers = new Set();

const isDbConnected = () => mongoose.connection.readyState === 1;

export const listServices = asyncHandler(async (req, res) => {
  if (isDbConnected()) {
    return res.json(await Service.find().sort("order"));
  }
  res.json(memoryServices);
});

export const listProjects = asyncHandler(async (req, res) => {
  if (isDbConnected()) {
    const filter = req.query.category ? { category: req.query.category } : {};
    return res.json(await Project.find(filter).sort("-createdAt"));
  }
  let results = memoryProjects;
  if (req.query.category) {
    results = results.filter((p) => p.category === req.query.category);
  }
  res.json(results);
});

export const getProject = asyncHandler(async (req, res) => {
  if (isDbConnected()) {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: "Project not found" });
    return res.json(project);
  }
  const project = memoryProjects.find((p) => p.slug === req.params.slug);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

export const createContact = asyncHandler(async (req, res) => {
  if (isDbConnected()) {
    await Contact.create(req.body);
  } else {
    memoryContacts.push({ ...req.body, createdAt: new Date() });
  }
  res.status(201).json({ message: "Message received" });
});

export const subscribe = asyncHandler(async (req, res) => {
  if (isDbConnected()) {
    await Subscriber.updateOne({ email: req.body.email }, { email: req.body.email }, { upsert: true });
  } else {
    memorySubscribers.add(req.body.email);
  }
  res.status(201).json({ message: "Subscribed" });
});

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.text());

// ─── In-Memory Stores (Mocked Database Layer) ─────────────────────────────

interface UserRecord {
  id: number;
  username: string;
  name: string;
  email: string;
  password?: string;
  role: "STUDENT" | "VOLUNTEER" | "ADMIN";
  institutionName?: string;
  expertise?: string;
}

interface StudentRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  department: string;
  semester: number;
  address: string;
}

let nextUserId = 4;
const users = new Map<number, UserRecord>([
  [
    1,
    {
      id: 1,
      username: "admin",
      name: "Admin User",
      email: "admin@vidyasampadana.edu",
      password: "password",
      role: "ADMIN",
    },
  ],
  [
    2,
    {
      id: 2,
      username: "ananya.sharma@presidency.edu",
      name: "Ananya Sharma",
      email: "ananya.sharma@presidency.edu",
      password: "password123",
      role: "STUDENT",
      institutionName: "Presidency University",
    },
  ],
  [
    3,
    {
      id: 3,
      username: "karthik.rao@vidyasampadana.edu",
      name: "Dr. Karthik Rao",
      email: "karthik.rao@vidyasampadana.edu",
      password: "password123",
      role: "VOLUNTEER",
      expertise: "KCET & NEET Academic Counseling",
    },
  ],
]);

let nextStudentId = 7;
const students = new Map<number, StudentRecord>([
  [
    1,
    {
      id: 1,
      firstName: "Aarav",
      lastName: "Kulkarni",
      email: "aarav.kulkarni@vidyasampadana.edu",
      dateOfBirth: "2004-05-14",
      department: "Computer Science",
      semester: 6,
      address: "14th Cross, Indiranagar, Bengaluru, Karnataka 560038",
    },
  ],
  [
    2,
    {
      id: 2,
      firstName: "Diya",
      lastName: "Nair",
      email: "diya.nair@vidyasampadana.edu",
      dateOfBirth: "2005-08-22",
      department: "Electronics & Communication",
      semester: 4,
      address: "Block B, Koramangala 4th Block, Bengaluru, Karnataka 560034",
    },
  ],
  [
    3,
    {
      id: 3,
      firstName: "Rohan",
      lastName: "Deshpande",
      email: "rohan.deshpande@vidyasampadana.edu",
      dateOfBirth: "2003-11-09",
      department: "Computer Science",
      semester: 7,
      address: "22nd Main, Jayanagar 9th Block, Bengaluru, Karnataka 560069",
    },
  ],
  [
    4,
    {
      id: 4,
      firstName: "Sneha",
      lastName: "Gowda",
      email: "sneha.gowda@vidyasampadana.edu",
      dateOfBirth: "2006-02-18",
      department: "Data Science & AI",
      semester: 2,
      address: "Whitefield Main Road, Bengaluru, Karnataka 560066",
    },
  ],
  [
    5,
    {
      id: 5,
      firstName: "Vikram",
      lastName: "Hegde",
      email: "vikram.hegde@vidyasampadana.edu",
      dateOfBirth: "2004-09-30",
      department: "Mechanical Engineering",
      semester: 5,
      address: "Malleshwaram 8th Cross, Bengaluru, Karnataka 560003",
    },
  ],
  [
    6,
    {
      id: 6,
      firstName: "Meera",
      lastName: "Iyer",
      email: "meera.iyer@vidyasampadana.edu",
      dateOfBirth: "2005-12-03",
      department: "Biotechnology",
      semester: 3,
      address: "HSR Layout Sector 2, Bengaluru, Karnataka 560102",
    },
  ],
]);

// ─── IAM / Auth Service Routes (/api/auth) ────────────────────────────────

app.post("/api/auth/signup", (req, res) => {
  const { username, password, email, name } = req.body || {};
  if (!username || !password) {
    return res.status(400).send("Error: Username and password are required!");
  }
  const exists = Array.from(users.values()).some(
    (u) => u.username.toLowerCase() === String(username).toLowerCase()
  );
  if (exists) {
    return res.status(400).send("Error: Username is already taken!");
  }
  const id = nextUserId++;
  users.set(id, {
    id,
    username,
    name: name || username,
    email: email || `${username}@vidyasampadana.edu`,
    password,
    role: "STUDENT",
  });
  return res.status(200).send("User registered successfully via Service Layer!");
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).send("Error: Username and password are required!");
  }
  const normalized = String(username).trim().toLowerCase();
  const matchedUser = Array.from(users.values()).find(
    (u) =>
      u.username.toLowerCase() === normalized ||
      u.email.toLowerCase() === normalized ||
      u.name.toLowerCase() === normalized
  );

  if (!matchedUser) {
    return res.status(404).send("Error: User does not exist!");
  }
  if (matchedUser.password !== password) {
    return res.status(401).send("Error: Wrong password!");
  }

  return res.status(200).send("Login successful! Welcome back.");
});

// ─── User Service Routes (/api/users) ─────────────────────────────────────

const toUserDto = (u: UserRecord) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  institutionName: u.institutionName,
  expertise: u.expertise,
});

app.post("/api/users/register/student", (req, res) => {
  const { name, email, password, institutionName } = req.body || {};
  const validationErrors: Record<string, string> = {};
  if (!name) validationErrors.name = "Name is required";
  if (!email) validationErrors.email = "Email is required";
  if (!password) validationErrors.password = "Password is required";
  if (!institutionName) validationErrors.institutionName = "Institution name is required";

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ validationErrors });
  }

  const id = nextUserId++;
  const newUser: UserRecord = {
    id,
    username: email,
    name,
    email,
    password,
    role: "STUDENT",
    institutionName,
  };
  users.set(id, newUser);
  return res.status(200).json(toUserDto(newUser));
});

app.post("/api/users/register/volunteer", (req, res) => {
  const { name, email, password, expertise } = req.body || {};
  const validationErrors: Record<string, string> = {};
  if (!name) validationErrors.name = "Name is required";
  if (!email) validationErrors.email = "Email is required";
  if (!password) validationErrors.password = "Password is required";
  if (!expertise) validationErrors.expertise = "Expertise is required";

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ validationErrors });
  }

  const id = nextUserId++;
  const newUser: UserRecord = {
    id,
    username: email,
    name,
    email,
    password,
    role: "VOLUNTEER",
    expertise,
  };
  users.set(id, newUser);
  return res.status(200).json(toUserDto(newUser));
});

app.post("/api/users/register/admin", (req, res) => {
  const { name, email, password } = req.body || {};
  const validationErrors: Record<string, string> = {};
  if (!name) validationErrors.name = "Name is required";
  if (!email) validationErrors.email = "Email is required";
  if (!password) validationErrors.password = "Password is required";

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ validationErrors });
  }

  const id = nextUserId++;
  const newUser: UserRecord = {
    id,
    username: email,
    name,
    email,
    password,
    role: "ADMIN",
  };
  users.set(id, newUser);
  return res.status(200).json(toUserDto(newUser));
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.get(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(toUserDto(user));
});

app.get("/api/users", (_req, res) => {
  return res.status(200).json(Array.from(users.values()).map(toUserDto));
});

// ─── Student Service Routes (/api/student & /students) ────────────────────

const studentPaths = ["/api/student", "/students"];

studentPaths.forEach((basePath) => {
  app.get(basePath, (_req, res) => {
    return res.status(200).json(Array.from(students.values()));
  });

  app.post(basePath, (req, res) => {
    const { firstName, lastName, email, dateOfBirth, department, semester, address } = req.body || {};
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "firstName, lastName, and email are required" });
    }
    const id = nextStudentId++;
    const created: StudentRecord = {
      id,
      firstName,
      lastName,
      email,
      dateOfBirth: dateOfBirth || "",
      department: department || "",
      semester: Number(semester) || 1,
      address: address || "",
    };
    students.set(id, created);
    return res.status(201).json(created);
  });

  app.get(`${basePath}/:id`, (req, res) => {
    const id = Number(req.params.id);
    const student = students.get(id);
    if (!student) {
      return res.status(404).json({ message: `Student not found with id: ${id}` });
    }
    return res.status(200).json(student);
  });

  app.put(`${basePath}/:id`, (req, res) => {
    const id = Number(req.params.id);
    const existing = students.get(id);
    if (!existing) {
      return res.status(404).json({ message: `Student not found with id: ${id}` });
    }
    const updated: StudentRecord = {
      ...existing,
      ...req.body,
      id,
      semester: req.body?.semester !== undefined ? Number(req.body.semester) : existing.semester,
    };
    students.set(id, updated);
    return res.status(200).json(updated);
  });

  app.delete(`${basePath}/:id`, (req, res) => {
    const id = Number(req.params.id);
    if (!students.has(id)) {
      return res.status(404).json({ message: `Student not found with id: ${id}` });
    }
    students.delete(id);
    return res.status(200).send("Student Deleted Successfully");
  });
});

// ─── Stubbed Secondary Microservice Routes ────────────────────────────────

app.use("/api", (_req, res) => {
  res.status(501).json({ error: "Not yet migrated" });
});

// ─── Server Bootstrap (Vite Middleware in Dev / Static in Prod) ───────────

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Vidya Sampadana server running on http://0.0.0.0:${port}`);
  });
}

startServer();

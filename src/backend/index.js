const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const EmployeeModel = require("./models/Employee");
const ItemModel = require("./models/Item");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create 'public/uploads/' directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, "public/uploads"))) {
  fs.mkdirSync(path.join(__dirname, "public/uploads"), { recursive: true });
}
// Static folder to serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads"));
    // Save files to the 'public/uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate unique file names
  },
});
// const upload = multer({ storage });
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only .jpg, .jpeg, and .png are allowed."),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// **Employee Login and Registration**
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "No record found." });
    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password." });

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const newEmployee = await EmployeeModel.create(req.body);
    res.status(201).json({
      message: "Employee registered successfully.",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// **Item Management**
app.post("/api/addItem", upload.single("img"), async (req, res) => {
  try {
    const { certificateId, name, year, description, price, uniqueCode } =
      req.body;
    const img = req.file ? req.file.path : null;

    if (
      !img ||
      !certificateId ||
      !name ||
      !year ||
      !description ||
      !price ||
      !uniqueCode
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required, including the image." });
    }

    const existingItem = await ItemModel.findOne({ certificateId });
    if (existingItem) {
      return res
        .status(409)
        .json({ message: "Item with this Certificate ID already exists." });
    }

    const newItem = await ItemModel.create({
      img,
      certificateId,
      name,
      year,
      description,
      price,
      uniqueCode,
    });

    res
      .status(201)
      .json({ message: "Item added successfully.", item: newItem });
  } catch (error) {
    console.error("Error in /api/addItem:", error.message);
    res
      .status(500)
      .json({ message: error.message || "Internal server error." });
  }
});

app.get("/getApprovedItems", async (req, res) => {
  try {
    const items = await ItemModel.find({ approved: true });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error in /getApprovedItems:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/getPendingItems", async (req, res) => {
  try {
    const items = await ItemModel.find({ approved: false });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error in /getPendingItems:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/approveItem", async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required." });
    }

    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      { approved: true },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    res
      .status(200)
      .json({ message: "Item approved successfully.", item: updatedItem });
  } catch (error) {
    console.error("Error in /approveItem:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.delete("/rejectItem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ItemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    res
      .status(200)
      .json({ message: "Item rejected and deleted successfully." });
  } catch (error) {
    console.error("Error in /rejectItem:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// **Start Server**
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

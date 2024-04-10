const Organization = require("../models/organizationModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerForm = async (req, res) => {
  try {
    const { organization_name, email, password, confirm_password } = req.body;

    const existingOrganization = await Organization.findOne({
      $or: [{ organization_name }, { email }],
    });
    if (existingOrganization) {
      return res
        .status(400)
        .json({ message: "Organization name or email already exists" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organization_id = generateOrganizationId();

    const newOrganization = new Organization({
      organization_name,
      email,
      password: hashedPassword,
      organization_id,
    });

    const savedOrganization = await newOrganization.save();

    await sendOrganizationIdEmail(email, organization_id,organization_name);

    res.status(201).json({
      message: "Organization registered successfully",
      organization: savedOrganization,
    });
  } catch (error) {
    console.error("Error registering organization:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

function generateOrganizationId() {
  return Math.floor(10000 + Math.random() * 90000);
}

async function sendOrganizationIdEmail(email, organization_id,organization_name) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "logachan08@gmail.com",
      pass: "hrbv llnm zmls xrcj",
    },
  });

  let mailOptions = {
    from: "logachan08@gmail.com",
    to: email,
    subject: "Your Organization ID",
    html: `
      <h1>Registration Successful</h1>
      <p>Hello,${organization_name}</p>
      <p>Congratulations! You have successfully registered. Please keep your organization ID safe. You can use this ID to log in to your account.</p>
      <p>Your organization ID is: <strong>${organization_id}</strong>.</p>
      <p>Thank you for registering with us!</p>
      <p>Best regards,<br>corporate cricket</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

exports.loginCheck = async (req, res) => {
  try {
    const { organization_id, password } = req.body;

    const corporate = await Organization.findOne({ organization_id });
    if (!corporate) {
      return res.status(404).json({ message: "Corporate not found" });
    }

    const passwordMatch = await bcrypt.compare(password, corporate.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

   
    const token = jwt.sign(
      { organization_id: corporate.organization_id },
      process.env.JWT_SECRET,{expiresIn:"1H"});
    res
      .status(200)
      .json({ message: "Corporate logged in successfully", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.organization = async (req, res) => {
  try {
    const organization_id = req.params.organization_id;
    const organization = await Organization.findOne({
      organization_id: organization_id,
    });
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.status(200).json(organization);
  } catch (error) {
    console.error("Error fetching organization details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

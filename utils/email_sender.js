import nodemailer from "nodemailer";
import fs from "fs";
import ejs from "ejs";

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_CODE,
  },
});

export async function sendAppointmentConfirmationEmail(
  customerEmail,
  appointmentDetails
) {
  try {
    const emailTemplate = fs.readFileSync("./utils/email_template.ejs", "utf-8");

    const compiledTemplate = ejs.compile(emailTemplate);

    const emailBody = compiledTemplate(appointmentDetails);

    await transporter.sendMail({
      from: "Car Service Team",
      to: customerEmail,
      subject: "Car Service Appointment Confirmation",
      html: emailBody,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


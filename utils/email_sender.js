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
    console.log("appointmentDetails", appointmentDetails);
    let emailTemplate;
    if (appointmentDetails.status) {
      emailTemplate = fs.readFileSync(
        "./utils/final_email_template.ejs",
        "utf-8"
      );
    } else {
      emailTemplate = fs.readFileSync(
        "./utils/confirm_email_template.ejs",
        "utf-8"
      );
    }
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

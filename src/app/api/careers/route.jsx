import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { uploadToCloudinary } from "../../../lib/cloudinary";
import { sendEmail, generateCareerEmailTemplate } from "../../../lib/email";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const position = formData.get("position");
    const coverLetter = formData.get("coverLetter");
    const resume = formData.get("resume");

    // Validate required fields
    if (!firstName || !lastName || !phone || !email || !position || !resume) {
      return NextResponse.json(
        { success: false, message: "All fields are required including resume" },
        { status: 400 },
      );
    }

    // Validate file type
    const fileExtension = resume.name.split(".").pop().toLowerCase();
    const allowedExtensions = ["pdf", "doc", "docx"];
    const isAllowedType =
      resume.type.includes("pdf") ||
      resume.type.includes("doc") ||
      resume.type.includes("word");

    if (!isAllowedType && !allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, message: "Resume must be a PDF or DOC file" },
        { status: 400 },
      );
    }

    // Validate file size (5MB limit)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Resume file size must be less than 5MB" },
        { status: 400 },
      );
    }

    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "unknown";

    let resumeUrl = "";
    try {
      // Upload resume to Cloudinary
      resumeUrl = await uploadToCloudinary(resume, "resumes");
    } catch (uploadError) {
      console.error("Resume upload failed:", uploadError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to upload resume. Please try again.",
        },
        { status: 500 },
      );
    }

    // Save application to database
    const application = await prisma.jobApplication.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        position: position.trim(),
        coverLetter: coverLetter?.trim() || null,
        resumeUrl,
        resumeType: fileExtension, // Save the extension
        ipAddress,
        status: "New",
        emailSent: false,
      },
    });

    console.log("Job Application Saved:", application.id);

    // Send email notification
    let emailResult = { success: false };
    try {
      const emailTemplate = generateCareerEmailTemplate({
        ...application,
        id: application.id,
      });

      emailResult = await sendEmail({
        to:
          process.env.HR_EMAIL ||
          process.env.ADMIN_EMAIL ||
          "hr@elite-intl.com",
        ...emailTemplate,
      });

      // Update application with email status
      await prisma.jobApplication.update({
        where: { id: application.id },
        data: { emailSent: emailResult.success },
      });

      // Log email attempt
      await prisma.emailLog.create({
        data: {
          type: "job_application",
          recipientId: application.id,
          recipient:
            process.env.HR_EMAIL ||
            process.env.ADMIN_EMAIL ||
            "hr@elite-intl.com",
          subject: emailTemplate.subject,
          status: emailResult.success ? "sent" : "failed",
          messageId: emailResult.messageId || null,
          error: emailResult.error || null,
        },
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: emailResult.success
        ? "Application submitted successfully. Our HR team will review it."
        : "Your application has been received. We will review it and contact you soon.",
      id: application.id,
    });
  } catch (error) {
    console.error("Careers API Error:", error);
    return NextResponse.json(
      { success: false, message: "Application failed. Please try again." },
      { status: 500 },
    );
  }
}

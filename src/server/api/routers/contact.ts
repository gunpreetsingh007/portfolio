import { createTRPCRouter, publicProcedure } from "../trpc";
import nodemailer from "nodemailer";
import { z } from "zod";

export const contactRouter = createTRPCRouter({
  sendMessage: publicProcedure
    // 1) Define the input schema using Zod
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1).max(5000),
      })
    )
    // 2) The mutation that handles sending the email
    .mutation(async ({ input }) => {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        replyTo: input.email,
        subject: `Portfolio Message from ${input.name}`,
        text: input.message,
      });

      return { success: true };
    }),
});

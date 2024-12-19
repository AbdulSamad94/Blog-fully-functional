"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { User, MailIcon, ArrowRightIcon, MessageSquare } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type Status = "success" | "error" | null;

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(null);

  // Type the event as a change event for HTML input elements
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mx-3">
      <div className="relative flex items-center">
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <User className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <MailIcon className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Textarea
          id="message"
          placeholder="Type your message here..."
          value={formData.message}
          onChange={handleChange}
          required
        />
        <MessageSquare className="absolute right-6 top-4" size={20} />
      </div>
      <Button
        type="submit"
        className="flex items-center max-w-[166px] gap-x-2"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Message Me"}
        <ArrowRightIcon size={20} />
      </Button>
      {status === "success" && (
        <p className="text-green-500">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-500">
          Failed to send message. Please try again.
        </p>
      )}
    </form>
  );
};

export default Form;

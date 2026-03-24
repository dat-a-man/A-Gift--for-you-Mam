"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2, MailCheck, X } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export function SubscriptionModal({ open, onClose }: SubscriptionModalProps) {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setSubmitState("idle");
      setMessage("");
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const isSubmitting = submitState === "loading";
  const emailIsValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email],
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailIsValid) {
      setSubmitState("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitState("loading");
      setMessage("");

      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitState("error");
        setMessage(data?.message || "Unable to subscribe right now.");
        return;
      }

      setSubmitState("success");
      setMessage(data?.message || "You have subscribed successfully.");
      setEmail("");
    } catch {
      setSubmitState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-xl border bg-background p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Subscribe to updates</h2>
                <p className="text-sm text-muted-foreground">
                  Get notified when new engineering stories are published.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close subscription modal"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email address"
                disabled={isSubmitting}
                autoFocus
              />

              <motion.div
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !email.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </motion.div>

              <AnimatePresence mode="wait">
                {message ? (
                  <motion.div
                    key={`${submitState}-${message}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                      submitState === "success"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "border-destructive/40 bg-destructive/10 text-destructive"
                    }`}
                  >
                    {submitState === "success" ? (
                      <MailCheck className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <span>{message}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

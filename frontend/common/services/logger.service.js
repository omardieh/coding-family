import { AnalyticsService } from "./Analytics.service";

const isDevelopment = import.meta.env.MODE === "development";
const { trackEvent, trackError } = AnalyticsService();

export const logger = {
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    } else {
      trackEvent("debug_log", "debug", { message: args.join(" ") });
    }
  },

  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    } else {
      trackEvent("info_log", "info", { message: args.join(" ") });
    }
  },

  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    } else {
      trackEvent("warning_log", "warn", { message: args.join(" ") });
    }
  },

  error: (error, context = {}) => {
    if (isDevelopment) {
      console.error(error);
    }

    trackError(error, {
      ...context,
      environment: import.meta.env.MODE,
      timestamp: new Date().toISOString(),
    });
  },
};

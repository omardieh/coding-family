import { BrowserAgent } from "@newrelic/browser-agent/loaders/browser-agent";
import { Ajax } from "@newrelic/browser-agent/features/ajax";
import { JSErrors } from "@newrelic/browser-agent/features/jserrors";
import { Metrics } from "@newrelic/browser-agent/features/metrics";
import { GenericEvents } from "@newrelic/browser-agent/features/generic_events";
import { PageViewEvent } from "@newrelic/browser-agent/features/page_view_event";
import { PageViewTiming } from "@newrelic/browser-agent/features/page_view_timing";
import { SessionTrace } from "@newrelic/browser-agent/features/session_trace";
import { Spa } from "@newrelic/browser-agent/features/spa";

export function AnalyticsService() {
  const options = {
    init: {
      distributed_tracing: { enabled: true },
      privacy: { cookies_enabled: true },
      ajax: { deny_list: ["bam.eu01.nr-data.net"] },
    },
    info: {
      beacon: "bam.eu01.nr-data.net",
      errorBeacon: "bam.eu01.nr-data.net",
      licenseKey: "NRJS-c99451144d700bb0878",
      applicationID: "538699877",
      sa: 1,
    },
    loader_config: {
      accountID: "6476987",
      trustKey: "6476987",
      agentID: "538699877",
      licenseKey: "NRJS-c99451144d700bb0878",
      applicationID: "538699877",
    },
    features: [
      Ajax,
      JSErrors,
      Metrics,
      GenericEvents,
      PageViewEvent,
      PageViewTiming,
      SessionTrace,
      Spa,
    ],
  };

  const initialize = () => {
    try {
      new BrowserAgent(options);
      console.log("[Analytics] Service initialized");
    } catch (error) {
      console.error("[Analytics] Failed to initialize:", error);
    }
  };

  const trackEvent = (category, action, attributes = {}) => {
    try {
      newrelic.addPageAction(category, {
        ...attributes,
        action,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[Analytics] Failed to track event:", error);
    }
  };

  const trackError = (error, attributes = {}) => {
    try {
      newrelic.noticeError(error, {
        ...attributes,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("[Analytics] Failed to track error:", err);
    }
  };

  const trackPageView = (path, title) => {
    try {
      newrelic.setCurrentRouteName(path);
      trackEvent("pageview", path, { title });
    } catch (error) {
      console.error("[Analytics] Failed to track page view:", error);
    }
  };
  return {
    initialize,
    trackEvent,
    trackError,
    trackPageView,
  };
}

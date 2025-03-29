import { BrowserAgent } from "@newrelic/browser-agent/loaders/browser-agent";
import { Ajax } from "@newrelic/browser-agent/features/ajax";
import { JSErrors } from "@newrelic/browser-agent/features/jserrors";
import { Metrics } from "@newrelic/browser-agent/features/metrics";
import { GenericEvents } from "@newrelic/browser-agent/features/generic_events";
import { PageViewEvent } from "@newrelic/browser-agent/features/page_view_event";
import { PageViewTiming } from "@newrelic/browser-agent/features/page_view_timing";
import { SessionTrace } from "@newrelic/browser-agent/features/session_trace";
import { Spa } from "@newrelic/browser-agent/features/spa";
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

const useBrowserAgent = () => new BrowserAgent(options);
export default useBrowserAgent;

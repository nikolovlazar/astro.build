import * as Sentry from "@sentry/astro";

Sentry.init({
	dsn: "https://a4ffeb87abb2a5edbbaa8fc523bc0ab5@o4506044970565632.ingest.us.sentry.io/4507312696918016",
	sampleRate: 1.0,
	tracesSampleRate: 1.0,
	integrations: [],
});

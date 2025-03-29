(async function() {
	const res = await fetch("https://api.allorigins.win/raw?url=https://ch.tetr.io/api/users/62550408ecad38a39b7a5bd7/summaries");

	console.log(res);

	const data = await res.json();

	const Sprintpps = data.data["40l"].record.results.aggregatestats.pps.toFixed(2);
	const Sprinttime = ((data.data["40l"].record.results.stats.finaltime / 1000)).toFixed(3);

	const SprinttimeElement = document.getElementById("Sprinttime");
	SprinttimeElement.innerHTML = Sprinttime;

	const SprintppsElement = document.getElementById("Sprintpps");
	SprintppsElement.innerHTML = Sprintpps;

	const Blitzpps = data.data.blitz.record.results.aggregatestats.pps.toFixed(2);
	const Blitzscore = data.data.blitz.record.results.stats.score;

	const BlitzppsElement = document.getElementById("Blitzpps");
	BlitzppsElement.innerHTML = Blitzpps;

	const BlitzscoreElement = document.getElementById("Blitzscore");
	BlitzscoreElement.innerHTML = Blitzscore;
})();

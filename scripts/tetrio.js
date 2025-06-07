document.addEventListener("DOMContentLoaded", () => {
  sprint()
  blitz()
  qp()
  overall()
})

async function sprint() {
	  try{
		const response = await fetch(`https://api.allorigins.win/raw?url=https://ch.tetr.io/api/users/62550408ecad38a39b7a5bd7/summaries/40l`);
		const data = await response.json();

		const time = data.data.record.results.stats.finaltime / 1000;
		const timeElement = document.getElementById("40Lpb");
	

		timeElement.innerHTML = time + "S";

		const pps = data.data.record.results.aggregatestats.pps.toFixed(2);
		const ppsElement = document.getElementById("40Lpps");
		ppsElement.innerHTML = pps;

		const finnesse = data.data.record.results.stats.finesse.faults;

		const finnesseElement = document.getElementById("40lF");
		finnesseElement.innerHTML = finnesse;
	}
	catch (error) {
		console.error("Error fetching 40L data:", error);
	}
}	

async function blitz() {
	try{
		const response = await fetch(`https://api.allorigins.win/raw?url=https://ch.tetr.io/api/users/62550408ecad38a39b7a5bd7/summaries/blitz`);
		const data = await response.json();

		const score = data.data.record.results.stats.score;
		const scoreElement = document.getElementById("blitzpb");
		scoreElement.innerHTML = score;

		const lvl = data.data.record.results.stats.level;
		const lvlElement = document.getElementById("blitzlvl");
		lvlElement.innerHTML = lvl;

		const tsd = data.data.record.results.stats.clears.tspindoubles;
		const tsdElement = document.getElementById("blitztsd");
		tsdElement.innerHTML = tsd;
	}
	catch (error) {
		console.error("Error fetching blitz data:", error);
	}
}

async function qp() {
	try{
		const response = await fetch(`https://api.allorigins.win/raw?url=https://ch.tetr.io/api/users/62550408ecad38a39b7a5bd7/summaries/zenith`);
		const data = await response.json();

		const pb = data.data.record.results.stats.zenith.altitude.toFixed(2);
		const pbElement = document.getElementById("qppb") ;
		pbElement.innerHTML = pb;

		const apm = data.data.record.results.aggregatestats.apm.toFixed(2);
		const apmElement = document.getElementById("qpapm");
		apmElement.innerHTML = apm;

		const rank = data.data.rank;
		const rankElement = document.getElementById("qprank");
		rankElement.innerHTML = rank;
	}
	catch (error) {
		console.error("Error fetching qp data:", error);
	}
}


async function overall() {
	try{
		const response = await fetch(`https://api.allorigins.win/raw?url=https://ch.tetr.io/api/users/62550408ecad38a39b7a5bd7/summaries`);
		const data = await response.json();

		const stacker = data.data.achievements[0].v;
		const stackerElement = document.getElementById("stacker");
		stackerElement.innerHTML = stacker;

		const sprinter = data.data.achievements[4].v;
		const sprinterElement = document.getElementById("sprinter");
		sprinterElement.innerHTML = sprinter;

		const tsdTotalMilliseconds = -data.data.achievements[7].v;
		const minutes = Math.floor(tsdTotalMilliseconds / 60000);
		const seconds = ((tsdTotalMilliseconds % 60000) / 1000).toFixed(2);
		const tsd = `${minutes}m ${seconds}s`;
		
		const tsdElement = document.getElementById("tsd");
		tsdElement.innerHTML = tsd;
	}
	catch (error) {
		console.error("Error fetching overall data:", error);
	}
}
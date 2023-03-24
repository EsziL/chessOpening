var openings = document.querySelectorAll(".opening");
var baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");

openings.forEach((i) => {
	i.innerHTML = `${i.innerHTML}<h1>${i.dataset.name}</h1>`
	i.innerHTML = `${i.innerHTML}<h2>${i.dataset.desc}</h2>`

	i.addEventListener("click", () =>{
		window.location.href = `${baseUrl}/openings/${i.dataset.name}.html`;
	});

});
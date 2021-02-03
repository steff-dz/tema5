//function for dealing with the weird time string I got from google
// function toDateTime(secs) {
// 	let t = new Date(1970, 0, 1);
// 	t.setSeconds(secs);
// 	let newTime = JSON.stringify(t);
// 	console.log(newTime.slice(1, 11));
// 	//return t;
// 	return t;
// }

// function testGooglePlaces() {
// 	fetch(
// 		`${corsURL}https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJYx2sA-82DogRHXyPM72bca0&fields=reviews&key=${googleKey}`
// 	)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			console.log(data.result.reviews);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// }

//BELOW IS THE GOOGLE PLACES API FETCH
// fetch(
// 	`${corsURL}https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJYx2sA-82DogRHXyPM72bca0&fields=reviews&key=${googleKey}`
// )
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log(data.result.reviews);
// 		data.result.reviews.forEach((el) => {
// 			//i++;
// 			newChartData.y.push(el.rating);
// 			//newChartData.x.push(i);
// 			let reviewTime = toDateTime(el.time);
// 			newChartData.x.push(reviewTime);
// 		});
// 		let newChartState = {
// 			...chartState,
// 			data: [ newChartData ]
// 		};
// 		console.log(newChartState);
// 		setChartState(newChartState);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

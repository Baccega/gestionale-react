import { useRef, useEffect, useState, useContext } from "react";
import { Context } from "./App";

// Pigrizia
const server_address = "http://0.0.0.0:3500/v1/";

export const findAlias = (appState, id) => {
	return appState.aziende.find(azienda => azienda.id === id).alias;
};

export const months = [
	"Gennaio",
	"Febbraio",
	"Marzo",
	"Aprile",
	"Maggio",
	"Giugno",
	"Luglio",
	"Agosto",
	"Settembre",
	"Ottobre",
	"Novembre",
	"Dicembre"
];

export const monthNames = mese => {
	return months[Number(mese) - 1];
};

export const useEffectOnce = cb => {
	const used = useRef(false);
	useEffect(() => {
		if (!used.current) {
			used.current = true;
			cb();
		}
	}, [used, cb]);
};

export const useFetch = cb => {
	console.log(process.env);

	// const [data, setData] = useState(null);
	// const [loading, setLoading] = useState(true);

	// const fetchData = async () => {
	// 	const response = await fetch(url);
	// 	const json = await response.json();
	// 	setData(json);
	// 	setLoading(false);
	// };

	// useEffectOnce(fetchData);

	// return { loading, data };
};

// export const useFetchPost = (endpoint, payload, cb) => {
// 	console.log(process.env.SERVER_ADDRESS);

// 	// const [response, setResponse] = useState(null);
// 	const { dispatch } = useContext(Context);

// 	dispatch({ type: "loading-update", payload: true });

// 	const fetchData = async () => {
// 		const rawResponse = await fetch(`${server_address}${endpoint}`, {
// 			method: "POST",
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify(payload)
// 		});

// 		const response = await rawResponse.json();

// 		dispatch({ type: "loading-update", payload: false });
// 		console.log("Arrived: " + response);
// 		cb(response);
// 	};

// 	return { fetchData };
// };

export const fetchPost = async (endpoint, payload) => {
	const rawResponse = await fetch(`${server_address}${endpoint}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});
	const response = await rawResponse.json();
	console.log("Arrived: " + response);
	return response;
};

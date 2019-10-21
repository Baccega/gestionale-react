import { useRef, useEffect } from "react";

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

export const initialState = {
	search: "",
	loading: false,
	fatture: [
		{
			id: 1,
			azienda: 1,
			numero: 1,
			mese: "2",
			anno: "2019",
			dettagli: [
				{
					id: 1,
					descrizione: "DETTAGLIO 1",
					prezzo: 0.1,
					udm: "PEZZI",
					quantita: 1,
					colore: "BIANCO",
					ddt: 1
				}
			],
			ddt: [
				{
					id: 1,
					numero: 1,
					giorno: "",
					mese: "",
					anno: ""
				}
			]
		}
	],
	prodotti: [
		{
			id: 1,
			azienda: 1,
			nome: "uno",
			prezzo: 0.1111,
			udm: "PEZZI",
			versioni: [
				{
					id: 1,
					descrizione: "Solo ruota dx",
					prezzo: 0.111,
					udm: ""
				},
				{
					id: 2,
					descrizione: "Solo ruota sx",
					prezzo: 0.111,
					udm: "COPPIE"
				}
			]
		},
		{
			id: 2,
			azienda: 1,
			nome: "due",
			prezzo: 0.2222,
			udm: "COPPIE",
			versioni: [
				{ id: 1, descrizione: "Solo ruota sx", prezzo: 0.2221, udm: "" }
			]
		}
	],
	aziende: [
		{
			id: 1,
			alias: "TEST",
			ragioneSociale: "TEST INTERNATIONAL S.R.L.",
			piva: "11122233344",
			indirizzo: "VIA TEST 23/3",
			citta: "PADOVA",
			provincia: "PD",
			cap: "35010",
			giorni: 60,
			codiceFiscale: "11122233344",
			nome: "",
			cognome: "",
			sdi: "S7YVVK9",
			pagamento: "RIBA",
			iva: 22
		}
	],
	colori: ["/", "BIANCO", "NERO", "SILVER"],
	udm: ["/", "PEZZI", "COPPIE"],
	pagamenti: ["RIBA", "BONIFICO", "CONTANTI", "RID"]
};

export const appReducer = (state, action) => {
	if (action.type.includes("azienda")) {
		return aziendeReducer(state, action);
	} else if (action.type.includes("prodotto")) {
		return prodottiReducer(state, action);
	} else if (action.type.includes("fattura")) {
		return fattureReducer(state, action);
	} else {
		switch (action.type) {
			case "search-update": {
				return {
					...state,
					search: action.payload
				};
			}
			case "loading-update": {
				return {
					...state,
					loading: action.payload
				};
			}
			case "reset": {
				return action.payload;
			}
			default: {
				console.log(`Unsupported: ${action.type}`);
				return state;
			}
		}
	}
};

function prodottiReducer(state, action) {
	switch (action.type) {
		case "prodotto-add": {
			return {
				...state,
				prodotti: [...state.prodotti, action.payload]
			};
		}
		case "prodotto-update": {
			return {
				...state,
				prodotti: state.prodotti.map(prodotto =>
					prodotto.id === action.selectedId ? action.payload : prodotto
				)
			};
		}
		case "prodotto-delete": {
			return {
				...state,
				prodotti: state.prodotti.filter(
					prodotto => prodotto.id !== action.payload
				)
			};
		}
		default: {
			console.log(`Unsupported: ${action.type}`);
			return state;
		}
	}
}

function fattureReducer(state, action) {
	switch (action.type) {
		case "fattura-add": {
			const obj = { ...action.payload, id: Date.now() };
			return {
				...state,
				fatture: [...state.fatture, obj]
			};
		}
		case "fattura-update": {
			return {
				...state,
				fatture: state.fatture.map(fattura =>
					fattura.id === action.selectedId ? action.payload : fattura
				)
			};
		}
		default: {
			console.log(`Unsupported: ${action.type}`);
			return state;
		}
	}
}

function aziendeReducer(state, action) {
	switch (action.type) {
		case "azienda-add": {
			const obj = { ...action.payload, id: Date.now() };
			return {
				...state,
				aziende: [...state.aziende, obj]
			};
		}
		case "azienda-update": {
			return {
				...state,
				aziende: state.aziende.map(azienda =>
					azienda.id === action.selectedId ? action.payload : azienda
				)
			};
		}
		default: {
			console.log(`Unsupported: ${action.type}`);
			return state;
		}
	}
}

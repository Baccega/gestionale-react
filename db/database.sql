CREATE TABLE udm (
  id VARCHAR(20) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE colori (
  id VARCHAR(20) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE pagamenti (
  id VARCHAR(20) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE aziende (
  id SERIAL,
  alias TEXT NOT NULL,
  ragioneSociale TEXT NOT NULL,
  giorni INT NOT NULL,
  iva INT NOT NULL,
  piva CHAR(11) NOT NULL,
  codiceFiscale VARCHAR(20) NOT NULL,
  nome TEXT,
  cognome TEXT,
  indirizzo TEXT NOT NULL,
  citta TEXT NOT NULL,
  provincia CHAR(2) NOT NULL,
  cap CHAR(5) NOT NULL,
  sdi CHAR(7) NOT NULL,
  pagamento VARCHAR(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (pagamento) REFERENCES pagamenti(id)
);

CREATE TABLE prodotti (
  id SERIAL,
  azienda INT NOT NULL,
  nome TEXT NOT NULL,
  udm VARCHAR(20),
  prezzo NUMERIC NOT NULL, 
  PRIMARY KEY (id),
  FOREIGN KEY (udm) REFERENCES udm(id),
  FOREIGN KEY (azienda) REFERENCES aziende(id) ON DELETE SET NULL
);

CREATE TABLE versioni (
  id SERIAL,
  prodotto INT NOT NULL,
  prezzo NUMERIC NOT NULL,
  descrizione TEXT DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (prodotto) REFERENCES prodotti(id) ON DELETE CASCADE
);


CREATE TABLE fatture (
  id SERIAL,
  azienda INT NOT NULL,
  numero INT NOT NULL,
  mese INT NOT NULL,
  anno INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (azienda) REFERENCES aziende(id) ON DELETE SET NULL
);

CREATE TYPE mittente_destinatario AS ENUM('mittente','destinatario');

CREATE TABLE ddt(
  id SERIAL,
  fattura INT NOT NULL,
  numero INT NOT NULL,
  causale TEXT,
  giorno INT NOT NULL,
  mese INT NOT NULL,
  anno INT NOT NULL,
  consegna mittente_destinatario,
  aMezzo mittente_destinatario,
  nColli TEXT,
  indirizzoConsegna TEXT,
  cittaConsegna TEXT,
  capConsegna CHAR(5),
  PRIMARY KEY(id),
  FOREIGN KEY (fattura) REFERENCES fatture(id) ON DELETE CASCADE
);

CREATE TABLE dettagli_fatture (
  id SERIAL,
  fattura INT NOT NULL,
  quantita INT NOT NULL,
  udm VARCHAR(20) NOT NULL,
  colore VARCHAR(20) NOT NULL,
  ddt INT NOT NULL,
  descrizione TEXT DEFAULT NULL,
  prezzo NUMERIC NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (udm) REFERENCES udm(id),
  FOREIGN KEY (colore) REFERENCES colori(id),
  FOREIGN KEY (ddt) REFERENCES ddt(id),
  FOREIGN KEY (fattura) REFERENCES fatture(id) ON DELETE CASCADE
);


CREATE TABLE dettagli_ddt(
  id SERIAL,
  ddt INT NOT NULL,
  dettaglio INT NOT NULL,
  quantita INT NOT NULL,
  udm VARCHAR(20) NOT NULL,
  descrizione TEXT DEFAULT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (ddt) REFERENCES ddt(id) ON DELETE CASCADE,
  FOREIGN KEY (udm) REFERENCES udm(id),
  FOREIGN KEY (dettaglio) REFERENCES dettagli_fatture(id) ON DELETE CASCADE
);

CREATE TABLE utility (
  id SERIAL,
  progressivoFatture INT NOT NULL,
  progressivoBolle INT NOT NULL,
  anno INT NOT NULL,
  PRIMARY KEY(id)
);

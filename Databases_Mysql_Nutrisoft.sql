use nutrisoft;

CREATE TABLE `nutrisoft`.`roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`idRoles`)
);
INSERT INTO roles(nombre) 
VALUES ('cliente');
INSERT INTO roles(nombre) 
VALUES ('expecialista');
CREATE TABLE `nutrisoft`.`menbrecia` (
  `idMenbrecia` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`idMenbrecia`)
);
INSERT INTO menbrecia(nombre) 
VALUES ('1 mes');
INSERT INTO menbrecia(nombre) 
VALUES ('2 meses');
INSERT INTO menbrecia(nombre) 
VALUES ('6 meses');
INSERT INTO menbrecia(nombre) 
VALUES ('1 año');

  
CREATE TABLE `nutrisoft`.`persona` (
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(45) NOT NULL,
  `fechaN` DATE,
  `idRoles` INT NOT NULL,
  `idMenbrecia` INT NOT NULL,
  PRIMARY KEY (`email`),
  FOREIGN KEY (idRoles)references roles(idRoles),
  FOREIGN KEY (idMenbrecia)references menbrecia(idMenbrecia)
);

INSERT INTO persona(nombre,apellido,email,pass,sexo,fechaN,idRoles,idMenbrecia) 
VALUES ('DANILO','DONADO','DANILO@GMAIL.COM','DONADO1234','M','12-04-1999',1,1);


CREATE TABLE `nutrisoft`.`tarjeta` (
  `idTarjeta` int NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL NULL,
  `numero` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `cvv` VARCHAR(45) NOT NULL,
  `fechaExpiracion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (idTarjeta),
  FOREIGN KEY (email)references persona(email)
);


INSERT INTO tarjeta(email,numero,nombre,cvv,fechaExpiracion) 
VALUES ('DANILO@GMAIL.COM','1234231421421456','juan camilo vargas','124','12/34');


CREATE TABLE `nutrisoft`.`img` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `data` LONGBLOB NOT NULL,
  PRIMARY KEY (`id`)
  );
  
CREATE TABLE `nutrisoft`.`datosbasicos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL NULL,
  `peso` float NOT NULL,
  `altura` float NOT NULL,
  `presion` float NOT NULL,
  `frecuenciaC` float NOT NULL,
  `frecuenciaR` float NOT NULL,
  `alergias` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (email)references persona(email)
  );
CREATE DATABASE crossoverx;
USE crossoverx;

-- TABLA EQUIPOS (ACB)
CREATE TABLE teams (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(200),
    logo_url VARCHAR(500)
);

INSERT INTO teams (name, city, logo_url) VALUES
('Real Madrid', 'Madrid', 'logo_rm.png'),                  -- id = 1
('FC Barcelona', 'Barcelona', 'logo_barsa.png'),           -- id = 2
('Valencia Basket', 'Valencia', 'logo_valencia.png'),      -- id = 3
('Baskonia', 'Vitoria', 'logo_baskonia.png'),              -- id = 4
('Bàsquet Girona', 'Girona', 'logo_girona.png'),           -- id = 5
('BAXI Manresa', 'Manresa', 'logo_manresa.png'),           -- id = 6
('Casademont Zaragoza', 'Zaragoza', 'logo_zaragoza.png'),  -- id = 7
('Covirán Granada', 'Granada', 'logo_granada.png'),        -- id = 8
('Dreamland Gran Canaria', 'Gran Canaria', 'logo_gc.png'), -- id = 9
('Hiopos Lleida', 'Lleida', 'logo_lleida.png'),            -- id = 10
('Joventut Badalona', 'Badalona', 'logo_joventut.png'),    -- id = 11
('Lenovo Tenerife', 'Tenerife', 'logo_tenerife.png'),      -- id = 12
('MoraBanc Andorra', 'Andorra', 'logo_andorra.png'),       -- id = 13
('Río Breogán', 'Lugo', 'logo_breogan.png'),               -- id = 14
('San Pablo Burgos', 'Burgos', 'logo_burgos.png'),         -- id = 15
('Surne Bilbao Basket', 'Bilbao', 'logo_bilbao.png'),      -- id = 16
('UCAM Murcia', 'Murcia', 'logo_murcia.png'),              -- id = 17
('Unicaja Málaga', 'Málaga', 'logo_unicaja.png');          -- id = 18


-- TABLA JUGADORES
CREATE TABLE players (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    number INT,
    position VARCHAR(50),
    height DOUBLE,
    weight DOUBLE,
    team_id BIGINT,
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- REAL MADRID (1)
INSERT INTO players VALUES
(NULL,'Walter','Tavares',22,'Center',2.20,120,1),
(NULL,'Sergio','Llull',23,'Guard',1.90,85,1),
(NULL,'Mario','Hezonja',11,'Forward',2.03,98,1);

-- FC BARCELONA (2)
INSERT INTO players VALUES
(NULL,'Nikola','Mirotic',33,'Forward',2.08,113,2),
(NULL,'Nicolas','Laprovittola',20,'Guard',1.90,82,2),
(NULL,'Jan','Vesely',24,'Center',2.13,109,2);

-- VALENCIA (3)
INSERT INTO players VALUES
(NULL,'Chris','Jones',7,'Guard',1.88,87,3),
(NULL,'Jaime','Puerto',12,'Forward',2.00,95,3),
(NULL,'Matt','Reuvers',15,'Center',2.13,108,3);

-- BASKONIA (4)
INSERT INTO players VALUES
(NULL,'Markus','Howard',0,'Guard',1.80,79,4),
(NULL,'Tadas','Sedekerskis',31,'Forward',2.07,100,4),
(NULL,'Maik','Kotsar',21,'Center',2.11,115,4);

-- GIRONA (5)
INSERT INTO players VALUES
(NULL,'Quim','Costa',5,'Guard',1.85,78,5),
(NULL,'Sergi','Martínez',14,'Forward',2.01,92,5),
(NULL,'Roko','Prkacin',23,'Center',2.08,104,5);

-- MANRESA (6)
INSERT INTO players VALUES
(NULL,'Dani','Pérez',9,'Guard',1.86,82,6),
(NULL,'Brancou','Badio',12,'Forward',1.96,88,6),
(NULL,'Martín','Geben',34,'Center',2.08,109,6);

-- ZARAGOZA (7)
INSERT INTO players VALUES
(NULL,'Jahlil','Triggs',3,'Guard',1.89,81,7),
(NULL,'Dylan','Osetkowski',21,'Forward',2.03,104,7),
(NULL,'Tryggvi','Hlinason',14,'Center',2.16,120,7);

-- GRANADA (8)
INSERT INTO players VALUES
(NULL,'Lluis','Costa',5,'Guard',1.86,78,8),
(NULL,'Luke','Maye',32,'Forward',2.03,104,8),
(NULL,'David','Iriarte',33,'Center',2.05,102,8);

-- GRAN CANARIA (9)
INSERT INTO players VALUES
(NULL,'Ferrán','Bassas',10,'Guard',1.81,76,9),
(NULL,'John','Shurna',22,'Forward',2.04,100,9),
(NULL,'Olek','Balcerowski',31,'Center',2.15,108,9);

-- LLEIDA (10)
INSERT INTO players VALUES
(NULL,'Albert','Lledó',6,'Guard',1.85,80,10),
(NULL,'Michael','Carrera',24,'Forward',1.98,94,10),
(NULL,'Marko','Bjekovic',44,'Center',2.11,110,10);

-- JOVENTUT (11)
INSERT INTO players VALUES
(NULL,'Andrés','Feliz',11,'Guard',1.88,85,11),
(NULL,'Pep','Busquets',9,'Forward',1.98,89,11),
(NULL,'Ante','Tomic',44,'Center',2.17,115,11);

-- TENERIFE (12)
INSERT INTO players VALUES
(NULL,'Marcelinho','Huertas',9,'Guard',1.91,82,12),
(NULL,'Aaron','Doornekamp',42,'Forward',2.01,100,12),
(NULL,'Gio','Shermadini',19,'Center',2.17,115,12);

-- ANDORRA (13)
INSERT INTO players VALUES
(NULL,'Jean','Montero',3,'Guard',1.88,80,13),
(NULL,'Moussa','Diagouraga',15,'Forward',2.03,95,13),
(NULL,'Tyson','Perez',35,'Center',2.02,104,13);

-- BREOGÁN (14)
INSERT INTO players VALUES
(NULL,'Erik','Quintela',8,'Guard',1.85,78,14),
(NULL,'Sergi','Quintela',33,'Forward',1.89,82,14),
(NULL,'Marko','Lukovic',22,'Center',2.06,104,14);

-- BURGOS (15)
INSERT INTO players VALUES
(NULL,'Alex','Barreno',7,'Guard',1.90,82,15),
(NULL,'Ismael','Bako',12,'Forward',2.08,103,15),
(NULL,'Gabriel','Galván',32,'Center',2.10,109,15);

-- BILBAO (16)
INSERT INTO players VALUES
(NULL,'Adam','Smith',2,'Guard',1.85,80,16),
(NULL,'Denzel','Anderson',13,'Forward',2.02,95,16),
(NULL,'Jeff','Withey',50,'Center',2.13,113,16);

-- MURCIA (17)
INSERT INTO players VALUES
(NULL,'Ludwig','Hakanson',4,'Guard',1.91,82,17),
(NULL,'Dylan','Ennis',31,'Forward',1.88,89,17),
(NULL,'Simon','Birgander',14,'Center',2.10,113,17);

-- UNICAJA (18)
INSERT INTO players VALUES
(NULL,'Kendrick','Perry',3,'Guard',1.83,78,18),
(NULL,'Tyler','Kalinic',23,'Forward',2.02,95,18),
(NULL,'David','Kravish',45,'Center',2.08,109,18);


-- TABLA TALLAS
CREATE TABLE sizes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10)
);

INSERT INTO sizes (code) VALUES ('S'), ('M'), ('L'), ('XL'), ('XXL');


-- TABLA PRODUCTOS (CAMISETAS)
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    sku VARCHAR(100),
    price DECIMAL(10,2),
    stock INT,
    image_url VARCHAR(300),
    team_id BIGINT,
    size_id BIGINT,
    FOREIGN KEY (team_id) REFERENCES teams(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id)
);

INSERT INTO products (name, sku, price, stock, image_url, team_id, size_id) VALUES
('Camiseta Real Madrid 2025', 'RM-01-L', 59.99, 50, 'rm_2025.png', 1, 3),
('Camiseta FC Barcelona 2025', 'FCB-01-L', 59.99, 50, 'fcb_2025.png', 2, 3),
('Camiseta Valencia Basket 2025', 'VAL-01-L', 59.99, 45, 'valencia_2025.png', 3, 3),
('Camiseta Baskonia 2025', 'BASK-01-L', 59.99, 45, 'baskonia_2025.png', 4, 3),
('Camiseta Bàsquet Girona 2025', 'GIR-01-L', 59.99, 35, 'girona_2025.png', 5, 3),
('Camiseta BAXI Manresa 2025', 'MAN-01-L', 59.99, 35, 'manresa_2025.png', 6, 3),
('Camiseta Casademont Zaragoza 2025', 'ZAR-01-L', 59.99, 35, 'zaragoza_2025.png', 7, 3),
('Camiseta Covirán Granada 2025', 'GRA-01-L', 59.99, 35, 'granada_2025.png', 8, 3),
('Camiseta Gran Canaria 2025', 'GC-01-L', 59.99, 40, 'grancanaria_2025.png', 9, 3),
('Camiseta Hiopos Lleida 2025', 'LLE-01-L', 59.99, 30, 'lleida_2025.png', 10, 3),
('Camiseta Joventut 2025', 'JOV-01-L', 59.99, 40, 'joventut_2025.png', 11, 3),
('Camiseta Lenovo Tenerife 2025', 'TEN-01-L', 59.99, 45, 'tenerife_2025.png', 12, 3),
('Camiseta MoraBanc Andorra 2025', 'AND-01-L', 59.99, 35, 'andorra_2025.png', 13, 3),
('Camiseta Río Breogán 2025', 'BRE-01-L', 59.99, 30, 'breogan_2025.png', 14, 3),
('Camiseta San Pablo Burgos 2025', 'BUR-01-L', 59.99, 30, 'burgos_2025.png', 15, 3),
('Camiseta Surne Bilbao Basket 2025', 'BIL-01-L', 59.99, 40, 'bilbao_2025.png', 16, 3),
('Camiseta UCAM Murcia 2025', 'MUR-01-L', 59.99, 40, 'murcia_2025.png', 17, 3),
('Camiseta Unicaja Málaga 2025', 'UNI-01-L', 59.99, 45, 'unicaja_2025.png', 18, 3);
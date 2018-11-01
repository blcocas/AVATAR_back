create table person (
	pid int(6) auto_increment,
	name varchar(8) NOT NULL,
  phone varchar(13) NOT NULL UNIQUE,
  sex varchar(1) NOT NULL,
  primary key (pid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
